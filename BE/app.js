require("dotenv").config();

//dependencies
const express = require("express");

//require db
const db = require("./database/configs");

//require auth

//app config
const app = express();

//route for register, login and profile

//db connection
db.connector
  .sync()
  .then(() => console.log(`Correctly sync to DB`))
  .catch(err => console.error(`DB sync failed: ${err}`));

//app global middlewares
app.use((req, res, next) => {
  let err = new Error("Not found");
  err.status = 404;
  next(err);
});

//exporting app
module.exports = app;
