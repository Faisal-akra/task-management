const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  dueDate: {
    type: Date,
    required: false,
  },

  status: {
    type: Boolean,
    default: false,
  }

})

const taskModel = mongoose.model("tasks", taskSchema);


module.exports = taskModel;