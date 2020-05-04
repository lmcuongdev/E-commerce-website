const mysql = require("mysql");
// connect to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "secret",
  database: "e-commerce",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting to database: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
