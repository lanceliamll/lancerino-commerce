const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

router.get("/", (req, res) => res.send("Users Route"));

// # Functionality: Create User/Register
// # Route:         localhost:5000/api/users/register
// # isPrivate?:    false
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    let userCollection = await User.find();

    if (user) {
      return res
        .status(500)
        .json({ message: "This email has already registered." });
    } else {
      //Hashed the password string using bcryptjs
      const passwordHashed = await bcrypt.hash(password, 12);

      //If no user make admin
      if (userCollection.length === 0) {
        user = await new User({
          email,
          password: passwordHashed,
          isAdmin: true
        });
      } else {
        user = await new User({
          email,
          password: passwordHashed
        });
      }
      await user.save();

      const payload = {
        user: {
          id: user.id,
          isAdmin: user.isAdmin
        }
      };

      //Sign the JWT
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "1hr" },
        (err, token) => {
          if (err) throw err();
          res.json({ token });
        }
      );
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// # Functionality: Login
// # Route:         localhost:5000/api/users/login
// # isPrivate?:    false
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    //Is user exists?
    if (!user) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    //Compare if the password is equals to the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin
      }
    };

    //Sign JWT
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: "1hr" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

// # Functionality:
// # Route:
// # isPrivate?:
