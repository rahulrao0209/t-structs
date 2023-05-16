import BinaryHeap from "../index";

class MinHeap<T> extends BinaryHeap<T> {
  protected getChildIndexToSwap(
    leftChildIndex: number,
    rightChildIndex: number
  ): number {
    throw new Error("Method not implemented.");
  }
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
    return this.heap[parentIdx] <= this.heap[childIdx];
  }
}

export default MinHeap;
