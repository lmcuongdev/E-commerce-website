const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const connection = require("./mysql");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 5000;

const app = express();

// use handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

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

// make routes
app.get("/", (req, res) => {
  res.render("index", { title: "E-commerce", products });
});
app.get("/payments", (req, res) => {
  res.render("payments", { title: "Checkout", style: "payments.css" });
});
app.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign up", style: "signupstyle.css" });
});
app.get("/product/:id", (req, res) => {
  const i = parseInt(req.params.id) - 1;
  try {
    res.render("product", {
      title: `Product`,
      style: "product.css",
      name: products[i].productName,
      price: products[i].price,
      status: products[i].quantityInstock > 0 ? "Còn hàng" : "Hết hàng",
      brand: products[i].brand || "Apple",
      description: products[i].productInfo,
      images: products[i].imgs.map((name) =>
        path.join(products[i].imgFolder, name)
      ),
      isFirstIndex: true,
    });
  } catch (err) {
    console.log("Error getting product ids:");
    console.log(err);
    res
      .status(404)
      .render("404", { title: "Page not found", style: "404.css" });
  }
});

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  res.status(404).render("404", { title: "Page not found", style: "404.css" });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
