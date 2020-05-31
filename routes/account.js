const express = require("express");
const db = require("../mysql");
const { promisify } = require("util");
const { isLoggedIn } = require("../config/auth");
const accountRouter = express.Router();

const promiseDB = promisify(db.query.bind(db));

const getStatus = {
  "In process": "Đang giao hàng",
  Shipped: "Đã giao hàng",
  Cancelled: "Đã hủy",
};
accountRouter.use("/", isLoggedIn);

accountRouter.get("/", (req, res) => {
  res.redirect("account/profile");
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

accountRouter.post("/profile", async (req, res) => {
  const updatedInfo = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone,
    address: req.body.address,
  };

  await promiseDB(`UPDATE users SET ? WHERE id=${req.user.id}`, updatedInfo)
    .then((result) => {
      for (const key in updatedInfo) req.user[key] = updatedInfo[key];
      req.flash("messages", {
        type: "success",
        message: "Update successfully",
      });
      res.redirect("/account/profile");
    })
    .catch((err) => {
      console.log(err);
    });
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

accountRouter.post("/password", async (req, res) => {
  const { cur_password, new_password, confirm_new_password } = req.body;
  // if correct password
  if (cur_password === req.user.password) {
    // cofirm new password
    if (new_password === confirm_new_password) {
      // make update into database
      await promiseDB(`UPDATE users SET ? WHERE id=${req.user.id}`, {
        password: new_password,
      })
        .then((result) => {
          console.log(result);
          req.flash("messages", {
            type: "success",
            message: "Update successfully",
          });
          console.log("redirected");
          res.redirect("/account/password");
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    // wrong confirm password => thow error message
    else {
      console.log("Confirm password is wrong");
      req.flash("messages", {
        type: "danger",
        message: "Confirm password is wrong",
      });
    }
  }
  // wrong current password typing => thow error message
  else {
    console.log("Wrong current password");
    req.flash("messages", {
      type: "danger",
      message: "Wrong current password",
    });
  }
  res.redirect("/account/password");
});

accountRouter.get("/history", async (req, res) => {
  // go to database to get history
  await promiseDB(`
SELECT 
    od.orderId,
    p.productName,
    p.price*
    ode.quantity as total,
    od.orderDate,
    od.status
FROM
    orders od
        INNER JOIN
    (orderdetails ode
      INNER JOIN products 
    p ON ode.productid = p.productid) 
    ON od.orderid = ode.orderid
WHERE
    userid = ${req.user.id}`)
    .then((rows) =>
      rows.map((r) => ({
        ...r,
        status: getStatus[r.status],
        orderDate: r.orderDate.toLocaleDateString(),
      }))
    )
    .then((rows) => {
      // if it's ajax request, send a partial view only
      if (req.xhr) {
        res.render("partials/history", { isAjax: true, rows });
      }
      // if not, send whole page
      else {
        res.render("account", {
          title: "My Account",
          style: "profile.css",
          rows,
          history: true,
        });
      }
    })
    .catch((err) => console.log(err));
});
module.exports = accountRouter;
