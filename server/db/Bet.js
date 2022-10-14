const db = require("./db");
const { Sequelize } = db;

const Bet = db.define("bet", {
  orderId: {
    type: Sequelize.INTEGER,
  },
  betId: {
    type: Sequelize.STRING,
  },
  teams: {
    type: Sequelize.STRING,
  },
  odds: {
    type: Sequelize.STRING,
  },
  gameLine: {
    type: Sequelize.STRING,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  wager: {
    type: Sequelize.DOUBLE,
  },
  toWin: {
    type: Sequelize.DOUBLE,
  },
  time: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.ENUM("pending", "active", "completed"),
    defaultValue: "pending",
  },
});

module.exports = Bet;
