import {
  CompareFunc,
  EqualsFunc,
  defaultCompare,
  defaultEquals,
} from "../utils";

import Queue from "../queue";

type Traversal = "PRE_ORDER" | "IN_ORDER" | "POST_ORDER" | "LEVEL_ORDER";

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
  protected root: TreeNode<T> | null;
  protected compare: CompareFunc<T>;
  protected equals: EqualsFunc<T>;

  constructor(
    values: Iterable<T> = [],
    compare: CompareFunc<T> = defaultCompare,
    equals: EqualsFunc<T> = defaultEquals
  ) {
    this.root = null;
    this.compare = compare;
    this.equals = equals;
    const initialValues = Array.from(values);
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
   * Preorder traversal involves, visting the root node first,
   * followed by the left subtree and the right subtree at the end.
   * (root, left, right) order.
   * @param {TreeNode<T> | null} node
   * @returns {T[]}
   */
  protected preOrderTraversal(node: TreeNode<T> | null): T[] {
    const values: T[] = [];

    const preOrderHelper = function (
      node: TreeNode<T> | null,
      values: T[]
    ): T[] {
      if (!node) return values;
      values.push(node.value);
      preOrderHelper(node.left, values);
      preOrderHelper(node.right, values);

      return values;
    };

    return preOrderHelper(node, values);
  }

  /**
   * Inorder traversal involves, visiting the left subtree first,
   * followed by the root and then the right subtree at the end.
   * (left, root, right) order.
   * @param {TreeNode<T> | null} node
   * @returns {T[]}
   */
  protected inOrderTraversal(node: TreeNode<T> | null): T[] {
    const values: T[] = [];
    const inOrderHelper = function (
      node: TreeNode<T> | null,
      values: T[]
    ): T[] {
      if (!node) return values;
      inOrderHelper(node.left, values);
      values.push(node.value);
      inOrderHelper(node.right, values);

      return values;
    };

    return inOrderHelper(node, values);
  }

  /**
   * Postorder traversal involves visiting the left subtree,
   * followed by the right subtree, visiting the root node at the end.
   * (left, right, root) order.
   * @param {TreeNode<T> | null} node
   * @returns {T[]}
   */
  protected postOrderTraversal(node: TreeNode<T> | null): T[] {
    const values: T[] = [];
    const postOrderHelper = function (node: TreeNode<T> | null, values: T[]) {
      if (!node) return values;
      postOrderHelper(node.left, values);
      postOrderHelper(node.right, values);
      values.push(node.value);

      return values;
    };

    return postOrderHelper(node, values);
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
    const queue = new Queue([node]);
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
    if (traversal === "PRE_ORDER") return this.preOrderTraversal(this.root);
    else if (traversal === "POST_ORDER")
      return this.postOrderTraversal(this.root);
    else if (traversal === "LEVEL_ORDER")
      return this.levelOrderTraversal(this.root);
    return this.inOrderTraversal(this.root);
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

  get height(): number {
    return this.calculateHeight(this.root);
  }

  get isEmpty(): boolean {
    if (!this.root) return true;
    return false;
  }
}
