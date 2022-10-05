const db = require('./db');
const { Sequelize } = db;

const Bet = db.define('bet', {
    orderId: {
        type: Sequelize.INTEGER,
    },
    eventId: {
        type: Sequelize.STRING
    },
    event: {
        type: Sequelize.STRING,
    },
    gameLine: {
        type: Sequelize.STRING,
    },
    isActive: {
        type: Sequelize.BOOLEAN,
    },
    wager: {
        type: Sequelize.DOUBLE,
    }
})

module.exports = Bet;
