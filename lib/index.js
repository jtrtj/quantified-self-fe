const meals = require('./meals.js')

///'tab' nav
const showOne = (id) => {
  $('.hide').not(id).hide()
  $(id).show()
}

$('.hide').not('#welcome-hero').hide()
$('#foods-nav-link').click( function() {
  showOne('#foods-hero')
})
$('#meals-nav-link').click( function() {
  showOne('#meals-hero')
})
///

const Url = 'https://qs-api-express.herokuapp.com/api/foods'
let foodList;

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
    <tr class="food-row" id='food-row-${food.id}'>
      <td id='food-${food.id}-name'>${food.name}</td>
      <td id='food-${food.id}-calories'>${food.calories}</td>
      <td>
      <div class="dropdown" id='food-dropdown-${food.id}'>
        <div class="dropdown-trigger">
          <button class="button dropdown-btn" id='${food.id}'>
            <span>Options</span>
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu4" role="menu">
          <div class="dropdown-content">
            <div class="dropdown-item">
              ${foodOptions(food)}
            </div>
          </div>
        </div>
      </td>
    </tr>
  `);
};

$('#foods-table').on('click', '.dropdown-btn', function(event) {
  dropdownToggle(`#food-dropdown-${event.currentTarget.id}`)
})

$('#foods-table').on('click', '.update-food-btn', function(event) {
  updateFood(event.currentTarget.id)
})

$('#foods-table').on('click', '.delete-food-btn', function(event) {
  deleteFood(event.currentTarget.id)
})

const foodOptions = (food) => {
  return `<div class="card has-content-centered">
    <div class="card-content">
      <div class="field">
        <div class="control">
          <input class='input is-primary is-small' type="text" value="${food.name}" id='update-food-name-${food.id}'>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input class='input is-primary is-small' type="text" min='0' value="${food.calories}" id='update-food-calories-${food.id}'>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <a class="button is-success is-outlined is-small update-food-btn" id="${food.id}">
            Update Food
          </a>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <a class="button is-danger is-outlined is-small delete-food-btn" id="${food.id}">
            Delete Food
          </a>
        </div>
      </div>
    </div>
  </div>`
}


const dropdownToggle = (dropdownButtonId) => {
  $(dropdownButtonId).toggleClass("is-active");
};

const updateFood = (foodId) => {
  let updatedFoodName = $(`#update-food-name-${foodId}`).val()
  let updatedFoodCalories = $(`#update-food-calories-${foodId}`).val()
  if (updatedFoodName.length > 0 && updatedFoodCalories.length > 0) {
    let foodData = {
      food: {
        name: updatedFoodName,
        calories: updatedFoodCalories
      }
    }
    var editedFood = editFoodPayload(foodData)
    patchFood(editedFood, foodId)
  } else {
    alert("Both Name and Calorie fields are required!")
  }
}

const deleteFood = (foodId) => {
  let deleteUrl = `https://qs-api-express.herokuapp.com/api/foods/${foodId}`
  fetch(deleteUrl, {
    method: 'DELETE'
  }).then((response) => {
    if (response.status === 204) {
      removeFoodRow(foodId)
    } else {
      alert('Cannot be deleted; food is currently in a meal')
    }
  }).catch(error => console.error({ error }))
}

const patchFood = (foodData, foodId) => {
  let editUrl = `${Url}/${foodId}`
  fetch(editUrl, foodData)
  .then(response => response.json())
  .then(updateFoodTable)
  .catch((error) => console.log( { error } ))
}

const updateFoodTable = (newFoodData) => {
  $(`#food-${newFoodData.id}-name`).html(newFoodData.name)
  $(`#food-${newFoodData.id}-calories`).html(newFoodData.calories)
  dropdownToggle(`#food-dropdown-${newFoodData.id}`)
  alert(`${newFoodData.name} has been updated!`)
}

const removeFoodRow = (foodId) => {
  $(`#food-row-${foodId}`).remove()
}

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
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
}

const editFoodPayload = (body) => {
  return {
    method: 'PUT',
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
    alert("Calories must be entered as a number")
    $("#calorie-input").val(null)
  }
}

$("#calorie-input").on('input', function(){
  checkCalorieInput()
})

$("#filter-input").on("keyup", function() {
  var value = $(this).val().toLowerCase();
  $("#foods-table tr").filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
});

////ON LOAD////
document.addEventListener('load', meals.fetchMeals());
document.addEventListener('load', fetchFoods());
