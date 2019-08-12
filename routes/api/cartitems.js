const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");
const User = require("../../models/User");
const authorized = require("../../middleware/authorized");
const CartItem = require("../../models/CartItem");

router.get("/", (req, res) => res.send("Nice"));

// # Functionality: Add Items to cart
// # Route:         localhost:5000/api/items
// # isPrivate?:    True
router.post("/additem/:item_id", authorized, async (req, res) => {
  const { id } = req.user;
  const { item_id } = req.params;

  try {
    let item = await Item.findById(item_id);
    let cartItem = await CartItem.findOne({ user: id });

    if (!item) {
      return res.status(404).json({ message: "Item not found!" });
    }

    const newCartItem = { item: item_id };

    // If there is no item/cart, create a new one
    if (!cartItem) {
      const newCart = await new CartItem({
        user: id,
        items: newCartItem
      });

      await newCart.save();
      res.json({ newCart });
    } else {
      //unshift to the array if there is already cart.
      cartItem.items.unshift(newCartItem);
      await cartItem.save();
    }

    res.json({ cartItem });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
