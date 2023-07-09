import { TreeNode, Tree } from "../index";
import {
  CompareFunc,
  EqualsFunc,
  defaultCompare,
  defaultEquals,
} from "../../utils";
import type { NodeWithParent } from "../index";

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

  insert(value: T): BinarySearchTree<T> {
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
    if (!this.root) return;
    if (!this.has(value)) return;
    return this.removeNode(value);
  }

  private getNodeWithParent(value: T): NodeWithParent<T> | undefined {
    if (!this.root) return;

    let current: TreeNode<T> | undefined = this.root;
    let parent: TreeNode<T> | undefined;

    while (current) {
      if (this.equals(value, current.value)) {
        return {
          node: current,
          parent,
        };
      }

      if (this.compare(value, current.value) < 0) {
        if (current.left) {
          parent = current;
          current = current.left;
        }
      } else {
        if (current.right) {
          parent = current;
          current = current.right;
        }
      }
    }
  }

  private removeNode(value: T): TreeNode<T> | undefined {
    const data: NodeWithParent<T> | undefined = this.getNodeWithParent(value);
    if (!data) return;

    const { node, parent } = data;
    const removedNode = { ...node };

    if (node.left && node.right) {
      const replacementNode = this.getReplacementForNode(node.right);
      this.removeNode(replacementNode.value);
      node.value = replacementNode.value;
    } else if (node.left) {
      if (!parent) this._root = node.left;
      if (parent && parent.left?.value === node.value) parent.left = node.left;
      if (parent && parent.right?.value === node.value)
        parent.right = node.left;
    } else if (node.right) {
      if (!parent) this._root = node.right;
      if (parent && parent.left?.value === node.value) parent.left = node.right;
      if (parent && parent.right?.value === node.value)
        parent.right = node.right;
    } else {
      if (!parent) this._root = null;
      if (parent && parent.left?.value === node.value) parent.left = null;
      if (parent && parent.right?.value === node.value) parent.right = null;
    }

    /** Remove the left and right child references if any of the removed node. */
    removedNode.left = null;
    removedNode.right = null;
    return removedNode;
  }

  /**
   * In case of a binary search tree,
   * the replacement node would be the inorder successor
   * which is the smallest node in the right subtree
   */

  /**
   * Returns a node which can be used as a replacement for the node being removed.
   * @param {TreeNode<T>} node
   * @returns
   */
  private getReplacementForNode(node: TreeNode<T>): TreeNode<T> {
    let current: TreeNode<T> = node;

    while (current && current.left) {
      current = current.left;
    }
    return current;
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

  /**
   * Checks whether a given value exists in the tree.
   * @param {T} value
   * @returns {boolean}
   */
  has(value: T): boolean {
    if (!this.root) return false;

    let current: TreeNode<T> | null = this.root;
    while (current) {
      if (this.equals(value, current.value)) return true;
      else if (this.compare(value, current.value) < 1) current = current.left;
      else current = current.right;
    }
    return false;
  }
}
