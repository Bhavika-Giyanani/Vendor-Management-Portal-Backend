import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    project: {
      type: String,
      required: true,
      trim: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,  // Reference to VendorModel
      ref: "Vendor",  // The model to reference
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

export default mongoose.model("Project", ProjectSchema);
