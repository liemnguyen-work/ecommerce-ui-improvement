$(function () {
    $("#consume").click(function () {
        var url = "data/cities.json";

        $("#results").html("<ul></ul>");

        $.get(url, function (data, status) {
            if (status === "success") {
                $.each(data, function (index, city) {
                    $("<li></li>")
                        .text(city.name)
                        .appendTo("#results ul");
                });
            }
        }).fail(function () {
            $("#results").text(
                "Không lấy được dữ liệu. Mở Console để kiểm tra lỗi."
            );
        });
    });
});