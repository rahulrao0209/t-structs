class DequeNode<T> {
  value: T;
  next: DequeNode<T> | null;
  prev: DequeNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class Deque<T> {
  #front: DequeNode<T> | null;
  #back: DequeNode<T> | null;
  #size: number;
  #capacity?: number | undefined;

  constructor(capacity?: number) {
    this.#front = null;
    this.#back = null;
    this.#size = 0;
    if (capacity) this.#capacity = capacity;
  }

  // TODO: Add element/node at the back.
  append() {}

  // TODO: Add element/node at the front.
  prepend() {}

  // TODO: Remove element/node at the back.
  pop() {}

  // TODO: Remove element/node at the front.
  shift() {}

  /**
   * @returns {T | undefined} the value of the element
   * at the front of the deque or undefined if the
   * deque is empty.
   */
  get front(): T | undefined {
    return this.#front?.value;
  }

  /**
   * @returns {T | undefined} the value of the element
   * at the back/end of the deque or undefined if the
   * deque is empty.
   */
  get back(): T | undefined {
    return this.#back?.value;
  }

  /**
   * @returns {number} the size of the deque.
   */
  get size(): number {
    return this.#size;
  }

  /**
   * @returns {boolean} whether the deque is full.
   */
  get isFull(): boolean {
    if (!this.#capacity) return false;
    return this.#size === this.#capacity;
  }

  /**
   * @returns {boolean} whether the deque is empty.
   */
  get isEmpty(): boolean {
    return this.#size === 0;
  }

  /**
   * @returns {number | undefined} capacity if specified
   * else returns undefined.
   */
  get capacity(): number | undefined {
    if (this.#capacity) return this.#capacity;
  }
}
