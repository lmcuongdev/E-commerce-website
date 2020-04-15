$(".close-side").on('click', function() {
    $(".side").hide({ direction: "right" }, 2000);
});

$("#open-side").on('click', function() {
    $(".side").show({ direction: "left" }, 2000);
});

$(document).ready(function() {
    var addMoney, subMoney;
    var sum = 0;

    $(".on-sale .fa-shopping-cart").on('click', function() {

        var product = $(this).parent().parent().parent().siblings("div");
        var nameProduct = $.trim($(product).children("h3").text());
        var index = listOfProduct.indexOf(nameProduct);
        if (index == -1) {
            $(".cart-list").prepend('<li>' + '<span id="quantityInBag" class="float-right" style="font-size: larger; color: red;">1</span>' + product.html() + '</li>');
            listOfProduct.push(nameProduct);
        } else {
            $(".cart-list li h3").each(function() {
                if ($(this).text() == nameProduct) {
                    $(this).siblings("span").text(parseInt($(this).siblings("span").text()) + 1);
                }
            });
        }
        var addMoney = $(product).children("h5").html();
        sum += parseFloat(addMoney.substr(1));
        $('.total .float-right').text(sum);

        $("#quantity").text(parseInt($("#quantity").text()) + 1);
    });

    $(document).on("click", ".cart-list li[class!='total ']", function() {
        subMoney = $("h5").html();
        sum -= parseFloat(subMoney.substr(1));
        $('.total .float-right').text(sum);
        $("#quantity").text(parseInt($("#quantity").text()) - 1);

        var namePro = $.trim($(this).children("h3").text().substr(1));

        var number = parseInt($(this).children("#quantityInBag").text());
        if (number > 1) $(this).children("#quantityInBag").text(number - 1);
        else {
            var indexOfPro = listOfProduct.indexOf(namePro);
            listOfProduct.splice(indexOfPro, 1);
            $(this).remove();
        }
    });
});