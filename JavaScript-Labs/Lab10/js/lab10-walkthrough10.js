$(function () {
    $(".animLoading").hide();

    $("#consume").click(function () {
       var url = "data/cities.json";

        $(".animLoading").show();
        $("#results ul").empty();

        $.get(url)
            .done(function (data) {
                $.each(data, function (index, city) {
                    $("<li></li>")
                        .text(city.name)
                        .appendTo("#results ul");
                });
            })
            .fail(function (xhr, status, error) {
                alert("Không lấy được dữ liệu. Status: " + status +
                    " - Error: " + error);
            })
            .always(function () {
                $(".animLoading").fadeOut("slow");
            });
    });
});