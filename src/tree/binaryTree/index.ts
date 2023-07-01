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

  /**
   * Inserts multiple values into the tree.
   * @param {T[]} values
   */
  insertAll(values: T[]): BinaryTree<T> {
    if (!values.length) return this;
    values.forEach((value) => this.insert(value));
    return this;
  }

  /**
   * Inserts a value into the tree.
   * @param {T} value
   */
  insert(value: T): BinaryTree<T> {
    const newNode = new TreeNode(value);
    let root = this.root;

    if (!root) {
      this.root = newNode;
      return this;
    }

    [...this.insertNode(root, newNode)];
    return this;
  }

  /**
   * Removes a value from the binary tree.
   * @param {T} value
   */
  remove(value: T): TreeNode<T> | undefined {
    /** If there is no root node or if the tree does not have the given value, return. */
    if (!this.root) return;
    if (!this.has(value)) return;

    // TODO
    return;
  }

  private *insertNode(
    node: TreeNode<T>,
    newNode: TreeNode<T>
  ): IterableIterator<TreeNode<T>> {
    if (!node.left) yield (node.left = newNode);
    else if (!node.right) yield (node.right = newNode);
    else {
      if (Math.random() < 0.5) yield* this.insertNode(node.left, newNode);
      else yield* this.insertNode(node.right, newNode);
    }
  }
}
