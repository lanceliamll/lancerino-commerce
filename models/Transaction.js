const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  cartItems: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cartitems"
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = Transaction = mongoose.model(
  "transactions",
  TransactionSchema
);
