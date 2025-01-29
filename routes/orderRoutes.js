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

// Route to create a new order
router.post("/", createOrder);

// Route to get all orders
router.get("/", getAllOrders);
// Route to get the three most recent orders
router.get("/recent", getRecentOrders);
// Route to get a single order by ID
router.get("/:id", getOrderById);

// Route to update an order by ID
router.put("/:id", updateOrder);

// Route to delete an order by ID
router.delete("/:id", deleteOrder);

// Route to count the number of active orders
router.get("/count/active", countActiveOrders);

// Route to count the number of orders fulfilled this week
router.get("/count/fulfilled-this-week", countOrdersFulfilledThisWeek);

module.exports = router;
