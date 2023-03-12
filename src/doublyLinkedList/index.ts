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
