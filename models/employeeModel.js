import mongoose from "mongoose";

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
      type: String,
      required: true,
      trim: true,
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

export default mongoose.model("Employee", EmployeeSchema);
