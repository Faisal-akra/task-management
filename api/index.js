// const express = require("express");
// const dotenv = require("dotenv");
// const mongooseDB = require("../config/connectDB");
// const userRoutes = require("../routes/user");
// const taskRoutes = require("../routes/task");
// const cors = require("cors");

// dotenv.config();
// mongooseDB();

// const app = express();

// app.use(
//   cors({
//     origin:
//       "https://task-management-frontend-git-main-faisal-akrams-projects.vercel.app",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// app.use(express.json());
// app.use("/api/auth", userRoutes);
// app.use("/api/task", taskRoutes);

// module.exports = app;





const express = require("express");
const dotenv = require("dotenv");
const mongooseDB = require("../config/connectDB");
const userRoutes = require("../routes/user");
const taskRoutes = require("../routes/task");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://task-management-frontend-git-main-faisal-akrams-projects.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/task", taskRoutes);

module.exports = app;
