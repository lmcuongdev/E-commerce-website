const express = require("express");
const { check, validationResult } = require("express-validator");
const db = require("../../mysql");

const signupRoute = express.Router();

const params = { title: "Sign up", style: "signupstyle.css" };

signupRoute.get("/", (req, res) => {
  res.render("signup", params);
});

signupRoute.post(
  "/",
  [
    check("username").isLength({ min: 3 }),
    check("password").isLength({ min: 5 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    // if input is not good (password not strong,...)
    if (!errors.isEmpty()) {
      // FIXME: temp
      res.render("404");
    } else {
      // parse info from POST request's body
      const {
        username,
        password,
        first_name,
        last_name,
        address,
        gender,
        phone,
      } = req.body;
      username = username.trim();
      // query to database
      const sql_getUser = `SELECT * FROM users WHERE username = '${username}'`;
      const sql_insertUser = `INSERT INTO users (\`username\`, \`password\`, \`first_name\`, \`last_name\`, \`phone\`, \`address\`) VALUES ('${username}', '${password}', '${first_name}', '${last_name}', '${phone}', '${address}');`;
      // const sql_insertUser = `INSERT INTO users SET ?`;

      // Check if this username exist in database
      db.query(sql_getUser, (err, rows) => {
        console.log("Checking if username exist...");
        if (err) {
          console.log("[Error] SQL getting user");
        }
        // Query success
        else {
          // if username exist => can't create new user
          if (rows.length) {
            console.log("Username exist. Please try anothere one");
            // FIXME: make redirect here
            res.redirect("/signup");
          }
          // this username has never been used
          // => create new user by inserting new data into database
          else {
            console.log("Good username, creating new user...");
            // isnert into database
            db.query(sql_insertUser, (er, result) => {
              if (er) {
                console.log("[Error] SQL inserting user into database");
                console.log(er);
              } else {
                console.log("Result is:");
                console.log(result);
              }
            });
            console.log("Added new user");
            res.redirect("/");
          }
        }
      });
    }
  }
);
module.exports = signupRoute;
