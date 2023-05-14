import { CompareFunc, defaultCompare } from "../utils/index";

abstract class BinaryHeap<T> {
  protected heap: T[];
  protected compare: CompareFunc<T>;

  constructor(
    values: Iterable<T> = [],
    compare: CompareFunc<T> = defaultCompare
  ) {
    this.heap = Array.from(values);
    this.compare = compare;
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
   * @param {number} index
   */
  protected swimUp(index: number): void {
    let parentIndex: number;

    /**
     * If the element is not correctly placed, swap it with its parent
     * and keep looping until the index is not zero.
     */
    while (index > 0) {
      parentIndex = Math.floor((index - 1) / 2);
      if (this.isCorrectlyPlaced(parentIndex, index)) break;
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  /**
   * Maintain the heap invariant after the top element has been extracted.
   * @param {number} index
   */
  protected sinkDown(index: number): void {
    if (index >= this.heap.length) return;
    let leftChildindex = this.getLeftChildIndex(index);
    let rightChildindex = this.getRightChildIndex(index);
    let childIndexToSwap: number;
  }

  protected getLeftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  protected getRightChildIndex(index: number): number {
    return this.getLeftChildIndex(index) + 1;
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
    this.swimUp(this.heap.length - 1);
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
  poll(): T | undefined {
    return;
  }

  /**
   * Check whether an element/value exists in the heap.
   * @param {T} element
   * @returns {boolean}
   */
  contains(element: T): boolean {
    return this.heap.includes(element);
  }

  /**
   * Return whether the heap is empty.
   * @returns {boolean}
   */
  isEmpty(): boolean {
    return this.heap.length === 0;
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
