const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Tangina"));

let PORT = process.env.PORT || 5000;

app.use("/api/users", require("./routes/api/users"));
app.use("/api/items", require("./routes/api/items"));
app.use("/api/cartitems", require("./routes/api/cartitems"));
app.use("/api/transactions", require("./routes/api/transactions"));

app.listen(PORT, () => console.log(`Listening to http://localhost:${PORT}`));
