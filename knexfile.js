require("dotenv").config();

module.exports = {
  client: "mysql2",
  connection: {
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    charset: "utf8",
  },
};