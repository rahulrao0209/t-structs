import BinaryHeap from "../index";
import { CompareFunc, defaultCompare } from "../../utils/index";

class MaxHeap<T> extends BinaryHeap<T> {
  constructor(
    values: Iterable<T> = [],
    compare: CompareFunc<T> = defaultCompare
  ) {
    super(values, compare);
  }

  /**
   * Returns whether an element/value is correctly placed in the heap.
   * In a maxHeap, the element at the parent index should always be larger
   * than the element at the child indexes.
   * @param {number} parentIndex
   * @param {number} childIndex
   * @returns {boolean}
   */
  protected isCorrectlyPlaced(
    parentIndex: number,
    childIndex: number
  ): boolean {
    return this.compare(this.heap[parentIndex], this.heap[childIndex]) >= 0;
  }

  /**
   * Gets the index of the child element to be swapped.
   * In a maxHeap the index containing the larger value is returned.
   * @param {number} leftChildIndex
   * @param {number} rightChildIndex
   * @returns {number}
   */
  protected getChildIndexToSwap(
    leftChildIndex: number,
    rightChildIndex: number
  ): number {
    return this.compare(this.heap[leftChildIndex], this.heap[rightChildIndex]) >
      0 || rightChildIndex >= this.size
      ? leftChildIndex
      : rightChildIndex;
  }
}

export default MaxHeap;
