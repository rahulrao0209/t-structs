import {
  CompareFunc,
  EqualsFunc,
  defaultCompare,
  defaultEquals,
} from "../utils";

import Queue from "../queue";
import { PRE_ORDER, POST_ORDER, LEVEL_ORDER } from "./constants";

type Traversal = "PRE_ORDER" | "IN_ORDER" | "POST_ORDER" | "LEVEL_ORDER";

export type NodeWithParent<T> = {
  node: TreeNode<T>;
  parent: TreeNode<T> | undefined;
};

export class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export abstract class Tree<T> {
  protected _root: TreeNode<T> | null;
  protected readonly compare: CompareFunc<T>;
  protected readonly equals: EqualsFunc<T>;
  protected readonly values: Iterable<T>;

  constructor(
    values: Iterable<T> = [],
    compare: CompareFunc<T> = defaultCompare,
    equals: EqualsFunc<T> = defaultEquals
  ) {
    this._root = null;
    this.compare = compare;
    this.equals = equals;
    this.values = values;
    const initialValues = Array.from(this.values);
    initialValues.length && this.insertAll(initialValues);
  }

  /**
   * Inserts multiple values into the tree.
   * @param {T[]} values
   */
  abstract insertAll(values: T[]): Tree<T>;

  /**
   * Inserts a value into the tree.
   * @param {T} value
   */
  abstract insert(value: T): Tree<T>;

  /**
   * Removes a value from the tree.
   * @param {T} value
   */
  abstract remove(value: T): TreeNode<T> | undefined;

  /**
   * Checks whether a given value exists in the tree.
   * @param {T} value
   * @returns {boolean}
   */
  abstract has(value: T): boolean;

  /**
   * Deletes the tree.
   */
  delete(): boolean {
    if (!this.root) return false;
    this._root = null;
    return true;
  }

  /**
   * Preorder traversal involves, visting the root node first,
   * followed by the left subtree and the right subtree at the end.
   * (root, left, right) order.
   * @param {TreeNode<T> | null} node
   * @returns {IterableIterator<T>}
   */
  protected *preOrderTraversal(node: TreeNode<T> | null): IterableIterator<T> {
    if (!node) return [];

    yield node.value;
    yield* this.preOrderTraversal(node.left);
    yield* this.preOrderTraversal(node.right);
  }

  /**
   * Inorder traversal involves, visiting the left subtree first,
   * followed by the root and then the right subtree at the end.
   * (left, root, right) order.
   * @param {TreeNode<T> | null} node
   * @returns {IterableIterator<T>}
   */
  protected *inOrderTraversal(node: TreeNode<T> | null): IterableIterator<T> {
    if (!node) return [];

    yield* this.inOrderTraversal(node.left);
    yield node.value;
    yield* this.inOrderTraversal(node.right);
  }

  /**
   * Postorder traversal involves visiting the left subtree,
   * followed by the right subtree, visiting the root node at the end.
   * (left, right, root) order.
   * @param {TreeNode<T> | null} node
   * @returns {IterableIterator<T>}
   */
  protected *postOrderTraversal(node: TreeNode<T> | null): IterableIterator<T> {
    if (!node) return [];

    yield* this.postOrderTraversal(node.left);
    yield* this.postOrderTraversal(node.right);
    yield node.value;
  }

  /**
   * Level order traversal involves traversing all the nodes
   * at one level before proceeding to the next level.
   * Also known as breadth first traversal.
   * @param {TreeNode<T> | null} node
   * @returns {T[]}
   */
  protected levelOrderTraversal(node: TreeNode<T> | null): T[] {
    const values: T[] = [];

    if (!node) return values;

    // Initialize the queue with the root node for level order traversal (breadth first search)
    const queue = new Queue<TreeNode<T>>([node]);
    let poppedNode: TreeNode<T> | undefined;

    while (!queue.isEmpty) {
      poppedNode = queue.dequeue();
      poppedNode && values.push(poppedNode.value);

      // Add the left and right nodes to the queue.
      poppedNode && poppedNode.left && queue.enqueue(poppedNode.left);
      poppedNode && poppedNode.right && queue.enqueue(poppedNode.right);
    }
    return values;
  }

  /**
   * Traverse - Traverses the entire tree.
   * @param {Traversal} traversal
   * @returns {T[]}
   */
  traverse(traversal?: Traversal): T[] {
    if (traversal === PRE_ORDER) return [...this.preOrderTraversal(this.root)];
    else if (traversal === POST_ORDER)
      return [...this.postOrderTraversal(this.root)];
    else if (traversal === LEVEL_ORDER)
      return this.levelOrderTraversal(this.root);
    return [...this.inOrderTraversal(this.root)];
  }

  /**
   * Calculates the height of the tree. The height a tree
   * is the distance from the root node to its farthest leaf node.
   * @param {TreeNode<T> | null} node
   * @returns {number}
   */
  protected calculateHeight(node: TreeNode<T> | null): number {
    if (!node) return 0;
    const leftHeight = this.calculateHeight(node.left);
    const rightHeight = this.calculateHeight(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  /**
   * Exposes the root of the tree as a read-only property.
   */
  get root(): TreeNode<T> | null {
    return this._root;
  }

  /**
   * Returns the height of the tree.
   */
  get height(): number {
    return this.calculateHeight(this.root);
  }

  /**
   * Checks whether the tree is empty.
   */
  get isEmpty(): boolean {
    if (!this.root) return true;
    return false;
  }
}
