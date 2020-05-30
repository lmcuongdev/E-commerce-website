const express = require("express");
const path = require("path");
const { isLoggedIn } = require("../config/auth");
const accountRouter = express.Router();

accountRouter.get("/", (req, res) => {
  res.redirect("account/profile");
});

accountRouter.post("/", (req, res) => {
  console.log(req.body);
});

accountRouter.get("/profile", (req, res) => {
  if (req.xhr) {
    res.render("partials/profile", { isAjax: true });
  } else {
    res.render("account", {
      title: "My Account",
      style: "profile.css",
      profile: true,
    });
  }
});

accountRouter.get("/password", (req, res) => {
  if (req.xhr) {
    res.render("partials/password", { isAjax: true });
    // res.sendFile(path.join(__dirname, "../views/partials/password.handlebars"));
  } else {
    res.render("account", {
      title: "My Account",
      style: "profile.css",
      password: true,
    });
  }
});
module.exports = accountRouter;
