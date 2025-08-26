const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass

// ------- Validators -------
function hasProperty(propName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (!data[propName] || data[propName] === "") {
      return next({
        status: 400,
        message:
          propName === "image_url"
            ? "Dish must include a image_url"
            : `Dish must include a ${propName}`,
      });
    }
    return next();
  };
}

function priceIsValidInteger(req, res, next) {
  const { data: { price } = {} } = req.body;
  if (price === undefined) {
    return next({ status: 400, message: "Dish must include a price" });
  }
  if (!Number.isInteger(price) || price <= 0) {
    return next({
      status: 400,
      message: "Dish must have a price that is an integer greater than 0",
    });
  }
  next();
}

function dishExists(req, res, next) {
  const { dishId } = req.params;
  const found = dishes.find((d) => d.id === dishId);
  if (!found) {
    return next({ status: 404, message: `Dish does not exist: ${dishId}.` });
  }
  res.locals.dish = found;
  next();
}

function idMatchesParam(req, res, next) {
  const { dishId } = req.params;
  const { data: { id } = {} } = req.body;
  if (id && id !== dishId) {
    return next({
      status: 400,
      message: `Dish id does not match route id. Dish: ${id}, Route: ${dishId}`,
    });
  }
  next();
}

// ------- Handlers -------
function list(req, res) {
  res.json({ data: dishes });
}

function read(req, res) {
  res.json({ data: res.locals.dish });
}

function create(req, res) {
  const { data: { name, description, price, image_url } = {} } = req.body;
  const newDish = { id: nextId(), name, description, price, image_url };
  dishes.push(newDish);
  res.status(201).json({ data: newDish });
}

function update(req, res) {
  const dish = res.locals.dish;
  const { data: { name, description, price, image_url } = {} } = req.body;

  dish.name = name;
  dish.description = description;
  dish.price = price;
  dish.image_url = image_url;

  res.json({ data: dish });
}

module.exports = {
  list,
  read: [dishExists, read],
  create: [
    hasProperty("name"),
    hasProperty("description"),
    priceIsValidInteger,
    hasProperty("image_url"),
    create,
  ],
  update: [
    dishExists,
    idMatchesParam,
    hasProperty("name"),
    hasProperty("description"),
    priceIsValidInteger,
    hasProperty("image_url"),
    update,
  ],
};
