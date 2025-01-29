const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    project: {
      type: String,
      required: true,
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
      enum: ["Active", "On Leave"],
      default: "Active",
    },
    completion: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
