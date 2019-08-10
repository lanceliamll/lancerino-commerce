const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");
const authorized = require("../../middleware/authorized");

// # Functionality: Get Item
// # Route:         localhost:5000/api/items/:id
// # isPrivate?:    True
router.get("/:id", authorized, async (req, res) => {
  const { id } = req.params;

  try {
    let item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }

    res.json({ item });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// # Functionality: Get Items
// # Route:         localhost:5000/api/items
// # isPrivate?:    True
router.get("/", authorized, async (req, res) => {
  try {
    let items = await Item.find();

    if (items.length === 0) {
      return res.status(404).json({ message: "No items found" });
    }

    res.json({ items });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// # Functionality: Create Item
// # Route:         localhost:5000/api/items/createItem
// # isPrivate?:    True

router.post("/createItem", authorized, async (req, res) => {
  const { id } = req.user;
  const { productName, quantity, productDesc, itemTag, price } = req.body;

  try {
    let item = await Item.findOne({ productName });

    if (item) {
      return res.status(400).json({ message: "Item Already exists" });
    }

    item = await new Item({
      productName,
      productDesc,
      quantity,
      itemTag,
      price,
      user: id
    });

    await item.save();
    res.json({ item });
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
});

// # Functionality: Edit Item
// # Route:         localhost:5000/api/items/editItem/:id
// # isPrivate?:    True
router.put("/:id", authorized, async (req, res) => {
  const { id } = req.params;
  const { productName, quantity, productDesc, itemTag, price } = req.body;

  try {
    let item = Item.findById(id);

    if (!item) {
      return res.status(500).json({ message: "Item not found" });
    }

    await item.updateOne({
      productName,
      quantity,
      productDesc,
      itemTag,
      price
    });

    res.json({ message: "Item Updated" });
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
});

// # Functionality: Delete Item
// # Route:         localhost:5000/api/items/:id
// # isPrivate?:    True
router.delete("/:id", authorized, async (req, res) => {
  const { id } = req.params;

  try {
    let item = await Item.findByIdAndDelete(id);

    if (!item) {
      return res.status(500).json({ message: "Item not found" });
    }

    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
});

module.exports = router;

// # Functionality:
// # Route:
// # isPrivate?:
