import { BinaryTree } from "./src/index";

const binaryTree = new BinaryTree();
console.log("Is empty: ", binaryTree.isEmpty);

// binaryTree.insertAll([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

binaryTree.insertAll(["A", "B", "C", "D", "E", "F"]);

console.log("Is empty: ", binaryTree.isEmpty);
console.log("Height: ", binaryTree.height);

binaryTree.traverse();
