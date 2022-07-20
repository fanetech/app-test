const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const userRoutes = require("./routes/user.routes");
const itemRoutes = require("./routes/item.routes");
const authMiddleware = require("./middlewares/auth.middleware");

require("./config/db");

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//mildelware
//jwt check all get request if jwt token is exist
app.get("*", authMiddleware.checkUser);

//routes
app.use("/api/user", userRoutes);
app.use("/api/item", itemRoutes);

//server
app.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});
