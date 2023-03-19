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
  #capacity?: number | undefined;

  constructor(capacity?: number) {
    this.#top = null;
    this.#bottom = null;
    this.#size = 0;

    if (capacity) this.#capacity = capacity;
  }

  /**
   * Adds an item onto the top of the stack
   * @param {T} value - node/item to be added on top of the stack.
   * @returns {number} the current length of the stack.
   */
  push(value: T): number {
    if (this.#capacity && this.#capacity === this.#size)
      this.#throwStackOverflowError();

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
   * Returns the capacity for the stack if provided.
   * @returns {number | undefined} the capacity for the stack if provided.
   */
  get capacity(): number | undefined {
    return this.#capacity;
  }

  /**
   * Returns whether the stack is empty.
   * @returns {boolean} if the stack is empty.
   */
  get isEmpty(): boolean {
    return this.#size === 0;
  }

  /**
   * Returns whether the stack is full.
   * @returns {boolean} whether the stack is full.
   */
  get isFull(): boolean {
    if (!this.#capacity) return false;
    return this.#capacity === this.#size;
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

  #throwStackOverflowError() {
    throw new Error(
      "Stack Overflow! The stack is full and new nodes cannot be added."
    );
  }
}

export default Stack;
