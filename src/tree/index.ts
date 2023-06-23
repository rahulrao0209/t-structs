import {
  CompareFunc,
  EqualsFunc,
  defaultCompare,
  defaultEquals,
} from "../utils";

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

  abstract insertAll(values: T[]): Tree<T>;

  abstract insert(value: T): Tree<T>;

  protected preOrderTraversal(node: TreeNode<T> | null) {
    /**
     * Preorder traversal involves, visting the root node first
     * followed by the left subtree and the right subtree at the end.
     * (root, left, right) order.
     */
    if (!node) return;
    console.log(node.value);
    this.preOrderTraversal(node.left);
    this.preOrderTraversal(node.right);
  }

  protected inOrderTraversal(node: TreeNode<T> | null) {
    /**
     * Inorder traversal involves, visiting the left subtree first,
     * followed by the root and then the right subtree at the end.
     * (left, root, right) order.
     */
    if (!node) return;
    this.inOrderTraversal(node.left);
    console.log(node.value);
    this.inOrderTraversal(node.right);
  }

  protected postOrderTraversal(node: TreeNode<T> | null): void {
    /**
     * Postorder traversal involves visiting the left
     * subtree, followed by the right subtree and then
     * visiting the root node at last.
     * (left, right, root) order
     */
    if (!node) return;
    this.postOrderTraversal(node.left);
    this.postOrderTraversal(node.right);
    console.log(node.value);
  }

  traverse(): void {
    this.preOrderTraversal(this.root);
    console.log("");
    this.inOrderTraversal(this.root);
    console.log("");
    this.postOrderTraversal(this.root);
  }

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
