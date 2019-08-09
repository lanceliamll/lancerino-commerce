const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "items"
      }
    }
  ],
  overallPrice: {
    type: Number,
    default: 0
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = CartItem = mongoose.model("cartitems", CartItemSchema);
