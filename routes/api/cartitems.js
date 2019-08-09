const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send("Nice"));

module.exports = router;
