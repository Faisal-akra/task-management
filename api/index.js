// const express = require("express");
// const dotenv = require("dotenv");
// const mongooseDB = require("../config/connectDB.js");
// const userRoutes = require("../routes/user.js");
// const taskRoutes = require("../routes/task.js");
// const app = express();
// const port = 7000;
// const cors = require("cors");

// app.use(
//   cors({
//     origin: "https://task-management-frontend-jade.vercel.app",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// dotenv.config();

// mongooseDB();
// app.use(express.json());
// app.use("/api/auth", userRoutes);
// app.use("/api/task", taskRoutes);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });



const express = require("express");
const dotenv = require("dotenv");
const mongooseDB = require("../config/connectDB");
const userRoutes = require("../routes/user");
const taskRoutes = require("../routes/task");
const cors = require("cors");

dotenv.config();
mongooseDB();

const app = express();

app.use(cors({
  origin: "https://task-management-frontend-jade.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/task", taskRoutes);

module.exports = app;
