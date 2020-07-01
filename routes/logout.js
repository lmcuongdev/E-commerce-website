const express = require("express");
const logoutroute = express.Router();
const { isLoggedIn } = require("../config/auth");

logoutroute.get("/", isLoggedIn, (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = logoutroute;
