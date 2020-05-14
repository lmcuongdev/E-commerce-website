const express = require("express");
const signupRoute = express.Router();

signupRoute.get("/", (req, res) => {
  res.render("signup", { title: "Sign up", style: "signupstyle.css" });
});

signupRoute.post("/", (req, res) => {
  console.log("got the post request");
});
module.exports = signupRoute;
