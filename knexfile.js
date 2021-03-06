const Dotenv = require('dotenv');
const path = require('path');
Dotenv.config({ path: path.resolve('.env')});

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/lib/db/migrations'
    },
  },
};
