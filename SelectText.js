var i = 0;
var intervalID;
function setHighlightInterval(node) {
    intervalID = setInterval(function() {highlight(node)}, 50);
}

function highlight(node) {
    if (i <= node.length) {
        selection.extend(node, i);
        i++;
    } else {
        clearInterval(intervalID);
        i = 0;
        iterateNextNode(node);
    }
}

function iterateNextNode(node, iterateChildren) {
    if (iterateChildren && node.childNodes.length > 0) {
        setHighlightInterval(node.childNodes[0]);
        return;
    }
    if (node.nextSibling) {
        if (node.nextSibling.nodeType == 3) {
            setHighlightInterval(node.nextSibling);
        } else {
            iterateNextNode(node.nextSibling, true);
        }
    } else {
        iterateNextNode(node.parentNode, false);
    }
}

selection = window.getSelection();

var elm;
$(document).on('click', function(evt) {
    elm = evt.target;
    iterateNextNode(elm, true);
    selection.setPosition(0);
});
