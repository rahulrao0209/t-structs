import BinaryHeap from "../index";
import {
  CompareFunc,
  EqualsFunc,
  defaultCompare,
  defaultEquals,
} from "../../../utils";

class MinHeap<T> extends BinaryHeap<T> {
  constructor(
    values: Iterable<T> = [],
    compare: CompareFunc<T> = defaultCompare,
    equals: EqualsFunc<T> = defaultEquals
  ) {
    super(values, compare, equals);
  }

  /**
   * Returns whether an element/value is correctly placed in the heap.
   * In a minHeap, the element at the parent index should always be smaller
   * than the element at the child indexes.
   * @param {number} parentIndex
   * @param {number} childIndex
   * @returns {boolean}
   */
  protected isCorrectlyPlaced(
    parentIndex: number,
    childIndex: number
  ): boolean {
    return this.compare(this.heap[parentIndex], this.heap[childIndex]) < 0;
  }

  /**
   * Gets the index of the child element to be swapped.
   * In a minHeap the index containing the smaller value is returned.
   * @param {number} leftChildIndex
   * @param {number} rightChildIndex
   * @returns {number}
   */
  protected getChildIndexToSwap(
    leftChildIndex: number,
    rightChildIndex: number
  ): number {
    return this.compare(this.heap[leftChildIndex], this.heap[rightChildIndex]) <
      0 || rightChildIndex >= this.size
      ? leftChildIndex
      : rightChildIndex;
  }
}

export default MinHeap;
