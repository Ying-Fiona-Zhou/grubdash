const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /orders handlers needed to make the tests pass

// ------- Helpers & Validators -------
function hasOrderProp(propName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (!data[propName] || data[propName] === "") {
      return next({
        status: 400,
        message:
          propName === "deliverTo"
            ? "Order must include a deliverTo"
            : propName === "mobileNumber"
            ? "Order must include a mobileNumber"
            : `Order must include a ${propName}`,
      });
    }
    next();
  };
}

function dishesIsValid(req, res, next) {
  const { data: { dishes } = {} } = req.body;
  if (!dishes) {
    return next({ status: 400, message: "Order must include a dish" });
  }
  if (!Array.isArray(dishes) || dishes.length === 0) {
    return next({
      status: 400,
      message: "Order must include at least one dish",
    });
  }
  for (let i = 0; i < dishes.length; i++) {
    const qty = dishes[i].quantity;
    if (qty === undefined || !Number.isInteger(qty) || qty <= 0) {
      return next({
        status: 400,
        message: `dish ${i} must have a quantity that is an integer greater than 0`,
      });
    }
  }
  next();
}

function orderExists(req, res, next) {
  const { orderId } = req.params;
  const found = orders.find((o) => o.id === orderId);
  if (!found) {
    return next({ status: 404, message: `Order does not exist: ${orderId}.` });
  }
  res.locals.order = found;
  next();
}

function idMatchesParam(req, res, next) {
  const { orderId } = req.params;
  const { data: { id } = {} } = req.body;
  if (id && id !== orderId) {
    return next({
      status: 400,
      message: `Order id does not match route id. Order: ${id}, Route: ${orderId}.`,
    });
  }
  next();
}

const allowedStatuses = ["pending", "preparing", "out-for-delivery", "delivered"];

function hasValidStatusOnUpdate(req, res, next) {
  const { data: { status } = {} } = req.body;
  if (!status || !allowedStatuses.includes(status)) {
    return next({
      status: 400,
      message:
        "Order must have a status of pending, preparing, out-for-delivery, delivered",
    });
  }
  if (res.locals.order.status === "delivered") {
    return next({
      status: 400,
      message: "A delivered order cannot be changed",
    });
  }
  next();
}

function canDelete(req, res, next) {
  const order = res.locals.order;
  if (order.status !== "pending") {
    return next({
      status: 400,
      message: "An order cannot be deleted unless it is pending",
    });
  }
  next();
}

// ------- Handlers -------
function list(req, res) {
  res.json({ data: orders });
}

function read(req, res) {
  res.json({ data: res.locals.order });
}

function create(req, res) {
  const {
    data: { deliverTo, mobileNumber, status, dishes },
  } = req.body;

  const newOrder = {
    id: nextId(),
    deliverTo,
    mobileNumber,
    status: status || "pending",
    dishes,
  };

  orders.push(newOrder);
  res.status(201).json({ data: newOrder });
}

function update(req, res) {
  const order = res.locals.order;
  const {
    data: { deliverTo, mobileNumber, status, dishes },
  } = req.body;

  order.deliverTo = deliverTo;
  order.mobileNumber = mobileNumber;
  order.status = status;
  order.dishes = dishes;

  res.json({ data: order });
}

function destroy(req, res) {
  const { orderId } = req.params;
  const index = orders.findIndex((o) => o.id === orderId);
  orders.splice(index, 1);
  res.sendStatus(204);
}

module.exports = {
  list,
  read: [orderExists, read],
  create: [hasOrderProp("deliverTo"), hasOrderProp("mobileNumber"), dishesIsValid, create],
  update: [
    orderExists,
    idMatchesParam,
    hasOrderProp("deliverTo"),
    hasOrderProp("mobileNumber"),
    dishesIsValid,
    hasValidStatusOnUpdate,
    update,
  ],
  delete: [orderExists, canDelete, destroy],
};
