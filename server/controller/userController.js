const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// module.exports = function verifyJWT(req, res, next) {
//   const token = req.header["x-access-token"]?.split(" ")[1];

//   if (token) {
//     jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
//       if (err) {
//         res.status(400).json({
//           message: "Failed To Authenticate",
//           status: false,
//           isLoggedIn: false,
//         });
//         req.user = {};
//         req.user.id = decoded.id;
//         req.user.username = decoded.username;
//         next();
//       }
//     });
//   } else {
//     res.status(400).json({
//       message: "Incorrect Token Given",
//       status: false,
//       isLoggedIn: false,
//     });
//   }
// };

module.exports.register = async (req, res) => {
  const user = req.body;

  const takenUsername = await User.findOne({ username: user.username });
  const takenEmail = await User.findOne({ email: user.email });

  if (takenUsername || takenEmail) {
    res.status(400).json({
      message: "This Username or Email is already been taken",
      status: false,
    });
  } else {
    user.password = await bcrypt.hash(req.body.password, 10);

    const dbUser = new User({
      username: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.password,
    });

    dbUser.save();
    res.status(200).json({
      message: "User successfully registerd",
      status: true,
    });
  }
};

module.exports.login = async (req, res) => {
  const userLoggingIn = req.body;

  User.findOne({ username: userLoggingIn.username }).then((dbUser) => {
    if (!dbUser) {
      return res.status(400).json({
        message: "Invalid Username or Password",
        status: false,
      });
    }
    bcrypt
      .compare(userLoggingIn.password, dbUser.password)
      .then((isCorrect) => {
        if (isCorrect) {
          const payload = {
            id: dbUser._id,
            username: dbUser.username,
          };
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 86400 },
            (err, token) => {
              if (err) {
                return res.status(200).json({
                  message: "Successfull logged in",
                  status: true,
                  token: "Bearer" + token,
                });
              }
            }
          );
        } else {
          return res.status(400).json({
            message: "Invalid Username or Password",
            status: true,
          });
        }
      });
  });
};

module.exports.getUsername = async (req, res) => {
  return res.status(400).json({
    username: req.user.username,
    isLoggedIn: true,
  });
};
