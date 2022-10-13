const { db, User, Order, Bet, Post, Comment } = require('./server/db');
const { users, orders, bets, posts, comments } = require('./server/seedData');

const seed = async () => {
	try {
		await Promise.all(posts.map((post) => {
				Post.create(post);
			})
		);
		await Promise.all(comments.map((comment) => {
			Comment.create(comment);
		})
		);
    } catch (e) {
        console.log(e);
    }
}

seed()
	.catch((err) => {
		console.error('Problem seeding:', err);
		db.close();
	});