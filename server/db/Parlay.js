const db = require("./db");
const { Sequelize } = db;

const Parlay = db.define("parlay", {
  userId: {
    type: Sequelize.INTEGER,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
  },
  wager: {
    type: Sequelize.DOUBLE,
  },
  toWin: {
    type: Sequelize.DOUBLE,
  },
  status: {
    type: Sequelize.ENUM("pending", "active", "completed"),
    defaultValue: "pending",
  },
  result: {
    type: Sequelize.ENUM("won", "lost", "pending"),
    defaultValue: "pending",
  },
  betType: {
    type: Sequelize.STRING,
    defaultValue: "parlay",
  },
});

module.exports = Parlay;
