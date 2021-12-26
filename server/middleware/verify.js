const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  const token = req.header["x-access-token"]?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
      if (err) {
        res.status(400).json({
          message: "Failed To Authenticate",
          status: false,
          isLoggedIn: false,
        });
        req.user = {};
        req.user.id = decoded.id;
        req.user.username = decoded.username;
        next();
      }
    });
  } else {
    res.status(400).json({
      message: "Incorrect Token Given",
      status: false,
      isLoggedIn: false,
    });
  }
}

module.exports = { verifyJWT };
