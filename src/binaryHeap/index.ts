import {
  CompareFunc,
  EqualsFunc,
  defaultCompare,
  defaultEquals,
} from "../utils/index";

abstract class BinaryHeap<T> {
  protected heap: T[] = [];
  protected compare: CompareFunc<T>;
  protected equals: EqualsFunc<T>;

  constructor(
    values: Iterable<T> = [],
    compare: CompareFunc<T> = defaultCompare,
    equals: EqualsFunc<T> = defaultEquals
  ) {
    this.compare = compare;
    this.equals = equals;
    const initialValues = Array.from(values);
    initialValues.length && this.insertAll(initialValues);
  }

  /**
   * Compares the value at the parent index with value at the child index.
   * In a minHeap the value at the parent index is smaller than the value at the child index.
   * In a maxHeap the value at the parent index is larger than the value at the child index.
   * @param {number} parentIndex
   * @param {number} childindex
   * @returns {boolean}
   */
  protected abstract isCorrectlyPlaced(
    parentIndex: number,
    childindex: number
  ): boolean;

  /**
   * Gets the index of the child element to be swapped.
   * In a minHeap the index containing the smaller value is returned.
   * In a maxHeap the index containing the larger value is returned.
   * @param {number} leftChildIndex
   * @param {number} rightChildIndex
   */
  protected abstract getChildIndexToSwap(
    leftChildIndex: number,
    rightChildIndex: number
  ): number;

  /**
   * Maintain the heap invariant after a new element has been added.
   */
  protected swimUp(): void {
    let index = this.size - 1;
    let parentIndex: number;

    /**
     * If the element is not correctly placed, swap it with its parent
     * and keep looping until the index is not zero.
     */
    while (index > 0) {
      parentIndex = this.getParentIndex(index);
      if (this.isCorrectlyPlaced(parentIndex, index)) break;
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  /**
   * Maintain the heap invariant after the top element has been extracted.
   */
  protected sinkDown(): void {
    let index = 0;
    let leftChildIndex: number;
    let rightChildIndex: number;
    let childIndexToSwap: number;

    while (index <= this.size - 1) {
      leftChildIndex = this.getLeftChildIndex(index);
      rightChildIndex = this.getRightChildIndex(index);

      // If both the child indexes are out of bounds return
      if (
        this.isIndexOutOfBounds(leftChildIndex) &&
        this.isIndexOutOfBounds(rightChildIndex)
      )
        return;

      // If left child index is out of bounds compare with only the right one
      if (this.isIndexOutOfBounds(leftChildIndex)) {
        if (this.isCorrectlyPlaced(index, rightChildIndex)) return;
        this.swap(index, rightChildIndex);
        index = rightChildIndex;
        continue;
      }

      // If right child index is out of bounds compare with only the left one
      if (this.isIndexOutOfBounds(rightChildIndex)) {
        if (this.isCorrectlyPlaced(index, leftChildIndex)) return;
        this.swap(index, leftChildIndex);
        index = leftChildIndex;
        continue;
      }

      // If the parent is larger than both the children return
      if (
        this.isCorrectlyPlaced(index, leftChildIndex) &&
        this.isCorrectlyPlaced(index, rightChildIndex)
      )
        return;

      // Sink down
      childIndexToSwap = this.getChildIndexToSwap(
        leftChildIndex,
        rightChildIndex
      );
      this.swap(index, childIndexToSwap);
      index = childIndexToSwap;
    }
  }

  /**
   * Gets the index of the parent
   * @param {number} index
   * @returns {number}
   */
  protected getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  /**
   * Gets the index of the left child
   * @param {number} index
   * @returns {number}
   */
  protected getLeftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  /**
   * Gets the index of the right child
   * @param {number} index
   * @returns {number}
   */
  protected getRightChildIndex(index: number): number {
    return this.getLeftChildIndex(index) + 1;
  }

  /**
   * Checks whether a given index is out of bounds
   * @param {number} index
   * @returns {boolean}
   */
  protected isIndexOutOfBounds(index: number): boolean {
    return index >= this.size;
  }

  /**
   * Swap the values at the two indexes
   * @param {number} index1
   * @param {number} index2
   */
  protected swap(index1: number, index2: number): void {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  /**
   * Insert/Add multiple values in the heap.
   * @param {T[]} values
   */
  insertAll(values: T[]) {
    values.forEach((value) => this.insert(value));
  }

  /**
   * Insert/Add a value in the heap.
   * @param {T} value
   */
  insert(value: T) {
    this.heap.push(value);
    this.swimUp();
  }

  /**
   * Return the top element/value of the heap without removing it.
   * @returns {T | undefined}
   */
  peek(): T | undefined {
    if (this.size === 0) return;
    return this.heap[0];
  }

  /**
   * Remove the element/value at the top of the heap and return it.
   */
  extract(): T | undefined {
    if (this.size === 0) return;

    this.swap(0, this.size - 1);
    const extractedValue = this.heap.pop();
    this.sinkDown();
    return extractedValue;
  }

  /**
   * Check whether an element/value exists in the heap.
   * @param {T} element
   * @returns {boolean}
   */
  contains(element: T): boolean {
    if (this.heap.find((ele) => this.equals(element, ele))) return true;
    return false;
  }

  /**
   * Return whether the heap is empty.
   * @returns {boolean}
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Get the size of the heap.
   * @returns {number}
   */
  get size(): number {
    return this.heap.length;
  }

  /**
   * Get all the data in the heap.
   * @returns {T[]}
   */
  get heapData(): T[] {
    return this.heap;
  }
}

export default BinaryHeap;
