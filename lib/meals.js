const mealUrl = 'https://fast-meadow-36413.herokuapp.com/api/v1/meals'

const fetchMeals = () => {
  fetch(mealUrl)
  .then(response => response.json())
  .then(processMeals)
  .catch((error) => console.log( { error } ))
};

const processMeals = (meals) => {
  return meals.forEach(meal=> {
    processMeal(meal);
  });
};


const processMeal = (meal) => {
  let totalCalories = mealTotalCalories(meal)
  let dailyIntake = 2000
  let remainingCalories = dailyIntake - totalCalories

  $('#meal-cards').append(`
    <div class="card" id="meal-${meal.id}-card">
      <header class="card-header has-background-primary">
        <p class='card-header-title is-centered is-size-3'>${meal.name}</p>
      </header>
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
            <tr class="is-selected">
              <td>Remaining Calories</td>
              <td>${remainingCalories}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `)
}

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

export {fetchMeals}