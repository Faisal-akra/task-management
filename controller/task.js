const taskModel = require("../models/taskModel");

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status, priority } = req.body;

    if (!title || !description || !dueDate ) {
      return res.status(404).json({
        msg: "All fileds are required",
      });
    }

  
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

const fetchTaskByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const userId = req.user._id;
    const tasks = await taskModel.find({ user: userId, status: status });
    if (!tasks) {
      return res.status(404).json({
        msg: "this user task is nothing",
      });
    }

    if (tasks.length === 0) {
      return res.status(404).json({
        msg: "task is not match",
      });
    }
    res.status(200).json({
      msg: "tasks fetch successfully",
      tasks: tasks,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(404).json({
      msg: "error",
    });
  }
};

const fetchTaskByPriority = async (req, res) => {
  try {
    const { priority } = req.params;
    const userId = req.user._id;
    const tasks = await taskModel.find({ user: userId, priority: priority });
    if (!tasks) {
      return res.status(404).json({
        msg: "this user task is nothing",
      });
    }

    if(tasks.length === 0) {
      return res.status(404).json({
        msg: 'this priority of your task is not match'
      })
    }
    res.status(200).json({
      msg: "tasks fetch successfully",
      tasks: tasks,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(404).json({
      msg: "error",
    });
  }
};
const updateSpecificTask = async (req, res) => {
  try {
    
    const {id} = req.params;
		const update = req.body;

        if (!update.status) update.status = "Completed";
    if (!update.priority) update.priority = "Medium";
		const updateTask = await taskModel.findByIdAndUpdate(id,  update, {new: true});

		if(!updateTask){
			return res.status(404).json({
				msg: "This user tasks is empty"
			})
		}



    res.status(200).json({
			msg: "upadte task successfully🎊",
      task: updateTask
		})
  } catch (error) {
  console.log(error,"error")  
  }
}

module.exports = {
  createTask,
  fetchAllTaskUser,
  fetchSpecificTask,
  fetchTaskByStatus,
  fetchTaskByPriority,
  updateSpecificTask,

};
