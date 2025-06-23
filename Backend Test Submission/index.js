const express = require("express");
const app = express();
require("dotenv").config();
// connect with mongoDB Atlas
const { mongoConnect } = require("./init.js");
mongoConnect(process.env.MONGODB_URI)
  .then(() => console.log("Connected with ATLAS"))
  .catch((err) => console.log(err));

app.listen(8080, () => {
  console.log("Listening on 8080");
});
