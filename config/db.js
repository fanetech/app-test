const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_PASS}@cluster0.nok7p.mongodb.net/app-test`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to mongoDB", err);
  });
