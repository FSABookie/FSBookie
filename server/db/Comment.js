const db = require('./db');
const { Sequelize } = db;

const Comment = db.define('comment', {
    postId: {
        type: Sequelize.INTEGER
    },
    commentId: {
        type: Sequelize.INTEGER,
    },
    isParent: {
        type: Sequelize.BOOLEAN,
    },
    userId: {
        type: Sequelize.INTEGER
    },
    body: {
        type: Sequelize.TEXT
    },
    likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    username: {
		type: Sequelize.STRING,
	},
});

module.exports = Comment;