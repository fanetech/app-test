const itemModel = require("../models/item.model");
const idemModel = require("../models/item.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.addIdem = async (req, res) => {
  //get request data
  const { title, description, picture, posterId } = req.body;

  //   create idem object and add to db
  try {
    const idem = await idemModel.create({
      posterId,
      title,
      description,
      picture,
    });
    res.status(200).json({ idem });
  } catch (err) {
    res.status(200).send({ err });
  }
};

//function get all idem to db
module.exports.getItemAll = async (req, res) => {
  try {
    const item = await itemModel.find().sort({ createdAt: -1 });
    res.status(200).json(item);
  } catch (err) {
    res.status(201).json(err);
  }
};

//find one idem in db
module.exports.getItem = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id unknown");
  idemModel.findById(req.params.id, (err, docs) => {
    if (!err) res.status(200).json(docs);
    else console.log("ID no find", err);
  });
};

//update user info
exports.updateItem = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id unknown");
  await idemModel
    .findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          picture: req.body.picture,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    )
    .then((docs) => res.status(200).json(docs))
    .catch((error) => res.status(400).json({ message: error }));
};

//delete item
exports.deleteItem = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id unknown");

  itemModel
    .deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "successfully deleted !" }))
    .catch((error) => res.status(400).json({ error }));
};
