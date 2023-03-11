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

  constructor() {
    this.#head = null;
    this.#tail = null;
    this.#length = 0;
  }

  // Todo - Add a create method which accepts an array of values to create a linked list.

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

    let current = this.#head;
    let prev: ListNode<T> | null = null;

    // Iterate until current holds the value of the last node.
    while (current.next) {
      prev = current;
      current = current.next;
    }

    // Set prev.next to null, effectively making it to be the last node in the list.
    if (prev && prev.next) {
      prev.next = null;
    }
    this.#tail = prev;
    this.#length -= 1;

    // If the length of the list is 0, set its head and tail to null
    if (this.#length === 0) {
      this.#head = null;
      this.#tail = this.#head;
    }
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

  // Todo - insert method to insert a node at a given index.
  // Todo - remove method to remove a node from a specified index.
  // Todo - get method to get the node at a given index.
  // Todo - set method to update the node at a given index.
  // Todo - reverse method to reverse a linked list.

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
   * @returns  {number} length of the linked list.
   */
  get length(): number {
    return this.#length;
  }

  // Todo: Add a toArray method to convert the linked list to an array.
}

export default SinglyLinkedList;
