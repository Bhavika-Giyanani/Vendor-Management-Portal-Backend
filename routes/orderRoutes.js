const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  countActiveOrders,
  getRecentOrders,
  countOrdersFulfilledThisWeek,
} = require("../controllers/orderController.js");

const router = express.Router();

router.post("/", createOrder);

router.get("/", getAllOrders);

router.get("/recent", getRecentOrders);

router.get("/:id", getOrderById);

router.put("/:id", updateOrder);

router.delete("/:id", deleteOrder);

router.get("/count/active", countActiveOrders);

router.get("/count/fulfilled-this-week", countOrdersFulfilledThisWeek);

module.exports = router;
