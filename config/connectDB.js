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

// Cache connection globally
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const mongooseDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5-second timeout
      socketTimeoutMS: 30000, // 30-second socket timeout
      maxPoolSize: 10, // Limit connections
    }).then(mongoose => mongoose);
  }

  try {
    cached.conn = await Promise.race([
      cached.promise,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('DB connection timeout')), 5000)
      )
    ]);
    return cached.conn;
  } catch (error) {
    cached.promise = null; // Clear on error to allow retry
    throw error;
  }
};

module.exports = mongooseDB;
