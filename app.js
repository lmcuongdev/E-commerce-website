const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  // console.log(__dirname);
  // res.sendFile(__dirname + "/index.html");
});
