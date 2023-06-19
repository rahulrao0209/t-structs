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

export default abstract class Tree<T> {
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

  protected abstract insertAll(values: T[]): Tree<T>;

  protected abstract insert(value: T): Tree<T>;

  protected traverse(): void {}

  protected isEmpty(): boolean {
    if (!this.root) return true;
    return false;
  }
}
