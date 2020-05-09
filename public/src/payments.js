import * as Utils from "./utils.js";
$(document).ready(function () {
  const shippingCost = 50000;
  const fadeTime = 100; //ms

  // retrieve data
  const cart = JSON.parse(sessionStorage.cart);
  for (const product of cart) {
    $("table.table tbody").prepend(
      `<tr class="product-row">
        <td class="product-img"><img src="${product.img}" /> </td>
        <td class="product-name">${product.name}</td>
        <td>In stock</td>
        <td class="product-quantity"><input min='0' class="form-control" type="number"
                value="${product.quantity}" /></td>
        <td class="product-price text-right">${Utils.VND(product.price).replace(
          " VND",
          ""
        )}</td>
        <td class="product-removal"><button class="btn btn-sm btn-danger"><i
                    class="fa fa-trash"></i></button>
        </td>
        <td class="product-subtotal text-right">0</td>
      </tr>`
    );
  }

  //  Recalculate cart
  function recalculateCart() {
    let total = 0;

    // Row total for each item
    $(".product-row").each((i, row) => {
      total += Utils.parseVND($(row).children(".product-subtotal").text());
    });

    // Calculate totals
    let shipping = total > 0 ? shippingCost : 0;
    let grandTotal = total + shipping;

    /* Update totals display */
    $("#total, #grand-total").fadeOut(fadeTime, () => {
      $("#total").text(Utils.VND(total));
      $("#cart-shipping").text(Utils.VND(shipping));
      $("#grand-total").text(Utils.VND(grandTotal));
      // not yet fixed
      if (grandTotal <= 0) {
        $("#checkout").fadeOut(fadeTime, () => {
          $("#continue-shopping").parent().removeClass("col-md-6");
        });
      } else {
        $("#continue-shopping").parent().addClass("col-md-6");
        $("#checkout").fadeIn(fadeTime);
      }
      $("#total, #grand-total").fadeIn(fadeTime);
    });
    // console.log(total, grandTotal);
  }

  // Update quantity
  function updateQuantity(quantityInput) {
    /* Calculate line price */
    let productRow = $(quantityInput).parent().parent();
    let price = Utils.parseVND(productRow.children(".product-price").text());
    let quantity = $(quantityInput).val();
    let subtotal = price * quantity;

    /* Update line price display and recalc cart totals */
    productRow.children(".product-subtotal").each((i, row) => {
      $(row).fadeOut(fadeTime, () => {
        $(row).text(Utils.VND(subtotal));
        recalculateCart();
        $(row).fadeIn(fadeTime);
      });
    });
  }

  // change input => update quantity
  $(".product-quantity input").on("change", (event) => {
    event.target.value = event.target.value < 0 ? 0 : event.target.value;
    updateQuantity(event.target);
  });

  // remove product
  $(".product-row .product-removal .btn").on("click", function () {
    removeItem(this);
  });

  //  Remove item from cart by removing row
  function removeItem(removeButton) {
    let productRow = $(removeButton).parent().parent();
    productRow.fadeOut(2 * fadeTime, function () {
      productRow.remove();
      recalculateCart();
    });
  }

  // back to main page
  $("#continue-shopping,.pop-up #back").on("click", () => {
    console.log(location);
    location.pathname = "/";
  });

  // checkout => bought success
  $("#checkout").on("click", function () {
    $("#congrats-popup").modal("show");
    sessionStorage.clear();
  });

  // auto calculate every time load the page
  $(".product-quantity input").each((i, input) => {
    updateQuantity(input);
  });
});
