const Sequelize = require('sequelize');

const config = {};

if (process.env.QUIET) {
	config.logging = false;
}

const db = new Sequelize(
	process.env.DATABASE_URL || 'postgres://localhost:3000/bookie',
	{
		dialect: 'postgres',
		dialectOptions: {
			ssl: process.env.DATABASE_URL
				? {
						require: true,
						rejectUnauthorized: false,
				  }
				: false,
		},
		logging: false,
	}
);

module.exports = db;
