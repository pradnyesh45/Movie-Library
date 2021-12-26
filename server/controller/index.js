const User = require("../models/user");

// Home Page Hello
module.exports.home = (req, res) => {
  res.send("Hello Visitor! Pradnyesh Aglawe Welcomes you to this page!!!");
};

module.exports.authenticate = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(200).json({
        message: "Authenticated",
        status: true,
        data: user,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Invalid Token",
      status: false,
      error: error,
    });
  }
};
