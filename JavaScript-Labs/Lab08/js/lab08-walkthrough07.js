
/* add code here */
// Tạo mảng từ thứ Hai đến thứ Sáu
var daysOfWeek = ["Mon", "Tues", "Wed", "Thur", "Fri"];

// Thêm thứ Bảy vào cuối và Chủ nhật vào đầu mảng
daysOfWeek.push("Sat");
daysOfWeek.unshift("Sun");

// Tạo bảng và hàng tiêu đề
document.write("<table border='1'>");
document.write("<tr>");

for (var i = 0; i < daysOfWeek.length; i++) {
    var day = daysOfWeek[i];

    // In nghiêng tên ngày có nhiều hơn 3 ký tự
    if (day.length > 3) {
        day = "<em>" + day + "</em>";
    }

    document.write("<th>" + day + "</th>");
}

document.write("</tr>");

// Tạo các ô chứa ngày từ 1 đến 30
for (var date = 1; date <= 30; date++) {
    if ((date - 1) % 7 === 0) {
        document.write("<tr>");
    }

    document.write("<td>" + date + "</td>");

    if (date % 7 === 0 || date === 30) {
        document.write("</tr>");
    }
}

document.write("</table>");
