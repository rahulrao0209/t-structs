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

  /**
   * Appends a value at the back/end of the deque.
   * @param value
   * @returns
   */
  append(value: T): number {
    if (this.#capacity && this.#size === this.#capacity)
      this.#throwCapacityError();

    const dequeNode = new DequeNode(value);

    /**
     * If this is the first node to be added.
     */
    if (!this.#front) {
      this.#front = dequeNode;
      this.#back = this.#front;
    } else {
      const backNode = this.#back;
      if (backNode) {
        backNode.next = dequeNode;
        dequeNode.prev = backNode;
        this.#back = dequeNode;
      } else return this.#size;
    }

    this.#size += 1;
    return this.#size;
  }

  /**
   * Adds/Prepends a value at the front/start of the queue.
   * @param value
   * @returns
   */
  prepend(value: T) {
    if (this.#capacity && this.#size === this.#capacity)
      this.#throwCapacityError();

    const dequeNode = new DequeNode(value);

    if (!this.#front) this.append(value);
    else {
      const frontNode = this.#front;
      if (frontNode) {
        frontNode.prev = dequeNode;
        dequeNode.next = frontNode;
        this.#front = dequeNode;
      } else return this.#size;
    }

    this.#size += 1;
    return this.#size;
  }

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

  /**
   * @throws {Error} capacity error if deque is past assigned capacity.
   */
  #throwCapacityError() {
    throw new Error("The deque is full. Cannot insert more nodes.");
  }
}
