const db = require('./db');
const { Sequelize } = db;

const Order = db.define('order', {
    userId: {
        type: Sequelize.INTEGER,
    },
    isParlay: {
        type: Sequelize.BOOLEAN,
    },
    isActive: {
        type: Sequelize.BOOLEAN,
    }
})

module.exports = Order;
