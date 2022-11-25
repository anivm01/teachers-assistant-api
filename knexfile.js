require('dotenv').config();

module.exports = {
  client: "mysql2",
  connection: {
    host: process.env.MYSQLHOST,
    database: process.env.MYSQLDATABASE,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    charset: "utf8"
  }
};