const Url = 'https://rails-quantified-self.herokuapp.com/api/v1/foods'

const fetchFoods = () => {
  fetch(Url)
  .then((response) => response.json())
  .then(processFoods)
  .catch((error) => console.log( { error } ));
};

const processFoods = (foods) => {
  return foods.forEach(food => {
    processFood(food);
  });
};

const processFood = (food) => {
  $('#foods-table').append(`
    <tr>
      <td>${food.name}</td>
      <td>${food.calories}</td>
      <td>
      <div class="dropdown" id='food-dropdown-${food.id}'>
        <div class="dropdown-trigger">
          <button class="button" id='food-btn-${food.id}'>
            <span>Hover me</span>
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu4" role="menu">
          <div class="dropdown-content">
            <div class="dropdown-item">
              <p>You can insert <strong>any type of content</strong> within the dropdown menu.</p>
            </div>
          </div>
        </div>
      </td>
    </tr>
  `);
  $(`#food-btn-${food.id}`).click(()=>{dropdownToggle(`#food-dropdown-${food.id}`)});
};



document.addEventListener('load', fetchFoods());

const dropdownToggle = (dropdownButtonId) => {
  $(dropdownButtonId).toggleClass("is-active");
};

//add food functionality below:

const addFood = () => {
  let foodName = $("#food-input").val()
  let foodCalories = $("#calorie-input").val()
  if (foodName.length > 0 && foodCalories.length > 0) {
    let foodData = {
      food: {
              name: foodName,
              calories: foodCalories
      }
    }
    $("#food-input").val("")
    $("#calorie-input").val(null)
    let food = foodPayload(foodData)
    postFood(food)
  } else {
    alert("Both Name and Calorie fields are required!")
  }
}

const foodPayload = (body) => {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }
}

const postFood = (payload) => {
  fetch(Url, payload)
    .then(response => response.json())
    .then(foodJson => processFood(foodJson))
    .catch((error) => console.log( { error } ))
}

$("#add-food-btn").click(() => { addFood() })

const checkCalorieInput = () => {
  let foodCalories = $("#calorie-input").val()
  if (foodCalories.match(/[a-z]/i) ) {
    alert("Calroies must be entered as a number")
    $("#calorie-input").val(null)
  }
}

$("#calorie-input").on('input', function(){
  checkCalorieInput()
})