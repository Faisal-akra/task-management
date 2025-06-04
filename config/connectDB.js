const mongoose = require("mongoose");


const mongooseDB = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoose is connected successfully");
  } catch (error) {
    console.log(error, 'erroe');
  }
}

module.exports = mongooseDB;