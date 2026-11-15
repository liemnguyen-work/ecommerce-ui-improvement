/* code goes here */
function init() {
    var form = document.getElementById("sampleForm");
    form.addEventListener("submit", checkForEmptyFields);
}

window.addEventListener("load", init);

function checkForEmptyFields(event) {
    // Biểu mẫu thực hành: không gửi dữ liệu đi.
    event.preventDefault();

    var errorArea = document.getElementById("errors");
    errorArea.className = "hidden";
    errorArea.textContent = "";

    var selector = "input[type=text], input[type=password]";
    var fields = document.querySelectorAll(selector);
    var fieldList = [];

    for (var i = 0; i < fields.length; i++) {
        if (fields[i].value.trim() === "") {
            fieldList.push(fields[i].id);
        }
    }

    if (fieldList.length > 0) {
        errorArea.textContent =
            "The following fields can't be empty: " + fieldList.join(", ");
        errorArea.className = "visible";
    }
}
