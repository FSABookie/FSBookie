const Sequelize = require("sequelize");
const pg = require("pg");

const config = {};

if (process.env.QUIET) {
    config.logging = false;
}

// const db = new Sequelize(
// 	process.env.DATABASE_URL || 'postgres://localhost:5432/bookie',
// 	{
// 		dialect: 'postgres',
// 		dialectOptions: {
// 			ssl: process.env.DATABASE_URL
// 				? {
// 						require: true,
// 						rejectUnauthorized: false,
// 				  }
// 				: false,
// 		},
// 		logging: false,
// 	}
// );

const db = new Sequelize({
    database: "postgres",
    username: "postgres",
    password: "daehanmingook",
    host: "db.amamrmcsilwimyrszvlr.supabase.co",
    port: 5432,
    dialect: "postgres",
    dialectModule: pg,
    dialectOptions: {
        ssl: {
            require: true, // This will help, but cause error
            rejectUnauthorized: false, // This will fix error
        },
    },
});

module.exports = db;
