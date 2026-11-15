/* code goes here */
var stories = document.getElementById("stories");

for (var i = 0; i < stories.childNodes.length; i++) {
    var node = stories.childNodes[i];

    console.log(
        "child " + i + " = " + node +
        " nodeType = " + node.nodeType
    );
    if (node.nodeType === 1) {
    node.style.backgroundColor = "lightblue";
}
}
var first = document.getElementById("first");

for (var j = 0; j < first.childNodes.length; j++) {
    var child = first.childNodes[j];

    if (child.nodeType === 1) {
        child.style.backgroundColor = "lightblue";
    }
}