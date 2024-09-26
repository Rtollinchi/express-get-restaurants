const express = require("express");
const Restaurant = require("../models/Restaurant");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allRestaurants = await Restaurant.findAll();
    res.json(allRestaurants);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    res.json(restaurant);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newRestaurant = await Restaurant.create(req.body);

    res.json(newRestaurant);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    await Restaurant.update(req.body, { where: { id: req.params.id } });

    const updatedRestaurant = await Restaurant.findByPk(req.params.id);
    res.json(updatedRestaurant);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  await Restaurant.destroy({ where: { id: req.params.id } });

  const updatedRestaurants = await Restaurant.findAll();
  res.json(updatedRestaurants);
});

module.exports = router;
