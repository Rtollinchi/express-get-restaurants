const request = require("supertest");
const app = require("./src/app.js");
const { Restaurant } = require("./models");
const syncSeed = require("./seed.js");

beforeAll(async () => {
  await syncSeed();
});

describe("unit tests for GET and POST routes", () => {
  test("get restaurants tests", async () => {
    const allRestaurants = await request(app).get("/restaurants");

    expect(allRestaurants.status).toBe(200);
    expect(Array.isArray(allRestaurants.body)).toBe(true);
  });
  test("route returns correct number of restaurants", async () => {
    const allRestaurants = await request(app).get("/restaurants");

    expect(allRestaurants.body.length).toBe(3);
  });
  test("route returns the correct restaurant data", async () => {
    const allRestaurants = await request(app).get("/restaurants");

    expect(allRestaurants.body[0]).toHaveProperty("id");
    expect(allRestaurants.body[0]).toHaveProperty("name");
    expect(allRestaurants.body[0]).toHaveProperty("location");
    expect(allRestaurants.body[0]).toHaveProperty("cuisine");
  });

  test("route /restaurants/:1 returns correct data", async () => {
    const restaurant = await request(app).get("/restaurants/1");

    expect(restaurant.body).toHaveProperty("id");
    expect(restaurant.body).toHaveProperty("name");
    expect(restaurant.body).toHaveProperty("location");
    expect(restaurant.body).toHaveProperty("cuisine");
  });

  test("test POST /restaurants returns updated array", async () => {
    const addRestaurant = await request(app)
      .post("/restaurants")
      .send({ name: "Black Bird", location: "Wantagh", cuisine: "American" });

    const allRestaurants = await request(app).get("/restaurants");

    expect(allRestaurants.body.length).toBe(4);
  });

  test("test PUT /restaurant updates the restaurant array", async () => {
    await request(app)
      .put("/restaurants/4")
      .send({ name: "Blue Bird", location: "Bellmore", cuisine: "American" });

    const updatedRestaurant = await request(app).get("/restaurants/4");

    expect(updatedRestaurant.body.name).toEqual("Blue Bird");
    expect(updatedRestaurant.body.location).toEqual("Bellmore");
    expect(updatedRestaurant.body.cuisine).toEqual("American");
  });

  test("test DELETE /restaurant/:id", async () => {
    await request(app).delete("/restaurants/4");

    const allRestaurants = await request(app).get("/restaurants");

    expect(allRestaurants.body.length).toBe(3);
  });
});
