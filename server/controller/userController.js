const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports.register = async (req, res) => {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: encryptedPassword,
    });
    return res.status(200).json({
      message: "Successfull Registerd the user",
      status: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in registering the user",
      status: false,
      error: error,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        status: false,
      });
    }
    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (checkPassword) {
      const token = jwt.sign(
        {
          email: user.email,
          name: user.name,
          id: user._id,
        },
        process.env.JWT_SECRET
      );
      return res.status(200).json({
        message: "Successfully logged in",
        status: true,
        data: token,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message:
        "Error in logging in the user. Try again after entering correct credentials",
      status: false,
      error: error,
    });
  }
};

module.exports.getUsername = async (req, res) => {
  return res.status(400).json({
    username: req.user.username,
    isLoggedIn: true,
  });
};
