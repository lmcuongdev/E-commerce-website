const express = require("express");
const db = require("../../mysql");
const loginRouter = express.Router();

loginRouter.post("/", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  db.query(
    `select * from users where username='${username}' and password='${password}'`,
    (err, rows) => {
      if (err) console.log(err);
      else {
        // if username and password is correct
        if (rows.length) {
          req.session.userId = rows[0].id;
          req.session.user = rows[0];
          console.log(rows[0].id);
          console.log("Logged in");
          res.status(200).json({ headers: req.headers, session: req.session });
        } else {
          // FIXME: this one is not done
          res.status(200).json({ headers: req.headers });
        }
      }
    }
  );
});

module.exports = loginRouter;
