# Quantified Self (Front-end)

This app is currently deployed at [http://general-alley.surge.sh/](http://general-alley.surge.sh/)

This was built by [John Roemer](https://github.com/jtrtj) and [Tristan Bambauer](https://github.com/TristanB17)

## Purpose of this Repo

This app was designed as a small calorie tracking program for an individual user. The user has a list of foods, which can be viewed on the endpoint '/api/foods'. 

![Settings Window](https://i.imgur.com/fEvs9aI.png)

A user is also able to add a food to the database with a name and a calorie amount. Once created, the food can also be edited and/or removed from the database using the small dropdown menu on the right of all listed foods (_pictured below_). 

![Settings Window](https://i.imgur.com/WFS2jFz.png)

## Functionality

**This app was designed with the following goals in mind:**

1. CRUD foods

2. Add a food to a meal

3. Compare calories to goals (meal and total)

CRUD foods
Add a food to a meal
Compare calories to goals (meal and total)
View calorie calculations in diary
Data persists across refreshes
Consume the same endpoints that you built in Rails (but from your Express server), in addition to either the Calendar or Recipe option, explained below.

## Initial Setup

1. Clone this repo into the desired folder with the command

  ```shell
  git clone git@github.com:TristanB17/quantified-self-fe
  ```
2. Change into the `quantified-self-fe` directory

3. Install the dependencies of the starter kit

  ```shell
  npm install
  ```
  
## Running the Server Locally

This project uses data seeded from [this Express API](https://github.com/jtrtj/qs-api-express), to run the code locally, use the command:

```shell
npm start
```

Once the server is running, visit in your browser:

* `http://localhost:8080/` to run your application.

## Deployment

* The page can also be viewed using the hosting site [Surge](https://surge.sh/)

## Built With

* [JavaScript](https://www.javascript.com/)
* [jQuery](https://jquery.com/)
* [Express](https://expressjs.com/)
* [Mocha](https://mochajs.org/)
* [Chai](https://chaijs.com/)

