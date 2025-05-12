const taskModel = require("../models/taskModel");

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status, priority } = req.body;

    const task = await taskModel.create({
      title,
      description,
      dueDate,
      status,
      priority,
      user: req.user._id,
    });

    res.status(200).json({
      msg: "task is created successfuly",
      task: task,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(404).json({
      msg: "error",
    });
  }
};

const fetchAllTaskUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const tasks = await taskModel.find({ user: userId });

    if (!tasks) {
      return res.status(404).json({
        msg: "this user post is nothing",
      });
    }

    res.status(200).json({
      msg: "tasks fetch successfully",
      tasks: [tasks],
    });
  } catch (error) {
    console.log(error, "error");
  }
};

const fetchSpecificTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskModel.findOne({ _id: id, user: req.user._id });

    if (!task) {
      return res.status(404).json({
        msg: "user is not found",
      });
    }

    res.json({
      msg: "task fetch successfully",
      task: task,
    });
  } catch (error) {
    console.log(error, "error");
  }
};



module.exports = { createTask, fetchAllTaskUser, fetchSpecificTask };
