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
    location: {
      type: String,
      required: [true, "Please provide location"],
    },
    status: {
      type: String,
      enum: ["registered", "running", "cancelled"],
      default: "registered",
    },
    start: {
      type: String,
      required: [true, "Please select a start date"],
      min: () => new Date().toISOString().split("T")[0],
    },
    end: {
      type: String,
      required: [true, "Please select a end date"],
      validate: {
        validator: function (value) {
          return value >= this.start;
        },
        message: "End date cannot be earlier than the start date",
      },
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
