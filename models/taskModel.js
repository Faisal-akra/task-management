const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  dueDate: {
    type: Date,
    required: false,
  },

  status: {
    type: String,
    sValues: ["Completed", "Pending", "To-Do"],
    default: "Completed",
    required: true
  },

  priority: {
    type: String,
    values: ["High", "Medium", "Low"],
    default: "Medium",
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  }
});

const taskModel = mongoose.model("tasks", taskSchema);

module.exports = taskModel;
