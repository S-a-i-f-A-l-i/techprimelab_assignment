import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide project name"],
    },
    reason: {
      type: String,
      enum: ["business", "dealership", "transport"],
      default: "business",
    },
    type: {
      type: String,
      enum: ["internal", "external", "vendor"],
      default: "internal",
    },
    division: {
      type: String,
      enum: ["filters", "compressor", "pumps", "glass", "water heater"],
      default: "filters",
    },
    category: {
      type: String,
      enum: ["quality A", "quality B", "quality C", "quality D"],
      default: "quality A",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "high",
    },
    department: {
      type: String,
      enum: [
        "strategy",
        "finance",
        "quality",
        "maintenance",
        "stores",
        "finance",
        "stores",
      ],
      default: "strategy",
    },
    startDate: {
      type: String,
      required: [true, "Please select a date"],
      enum: [],
      default: "high",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", ProjectSchema);
