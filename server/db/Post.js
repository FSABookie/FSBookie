const db = require('./db');
const { Sequelize } = db;

const Post = db.define('post', {
    userId: {
        type: Sequelize.INTEGER,
    },
    title: {
        type: Sequelize.TEXT,
        notNull: true
    },
    body: {
        type: Sequelize.TEXT
    },
    likes: {
        type: Sequelize.INTEGER
    }
});

module.exports = Post;