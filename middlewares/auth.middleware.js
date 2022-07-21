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

module.exports.requireAuth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(201).json({ msg: "error" });

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
    if (err) {
      res.status(201).json({ msg: "error" });
    } else {
      res.status(200).json({ msg: "success", userId: decodedToken.id });
      next();
    }
  });
};
