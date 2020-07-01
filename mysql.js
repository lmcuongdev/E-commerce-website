const mysql = require("mysql");
const options = require("./config/database");
// connect to database
const connection = mysql.createConnection(options);

connection.connect(function (err) {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Database connected as id " + connection.threadId);
});

module.exports = connection;
