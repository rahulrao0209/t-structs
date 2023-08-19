import { TreeNode, Tree } from "../index";
import {
  CompareFunc,
  EqualsFunc,
  defaultCompare,
  defaultEquals,
} from "../../utils";
import type { NodeWithParent } from "../index";
import { IN_ORDER_PREDECESSOR, IN_ORDER_SUCCESSOR } from "../constants";

type ReplacementNode = "IN_ORDER_SUCCESSOR" | "IN_ORDER_PREDECESSOR";
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

  insert(value: T, ...rest: T[]): BinarySearchTree<T> {
    if (rest.length > 0) return this.insertAll([value, ...rest]);

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
      let replacementNode = this.getReplacementForNode(node.right);

      /**
       * Special Case: If the replacement node is a duplicate node (i.e has the same value as the node to be removed)
       *  then use the in-order predecessor as the replacement node.
       */
      if (this.equals(replacementNode.value, node.value)) {
        replacementNode = this.getReplacementForNode(
          node.left,
          IN_ORDER_PREDECESSOR
        );
      }
      this.removeNode(replacementNode.value);
      node.value = replacementNode.value;
    } else if (node.left) {
      if (!parent) this._root = node.left;

      if (parent && parent.left && this.equals(parent.left.value, node.value))
        parent.left = node.left;

      if (parent && parent.right && this.equals(parent.right.value, node.value))
        parent.right = node.left;
    } else if (node.right) {
      if (!parent) this._root = node.right;

      if (parent && parent.left && this.equals(parent.left.value, node.value))
        parent.left = node.right;

      if (parent && parent.right && this.equals(parent.right.value, node.value))
        parent.right = node.right;
    } else {
      if (!parent) this._root = null;

      if (parent && parent.left && this.equals(parent.left.value, node.value))
        parent.left = null;

      if (parent && parent.right && this.equals(parent.right.value, node.value))
        parent.right = null;
    }

    /** Remove the left and right child references if any of the removed node. */
    removedNode.left = null;
    removedNode.right = null;
    return removedNode;
  }

  /**
   * In case of a binary search tree,
   * the replacement node would be the inorder successor
   * which is the smallest node in the right subtree except for
   * a special case wherein the in-order successor is a duplicate node.
   */

  /**
   * Returns a node which can be used as a replacement for the node being removed.
   * @param {TreeNode<T>} node
   * @returns
   */
  private getReplacementForNode(
    node: TreeNode<T>,
    nodeType: ReplacementNode = IN_ORDER_SUCCESSOR
  ): TreeNode<T> {
    if (nodeType === IN_ORDER_SUCCESSOR) return this.getInOrderSuccesor(node);
    return this.getInOrderPredecessor(node);
  }

  /**
   * In-order successor for a binary search tree is the
   * node with the smallest value in the right sub-tree.
   */
  /**
   * Returns the in-order successor of a given node.
   * @param {TreeNode<T>} node
   * @returns {TreeNode<T>} the in-order successor node.
   */
  private getInOrderSuccesor(node: TreeNode<T>): TreeNode<T> {
    let current: TreeNode<T> = node;

    while (current && current.left) {
      current = current.left;
    }
    return current;
  }

  /**
   * In-order predecessor for a binary search tree is the node
   * with the largest value in the left sub-tree.
   */
  /**
   * Returns the in-order predecessor of a given node.
   * @param {TreeNode<T>} node
   * @returns {TreeNode<T>} the in-order predecessor node.
   */
  private getInOrderPredecessor(node: TreeNode<T>): TreeNode<T> {
    let current: TreeNode<T> = node;

    while (current && current.right) {
      current = current.right;
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
