const mongoose = require("mongoose");
const EmployeeSchema = new mongoose.Schema(
  {
    employeeName: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      //   required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Active", "On Leave"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
