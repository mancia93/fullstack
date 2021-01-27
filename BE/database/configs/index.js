require("dotenv").config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_DIALECT } = process.env;
const Sequelize = require("sequelize");

//create connector
const connector = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
});

//authenticate to the db
const authenticateToDB = async connector => {
  try {
    await connector.authenticate();
    console.log(`Connected to DB`);
  } catch (err) {
    console.log(`Failed to connect to the DB: ${err}`);
  }
};

authenticateToDB(connector);

//create the db object => add sequelize, connector, models
const db = {};
db.Sequelize = Sequelize;
db.connector = connector;
db.user = require("../models/user.model")(Sequelize, connector);

//export the db
module.exports = db;
