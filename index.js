const express = require("express");
const dotenv = require("dotenv");
const mongooseDB = require("./config/connectDB");
const userRoutes = require("./routes/user");
const app = express();
const port = 7000;

dotenv.config();

mongooseDB();
app.use(express.json());
app.use("/api/auth", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
