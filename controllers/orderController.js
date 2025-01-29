const Order = require("../models/orderModel");

//^ Create a new order
const createOrder = async (req, res) => {
  try {
    const {
      orderId,
      clientName,
      requiredEmployees,
      techStack,
      vendor,
      status,
    } = req.body;

    if (!orderId || !clientName || !requiredEmployees || !vendor) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newOrder = new Order({
      orderId,
      clientName,
      requiredEmployees,
      techStack,
      vendor,
      status,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error creating order.", error });
  }
};

//^ Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("vendor", "vendorName");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders.", error });
  }
};

//^ Get a single order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate("vendor", "vendorName");
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order.", error });
  }
};

//^ Update an order
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      orderId,
      clientName,
      requiredEmployees,
      techStack,
      vendor,
      status,
    } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        orderId,
        clientName,
        requiredEmployees,
        techStack,
        vendor,
        status,
      },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating order.", error });
  }
};

//^ Delete an order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json({ message: "Order deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order.", error });
  }
};

//^ Count the number of active orders
const countActiveOrders = async (req, res) => {
  try {
    const activeStatuses = ["Pending"];
    const count = await Order.countDocuments({
      status: { $in: activeStatuses },
    });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error counting active orders.", error });
  }
};

//^ Get the three most recent orders
const getRecentOrders = async (req, res) => {
  try {
    const recentOrders = await Order.aggregate([
      {
        $sort: { updatedAt: -1 },
      },
      {
        $limit: 3,
      },
      {
        $lookup: {
          from: "vendors",
          localField: "vendor",
          foreignField: "_id",
          as: "vendorDetails",
        },
      },
      {
        $unwind: "$vendorDetails",
      },
      {
        $project: {
          orderId: 1,
          status: 1,
          updatedAt: {
            $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" },
          },
          vendorName: "$vendorDetails.vendorName",
        },
      },
    ]);

    res.status(200).json(recentOrders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recent orders.", error });
  }
};

//^ Count the number of orders fulfilled this week
const countOrdersFulfilledThisWeek = async (req, res) => {
  try {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);

    const count = await Order.countDocuments({
      status: "Fulfilled",
      updatedAt: { $gte: startOfWeek, $lt: endOfWeek },
    });
    const response = {
      change: `-${count} this week`,
    };
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error counting fulfilled orders this week.", error });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  countActiveOrders,
  getRecentOrders,
  countOrdersFulfilledThisWeek,
};
