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





// const express = require("express");
// const dotenv = require("dotenv");
// const mongooseDB = require("../config/connectDB");
// const userRoutes = require("../routes/user");
// const taskRoutes = require("../routes/task");
// const cors = require("cors");

// dotenv.config();

// const app = express();

// app.use(
//   cors({
//     origin: "https://task-management-frontend-git-main-faisal-akrams-projects.vercel.app",
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

// Enhanced CORS
app.use(cors({
  origin: "https://task-management-frontend-git-main-faisal-akrams-projects.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Global timeout middleware (10 seconds)
app.use((req, res, next) => {
  res.setTimeout(10000, () => {
    if (!res.headersSent) {
      res.status(504).json({ error: "Request timeout" });
    }
  });
  next();
});

app.use(express.json({ limit: "10kb" }));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/task", taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(500).json({ error: "Internal server error" });
});

module.exports = app;