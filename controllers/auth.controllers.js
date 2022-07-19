//import
const userModel = require("../models/user.model");

module.exports.signUp = async (req, res) => {
  //get request data
  const { pseudo, email, password } = req.body;

  //   create user object and add to db
  try {
    const user = await userModel.create({ pseudo, email, password });
    res.status(200).json({ user: user._id });
  } catch (err) {
    res.status(200).send({ err });
  }
};
