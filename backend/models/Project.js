const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignedEmployees: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ],
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);