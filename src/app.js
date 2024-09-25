const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");
const { seedRestaurant } = require("../seedData");

//TODO: Create your GET Request Route Below:

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/restaurants", restaurantRouter);

app.get("/restaurants", async (req, res, next) => {
  try {
    const allRestaurants = await Restaurant.findAll();
    res.json(allRestaurants);
  } catch (error) {
    next(error);
  }
});

app.get("/restaurants/:id", async (req, res, next) => {
  try {
    const id = await Restaurant.findByPk(req.params.id);
    res.json(id);
  } catch (error) {
    next(error);
  }
});

app.post("/restaurants", async (req, res, next) => {
  try {
    const newRestaurant = await Restaurant.create(req.body);
    res.json(newRestaurant);
  } catch (error) {
    next(error);
  }
});

app.put("/restaurants/:id", async (req, res, next) => {
  try {
    const updatedRestaurant = await Restaurant.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(updatedRestaurant);
  } catch (error) {
    next(error);
  }
});

app.delete("/restaurants/:id", async (req, res, next) => {
  try {
    const deletedRestaurant = await Restaurant.destroy({
      where: { id: req.params.id },
    });
    res.json(deletedRestaurant);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
