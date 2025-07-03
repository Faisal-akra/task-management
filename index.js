const express = require("express");
const dotenv = require("dotenv");
const mongooseDB = require("./config/connectDB");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");
const cors = require('cors');
dotenv.config();
mongooseDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/task", taskRoutes);

const port = "http://localhost:7000";

app.listen(7000, () => {
  console.log(`server is rummimg on port ${port}`);
});
