const express = require("express");
const dotenv = require('dotenv');
const mongooseDB = require("./config/connectDB");
const app = express();
const port = 7000;

dotenv.config();

mongooseDB();


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
