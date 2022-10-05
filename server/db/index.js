const db = require('./db');
const { Sequelize } = db;
const User = require('./User');
const Bet = require('./Bet');
const Order = require('./Order');
const { DataTypes } = require('sequelize');
//what are the models for an ecommerce website?
//users products orders tag

//line item is the product and the amount of said product

User.hasMany(Order);
Order.hasMany(Bet);
Order.belongsTo(User);
Bet.belongsTo(Order);



module.exports = {
    db,
    User,
    Order,
    Bet,
};
