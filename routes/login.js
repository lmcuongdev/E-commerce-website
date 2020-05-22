const express = require("express");
const db = require("../mysql");
const passport = require("passport");
const loginRouter = express.Router();
const { isLoggedOut } = require("../config/auth");

loginRouter.post("/", isLoggedOut, (req, res, next) => {
  passport.authenticate("local.login", (err, user, info) => {
    console.log(info);
    if (err) {
      return res.status(500).json(err);
    }
    if (!user) {
      return res.status(401).json(info.message);
    }
    // login
    req.login(user, (err) => {
      if (err) return next(err);
      return res.json(user);
    });
  })(req, res, next);
});

module.exports = loginRouter;
