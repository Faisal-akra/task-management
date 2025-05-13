const express = require("express");
const {register, login, getProfile, editProfile} = require("../controller/user");
const middleWare = require("../middleware/verifyUser");

const userRoutes = express.Router();


userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.get('/viewProfile/:id', middleWare, getProfile);
userRoutes.post('/updateProfile/:id', middleWare, editProfile);




module.exports = userRoutes;