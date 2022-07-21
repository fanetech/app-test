const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const userRoutes = require("./routes/user.routes");
const itemRoutes = require("./routes/item.routes");
const authMiddleware = require("./middlewares/auth.middleware");
const cors = require("cors");

require("./config/db");

const app = express();
const PORT = process.env.PORT ?? 5000;

//cors
const corsOptions = {
  url: process.env.CLIENT_URL,
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//mildelware
//jwt check all get request if jwt token is exist
app.get("/api/jwtid", authMiddleware.requireAuth);
app.get("*", authMiddleware.checkUser);

//routes
app.use("/api/user", userRoutes);
app.use("/api/item", itemRoutes);

//server
app.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});
