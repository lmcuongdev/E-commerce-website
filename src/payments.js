$(document).ready(function () {
  const shippingRate = 50000;
  const fadeTime = 100; //ms

  const VND = (money) => money;

  //  Recalculate cart
  function recalculateCart() {
    let total = 0;

    // Row total for each item
    $(".product-row").each((i, row) => {
      total += parseFloat($(row).children(".product-subtotal").text());
    });

    // Calculate totals
    let shipping = total > 0 ? shippingRate : 0;
    let grandTotal = total + shipping;

    /* Update totals display */
    $("#total, #grand-total").fadeOut(fadeTime, () => {
      $("#total").text(VND(total));
      $("#cart-shipping").text(VND(shipping));
      $("#grand-total").text(VND(grandTotal));
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
    let price = parseFloat(productRow.children(".product-price").text());
    let quantity = $(quantityInput).val();
    let subtotal = price * quantity;

    /* Update line price display and recalc cart totals */
    productRow.children(".product-subtotal").each((i, row) => {
      $(row).fadeOut(fadeTime, () => {
        $(row).text(VND(subtotal));
        recalculateCart();
        $(row).fadeIn(fadeTime);
      });
    });
  }

  // Event handler
  $(".product-quantity input").on("change", (event) => {
    event.target.value = event.target.value < 0 ? 0 : event.target.value;
    updateQuantity(event.target);
  });

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

  $("#continue-shopping").on("click", () => {
    location.href = location.href.replace("payments.html", "index.html");
  });

  // auto calculate every time load the page
  $(".product-quantity input").each((i, input) => {
    updateQuantity(input);
  });
});
