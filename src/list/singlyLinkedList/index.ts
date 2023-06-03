import { EqualsFunc, defaultEquals } from "../../utils";

class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList<T> {
  #head: ListNode<T> | null;
  #tail: ListNode<T> | null;
  #length: number;
  #equals: EqualsFunc<T>;

  constructor(values: Iterable<T> = [], equals: EqualsFunc<T> = defaultEquals) {
    this.#head = null;
    this.#tail = null;
    this.#length = 0;
    this.#equals = equals;
    const initialValues = Array.from(values);
    initialValues.length && this.pushAll(Array.from(values));
  }

  /**
   * Appends a list of items/nodes to the list.
   * @param {T[]} values - list of values to be appended to the list.
   * @returns {SinglyLinkedList<T>} the list with all the values appended to it.
   */
  pushAll(values: T[]): SinglyLinkedList<T> {
    if (!values.length) return this;
    values.forEach((value) => this.push(value));
    return this;
  }

  /**
   * Appends an item/node to the list.
   * @param {T} value - The value of the ListNode.
   * @returns {SinglyLinkedList<T>} the updated list.
   */
  push(value: T): SinglyLinkedList<T> {
    const listNode = new ListNode(value);

    if (!this.#head) {
      // If this is the first node being added, set the head and tail to this node.
      this.#head = listNode;
      this.#tail = this.#head;
    } else if (this.#tail) {
      // Else set this node to be next node of the tail.
      this.#tail.next = listNode;
      this.#tail = listNode;
    }

    this.#length += 1;
    return this;
  }

  /**
   * Remove the last node from the list.
   * @returns {ListNode<T> | undefined} the last the node of the list.
   */
  pop(): ListNode<T> | undefined {
    if (!this.#head) return;

    const poppedNode = this.#tail;
    if (!poppedNode) return;

    // Check if there is only one node in the list.
    if (poppedNode && this.#length === 1) {
      this.#head = null;
      this.#tail = this.#head;
      this.#length -= 1;
      return poppedNode;
    }

    let current = this.#head;
    let prev: ListNode<T> | null = null;

    // Iterate until current holds the value of the last node.
    while (current.next) {
      prev = current;
      current = current.next;
    }

    // Set prev.next to null, effectively making it the last node in the list.
    if (prev) {
      prev.next = null;
    }
    this.#tail = prev;
    this.#length -= 1;
    return current;
  }

  /**
   * @returns {ListNode<T> | undefined} the first/beginning node of the list.
   */
  shift(): ListNode<T> | undefined {
    if (!this.#head) return;
    const oldHead = this.#head;

    if (this.#length === 1) {
      this.#head = null;
      this.#tail = this.#head;
    } else {
      this.#head = this.#head.next;
    }

    this.#length -= 1;
    return oldHead;
  }

  /**
   * Add an item/node to the beginning of the list.
   * @param {T} value - The value of the node to be added.
   * @returns {SinglyLinkedList<T>} the updated list.
   */
  unshift(value: T): SinglyLinkedList<T> {
    const listNode = new ListNode(value);

    if (!this.#head) {
      this.#head = listNode;
      this.#tail = this.#head;
    } else {
      listNode.next = this.#head;
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
    while (current && counter !== index) {
      current = current.next;
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
   * Check whether an element/value exists in the heap.
   * @param {T} element
   * @returns {boolean}
   */
  has(element: T): boolean {
    if (!this.#head) return false;
    let current: ListNode<T> | null = this.#head;

    while (current) {
      if (this.#equals(element, current.value)) return true;
      current = current.next;
    }
    return false;
  }

  /**
   * Inserts a node at the given index.
   * @param {T} value - the value of the node to be inserted.
   * @param {number} index - the index at which the new node is to be inserted.
   * @returns {boolean} representing whether the insertion succeeded or not.
   */
  insert(value: T, index: number): boolean {
    if (index < 0 || index > this.#length) return false;

    if (index === 0) {
      return this.unshift(value) && true;
    }

    if (index === this.#length) {
      return this.push(value) && true;
    }

    const listNode = new ListNode(value);
    const prevNode = this.get(index - 1);
    const nextNode = this.get(index);

    if (prevNode) prevNode.next = listNode;
    if (nextNode) listNode.next = nextNode;

    this.#length += 1;
    return true;
  }

  /**
   * Removes a node at the given index.
   * @param {number} index - the index at which the node is to be removed.
   * @returns {ListNode<T> | undefined} the removed node or undefined if the index is invalid.
   */
  remove(index: number): ListNode<T> | undefined {
    if (index < 0 || index >= this.#length) return;
    if (index === 0) return this.shift();
    if (index === this.#length - 1) return this.pop();

    const prev = this.get(index - 1);
    const removedNode = prev?.next;

    if (!removedNode) return;

    /**
     * Set the next value of removed node to point to null.
     */
    removedNode.next = null;

    /**
     * Make the next value of the previous node point to
     * the next node of the removedNode.
     */
    if (prev) prev.next = removedNode.next || null;
    this.#length -= 1;
    return removedNode;
  }

  /**
   * Reverses the list.
   * @returns {SinglyLinkedList<T>} reversed list
   */
  reverse(): SinglyLinkedList<T> {
    if (!this.#head) return this;

    this.#tail = this.#head;
    let current: ListNode<T> | null = this.#head;
    let prev: ListNode<T> | null = null;
    let next: ListNode<T> | null = null;

    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    // Set the head to prev, as current would be pointing to null as the loop ends.
    this.#head = prev;
    return this;
  }

  /**
   * Deletes the linked list.
   * @returns {boolean} whether the list was deleted or not.
   */
  delete(): boolean {
    if (!this.#head) return false;
    this.#head = null;
    this.#tail = this.#head;
    this.#length = 0;
    return true;
  }

  /**
   * Returns an array containing all the list node values.
   * @returns {T[]} an array containing all the list node values.
   */
  toArray(): T[] {
    if (!this.#head) return [];

    const values: T[] = [];
    let current: ListNode<T> | null = this.#head;
    while (current) {
      values.push(current.value);
      current = current.next;
    }

    return values;
  }

  /**
   * Returns whether the list is empty.
   * @returns {boolean} true/false based on the list length.
   */
  get isEmpty(): boolean {
    return this.#length === 0;
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

export default SinglyLinkedList;
