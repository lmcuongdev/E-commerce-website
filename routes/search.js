const express = require("express");
const db = require("../mysql");
const fs = require("fs");
const path = require("path");
const searchRouter = express.Router();

searchRouter.get("/", async (req, res) => {
  let { keyword } = req.query;
  if (keyword) {
    keyword = keyword.trim();
    console.log(keyword);
    db.query(
      `SELECT * FROM products WHERE productName LIKE "%${keyword}%"`,
      (err, rows) => {
        if (err) console.log(err);
        else {
          const r = rows.map((row) => {
            const each = { ...row };
            try {
              each.imgs = fs.readdirSync(
                path.join(__dirname, "../public", "images", row.imgFolder)
              );
              each.cover = each.imgs[0];
            } catch (err) {
              console.log("Error reading images folder: " + err);
            }
            return each;
          });
          console.log(r);
          res.render("search", {
            title: "Search Result",
            keyword,
            style: "search.css",
            products: r,
          });
        }
      }
    );
  } else res.redirect("/");
});
module.exports = searchRouter;
