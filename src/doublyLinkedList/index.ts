class ListNode<T> {
  value: T;
  next: ListNode<T> | null;
  prev: ListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList<T> {
  #head: ListNode<T> | null;
  #tail: ListNode<T> | null;
  #length: number;

  constructor() {
    this.#head = null;
    this.#tail = null;
    this.#length = 0;
  }

  /**
   * Appends a list of items/nodes to the list.
   * @param {T[]} values - array of values of the nodes to be appended to the list.
   * @returns {DoublyLinkedList<T>} the updated list.
   */
  pushAll(values: T[]): DoublyLinkedList<T> {
    if (!values.length) return this;
    values.forEach((value) => this.push(value));
    return this;
  }

  /**
   * Appends an item/node to the list.
   * @param {T} value - the value of the node
   * @returns {DoublyLinkedList<T>} the updated list.
   */
  push(value: T): DoublyLinkedList<T> {
    const listNode = new ListNode(value);

    if (!this.#head) {
      this.#head = listNode;
      this.#tail = this.#head;
    } else if (this.#tail) {
      this.#tail.next = listNode;
      listNode.prev = this.#tail;
      this.#tail = listNode;
    }

    this.#length += 1;
    return this;
  }

  /**
   * Returns the last node/item in the list.
   * @returns {ListNode<T> | undefined} the last node/item in the list.
   */
  pop(): ListNode<T> | undefined {
    if (!this.#head) return;

    const poppedNode = this.#tail;
    if (!poppedNode) return;

    // Check if this is the only node in the list before popping it.
    if (this.#length === 1) {
      this.#head = null;
      this.#tail = this.#head;
    } else {
      /**
       * Get the node before the popped node and set the prev pointer of the popped node to null.
       */
      const prev = poppedNode.prev;
      poppedNode.prev = null;

      /**
       * Set the next pointer of the node before the popped node to point to null
       * and make that node the tail.
       */
      if (prev) prev.next = null;
      this.#tail = prev;
    }

    this.#length -= 1;
    return poppedNode;
  }

  /**
   * Removes an item/node from the beginning of the list.
   * @returns {ListNode<T> | undefined} the node which has been removed.
   */
  shift(): ListNode<T> | undefined {
    if (!this.#head) return;

    const removedNode = this.#head;
    if (!removedNode) return;

    // Check if this is the only node in the list before shifting it.
    if (this.#length === 1) {
      this.#head = null;
      this.#tail = this.#head;
    } else {
      /**
       * Get the node next to the node to be removed and set the next pointer
       * of the node to be removed to point to null.
       */
      const next = removedNode.next;
      removedNode.next = null;

      /**
       * Set the prev pointer of the next node to point to null and
       * make that node the head.
       */
      if (next) next.prev = null;
      this.#head = next;
    }

    this.#length -= 1;
    return removedNode;
  }

  /**
   *
   * @param {T} value - the value of the node which is to be added.
   * @returns {DoublyLinkedList<T>} the updated list.
   */
  unshift(value: T): DoublyLinkedList<T> {
    const listNode = new ListNode(value);

    if (!this.#head) {
      this.#head = listNode;
      this.#tail = this.#head;
    } else {
      listNode.next = this.#head;
      this.#head.prev = listNode;
      this.#head = listNode;
    }

    this.#length += 1;
    return this;
  }

  /**
   * Get the node at the given index.
   * @param {number} index - is the index at which the node is returned.
   * @returns {ListNode<T> | null} the node at the given index.
   */
  get(index: number): ListNode<T> | undefined {
    if (!this.#head) return;
    if (index < 0 || index >= this.#length) return;

    let counter = 0;
    let current: ListNode<T> | null = this.#head;
    while (counter !== index) {
      if (current) current = current.next;
      else return;
      counter += 1;
    }

    if (!current) return;
    return current;
  }

  /**
   * Updates the value of the node at a given index with the new value.
   * @param {number} index - the index at which the node is to be updated.
   * @param {T} value - the value with which the node is to be updated.
   * @returns {boolean} indicating whether the update operation succeeded or not.
   */
  set(index: number, value: T): boolean {
    const listNode = this.get(index);
    if (!listNode) return false;
    listNode.value = value;
    return true;
  }

  /**
   * @returns {ListNode<T> | null} the head of the linked list.
   */
  get head(): ListNode<T> | null {
    return this.#head;
  }

  /**
   * @returns {ListNode<T> | null} the tail of the linked list.
   */
  get tail(): ListNode<T> | null {
    return this.#tail;
  }

  /**
   * @returns {number} length of the linked list.
   */
  get length(): number {
    return this.#length;
  }
}

export default DoublyLinkedList;
