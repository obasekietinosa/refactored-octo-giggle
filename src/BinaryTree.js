let queue = []
let breathFirstSearch = (needle, rootNode, queue) => {
    console.log("On node " + rootNode.key )
    if (rootNode.key === needle) {
        console.log("Result Found!")
        return
    }

    if (rootNode.left) {
        queue.push(rootNode.left);
    }
    if (rootNode.right) {
        queue.push(rootNode.right);
    }
    if (queue.length > 0 ) {
        nextNode = queue.pop();
        breathFirstSearch(needle, nextNode, queue);
        return;
    }
    console.log("Breath First Search Completed. End of Tree")

}