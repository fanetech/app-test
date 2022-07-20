const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.status(201).json({ msg: "invalidTokenErr" });
      } else {
        next();
      }
    });
  } else {
    return res.status(201).json({ msg: "noToken" });
  }
};
