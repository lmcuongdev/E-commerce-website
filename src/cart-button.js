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
        var product = $(this).parent().parent().parent().siblings();
        $(".cart-list").prepend('<li>' + product.html() + '</li>');
        addMoney = $("h5").html();
        sum += parseFloat(addMoney.substr(1));
        $('.total .float-right').text(sum);

        $("#quantity").text(parseInt($("#quantity").text()) + 1);
    });

    $(document).on("click", ".cart-list li[class!='total ']", function() {
        subMoney = $("h5").html();
        sum -= parseFloat(subMoney.substr(1));
        $('.total .float-right').text(sum);
        $("#quantity").text(parseInt($("#quantity").text()) - 1);
        $(this).remove();
    });
});