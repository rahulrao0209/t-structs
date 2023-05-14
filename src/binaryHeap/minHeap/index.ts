import BinaryHeap from "../index";

class MinHeap<T> extends BinaryHeap<T> {
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
