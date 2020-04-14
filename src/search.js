$("document").ready(function() {
    var name = [];
    $(".side-menu ul li ul li").each(function() {
        name.push($(this).text());
    });
    for (i = 0; i < name.length; i++) {
        $("#sel").append('<option>' + name[i] + '</option>');
    }
});

$("document").ready(function() {
    $("#myInput").on("keyup", function() {
        if ($("#myInput").val() != "") {
            $("#sel").css('display', 'block');
        } else {
            $("#sel").css('display', 'none');
        }
        var seacrhName = $(this).val().toLowerCase();
        var countName = 0;
        $("#sel option").filter(function() {
            var indexName = $(this).text().toLowerCase().indexOf(seacrhName);
            if (indexName > -1) countName++;
            if (countName == 0) {
                $("#sel").css('display', 'none');
            } else {
                if ($("#myInput").val() != "") {
                    $("#sel").css('display', 'block');
                    if (countName <= 3) {
                        $("#sel").attr('size', (countName + 1));
                    } else {
                        $("#sel").attr('size', '4');
                    }
                }
            }
            $(this).toggle(indexName > -1);
        });
    });
})