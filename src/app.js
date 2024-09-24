const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");
const { seedRestaurant } = require("../seedData");

//TODO: Create your GET Request Route Below:

app.get("/restaurants", async (req, res) => {
  const allRestaurants = await Restaurant.findAll();

  res.json(allRestaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  const id = await Restaurant.findByPk(req.params.id);
  res.json(id);
});

module.exports = app;
