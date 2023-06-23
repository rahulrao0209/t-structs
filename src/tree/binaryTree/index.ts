import { TreeNode, Tree } from "../index";
import {
  CompareFunc,
  EqualsFunc,
  defaultCompare,
  defaultEquals,
} from "../../utils";

export default class BinaryTree<T> extends Tree<T> {
  constructor(
    values: Iterable<T> = [],
    compare: CompareFunc<T> = defaultCompare,
    equals: EqualsFunc<T> = defaultEquals
  ) {
    super(values, compare, equals);
  }

  insertAll(values: T[]): BinaryTree<T> {
    if (!values.length) return this;
    values.forEach((value) => this.insert(value));
    return this;
  }

  insert(value: T): BinaryTree<T> {
    const newNode = new TreeNode(value);
    let root = this.root;

    if (!root) {
      this.root = newNode;
      return this;
    }
    this.insertNode(root, newNode);
    return this;
  }

  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
    if (!node.left) {
      node.left = newNode;
    } else if (!node.right) {
      node.right = newNode;
    } else {
      /**
       * If both left and right child nodes exist, then recursively traverse down the tree
       * and insert the new node into the first available spot in the left or right subtree.
       */
      if (Math.random() < 0.5) {
        this.insertNode(node.left, newNode);
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }
}
