const express = require("express");
const productRoute = express.Router();
const products = require("../productList");
const path = require("path");

productRoute.get("/:id", (req, res) => {
  const i = parseInt(req.params.id) - 1;
  // get 4 similar products with the same productLine
  const similar = products.filter(
    (each, index) => i !== index && each.productLine === products[i].productLine
  );
  // add more until similar array has 4 elements
  for (const each of products) {
    if (similar.length >= 4) break;
    if (each !== products[i] && !similar.includes(each)) {
      similar.push(each);
    }
  }

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
      similar,
    });
  } catch (err) {
    console.log("Error getting product ids:");
    console.log(err);
    res
      .status(404)
      .render("404", { title: "Page not found", style: "404.css" });
  }
});

module.exports = productRoute;
