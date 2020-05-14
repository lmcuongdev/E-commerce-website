const connection = require("./mysql");
const fs = require("fs");
const path = require("path");

const products = [];
connection.query(`SELECT * FROM products`, (err, rows, fields) => {
  if (err) console.log(`Query error: ${err}`);
  else {
    products.push(
      ...rows.map((row) => {
        const each = { ...row };
        try {
          each.imgs = fs.readdirSync(
            path.join(__dirname, "public", "images", row.imgFolder)
          );
          each.cover = each.imgs[0];
        } catch (err) {
          console.log("Error reading images folder: " + err);
        }
        return each;
      })
    );
  }
});

module.exports = products;
