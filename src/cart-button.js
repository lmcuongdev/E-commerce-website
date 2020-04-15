$(".close-side").on('click', function() {
    $(".side").hide({ direction: "right" }, 2000);
});

$("#open-side").on('click', function() {
    $(".side").show({ direction: "left" }, 2000);
});

$(document).ready(function() {
    var sum = 0;

    var listOfProduct = [];

    $(".on-sale .fa-shopping-cart").on('click', function() {
        var product = $(this).parent().parent().parent().siblings("div");
        name = $.trim($(product).children("h3").text());
        var index = listOfProduct.indexOf(name);
        if (index === -1) {
            $(".cart-list").prepend('<li>' + '<span id="quantityInBag" class="float-right" style="font-size: larger; color: red;">1</span>' + product.html() + '</li>');
            listOfProduct.push(name);
        } else {
            $(".cart-list li h3").each(function() {
                if ($(this).text() === name) {
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
        var subMoney = $(this).children("h5").html();
        sum -= parseFloat(subMoney.substr(1));
        $('.total .float-right').text(sum);
        $("#quantity").text(parseInt($("#quantity").text()) - 1);

        name = $.trim($(this).children("h3").text().substr(1));

        var number = parseInt($(this).children("#quantityInBag").text());
        if (number > 1) $(this).children("#quantityInBag").text(number - 1);
        else {
            listOfProduct.splice(listOfProduct.indexOf(name), 1);
            $(this).remove();
        }
    });
});