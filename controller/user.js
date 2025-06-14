// const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(404).json({
//         msg: "all fileds is required",
//       });
//     }

//     const isExist = await userModel.findOne({ email });

//     if (isExist) {
//       return res.json({
//         msg: `user is already exist in this email ${email} redirect Login-Page`,
//       });
//     }

//     const hashPassword = await bcrypt.hash(password, 10);

//     await userModel.create({
//       name,
//       email,
//       password: hashPassword,
//     });

//     res.status(200).json({
//       msg: "user register successfully redirect Login-Page",
//     });
//   } catch (error) {
//     console.log(error, "error");
//     res.status(404).json({
//       msg: "error ",
//     });
//   }
// };







const userModel = require("../models/userModel"); // adjust as needed
const mongooseDB = require("../config/connectDB");   // adjust as needed

const register = async (req, res) => {
  try {
    // Initialize DB connection
    await mongooseDB();

    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check existing user with timeout
    const isExist = await Promise.race([
      userModel.findOne({ email }).select("email").lean().exec(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("DB query timeout")), 3000)
      )
    ]);

    if (isExist) {
      return res.status(409).json({
        msg: `User already exists with email ${email}. Please log in.`,
      });
    }

    // Password hashing with timeout
    const hashPassword = await Promise.race([
      bcrypt.hash(password, 10),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Hashing timeout")), 2000)
      )
    ]);

    // User creation with timeout
    await Promise.race([
      userModel.create({ name, email, password: hashPassword }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("User creation timeout")), 3000)
      )
    ]);

    return res.status(201).json({ 
      msg: "User registered successfully. Please log in." 
    });

  } catch (error) {
    console.error("Register Error:", error.message);
    const status = error.message.includes("timeout") ? 504 : 500;
    return res.status(status).json({ 
      msg: error.message.includes("timeout") 
        ? "Request timeout" 
        : "Server error" 
    });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existEmail = await userModel.findOne({ email });

    if (!existEmail) {
      return res.status(404).json({
        msg: "user is not founded",
      });
    }

    const comparePass = await bcrypt.compare(password, existEmail.password);

    if (!comparePass) {
      return res.status(404).json({
        msg: "invalid cridentials",
      });
    }

    const token = jwt.sign({ id: existEmail._id }, process.env.SECRET_KEY, {
      expiresIn: "12hr",
    });

    res.status(200).json({
      msg: "user is loged in successfully",
      token: token,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(404).json({
      msg: "invalid cridentials",
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        msg: "user is not founded",
      });
    }

    res.status(200).json({
      msg: "this is your profile",
      profile: user,
    });
  } catch (error) {
    console.log(error, "error");
  }
};

const editProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        msg: "user is not founded",
      });
    }

    const updateProfile = await userModel.findByIdAndUpdate(id, update, {
      new: true,
    });

    res.status(200).json({
      msg: "update profile successfully🎊",

      updated: updateProfile,
    });
  } catch (error) {
    console.log(error, "error");
  }
};

module.exports = { register, login, getProfile, editProfile };
