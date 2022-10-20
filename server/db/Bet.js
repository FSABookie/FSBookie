const db = require("./db");
const { Sequelize } = db;

const Bet = db.define("bet", {
  orderId: {
    type: Sequelize.INTEGER,
  },
  betId: {
    type: Sequelize.STRING,
  },
  homeTeam: {
    type: Sequelize.STRING,
  },
  awayTeam: {
    type: Sequelize.STRING,
  },
  teamToWin: {
    type: Sequelize.STRING,
  },
  odds: {
    type: Sequelize.STRING,
  },
  oddType: {
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
  betType: {
    type: Sequelize.ENUM("ML", "spread", "total"),
    notNull: true,
  },
  status: {
    type: Sequelize.ENUM("pending", "active", "completed"),
    defaultValue: "pending",
  },
  result: {
    type: Sequelize.ENUM("won", "lost", "pending"),
    defaultValue: "pending",
  },
  calc: {
    type: Sequelize.ENUM("plus", "minus"),
    notNull: true,
  },
  spread: {
    type: Sequelize.DOUBLE,
  },
  homeTeamLogo: {
    type: Sequelize.STRING,
  },
  awayTeamLogo: {
    type: Sequelize.STRING,
  },
});

module.exports = Bet;
