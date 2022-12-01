const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '.env') });

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