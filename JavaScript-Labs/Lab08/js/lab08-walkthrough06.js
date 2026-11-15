/* add code below this */
var stringOne = new String("Test");
var stringTwo = "Test";
var stringThree = "Test";
var stringFour = new String("Test");

document.write("<br>typeof stringOne = " + typeof stringOne);
document.write("<br>typeof stringThree = " + typeof stringThree);

if (stringOne == stringTwo) {
    document.write("<br>stringOne có cùng giá trị với stringTwo");
}

if (stringOne == stringFour) {
    document.write("<br>stringOne có cùng giá trị với stringFour");
}

if (stringOne === stringTwo) {
    document.write("<br>stringOne có cùng giá trị và kiểu với stringTwo");
}

if (stringTwo === stringThree) {
    document.write("<br>stringTwo có cùng giá trị và kiểu với stringThree");
}

if (stringTwo === stringFour) {
    document.write("<br>stringTwo có cùng giá trị và kiểu với stringFour");
}

var dateOne = new Date();
document.write("<p>Ngày giờ hiện tại: " + dateOne + "</p>");

document.write("Số PI: " + Math.PI + "<br>");
document.write("Căn bậc hai của 4: " + Math.sqrt(4) + "<br>");
document.write("Số ngẫu nhiên: " + Math.random() + "<br>");
