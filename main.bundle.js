/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var meals = __webpack_require__(1);
	var recipes = __webpack_require__(2);

	///'tab' nav
	var showOne = function showOne(id) {
	  $('.hide').not(id).hide();
	  $(id).show();
	};

	$('.hide').not('#welcome-hero').hide();
	$('#foods-nav-link').click(function () {
	  showOne('#foods-hero');
	});
	$('#meals-nav-link').click(function () {
	  showOne('#meals-hero');
	});
	$('#recipes-nav-link').click(function () {
	  showOne('#recipes-hero');
	});

	var Url = 'https://qs-api-express.herokuapp.com/api/foods';
	var foodList = void 0;

	var fetchFoods = function fetchFoods() {
	  fetch(Url).then(function (response) {
	    return response.json();
	  }).then(processFoods).catch(function (error) {
	    return console.log({ error: error });
	  });
	};

	var processFoods = function processFoods(foods) {
	  return foods.forEach(function (food) {
	    processFood(food);
	  });
	};

	var processFood = function processFood(food) {
	  $('#foods-table').append('\n    <tr class="food-row" id=\'food-row-' + food.id + '\'>\n      <td id=\'food-' + food.id + '-name\'>' + food.name + '</td>\n      <td id=\'food-' + food.id + '-calories\'>' + food.calories + '</td>\n      <td>\n      <div class="dropdown" id=\'food-dropdown-' + food.id + '\'>\n        <div class="dropdown-trigger">\n          <button class="button dropdown-btn" id=\'' + food.id + '\'>\n            <span>Options</span>\n          </button>\n        </div>\n        <div class="dropdown-menu" id="dropdown-menu4" role="menu">\n          <div class="dropdown-content">\n            <div class="dropdown-item">\n              ' + foodOptions(food) + '\n            </div>\n          </div>\n        </div>\n      </td>\n    </tr>\n  ');
	};

	$('#foods-table').on('click', '.dropdown-btn', function (event) {
	  dropdownToggle('#food-dropdown-' + event.currentTarget.id);
	});

	$('#foods-table').on('click', '.update-food-btn', function (event) {
	  updateFood(event.currentTarget.id);
	});

	$('#foods-table').on('click', '.delete-food-btn', function (event) {
	  deleteFood(event.currentTarget.id);
	});

	var foodOptions = function foodOptions(food) {
	  return '<div class="card has-content-centered">\n    <div class="card-content">\n      <div class="field">\n        <div class="control">\n          <input class=\'input is-primary is-small\' type="text" value="' + food.name + '" id=\'update-food-name-' + food.id + '\'>\n        </div>\n      </div>\n      <div class="field">\n        <div class="control">\n          <input class=\'input is-primary is-small\' type="text" min=\'0\' value="' + food.calories + '" id=\'update-food-calories-' + food.id + '\'>\n        </div>\n      </div>\n      <div class="field">\n        <div class="control">\n          <a class="button is-success is-outlined is-small update-food-btn" id="' + food.id + '">\n            Update Food\n          </a>\n        </div>\n      </div>\n      <div class="field">\n        <div class="control">\n          <a class="button is-danger is-outlined is-small delete-food-btn" id="' + food.id + '">\n            Delete Food\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>';
	};

	var dropdownToggle = function dropdownToggle(dropdownButtonId) {
	  $(dropdownButtonId).toggleClass("is-active");
	};

	var updateFood = function updateFood(foodId) {
	  var updatedFoodName = $('#update-food-name-' + foodId).val();
	  var updatedFoodCalories = $('#update-food-calories-' + foodId).val();
	  if (updatedFoodName.length > 0 && updatedFoodCalories.length > 0) {
	    var foodData = {
	      food: {
	        name: updatedFoodName,
	        calories: updatedFoodCalories
	      }
	    };
	    var editedFood = editFoodPayload(foodData);
	    patchFood(editedFood, foodId);
	  } else {
	    alert("Both Name and Calorie fields are required!");
	  }
	};

	var deleteFood = function deleteFood(foodId) {
	  var deleteUrl = 'https://qs-api-express.herokuapp.com/api/foods/' + foodId;
	  fetch(deleteUrl, {
	    method: 'DELETE'
	  }).then(function (response) {
	    if (response.status === 204) {
	      removeFoodRow(foodId);
	    } else {
	      alert('Cannot be deleted; food is currently in a meal');
	    }
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var patchFood = function patchFood(foodData, foodId) {
	  var editUrl = Url + '/' + foodId;
	  fetch(editUrl, foodData).then(function (response) {
	    return response.json();
	  }).then(updateFoodTable).catch(function (error) {
	    return console.log({ error: error });
	  });
	};

	var updateFoodTable = function updateFoodTable(newFoodData) {
	  $('#food-' + newFoodData.id + '-name').html(newFoodData.name);
	  $('#food-' + newFoodData.id + '-calories').html(newFoodData.calories);
	  dropdownToggle('#food-dropdown-' + newFoodData.id);
	  alert(newFoodData.name + ' has been updated!');
	};

	var removeFoodRow = function removeFoodRow(foodId) {
	  $('#food-row-' + foodId).remove();
	};

	//add food functionality below:

	var addFood = function addFood() {
	  var foodName = $("#food-input").val();
	  var foodCalories = $("#calorie-input").val();
	  if (foodName.length > 0 && foodCalories.length > 0) {
	    var foodData = {
	      food: {
	        name: foodName,
	        calories: foodCalories
	      }
	    };
	    $("#food-input").val("");
	    $("#calorie-input").val(null);
	    var food = foodPayload(foodData);
	    postFood(food);
	  } else {
	    alert("Both Name and Calorie fields are required!");
	  }
	};

	var foodPayload = function foodPayload(body) {
	  return {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(body)
	  };
	};

	var editFoodPayload = function editFoodPayload(body) {
	  return {
	    method: 'PUT',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify(body)
	  };
	};

	var postFood = function postFood(payload) {
	  fetch(Url, payload).then(function (response) {
	    return response.json();
	  }).then(function (foodJson) {
	    return processFood(foodJson);
	  }).catch(function (error) {
	    return console.log({ error: error });
	  });
	};

	$("#add-food-btn").click(function () {
	  addFood();
	});

	var checkCalorieInput = function checkCalorieInput() {
	  var foodCalories = $("#calorie-input").val();
	  if (foodCalories.match(/[a-z]/i)) {
	    alert("Calories must be entered as a number");
	    $("#calorie-input").val(null);
	  }
	};

	$("#calorie-input").on('input', function () {
	  checkCalorieInput();
	});

	$("#filter-input").on("keyup", function () {
	  var value = $(this).val().toLowerCase();
	  $("#foods-table tr").filter(function () {
	    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
	  });
	});

	////ON LOAD////
	document.addEventListener('load', meals.fetchMeals());
	document.addEventListener('load', recipes.fetchFoodRecipes());
	document.addEventListener('load', fetchFoods());

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var mealUrl = 'https://qs-api-express.herokuapp.com/api/meals';
	var Url = 'https://qs-api-express.herokuapp.com/api/foods';

	var fetchMeals = function fetchMeals() {
	  fetch(mealUrl).then(function (response) {
	    return response.json();
	  }).then(processMeals).then(fetchFoods).catch(function (error) {
	    return console.log({ error: error });
	  });
	};

	var fetchFoods = function fetchFoods(mealId) {
	  fetch(Url).then(function (response) {
	    return response.json();
	  }).then(function (response) {
	    return addFoodsToDropdown(response, mealId);
	  }).catch(function (error) {
	    return console.log({ error: error });
	  });
	};

	var allCalories = 0;
	var processMeals = function processMeals(meals) {
	  $('#meal-cards').html('');
	  return meals.forEach(function (meal) {
	    processMeal(meal);
	    allCalories = allCalories + mealTotalCalories(meal);
	  });
	};

	var processMeal = function processMeal(meal) {
	  var totalCalories = mealTotalCalories(meal);
	  $('#meal-cards').append('\n    <div class="card" id="meal-' + meal.id + '-card">\n      <header class="card-header has-background-white-ter">\n        <p class=\'card-header-title\'>' + meal.name + '</p>\n      </header>\n      <div class="card-content">\n        <div class="field">\n          <div class="control">\n            <div class=\'select\'>\n              <select id=\'meal-food-select-' + meal.id + '\'>\n                <option>Add to ' + meal.name + '</option>\n              </select>\n              <button class="button add-food-to-meal-btn" id=\'food-to-meal-' + meal.id + '\'>\n                <span>Add Food</span>\n              </button>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class="card-content">\n        <div class="field">\n          <div class="control">\n            <div class=\'select\'>\n              <select id=\'meal-food-delete-' + meal.id + '\'>\n                <option>Delete from ' + meal.name + '</option>\n              </select>\n              <button class="button delete-food-from-meal-btn" id=\'food-from-meal-' + meal.id + '\'>\n                <span>Delete Food</span>\n              </button>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class="card-content">\n        <table class="table is-striped is-fullwidth">\n          <thead>\n            <th>Name</th>\n            <th>Calories</th>\n          </thead>\n          <tbody id="foods-table-' + meal.id + '">\n            ' + mealFoodsTableRows(meal) + '\n          </tbody>\n          <tfoot>\n            <tr class="is-selected">\n              <td>Total Calories</td>\n              <td>' + totalCalories + '</td>\n            </tr>\n          </tfoot>\n        </table>\n      </div>\n    </div>\n  ');
	  fetchFoods(meal.id);
	  fetchExistingFoods(meal);
	};

	$("#set-calories-btn").click(function () {
	  $("#remaining-cals").html('\n    <p class="is-size-3 has-text-white">Remaining Calories: ' + ($('#daily-calories-input').val() - allCalories) + '</p>\n    ');
	});

	var mealFoodsTableRows = function mealFoodsTableRows(meal) {
	  return meal.foods.map(function (food) {
	    return '<tr>\n              <td>' + food.name + '</td>\n              <td>' + food.calories + '</td>\n            </tr>\n            ';
	  }).join("");
	};

	var mealTotalCalories = function mealTotalCalories(meal) {
	  var calories = meal.foods.map(function (food) {
	    return food.calories;
	  });
	  var total = calories.reduce(getSum);
	  return total;
	};

	var getSum = function getSum(total, num) {
	  return total + num;
	};

	var addFoodsToDropdown = function addFoodsToDropdown(foods, mealId) {
	  foods.forEach(function (food) {
	    $('#meal-food-select-' + mealId).append('<option id=\'select-food-option-' + food.id + '\'>' + food.name + '</option>');
	  });
	};

	var fetchExistingFoods = function fetchExistingFoods(meal) {
	  meal.foods.forEach(function (food) {
	    $('#meal-food-delete-' + meal.id).append('<option id="delete-option-' + food.id + '">' + food.name + '</option>');
	  });
	};

	$('#meal-cards').on('click', ".add-food-to-meal-btn", function () {
	  var mealId = event.target.parentElement.id.replace(/[^0-9]+/g, "");
	  var foodId = $(this).parent().children().children(":selected").attr('id');
	  if (foodId == undefined) {
	    alert("Please select a Meal");
	  } else {
	    var newFoodId = foodId.replace(/[^0-9]+/g, "");
	    addFoodToMeal(newFoodId, mealId);
	  }
	});

	var addFoodToMeal = function addFoodToMeal(foodId, mealId) {
	  fetch(mealUrl + '/' + mealId + '/foods/' + foodId, {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({
	      food_id: foodId,
	      meal_id: mealId
	    })
	  }).then(function () {
	    return fetchMeals();
	  });
	};

	$('#meal-cards').on('click', ".delete-food-from-meal-btn", function () {
	  var mealId = event.target.parentElement.id.replace(/[^0-9]+/g, "");
	  var foodId = $(this).parent().children().children(":selected").attr('id');
	  if (foodId == undefined) {
	    alert("Please select a Meal");
	  } else {
	    var newFoodId = foodId.replace(/[^0-9]+/g, "");
	    deleteFoodFromMeal(newFoodId, mealId);
	  }
	});

	var deleteFoodFromMeal = function deleteFoodFromMeal(foodId, mealId) {
	  fetch(mealUrl + '/' + mealId + '/foods/' + foodId, {
	    method: 'DELETE'
	  }).then(function () {
	    return fetchMeals();
	  });
	};

	exports.fetchMeals = fetchMeals;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var foodsUrl = 'https://qs-api-express.herokuapp.com/api/foods';
	var yummlyId = '948857f9';
	var yummlyKey = '53ff97ce18b28c3c9f770de458820404';

	var fetchFoodRecipes = function fetchFoodRecipes() {
	  fetch(foodsUrl).then(function (response) {
	    return response.json();
	  }).then(function (foods) {
	    return addFoodsToScrollMenu(foods);
	  }).catch(function (error) {
	    return console.log({ error: error });
	  });
	};
	//
	var addFoodsToScrollMenu = function addFoodsToScrollMenu(foods) {

	  foods.forEach(function (food) {
	    return addFoodToScrollMenu(food);
	  });
	};
	//
	var addFoodToScrollMenu = function addFoodToScrollMenu(food) {
	  $('#food-recipes-table').append('\n    <tr class=\'recipe-row\' id=\'recipe-row-' + food.id + '\'>\n      <td>' + food.name + '</td>\n      <td>' + food.calories + '</td>\n      <td><input id=\'' + food.name + '\' type="checkbox"></td>\n    </tr>\n    ');
	};

	$("#add-foods-to-recipe-btn").click(function (event) {
	  var foods = $(".recipe-row").children().children(":checked");
	  var checkedFoods = Array();
	  foods.each(function (i, v) {
	    checkedFoods.push($(v).attr('id'));
	  });
	  if (!checkedFoods.length) {
	    return alert('Choose some foods to search');
	  } else {
	    fetchRecipes(checkedFoods);
	  }
	});

	var fetchRecipes = function fetchRecipes(checkedFoods) {
	  var formattedFoods = checkedFoods.join('+').replace(/\s/g, "+");
	  fetch('http://api.yummly.com/v1/api/recipes?_app_id=' + yummlyId + '&_app_key=' + yummlyKey + '&requirePictures=true&q=' + formattedFoods).then(function (response) {
	    return response.json();
	  }).then(function (recipes) {
	    return makeRecipeCards(recipes.matches);
	  });
	};

	var makeRecipeCards = function makeRecipeCards(recipes) {
	  $('#recipe-cards').html("");
	  if (!recipes.length) {
	    return $('#recipe-cards').append('\n      <div class="card">\n        <div class="card-content">\n          <div class="media">\n            <div class="media-content">\n              <p class="title is-4">No Recipes Found :-(</p>\n            </div>\n          </div>\n        </div>\n      </div>\n      ');
	  }
	  recipes.forEach(function (recipe) {
	    $('#recipe-cards').append('\n      <div class="card">\n        <div class="card-content">\n          <div class="media">\n            <div class="media-left">\n              <figure class="image is-64x64">\n                <img src="' + recipe.imageUrlsBySize["90"] + '" alt="recipe image">\n              </figure>\n            </div>\n            <div class="media-content">\n              <p class="title is-4">' + recipe.recipeName + '</p>\n              <p class="subtitle is-6">Category: ' + recipe.attributes.course.join(', ') + '</p>\n            </div>\n          </div>\n          <div class="content">\n            <p>Ingredients: ' + recipe.ingredients.join(', ') + '</p>\n            <a href="https://www.yummly.com/recipe/' + recipe.id + '" target="_blank">Link to recipe</a>\n          </div>\n        </div>\n      </div>\n      ');
	  });
	};

	exports.fetchFoodRecipes = fetchFoodRecipes;

/***/ })
/******/ ]);