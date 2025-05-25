const express = require("express");
const dotenv = require("dotenv");
const mongooseDB = require("./config/connectDB");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");
const app = express();
const port = 7000;
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5174", 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
dotenv.config();

mongooseDB();
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/task", taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
