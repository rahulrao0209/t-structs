import { TreeNode, Tree } from "../index";
import {
  CompareFunc,
  EqualsFunc,
  defaultCompare,
  defaultEquals,
} from "../../utils";
import type { NodeWithParent } from "../index";
import Stack from "../../stack";
import Queue from "../../queue";

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
      this._root = newNode;
      return this;
    }

    this.insertNode(newNode);
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

    return this.removeNode(value);
  }

  /**
   * Returns an object containing the node and its parent.
   * @param {T} value of the node to be removed.
   * @returns {NodeWithParent<T> | undefined}
   */
  private getNodeWithParent(value: T): NodeWithParent<T> | undefined {
    if (!this.root) return;

    let current: TreeNode<T> | undefined = this.root;
    let parent: TreeNode<T> | undefined;
    let poppedNode: NodeWithParent<T> | undefined;

    const stack = new Stack<NodeWithParent<T>>([
      {
        node: current,
        parent: parent,
      },
    ]);

    while (!stack.isEmpty) {
      poppedNode = stack.pop();
      if (!poppedNode) return;

      const { node } = poppedNode;

      /** If the node value matches our target value return the data. */
      if (this.equals(node.value, value)) return poppedNode;

      /** Add the left node with current node as its parent to the stack. */
      node.left &&
        stack.push({
          node: node.left,
          parent: node,
        });

      /** Add the right node with current node as its parent to the stack. */
      node.right &&
        stack.push({
          node: node.right,
          parent: node,
        });
    }
  }

  /**
   * Since a general binary trees nodes are arranged in a random order, here are the steps
   * we'll follow to remove a node from the tree while still maintaining the binary tree property.
   * -------------------------------------------------------------------------------
   * Step-1: Get the node to be removed.
   * Step-2: Check if the node is a leaf node, has one child, or has two children.
   * Step-3: Compare the node to be removed against the following cases
   *
   *         Case-1: Node has both children.
   *         In this case, we'll get a replacement node which would typically be a leaf
   *         node from the right subtree. Then we'll remove the replacement node and
   *         update our original nodeToBeDeleted's value to that of the replacement node.
   *
   *         Case-2: Node has either a left or a right child but not both.
   *         In this case, we can just make the parent's reference for the given nodeToBeDeleted
   *         point to the right or left child.
   *
   *         Case-3: Node has no children (leaf node)
   *         In this case we can make the parent's reference simply point to null effectively
   *         deleting the node.
   */
  private removeNode(
    value: T,
    isDuplicate: boolean = false
  ): TreeNode<T> | undefined {
    /** If the node's a duplicate, then get the farthest leaf node with the given value */
    const data: NodeWithParent<T> | undefined = !isDuplicate
      ? this.getNodeWithParent(value)
      : this.getFarthestLeaf(value);
    if (!data) return;

    const { node, parent } = data;
    const removedNode = { ...node };

    if (node.left && node.right) {
      let replacementNode = this.getReplacementForNode(node.left);

      /**
       * Special Case: When the replacment node is a duplicate.
       * ----------------------------------------------------------
       * In this case, we need replace the node to be removed,
       * with its duplicate located to the far right which would be a leaf node.
       * To achieve this, we can use a level order traversal and find
       * the duplicate from the end of the traversed array. Its necessary to handle
       * this case in a special way to avoid infinite recursion that we would run into
       * in case of removing duplicate nodes.
       */
      if (this.equals(replacementNode.value, node.value)) {
        this.removeNode(replacementNode.value, true);
      } else {
        this.removeNode(replacementNode.value);
      }
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

  private getFarthestLeaf(value: T) {
    if (!this.root) return;
    const values: NodeWithParent<T>[] = [];
    const queue = new Queue<NodeWithParent<T>>([
      {
        parent: undefined,
        node: this.root,
      },
    ]);

    let poppedNode: NodeWithParent<T> | undefined;

    while (!queue.isEmpty) {
      poppedNode = queue.dequeue();
      poppedNode && values.push(poppedNode);

      /** Add the left and right nodes to the queue. */
      poppedNode &&
        poppedNode.node.left &&
        queue.enqueue({
          parent: poppedNode.node,
          node: poppedNode.node.left,
        });
      poppedNode &&
        poppedNode.node.right &&
        queue.enqueue({
          parent: poppedNode.node,
          node: poppedNode.node.right,
        });
    }

    const node = values
      .reverse()
      .find((v: NodeWithParent<T>) => this.equals(v.node.value, value));

    return node;
  }

  /**
   * The getReplacementForNode function will give us a leaf node which would be a succesor of the node to be deleted/removed.
   * We can use any leaf node, but for the purpose of this implementation, our method will use a node in the right
   * subtree of the node to be removed. If there is no right subtree then we will use the left subtree.
   */

  /**
   * Returns a node which can be used as a replacement for the node being removed.
   * @param {TreeNode<T>} node node to be removed.
   * @returns {TreeNode<T>} the node which acts as a replacement
   */
  private getReplacementForNode(node: TreeNode<T>): TreeNode<T> {
    let current = node;

    /** Find a leaf node in either the left or right subtrees of the given node. */
    while (current.right || current.left) {
      if (current.right) current = current.right;
      else if (current.left) current = current.left;
    }
    return current;
  }

  /**
   * Insert a given node in the binary tree.
   * @param {TreeNode<T>} node
   */
  private insertNode(node: TreeNode<T>) {
    if (!this.root) return;
    let current: TreeNode<T> | null = this.root;
    const isDuplicate = this.has(node.value);

    /** If its a duplicate node, always insert at far right. */
    if (isDuplicate) {
      while (current && current.right) {
        current = current.right;
      }

      current.right = node;
      return;
    }

    while (current) {
      if (!current.left) {
        current.left = node;
        return;
      } else if (!current.right) {
        current.right = node;
        return;
      } else {
        if (Math.random() < 0.5) current = current.left;
        else current = current.right;
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

    /** Initialize a stack for depth first search */
    const stack = new Stack<TreeNode<T>>([this.root]);
    let poppedNode: TreeNode<T> | undefined;

    while (!stack.isEmpty) {
      poppedNode = stack.pop();

      if (poppedNode && this.equals(poppedNode.value, value)) {
        return true;
      }

      /** Add the left and right child nodes to the stack. */
      poppedNode && poppedNode.left && stack.push(poppedNode.left);
      poppedNode && poppedNode.right && stack.push(poppedNode.right);
    }
    return false;
  }
}
