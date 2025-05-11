const mongoose = require("mongoose");


const mongooseDB = async() => {
  try {
    await mongoose.connect(process.env.MONGOOSE_DB);
    console.log("mongoose is connected successfully");
  } catch (error) {
    console.log(error, 'erroe');
  }
}

module.exports = mongooseDB;