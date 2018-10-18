const mealUrl = 'https://qs-api-express.herokuapp.com/api/meals'
const Url = 'https://qs-api-express.herokuapp.com/api/foods'

const fetchMeals = () => {
  fetch(mealUrl)
  .then(response => response.json())
  .then(processMeals)
  .then(fetchFoods)
  .catch((error) => console.log( { error } ))
};

const fetchFoods = (mealId) => {
  fetch(Url)
  .then((response) => response.json())
  .then((response) => addFoodsToDropdown(response, mealId))
  .catch((error) => console.log( { error } ));
};

let allCalories = 0
const processMeals = (meals) => {
  $(`#meal-cards`).html('')
  return meals.forEach(meal=> {
    processMeal(meal);
    allCalories = allCalories + mealTotalCalories(meal)
  });
};

const processMeal = (meal) => {
  let totalCalories = mealTotalCalories(meal)
  $('#meal-cards').append(`
    <div class="card" id="meal-${meal.id}-card">
      <header class="card-header has-background-white-ter">
        <p class='card-header-title'>${meal.name}</p>
      </header>
      <div class="card-content">
        <div class="field">
          <div class="control">
            <div class='select'>
              <select id='meal-food-select-${meal.id}'>
                <option>Add to ${meal.name}</option>
              </select>
              <button class="button add-food-to-meal-btn" id='food-to-meal-${meal.id}'>
                <span>Add Food</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-content">
        <div class="field">
          <div class="control">
            <div class='select'>
              <select id='meal-food-delete-${meal.id}'>
                <option>Delete from ${meal.name}</option>
              </select>
              <button class="button delete-food-from-meal-btn" id='food-from-meal-${meal.id}'>
                <span>Delete Food</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-content">
        <table class="table is-striped is-fullwidth">
          <thead>
            <th>Name</th>
            <th>Calories</th>
          </thead>
          <tbody id="foods-table-${meal.id}">
            ${mealFoodsTableRows(meal)}
          </tbody>
          <tfoot>
            <tr class="is-selected">
              <td>Total Calories</td>
              <td>${totalCalories}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `)
  fetchFoods(meal.id)
  fetchExistingFoods(meal)
}

$("#set-calories-btn").click(() => {
  $("#remaining-cals").html(
    `
    <p class="is-size-3 has-text-white">Remaining Calories: ${$('#daily-calories-input').val() - allCalories}</p>
    `
  )
})

const mealFoodsTableRows = (meal) => {
  return meal.foods.map(food => {
    return `<tr>
              <td>${food.name}</td>
              <td>${food.calories}</td>
            </tr>
            `
  }).join("")
}

const mealTotalCalories = (meal) => {
 let calories = meal.foods.map(food => {
                  return food.calories
                })
  let total = calories.reduce(getSum)
  return total
}

const getSum = (total, num) => {
  return total + num;
}

const addFoodsToDropdown = (foods, mealId) => {
  foods.forEach(food => {
    $(`#meal-food-select-${mealId}`).append(`<option id='select-food-option-${food.id}'>${food.name}</option>`)
  })
}

const fetchExistingFoods = (meal) => {
  meal.foods.forEach(food => {
    $(`#meal-food-delete-${meal.id}`).append(`<option id="delete-option-${food.id}">${food.name}</option>`)
  })
}

$('#meal-cards').on('click', ".add-food-to-meal-btn", function() {
  let mealId = event.target.parentElement.id.replace(/[^0-9]+/g, "")
  let foodId = $(this).parent().children().children(":selected").attr('id')
  if (foodId == undefined) {
    alert("Please select a Meal")
  } else {
    var newFoodId = foodId.replace(/[^0-9]+/g, "")
    addFoodToMeal(newFoodId, mealId)
  }
})

const addFoodToMeal = (foodId, mealId) => {
  fetch(`${mealUrl}/${mealId}/foods/${foodId}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      food_id: foodId,
      meal_id: mealId
    })
  }).then(() => fetchMeals())
}

$('#meal-cards').on('click', ".delete-food-from-meal-btn", function() {
  let mealId = event.target.parentElement.id.replace(/[^0-9]+/g, "")
  let foodId = $(this).parent().children().children(":selected").attr('id')
  if (foodId == undefined) {
    alert("Please select a Meal")
  } else {
    var newFoodId = foodId.replace(/[^0-9]+/g, "")
    deleteFoodFromMeal(newFoodId, mealId)
  }
})

const deleteFoodFromMeal = (foodId, mealId) => {
  fetch(`${mealUrl}/${mealId}/foods/${foodId}`, {
    method: 'DELETE',
  }).then(() => fetchMeals())
}

export {fetchMeals}
