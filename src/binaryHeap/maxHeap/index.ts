import BinaryHeap from "../index";
import { CompareFunc } from "../../utils";

class MaxHeap<T> extends BinaryHeap<T> {
  constructor() {
    super();
  }

  /**
   * Returns whether an element/value is correctly placed in the heap.
   * @param {number} parentIdx
   * @param {number} childIdx
   * @returns {boolean}
   */
  protected isCorrectlyPlaced(parentIdx: number, childIdx: number): boolean {
    // return this.heap[parentIdx] >= this.heap[childIdx];
    return this.compare(this.heap[parentIdx], this.heap[childIdx]) >= 0;
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
      0
      ? leftChildIndex
      : rightChildIndex;
  }
}

export default MaxHeap;
