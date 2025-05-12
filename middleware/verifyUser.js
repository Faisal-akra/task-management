const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const middleWare = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.json({
        msg: "token is required",
      });
    }

    const {id} = jwt.verify(token, process.env.SECRET_KEY);

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        msg: "user is not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error, "error");
    res.json({
      msg: "error",
    });
  }
};

module.exports = middleWare;
