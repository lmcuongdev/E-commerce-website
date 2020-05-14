const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const products = require("./productList");

// routes
const paymentRoute = require("./routes/payments/payments");
const signupRoute = require("./routes/signup/signup");
const productRoute = require("./routes/product/product");

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

// middleware to parse post request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// make routes
app.get("/", (req, res) => {
  res.render("index", { title: "E-commerce", products });
});
app.post("/", (req, res) => {
  res.status(200).json({ products });
});

app.use("/payments", paymentRoute);

app.use("/signup", signupRoute);

app.use("/product", productRoute);

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  res.status(404).render("404", { title: "Page not found", style: "404.css" });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
