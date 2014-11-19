var i = 0;
var intervalID;
function iterateNodes(node) {
    intervalID = setInterval(function() {highlight(node)}, 100);
    // highlight(node);
}

function highlight(node) {
    if (i <= node.length) {
        selection.extend(node, i);
        console.log(node);
        i++;
    } else {
        clearInterval(intervalID);
        i = 0;
        iterateNextNode(node);
    }
}

function iterateNextNode(node, iterateChildren) {
    if (iterateChildren && node.childNodes.length > 0) {
        console.log('children');
        // for (var j = 0; j < node.childNodes.length; j++) {
            iterateNodes(node.childNodes[0]);
            return;
        // }
    }
    if (node.nextSibling) {
        if (node.nextSibling.nodeType == 3) {
            console.log('three');
            iterateNodes(node.nextSibling);
        } else {
            console.log('go to children');
            iterateNextNode(node.nextSibling, true);
        }
    } else {
        console.log('parent');
        iterateNextNode(node.parentNode, false);
    }
}

selection = window.getSelection();
// iterateNodes(selection.anchorNode)

var elm;
$(document).on('click', function(evt) {
    console.log(evt);
    elm = evt.target;
    iterateNextNode(elm, true);
    selection.setPosition(0);
});
