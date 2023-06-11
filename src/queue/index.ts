class QueueNode<T> {
  value: T;
  next: QueueNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class Queue<T> {
  #front: QueueNode<T> | null;
  #back: QueueNode<T> | null;
  #size: number;
  #capacity?: number | undefined;

  constructor(values: Iterable<T> = [], capacity?: number) {
    this.#front = null;
    this.#back = null;
    this.#size = 0;
    if (capacity) this.#capacity = capacity;

    const initialValues = Array.from(values);
    initialValues.length && this.enqueueAll(initialValues);
  }

  /**
   * Enqueues a list of values in the queue.
   * @param {T[]} values - array of values to be enqueued.
   * @returns {number | undefined} the size of the queue or undefined based on whether the
   * operation on the queue was successful or not.
   */
  enqueueAll(values: T[]): number | undefined {
    if (!values.length) return;
    values.forEach((value: T) => this.enqueue(value));
    return this.size;
  }

  /**
   * Appends a node to the queue.
   * @param {T} value - value of the node to be appended.
   * @returns {number} size of the updated queue.
   */
  enqueue(value: T, ...rest: T[]): number {
    /** If multiple values are passed to enqueue, use the enqueueAll method instead */
    if (rest.length) {
      this.enqueueAll([value, ...rest]);
      return this.size;
    }

    if (this.#capacity && this.#size === this.#capacity)
      this.#throwCapacityError();

    const queueNode = new QueueNode(value);

    if (!this.#front) {
      this.#front = queueNode;
      this.#back = this.#front;
    } else {
      const endNode = this.#back;
      if (endNode) endNode.next = queueNode;
      this.#back = queueNode;
    }

    this.#size += 1;
    return this.size;
  }

  /**
   * Removes a node from the start of the queue.
   * @returns {T | undefined} value of the removed node.
   */
  dequeue(): T | undefined {
    if (!this.#front) return;

    const removedNode = this.#front;
    if (this.#size === 1) {
      this.#front = null;
      this.#back = this.#front;
    } else {
      const nextNode = removedNode.next;
      this.#front = nextNode;
    }

    this.#size -= 1;
    return removedNode.value;
  }

  /**
   * Returns the start/first node's value.
   * @returns {T | undefined} returns the value of the queue's first node.
   */
  peek(): T | undefined {
    if (!this.#front) return;
    return this.#front.value;
  }

  /**
   * Returns an array containing all the queue nodes.
   * @returns {T[]} an array containing all the queue nodes.
   */
  toArray(): T[] {
    if (!this.#front) return [];

    let current: QueueNode<T> | null = this.#front;
    const values: T[] = [];
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    return values;
  }

  /**
   * @returns {number} the size of the queue.
   */
  get size(): number {
    return this.#size;
  }

  /**
   * @returns {number | undefined} the capacity of the queue if provided.
   */
  get capacity(): number | undefined {
    return this.#capacity;
  }

  /**
   * @returns {boolean} whether the queue is full.
   */
  get isFull(): boolean {
    if (!this.#capacity) return false;
    return this.#capacity === this.#size;
  }

  /**
   * @returns {boolean} whether the queue is empty.
   */
  get isEmpty(): boolean {
    return this.#size === 0;
  }

  /**
   * @throws {Error} capacity error if queue is past assigned capacity.
   */
  #throwCapacityError() {
    throw new Error("The queue is full. Cannot insert more nodes.");
  }
}

export default Queue;
