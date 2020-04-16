$(document).ready(function () {
  /* Set rates + misc */
  const shippingRate = 6.9;
  const fadeTime = 100;

  function recalculateCart() {
    let total = 0;

    /* Sum up row totals */
    $(".product-row").each((i, row) => {
      total += parseFloat($(row).children(".product-subtotal").text());
    });

    /* Calculate totals */
    let shipping = total > 0 ? shippingRate : 0;
    let grandTotal = total + shipping;

    /* Update totals display */
    $("#total, #grand-total").fadeOut(fadeTime, () => {
      $("#total").text(total.toFixed(2));
      $("#cart-shipping").text(shipping.toFixed(2));
      $("#grand-total").text(grandTotal.toFixed(2));
      // not yet fixed
      if (grandTotal == 0) {
        $(".checkout").fadeOut(fadeTime);
      } else {
        $(".checkout").fadeIn(fadeTime);
      }
      $("#total, #grand-total").fadeIn(fadeTime);
    });
    console.log(total, grandTotal);
  }

  setTimeout(recalculateCart, 1000);
  /* Update quantity */
  function updateQuantity(quantityInput) {
    /* Calculate line price */
    let productRow = $(quantityInput).parent().parent();
    let price = parseFloat(productRow.children(".product-price").text());
    let quantity = $(quantityInput).val();
    let linePrice = price * quantity;
    /* Update line price display and recalc cart totals */
    productRow.children(".product-subtotal").each((i, row) => {
      $(row).fadeOut(fadeTime, () => {
        console.log($(row).text());
        $(row).text(linePrice.toFixed(2));
        recalculateCart();
        $(row).fadeIn(fadeTime);
      });
    });
  }

  /* Assign actions */
  $(".product-quantity input").change(function () {
    updateQuantity(this);
  });

  $(".product-removal button").click(function () {
    removeItem(this);
  });
  /* Recalculate cart */

  /* Remove item from cart */
  // function removeItem(removeButton) {
  //   /* Remove row from DOM and recalc cart total */
  //   let productRow = $(removeButton).parent().parent();
  //   productRow.slideUp(fadeTime, function () {
  //     productRow.remove();
  //     recalculateCart();
  //   });
  // }
});
