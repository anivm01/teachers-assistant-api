require('dotenv').config();

module.exports = {
  client: "mysql",
  connection: {
    host: process.env.DB_HOST || MYSQLHOST,
    database: process.env.DB_DATABASE || MYSQLDATABASE,
    user: process.env.DB_USERNAME || MYSQLUSER,
    password: process.env.DB_PASSWORD || MYSQLPASSWORD,
    port: process.env.DB_PORT || MYSQLPORT,
    url: process.env.DB_URL || MYSQL_URL,
    charset: "utf8"
  }
};