require("dotenv").config();

// app dependencies
const express = require("express");
// require the db
const db = require("./database/configs");
// require the auth folder
require("./auth");

// app config related stuff
const app = express();

// create route for register, login and profile
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const profileRouter = require("./routes/profile");

// set the DB connection
db.connector
  .sync()
  .then(() => console.log("found current DB"))
  .catch(error => console.error(`sync failed: ${error}`));

// app global middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set the routes
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/profile", profileRouter);

// global middleware for errors
app.use((req, res, next) => {
  let err = new Error("Not found");
  err.status = 404;
  next(err);
});

// need to export app
module.exports = app;

