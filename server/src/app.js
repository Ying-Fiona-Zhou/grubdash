const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const ordersRouter = require("./orders/orders.router");
const dishesRouter = require("./dishes/dishes.router");

const app = express();

// CORS + JSON
app.use(cors());
app.use(express.json());

// 请求日志，便于确认前端是否打到后端
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// 
app.use("/dishes", dishesRouter);
app.use("/orders", ordersRouter);

// 404 
app.use(notFound);
app.use(errorHandler);

module.exports = app;

