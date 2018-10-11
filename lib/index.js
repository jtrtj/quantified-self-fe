const Url = 'https://rails-quantified-self.herokuapp.com/api/v1/foods'

const fetchFoods = () => {
  fetch(Url)
  .then((response) => response.json())
  .then(processFoods)
  .catch((error) => console.log( { error } ));
};

const processFoods = (foods) => {
  foods.forEach(food => {
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
    let foodPayload = {
      food: {
              name: foodName,
              calories: foodCalories
      }
    }
    console.log(foodPayload)
  } else {
    alert("Both fields are required!")
  }
  
}

$("#add-food-btn").click(() => { addFood() })