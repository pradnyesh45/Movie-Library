const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      res.status(400).json({
        message: "Authorization denied. Token not found",
        status: false,
      });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
      res.status(400).json({
        message: "Authorization denied. Token Verification failed",
        status: false,
      });
    }
    req.user = verified.indexOf;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Error in Auth",
      status: false,
      error: error,
    });
  }
};

module.exports = { auth };
