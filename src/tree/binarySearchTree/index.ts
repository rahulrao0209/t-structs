import { TreeNode, Tree } from "../index";
import {
  CompareFunc,
  EqualsFunc,
  defaultCompare,
  defaultEquals,
} from "../../utils";

export default class BinarySearchTree<T> extends Tree<T> {
  constructor(
    values: Iterable<T> = [],
    compare: CompareFunc<T> = defaultCompare,
    equals: EqualsFunc<T> = defaultEquals
  ) {
    super(values, compare, equals);
  }

  /**
   * Inserts multiple values into the binary search tree.
   * @param {T[]} values
   * @returns {BinarySearchTree<T>}
   */
  insertAll(values: T[]): BinarySearchTree<T> {
    if (!values.length) return this;
    values.forEach((value) => this.insert(value));
    return this;
  }

  insert(value: T): Tree<T> {
    const newNode = new TreeNode(value);
    let root = this.root;

    if (!root) {
      this._root = newNode;
      return this;
    }

    this.insertNode(newNode);
    return this;
  }

  remove(value: T): TreeNode<T> | undefined {
    throw new Error("Method not implemented.");
  }

  private insertNode(node: TreeNode<T>) {
    if (!this.root) return;
    let current: TreeNode<T> | null = this.root;

    while (current) {
      if (this.compare(node.value, current.value) < 0) {
        if (!current.left) {
          current.left = node;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = node;
          return;
        }
        current = current.right;
      }
    }
  }
}
