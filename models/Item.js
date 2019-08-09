const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  productName: {
    type: String
  },
  productDesc: {
    type: String
  },
  quantity: {
    type: Number,
    default: 0
  },
  itemTag: {
    type: String
  },
  price: {
    type: Number,
    default: 0
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model("items", ItemSchema);
