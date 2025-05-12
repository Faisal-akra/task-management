const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(404).json({
        msg: "all fileds is required",
      });
    }

    const isExist = await userModel.findOne({email});

    if (isExist) {
      return res.json({
        msg: `user is already exist in this email ${email}`,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    userModel.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(200).json({
      msg: "user register successfully",
    });
  } catch (error) {
    console.log(error, "error");
    res.status(404).json({
      msg: "error ",
    });
  }
};


const login = async(req, res) => {
  try {
    const {email, password} = req.body;

    const existEmail = await userModel.findOne({email});

    if(!existEmail) {
     return res.status(404).json({
        msg: "user is not founded"
      })
    }

    const comparePass = await bcrypt.compare(password, existEmail.password);

    if(!comparePass) {
    return  res.status(404).json({
        msg: "invalid cridentials"
      })
    }

    const token = jwt.sign({id: existEmail._id}, process.env.SECRET_KEY, {expiresIn: "1hr"});
    
    res.status(200).json({
      msg: "user is loged in successfully",
      token: token
    })
  } catch (error) {
    console.log(error, "error");
  }
}

module.exports = {register, login};
