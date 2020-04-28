import * as Utils from "./utils.js";
$(".close-side").on('click', function () {
    $(".side").hide({ direction: "right" }, 2000);
});

$("#cart").on('click', function () {
    $(".side").show({ direction: "left" }, 2000);
});

$(document).ready(function () {
    let sum = 0;

    // object list
    let listOfProduct = [];

    $(".on-sale .fa-shopping-cart").on('click', function () {
        let product = $(this).parent().parent().parent().siblings("div");
        let nameProduct = $.trim($(product).children("h3").text());
        let index = listOfProduct.map(obj => obj['name']).indexOf(nameProduct);

        let price = Utils.parseVND($(product).children("h5").html());
        if (index === -1) {
            let img = $(this).parents(".product-top").children().children("img");
            let sizeName = product.html().replace("h3", "h6").replace("h5", "h7");
            $(".cart-list").prepend('<li>' + '<img src=' + img.attr('src') + '><span class="quantityInBag float-right" style="font-size: larger; color: red;">1</span>' + sizeName + '</li>');

            listOfProduct.push({ name: nameProduct, img: img.attr('src'), price: price, quantity: 1 });
        } else {
            $(".cart-list li h6").each(function () {
                if ($(this).text() === nameProduct) {
                    const quantityUpdate = parseInt($(this).siblings("span").text()) + 1;
                    $(this).siblings("span").text(quantityUpdate);
                    listOfProduct[index]['quantity'] = quantityUpdate;
                }
            });
        }
        sum += price;
        $('.total .float-right').text(Utils.VND(sum));

        $("#quantity").text(parseInt($("#quantity").text()) + 1);
    });

    // remove item
    $(document).on("click", ".cart-list li[class!='total ']", function () {
        let subMoney = $(this).children("h7").html();
        sum -= Utils.parseVND(subMoney);
        $('.total .float-right').text(sum);
        $("#quantity").text(parseInt($("#quantity").text()) - 1);

        let namePro = $.trim($(this).children("h6").text());

        let curQuantity = parseInt($(this).children(".quantityInBag").text());
        let productIndex = listOfProduct.map(obj => obj['name']).indexOf(namePro);
        if (curQuantity > 1) {
            $(this).children(".quantityInBag").text(curQuantity - 1);
            listOfProduct[productIndex]['quantity'] = curQuantity - 1;
        }
        else {
            listOfProduct.splice(productIndex, 1);
            $(this).remove();
        }
    });


    /*------------------------Go to checkout btn---------------*/
    $('.btn#complete').on('click', () => {
        // console.log(listOfProduct);
        sessionStorage.setItem('cart', JSON.stringify(listOfProduct))
        // console.log(sessionStorage);
    })
});