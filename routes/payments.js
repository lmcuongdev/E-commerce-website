const express = require("express");
const { isLoggedIn } = require("../config/auth");
const paymentRouter = express.Router();
const db = require("../mysql");

paymentRouter.get("/", isLoggedIn, (req, res) => {
  res.render("payments", { title: "Checkout", style: "payments.css" });
});

paymentRouter.post("/", (req, res) => {
  const order = {
    orderDate: new Date(),
    status: "In process",
    userId: req.user.id,
  };
  // let orderId;
  db.query("INSERT INTO orders SET ?", order, async (err, res) => {
    if (err) return console.log(err);
    else {
      const orderId = res.insertId;
      let totalPaid = 0;
      await req.body.cart.forEach(async (one, i) => {
        totalPaid += one.price * one.quantity;
        const orderDetail = {
          orderId,
          productId: one.id,
          quantity: one.quantity,
          orderLineNumber: i + 1,
        };
        await db.query("INSERT INTO orderdetails SET ?", orderDetail);
        // update quantity
        await db.query(
          "SELECT quantityInstock FROM products WHERE (`productId` = ?)",
          [one.id],
          async (err, rows, field) => {
            if (err) console.log(err);
            else {
              const newQuantity = rows[0]["quantityInstock"] - one.quantity;
              await db.query(
                "UPDATE `products` SET `quantityInstock` = ? WHERE (`productId` = ?);",
                [newQuantity, one.id]
              );
            }
          }
        );
      });
      await db.query("INSERT INTO payments SET ?", {
        userId: req.user.id,
        amount: totalPaid,
        date: new Date(),
      });
    }
  });
  // console.log(req.user);
  // console.log(req.body);
});

module.exports = paymentRouter;
