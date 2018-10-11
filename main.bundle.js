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

	var Url = 'https://rails-quantified-self.herokuapp.com/api/v1/foods';

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
	  $('#foods-table').append('\n    <tr>\n      <td>' + food.name + '</td>\n      <td>' + food.calories + '</td>\n      <td>\n      <div class="dropdown" id=\'food-dropdown-' + food.id + '\'>\n        <div class="dropdown-trigger">\n          <button class="button" id=\'food-btn-' + food.id + '\'>\n            <span>Hover me</span>\n          </button>\n        </div>\n        <div class="dropdown-menu" id="dropdown-menu4" role="menu">\n          <div class="dropdown-content">\n            <div class="dropdown-item">\n              <p>You can insert <strong>any type of content</strong> within the dropdown menu.</p>\n            </div>\n          </div>\n        </div>\n      </td>\n    </tr>\n  ');
	  $('#food-btn-' + food.id).click(function () {
	    dropdownToggle('#food-dropdown-' + food.id);
	  });
	};

	document.addEventListener('load', fetchFoods());

	var dropdownToggle = function dropdownToggle(dropdownButtonId) {
	  $(dropdownButtonId).toggleClass("is-active");
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