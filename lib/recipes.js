const foodsUrl = 'https://qs-api-express.herokuapp.com/api/foods'

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
  var checkedIds = Array();
  foods.each( function(i, v)
  {
      checkedIds.push($(v).attr('id'));
  });
  console.log(checkedIds);
});

const tableToggle = (tableRow) => {
  $(tableRow).toggleClass('is-active')
  $(tableRow).toggleClass('table-row-active-color')
}

//
export {fetchFoodRecipes}
