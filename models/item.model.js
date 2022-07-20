const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//play function if login for decode password

module.exports = mongoose.model("idem", itemSchema);
