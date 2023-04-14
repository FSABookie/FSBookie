const Sequelize = require("sequelize");
const pg = require("pg");

const config = {};

if (process.env.QUIET) {
  config.logging = false;
}

const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://danny:123@localhost:5432/bookie",
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: process.env.DATABASE_URL
        ? {
            require: true,
            rejectUnauthorized: false,
          }
        : false,
    },
    logging: false,
  }
);

module.exports = db;
