const express = require("express");
const paymentRouter = express.Router();

paymentRouter.get("/", (req, res) => {
  res.render("payments", { title: "Checkout", style: "payments.css" });
});

module.exports = paymentRouter;
