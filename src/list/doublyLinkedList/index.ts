import { EqualsFunc, defaultEquals } from "../../utils";
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
  push(value: T, ...rest: T[]): DoublyLinkedList<T> {
    /* If multiple values are passed to push, use the pushAll method instead */
    if (rest.length) {
      this.pushAll([value, ...rest]);
      return this;
    }

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
    if (index === 0) return this.unshift(value) && true;
    if (index === this.#length) return this.push(value) && true;

    const listNode = new ListNode(value);
    const prevNode = this.get(index - 1);
    const nextNode = this.get(index);

    /**
     * Set the prevNode's next value to the new node and
     * new node's prev value to the previous node.
     */
    if (prevNode) {
      prevNode.next = listNode;
      listNode.prev = prevNode;
    }

    /**
     * Set the nextNode's prev value to the new node and
     * new node's next value to be nextNode.
     */
    if (nextNode) {
      nextNode.prev = listNode;
      listNode.next = nextNode;
    }
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

    const removedNode = this.get(index);
    const prev = this.get(index - 1);
    const next = this.get(index + 1);

    /**
     * Set the next and prev values of the removed node to point to null.
     */
    if (removedNode) {
      removedNode.next = null;
      removedNode.prev = null;
    } else return;

    /**
     * Set the next value of prev to next
     * and set the prev value of next to prev.
     * Effectively removing the intended node.
     */
    if (prev) prev.next = next || null;
    if (next) next.prev = prev || null;

    this.#length -= 1;
    return removedNode;
  }

  /**
   * Reverses the list
   * @returns {DoublyLinkedList<T>} the reversed list.
   */
  reverse(): DoublyLinkedList<T> | undefined {
    if (!this.#head) return;

    this.#tail = this.#head;
    let current: ListNode<T> | null = this.#head;
    let prev: ListNode<T> | null = null;
    let next: ListNode<T> | null;

    // null <- 1 -> <- 2 -> <- 3 -> null
    while (current) {
      prev = current.prev;
      next = current.next;

      current.next = prev;
      current.prev = next;

      prev = current;
      current = next;
    }

    /**
     * Set the head to prev as current would be pointing to null
     * when the above loop exits.
     */
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

export default DoublyLinkedList;
