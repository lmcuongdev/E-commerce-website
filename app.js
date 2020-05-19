const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const products = require("./productList");

// routes
const paymentRoute = require("./routes/payments/payments");
const signupRoute = require("./routes/signup/signup");
const loginRoute = require("./routes/login/login");
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

app.use(cookieParser());
app.use(
  session({
    name: "sid",
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 3600, sameSite: true },
  })
);
app.use(flash());

// make routes
app.get("/", (req, res) => {
  const { userId } = req.session;
  res.render("index", { title: "E-commerce", products });
});
app.post("/", (req, res) => {
  res.status(200).json({ products });
});

app.use("/login", loginRoute);
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
