class StackNode<T> {
  value: T;
  next: StackNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class Stack<T> {
  #top: StackNode<T> | null;
  #bottom: StackNode<T> | null;
  #size: number;

  constructor() {
    this.#top = null;
    this.#bottom = null;
    this.#size = 0;
  }

  /**
   * Adds an item onto the top of the stack
   * @param {T} value - node/item to be added on top of the stack.
   * @returns {number} the current length of the stack.
   */
  push(value: T): number {
    const stackNode = new StackNode(value);

    if (!this.#top) {
      this.#top = stackNode;
      this.#bottom = this.#top;
    } else {
      const top = this.#top;
      stackNode.next = top;
      this.#top = stackNode;
    }

    this.#size += 1;
    return this.#size;
  }

  /**
   * Removes the top node from the stack.
   * @returns {T | undefined} the value of the popped node.
   */
  pop(): T | undefined {
    if (!this.#top) return;
    const poppedNode = this.#top;
    /**
     * Check whether the stack has only one node.
     */
    if (this.#size === 1) {
      this.#top = null;
      this.#bottom = this.#top;
    } else {
      this.#top = poppedNode.next;
    }

    this.#size -= 1;
    return poppedNode.value;
  }

  /**
   * Returns the value of the top node in the stack.
   * @returns {T | undefined} value of the top node in the stack.
   */
  peek(): T | undefined {
    if (!this.#top) return;
    return this.#top.value;
  }

  /**
   * @returns {number} size of the stack
   */
  get size(): number {
    return this.#size;
  }

  /**
   * Returns whether the stack is empty.
   * @returns {boolean} if the stack is empty.
   */
  get isEmpty(): boolean {
    return this.#size === 0;
  }

  /**
   * Returns an array containing values of all stack nodes.
   * @returns {T[]} an array containing the values of all stack nodes.
   */
  toArray(): T[] {
    if (!this.#top) return [];

    const values: T[] = [];
    let current: StackNode<T> | null = this.#top;
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    return values;
  }
}

export default Stack;
