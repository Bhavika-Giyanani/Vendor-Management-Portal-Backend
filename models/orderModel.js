const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: Number,
      unique: true,
      required: true,
      min: 1,
    },
    clientName: {
      type: String,
      required: true,
    },
    requiredEmployees: {
      type: Number,
      required: true,
      min: 1,
    },
    techStack: {
      type: [String],
      trim: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Fulfilled", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
