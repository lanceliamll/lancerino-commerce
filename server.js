const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const app = express();

//Connect To MongoDB
connectDB();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// API Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/items", require("./routes/api/items"));
app.use("/api/cartitems", require("./routes/api/cartitems"));
app.use("/api/transactions", require("./routes/api/transactions"));

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening to http://localhost:${PORT}`));
