const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const userRoutes = require("./routes/user.routes");
const itemRoutes = require("./routes/item.routes");

require("./config/db");

const app = express();
const PORT = process.env.PORT ?? 5000;

//mildelware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use("/api/user", userRoutes);
app.use("/api/item", itemRoutes);

//server
app.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});
