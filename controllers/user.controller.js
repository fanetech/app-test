//import
const userModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

//function get all users to db
module.exports.getAllUsers = async (req, res) => {
  const users = await userModel.find().select("-password");
  res.status(200).json(users);
};

//find one user in db
module.exports.getUserInfo = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id unknown");
  userModel
    .findById(req.params.id, (err, docs) => {
      if (!err) res.status(200).json(docs);
      else console.log("ID no find", err);
    })
    .select("-password");
};

//update user info
exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id unknown");
  await userModel
    .findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    )
    .select("-password")
    .then((docs) => res.status(200).json(docs))
    .catch((error) => res.status(400).json({ message: error }));
};

//delete user
exports.deleteUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id unknown");

  userModel
    .deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "successfully deleted !" }))
    .catch((error) => res.status(400).json({ error }));
};

//add user admin role
exports.addAdmin = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id unknown");

  await userModel
    .findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          role: "admin",
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    )
    .select("-password")
    .then((docs) => res.status(200).json(docs))
    .catch((error) => res.status(400).json({ message: error }));
};
