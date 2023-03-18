class QueueNode<T> {
  value: T;
  next: QueueNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class Queue<T> {
  #start: QueueNode<T> | null;
  #end: QueueNode<T> | null;
  #size: number;
  #capacity?: number | undefined;

  constructor(capacity?: number) {
    this.#start = null;
    this.#end = null;
    this.#size = 0;

    if (capacity) this.#capacity = capacity;
  }

  /**
   * Appends a node to the queue.
   * @param {T} value - value of the node to be appended.
   * @returns {number} size of the updated queue.
   */
  enqueue(value: T): number {
    if (this.#capacity && this.#size === this.#capacity)
      this.throwCapacityError();

    const queueNode = new QueueNode(value);

    if (!this.#start) {
      this.#start = queueNode;
      this.#end = this.#start;
    } else {
      const endNode = this.#end;
      if (endNode) endNode.next = queueNode;
      this.#end = queueNode;
    }

    this.#size += 1;
    return this.#size;
  }

  /**
   * Removes a node from the start of the queue.
   * @returns {T | undefined} value of the removed node.
   */
  dequeue(): T | undefined {
    if (!this.#start) return;

    const removedNode = this.#start;
    if (this.#size === 1) {
      this.#start = null;
      this.#end = this.#start;
    } else {
      const nextNode = removedNode.next;
      this.#start = nextNode;
    }

    this.#size -= 1;
    return removedNode.value;
  }

  /**
   * Returns the start/first node's value.
   * @returns {T | undefined} returns the value of the queue's first node.
   */
  peek(): T | undefined {
    if (!this.#start) return;
    return this.#start.value;
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
  throwCapacityError() {
    throw new Error("The queue is full. Cannot insert more nodes.");
  }
}

export default Queue;
