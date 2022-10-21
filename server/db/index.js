const db = require("./db");
const { Sequelize } = db;
const User = require("./User");
const Bet = require("./Bet");
const Parlay = require("./Parlay");
const { DataTypes } = require("sequelize");
const Post = require("./Post");
const Comment = require("./Comment");

//what are the models for an ecommerce website?
//users products orders tag
//line item is the product and the amount of said product

User.hasMany(Bet);
User.hasMany(Parlay);
Parlay.hasMany(Bet);
Parlay.belongsTo(User);
Bet.belongsTo(Parlay);
Bet.belongsTo(User);
User.hasMany(Post);
Post.belongsTo(User);
Post.hasMany(Comment), { onDelete: "CASCADE" };
//comment has many comments as replies
//one to many
Comment.hasMany(Comment);
//comment belongs to comment
Comment.belongsTo(Comment, { foreignKey: "id" });
//replies => main commentid?
//each comment will have an array of replies**
Comment.belongsTo(Post);

module.exports = {
  db,
  User,
  Parlay,
  Bet,
  Post,
  Comment,
};
