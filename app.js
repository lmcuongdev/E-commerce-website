const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const connection = require("./mysql");

const PORT = process.env.PORT || 5000;

const app = express();

// use handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const products = [];
connection.query(`SELECT * FROM products`, (err, rows, fields) => {
  if (err) console.log(`Query error: ${err}`);
  else {
    products.push(...rows);
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
app.get("/product", (req, res) => {
  res.render("product", { title: "Product", style: "product.css" });
});

app.use(express.static(__dirname + "/public"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
