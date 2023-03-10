class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList<T> {
  head: ListNode<T> | null;
  tail: ListNode<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value: T) {
    const listNode = new ListNode(value);

    if (!this.head) {
      // If this is the first node being added, set the head and tail to this node.
      this.head = listNode;
      this.tail = this.head;
    } else if (this.tail) {
      // Else set this node to be next node of the tail.
      this.tail.next = listNode;
      this.tail = listNode;
    }

    this.length += 1;
    return this;
  }
}

export default SinglyLinkedList;
