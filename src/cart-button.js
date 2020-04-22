$(".close-side").on('click', function () {
    $(".side").hide({ direction: "right" }, 2000);
});

$("#cart").on('click', function () {
    $(".side").show({ direction: "left" }, 2000);
});

$(document).ready(function () {
    var sum = 0;

    var listOfProduct = [];

    $(".on-sale .fa-shopping-cart").on('click', function () {
        var product = $(this).parent().parent().parent().siblings("div");
        var nameProduct = $.trim($(product).children("h3").text());
        var index = listOfProduct.indexOf(nameProduct);
        if (index == -1) {
            var img = $(this).parents(".product-top").children().children("img");
            var sizeName = product.html().replace("h3", "h6").replace("h5", "h7");
            $(".cart-list").prepend('<li>' + '<img src=' + img.attr('src') + '><span class="quantityInBag float-right" style="font-size: larger; color: red;">1</span>' + sizeName + '</li>');
            listOfProduct.push(nameProduct);
        } else {
            $(".cart-list li h6").each(function () {
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

    // remove item
    $(document).on("click", ".cart-list li[class!='total ']", function () {
        var subMoney = $(this).children("h7").html();
        sum -= parseFloat(subMoney.substr(1));
        $('.total .float-right').text(sum);
        $("#quantity").text(parseInt($("#quantity").text()) - 1);

        var namePro = $.trim($(this).children("h6").text().substr(1));

        var number = parseInt($(this).children(".quantityInBag").text());
        if (number > 1) $(this).children(".quantityInBag").text(number - 1);
        else {
            var indexOfPro = listOfProduct.indexOf(namePro);
            listOfProduct.splice(indexOfPro, 1);
            $(this).remove();
        }
    });


    /*------------------------Go to checkout btn---------------*/
    $('.btn#complete').on('click', () => {
        const x = $('.cart-list').children().slice(0, -1);
        console.log(x);
        const obj = []
        localStorage.clear()
        x.each((i, val) => {
            console.log(val);
            // localStorage[i] = val
        })
        console.log(listOfProduct);
    })
});