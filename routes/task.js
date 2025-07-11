const express = require("express");
const middleWare = require("../middleware/verifyUser");
const {
	createTask,
	fetchAllTaskUser,
	fetchSpecificTask,
	fetchTaskByPriority,
	fetchTaskByStatus,

	deleteSpecificTask,
	updateSpecificTask,
} = require("../controller/task");

const taskRoutes = express.Router();

taskRoutes.post("/createTask", middleWare, createTask);
taskRoutes.get("/fetchAllTasks", middleWare, fetchAllTaskUser);
taskRoutes.get("/fetchSpecificTasks/:id", middleWare, fetchSpecificTask);
taskRoutes.delete("/deleteSpecificTasks/:id", middleWare, deleteSpecificTask);

taskRoutes.get(
	"/fetchSpecificTasksByStatus/:status",
	middleWare,
	fetchTaskByStatus
);
taskRoutes.get(
	"/fetchSpecificTasksByPriority/:priority",
	middleWare,
	fetchTaskByPriority
);
taskRoutes.post("/updateSpecificTask/:id",middleWare,updateSpecificTask)
module.exports = taskRoutes;
