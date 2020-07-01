const express = require("express");
const { check, validationResult } = require("express-validator");
const db = require("../mysql");
const passport = require("passport");
const { isLoggedOut } = require("../config/auth");

const signupRoute = express.Router();

const params = {
  title: "Sign up",
  style: "signupstyle.css",
};

signupRoute.get("/", isLoggedOut, (req, res) => {
  res.render("signup", { ...params, messages: req.flash("signupMessage") });
});

signupRoute.post(
  "/",
  isLoggedOut,
  passport.authenticate("local.signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);
module.exports = signupRoute;
