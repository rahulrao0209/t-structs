import DoublyLinkedList from "./index";
import { describe, expect, test, beforeEach, afterEach } from "vitest";

/**
 * Test cases for Doubly Linked List.
 */
describe("Doubly Linked List", () => {
  type Country = {
    name: string;
    capital: string;
  };

  let list: DoublyLinkedList<Country> | undefined;

  beforeEach(() => {
    list = new DoublyLinkedList<Country>();
  });

  afterEach(() => {
    list && list.delete();
  });

  test("List is initially empty", () => {
    if (!list) return;
    expect(list.isEmpty).toBe(true);
    expect(list.length).toBe(0);
    expect(list.head).toBe(null);
    expect(list.tail).toBe(null);
  });

  test("push method appends a node to the list", () => {
    if (!list) return;
    /**
     * Initially the list is empty.
     */
    const initialLength = list.length;
    expect(initialLength).toBe(0);
    expect(list.head).toBe(null);

    /**
     * use the push method to append a node.
     */
    const nodeVal = { name: "India", capital: "Delhi" };
    list.push(nodeVal);

    expect(list.length).toBe(initialLength + 1);
    expect(list.head).not.toBe(null);
    expect(list.head?.value).toEqual(nodeVal);
    expect(list.tail?.value).toEqual(nodeVal);
  });

  test("pushAll method appends multiple nodes to the list", () => {
    if (!list) return;
    const initialLength = list.length;
    const nodeValues = [
      { name: "India", capital: "Delhi" },
      { name: "U.S", capital: "Washington" },
      { name: "Canada", capital: "Ottawa" },
      { name: "Australia", capital: "Canberra" },
      { name: "France", capital: "Paris" },
    ];

    /**
     * Use pushAll to push an array of node values defined above
     * into the list.
     */
    list.pushAll(nodeValues);

    /**
     * Test the updates list after the pushAll operation.
     */
    expect(list.length).toBe(initialLength + nodeValues.length);
    expect(list.head?.value).toEqual(nodeValues[0]);
    expect(list.tail?.value).toEqual(nodeValues[nodeValues.length - 1]);

    /**
     * Test whether the next and previous pointers of the nodes
     * point to their expected neighbours.
     */
    expect(list.head?.next?.value).toEqual(nodeValues[1]);
    expect(list.head?.prev?.value).toBe(undefined);
    expect(list.tail?.prev?.value).toBe(nodeValues[nodeValues.length - 2]);
    expect(list.tail?.next?.value).toBe(undefined);
  });

  test("pop method removes and returns the last the node in the list", () => {
    if (!list) return;
    const nodeValues = [
      { name: "India", capital: "Delhi" },
      { name: "U.S", capital: "Washington" },
      { name: "Canada", capital: "Ottawa" },
    ];

    /**
     * Add nodes to the list.
     */
    list.pushAll(nodeValues);
    expect(list.length).toBe(nodeValues.length);

    /**
     * Pop the last node using pop method.
     */
    const initialLength = list.length;
    const poppedNode = list.pop();
    expect(poppedNode).not.toBe(undefined);
    expect(poppedNode?.value).toEqual(nodeValues[nodeValues.length - 1]);
    expect(list.length).toBe(initialLength - 1);
  });

  test("unshift method inserts a node at the start of the list", () => {
    if (!list) return;
    const nodeValues = [
      { name: "Australia", capital: "Canberra" },
      { name: "France", capital: "Paris" },
    ];

    /**
     * Append nodes into the list using pushAll method.
     */
    const initialLength = list.length;
    list.pushAll(nodeValues);
    expect(list.length).toBe(initialLength + nodeValues.length);
    expect(list.head?.value).toEqual(nodeValues[0]);

    /**
     * Insert a new node at the start using the unshift method.
     */
    const nodeValue = { name: "India", capital: "Delhi" };
    list.unshift(nodeValue);
    expect(list.length).toBe(initialLength + nodeValues.length + 1);
    expect(list.head?.value).not.toEqual(nodeValues[0]);
    expect(list.head?.value).toEqual(nodeValue);
  });
});
