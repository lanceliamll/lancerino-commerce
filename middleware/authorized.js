const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  // Get the Token from the REQUEST HEADER
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "Authorization Denied! " });
  }

  try {
    //Decode the token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //Set the REQUEST HEADER to the Decoded User
    // User will have the verified token/payload
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authorization Denied! Invalid Token " });
  }
};
