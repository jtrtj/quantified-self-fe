const foodsUrl = 'https://qs-api-express.herokuapp.com/api/foods'
const yummlyId = '948857f9'
const yummlyKey = '53ff97ce18b28c3c9f770de458820404'

const fetchFoodRecipes = () => {
  fetch(foodsUrl)
  .then((response) => response.json())
  .then((foods) => addFoodsToScrollMenu(foods))
  .catch((error) => console.log( { error } ));
}
//
const addFoodsToScrollMenu = (foods) => {

  foods.forEach(food => {
    return addFoodToScrollMenu(food)
  })
}
//
const addFoodToScrollMenu = (food) => {
  $('#food-recipes-table').append(`
    <tr class='recipe-row' id='recipe-row-${food.id}'>
      <td>${food.name}</td>
      <td>${food.calories}</td>
      <td><input id='${food.name}' type="checkbox"></td>
    </tr>
    `)
}

$("#add-foods-to-recipe-btn").click((event) => {
  let foods = $(".recipe-row").children().children(":checked")
  var checkedFoods = Array();
  foods.each( function(i, v)
  {
      checkedFoods.push($(v).attr('id'));
  });
  if (!checkedFoods.length) {
    return alert('Choose some foods to search')
  } else {
    fetchRecipes(checkedFoods)
  }
});

const fetchRecipes = (checkedFoods) => {
  var formattedFoods = checkedFoods.join('+').replace(/\s/g, "+")
  fetch(`http://api.yummly.com/v1/api/recipes?_app_id=${yummlyId}&_app_key=${yummlyKey}&requirePictures=true&q=${formattedFoods}`)
  .then((response) => response.json())
  .then((recipes) => makeRecipeCards(recipes.matches))
}

const makeRecipeCards = (recipes) => {
  $('#recipe-cards').html("")
  if (!recipes.length){
    return $('#recipe-cards').append(
      `
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">No Recipes Found :-(</p>
            </div>
          </div>
        </div>
      </div>
      `
    )
  }
  recipes.forEach(recipe => {
    $('#recipe-cards').append(
      `
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <img src="${recipe.imageUrlsBySize["90"]}" alt="recipe image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">${recipe.recipeName}</p>
              <p class="subtitle is-6">Category: ${recipe.attributes.course.join(', ')}</p>
            </div>
          </div>
          <div class="content">
            <p>Ingredients: ${recipe.ingredients.join(', ')}</p>
            <a href="https://www.yummly.com/recipe/${recipe.id}" target="_blank">Link to recipe</a>
          </div>
        </div>
      </div>
      `
    ) 
  })
}

export {fetchFoodRecipes}
