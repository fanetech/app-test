//import
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/error.utils");

//jwt create token
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  //get request data
  const { pseudo, email, password } = req.body;

  //   create user object and add to db
  try {
    const user = await userModel.create({ pseudo, email, password });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(201).send({ errors });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ userId: user._id, token });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(201).send({ errors });
  }
};
