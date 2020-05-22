const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const products = require("./productList");
const passport = require("passport");
const morgan = require("morgan");

// routes
const paymentRoute = require("./routes/payments");
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const logoutRoute = require("./routes/logout");
const productRoute = require("./routes/product");

const PORT = process.env.PORT || 5000;

const app = express();
require("./config/passport");
// use handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
  })
);

// app.use(morgan("dev"));

app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.use(cookieParser());
app.use(
  session({
    name: "sid",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 3600 },
  })
);

app.use(passport.initialize());
app.use(passport.session());
// middleware to parse post request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());

// make routes
app.get("/", (req, res) => {
  const { userId } = req.session;
  res.render("index", {
    title: "E-commerce",
    products,
    authenticated: req.isAuthenticated(),
  });
});
app.post("/", (req, res) => {
  res.status(200).json({ products });
});

app.use("/login", loginRoute);
app.use("/payments", paymentRoute);
app.use("/signup", signupRoute);
app.use("/product", productRoute);
app.use("/logout", logoutRoute);
app.use((req, res, next) => {
  res.status(404).render("404", { title: "Page not found", style: "404.css" });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
