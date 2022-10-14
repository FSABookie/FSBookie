const db = require('./db');
const { Sequelize } = db;
const User = require('./User');
const Bet = require('./Bet');
const Order = require('./Order');
const { DataTypes } = require('sequelize');
const Post = require('./Post');
const Comment = require('./Comment');

//what are the models for an ecommerce website?
//users products orders tag
//line item is the product and the amount of said product

User.hasMany(Order);
Order.hasMany(Bet);
Order.belongsTo(User);
Bet.belongsTo(Order);
User.hasMany(Post);
Post.belongsTo(User);
Post.hasMany(Comment), {onDelete: "CASCADE"};
//comment has many comments as replies
//one to many
Comment.hasMany(Comment, {foreignKey: "id"});
//comment belongs to comment
Comment.belongsTo(Comment, {as: "reply", foreignKey: "id"});
//replies => main commentid?
//each comment will have an array of replies**
Comment.belongsTo(Post);

module.exports = {
    db,
    User,
    Order,
    Bet,
    Post,
    Comment,
};
