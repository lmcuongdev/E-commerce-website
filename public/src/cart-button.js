import * as Utils from "./utils.js";
$(".close-side").on("click", function () {
  $(".side").hide({ direction: "right" }, 2000);
});

$("#cart").on("click", function () {
  $(".side").show({ direction: "left" }, 2000);
});

const { products } = Utils;
console.log(products);

$(document).ready(function () {
  const idRegx = /\/product\/(?<id>\d+)/;
  // initial
  let listOfProduct = [];
  let sum = 0;
  // if users recently add to cart
  try {
    listOfProduct.push(...JSON.parse(sessionStorage.cart));
    sum = listOfProduct.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  } catch (er) {
    console.log("List is empty");
  }
  // rerender cart list
  const renderCart = () => {
    sessionStorage.setItem("cart", JSON.stringify(listOfProduct));
    // remove old items
    $(".cart-list .cart-item").remove();
    // util function to generate cart item
    const itemHtml = (item) => {
      return (
        '<li class="cart-item">' +
        "<img src=" +
        item.img +
        '><span class="quantityInBag float-right" style="font-size: larger; color: red;">' +
        item.quantity +
        "</span>" +
        item.productHtml +
        "</li>"
      );
    };
    // if ($(".cart-list .cart-item").length <= 0) {
    for (const item of listOfProduct) {
      $(".cart-list").prepend(itemHtml(item));
    }
    $(".total .float-right").text(Utils.VND(sum));
    $(".bar#cart #quantity").text(listOfProduct.length);
    // } else {
    //   $(".cart-list").prepend(itemHtml(img, productHtml));
    // }
  };

  renderCart();
  // add to cart
  $(".on-sale .fa-shopping-cart").on("click", function () {
    const linkTag = $(this).parents(".product-top").children("a")[0];
    const id = parseInt(idRegx.exec($(linkTag).attr("href")).groups.id);
    console.log(id);
    $(".toast").hide().show().delay(1500).fadeOut();

    let product = $(this).parent().parent().parent().siblings("div");
    // let nameProduct = $.trim($(product).children("h3").text());
    let nameProduct = products[id - 1].productName;
    let price = products[id - 1].price;
    let index = listOfProduct.map((product) => product.id).indexOf(id);
    // if cart doesnt have this product => add to list
    if (index === -1) {
      let img = $(this).parents(".product-top").children().children("img");
      let productHtml = product.html().replace("h3", "h6").replace("h5", "h7");

      listOfProduct.push({
        id: id,
        name: nameProduct,
        productHtml,
        img: img.attr("src"),
        price: price,
        quantity: 1,
      });
    }
    // if cart already has this product => increase quantity
    else {
      $(".cart-list li h6").each(function () {
        if ($(this).text() === nameProduct) {
          listOfProduct[index].quantity++;
          $(this).siblings("span").text(listOfProduct[index].quantity);
        }
      });
    }
    sum += price;
    renderCart();
  });

  // remove item
  $(document).on("click", ".cart-list li[class!='total ']", function () {
    let subMoney = $(this).children("h7").html();
    sum -= Utils.parseVND(subMoney);

    let nameProduct = $.trim($(this).children("h6").text());

    let curQuantity = parseInt($(this).children(".quantityInBag").text());
    let productIndex = listOfProduct
      .map((item) => item["name"])
      .indexOf(nameProduct);
    if (curQuantity > 1) {
      listOfProduct[productIndex]["quantity"] = curQuantity - 1;
    } else {
      listOfProduct.splice(productIndex, 1);
    }
    renderCart();
  });

  /*------------------------Go to checkout btn---------------*/
  $(".btn#complete").on("click", () => {
    // console.log(listOfProduct);
    // sessionStorage.setItem("cart", JSON.stringify(listOfProduct));
    // console.log(sessionStorage);
  });
});
