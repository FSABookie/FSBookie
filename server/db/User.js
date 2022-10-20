const {  } = require('../db');
const db = require('./db');
const { Sequelize } = db;
//jwt auth imported here
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = db.define('user', {
	email: {
		type: Sequelize.STRING,
		isEmail: true,
		isUnique: true,
	},
	password: {
		type: Sequelize.STRING,
	},
	firstName: {
		type: Sequelize.STRING,
	},
	lastName: {
		type: Sequelize.STRING,
	},
	username: {
		type: Sequelize.STRING,
		isUnique: true,
	},
	isAdmin: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	balance: {
		type: Sequelize.DOUBLE,
		defaultValue: 10000,
	}
});

//create authentication
User.prototype.generateToken = async function () {
	try {
		const token = jwt.sign({ id: this.id }, process.env.JWT);
		console.log(token);
		return token;
	} catch (error) {
		console.error(error);
	}
};
User.byToken = async (token) => {
	try {
		let payload = jwt.verify(token, process.env.JWT);
		if (payload) {
			console.log('payload', payload);
			const user = await User.findOne({
				where: {
					id: payload.id
				}
				});
			return user;
		}
		const error = Error('Bad Credentials');
		error.status = 401;
		throw error;
	} catch (err) {
		const error = Error(err);
		error.status = 401;
		throw error;
	}
};

User.authenticate = async ({ email, password }) => {
	const user = await User.findOne({ where: { email } });
	console.log('HERE', password, user.password)
	const isPasswordValid = await bcrypt.compare(
		password,
		user.password
	);
	if (isPasswordValid) {
		return user;
	} else {
		console.log('password invalid');
	}

	const error = Error('Bad Credentials');
	error.status = 401;
	throw error;
};

User.beforeCreate(async (user) => {
	const hashedPassword = await bcrypt.hash(user.password, 5);
	user.password = hashedPassword;
});

User.beforeUpdate(async (user) => {
	if (user.changed('password')) {
	user.password = await bcrypt.hash(user.password, 5);
	}
});


module.exports = User;
