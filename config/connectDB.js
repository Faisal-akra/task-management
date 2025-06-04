// const mongoose = require("mongoose");

// const mongooseDB = async() => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("mongoose is connected successfully");
//   } catch (error) {
//     console.log(error, 'erroe');
//   }
// }

// module.exports = mongooseDB;

const mongoose = require("mongoose");

let isConnected = false;

const mongooseDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

module.exports = mongooseDB;
