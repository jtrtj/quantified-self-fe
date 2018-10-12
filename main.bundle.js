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
/***/ (function(module, exports) {

	'use strict';

	var Url = 'https://fast-meadow-36413.herokuapp.com';

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
	  console.log(event.currentTarget.id);
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

	document.addEventListener('load', fetchFoods());

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
	  var deleteUrl = Url + '/' + foodId;
	  fetch(deleteUrl, {
	    method: 'DELETE'
	  }).then(fetchFoods);
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
	    alert("Calroies must be entered as a number");
	    $("#calorie-input").val(null);
	  }
	};

	$("#calorie-input").on('input', function () {
	  checkCalorieInput();
	});

/***/ })
/******/ ]);