$(document).ready(function() {
    $(".filter-button").click(function() {
        var value = $(this).attr("data-filter");

        if (value == "all") {
            $(".filter").show("1000");
        } else {
            $(".filter")
                .not("." + value)
                .hide("3000");
            $(".filter")
                .filter("." + value)
                .show("3000");
        }
    });
});

$(document).ready(function() {
    var like = 0;

    $(".fa-heart-o").click(function() {
        if (like == 0) {
            $(this).parents(".product-top").prepend('<i class="fa fa-heart fa-lg" style="right: 5%; margin-top: 20px; color:red; position: absolute;"></i>');
            $(this).parents(".product").addClass("like");
            like = 1;
        } else {
            $(this).parents(".product-top").children().remove("i");
            $(this).parents(".product").removeClass("like");
            like = 0;
        }
    });
});