/* put your animation code here */
$(function () {
    $("figure img").on("mouseover", function () {
        var alt = $(this).attr("alt");
        var src = $(this).attr("src");
        var newSrc = src.replace("small", "medium");

        var preview = $('<div id="preview"></div>');
        var image = $("<img>").attr("src", newSrc).attr("alt", alt);
        var caption = $("<p>").text(alt);

        preview.append(image);
        preview.append(caption);
        $("body").append(preview);

        $(this).addClass("gray");
        $("#preview").fadeIn(1000);
    });

    function removePreview() {
        $(this).removeClass("gray");
        $("#preview").remove();
    }

    function movePreview(event) {
        $("#preview")
            .css("top", (event.pageY - 10) + "px")
            .css("left", (event.pageX + 30) + "px");
    }

    $("figure img").on("mouseleave", removePreview);
    $("figure img").on("mousemove", movePreview);
});
