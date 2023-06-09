import DoublyLinkedList from "./index";
import { describe, expect, test, beforeEach, afterEach } from "vitest";
import { EqualsFunc } from "../../utils";

/**
 * Test cases for Doubly Linked List.
 */
describe("Doubly Linked List", () => {
  type Country = {
    name: string;
    capital: string;
  };

  const values: Country[] = [
    {
      name: "India",
      capital: "Delhi",
    },
    {
      name: "U.S",
      capital: "Washington",
    },
    {
      name: "U.K",
      capital: "London",
    },
    {
      name: "France",
      capital: "Paris",
    },
    {
      name: "Canada",
      capital: "Ottawa",
    },
  ];

  /**
   * Equality logic for our custom Country type.
   * @param {Country} a
   * @param {Country} b
   * @returns {boolean}
   */
  const equals: EqualsFunc<Country> = function (
    a: Country,
    b: Country
  ): boolean {
    return a.name === b.name && a.capital === b.capital;
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

  test("add list values during initialization", () => {
    if (!list) return;
    expect(list.isEmpty).toBe(true);

    list = new DoublyLinkedList(values);

    expect(list.isEmpty).toBe(false);
    expect(list.length).toBe(values.length);
    expect(list.get(0)?.value).toEqual(values[0]);
  });

  test("isEmpty is false when a node is pushed in", () => {
    if (!list) return;
    expect(list.isEmpty).toBe(true);

    /**
     * Append a node to the list and verify
     * that isEmpty reflects value as false.
     */
    list.push({ name: "India", capital: "Delhi" });
    expect(list.isEmpty).toBe(false);
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

  test("push method to add multiple nodes to the list", () => {
    if (!list) return;

    /* Initially the list is empty */
    expect(list.isEmpty).toBe(true);
    expect(list.length).toBe(0);

    /* Add multiple nodes using push */
    list.push(
      {
        name: "India",
        capital: "Delhi",
      },
      {
        name: "Italy",
        capital: "Rome",
      },
      {
        name: "France",
        capital: "Paris",
      }
    );

    expect(list.isEmpty).toBe(false);
    expect(list.length).toBe(3);

    /* Validate the multi-parameter push method for primitive values */
    const nums = [1, 2, 3];
    const numList = new DoublyLinkedList(nums);

    expect(numList.isEmpty).toBe(false);
    expect(numList.length).toBe(nums.length);

    /* Push multiple nodes using push method */
    numList.push(4, 5);
    expect(numList.length).toBe(nums.length + 2);
    expect(numList.get(3)?.value).toBe(4);
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

  test("pop method returns undefined if the list is empty", () => {
    if (!list) return;
    expect(list.isEmpty).toBe(true);
    expect(list.pop()).toBe(undefined);
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

  test("shift method removes a node from the start of the list", () => {
    if (!list) return;
    const nodeValues = [
      { name: "Australia", capital: "Canberra" },
      { name: "France", capital: "Paris" },
    ];

    /**
     * Append nodes onto the list using the pushAll method.
     */
    list.pushAll(nodeValues);
    const initialLength = list.length;
    expect(list.length).toBe(nodeValues.length);
    expect(list.head?.value).toEqual(nodeValues[0]);

    /**
     * Shift a node from the list using shift method.
     */
    const shiftedNode = list.shift();
    expect(list.head?.value).not.toEqual(nodeValues[0]);
    expect(list.head?.value).toEqual(nodeValues[1]);
    expect(shiftedNode?.value).toEqual(nodeValues[0]);
    expect(list.length).toBe(initialLength - 1);
  });

  test("get method returns the node at the index passed in as a parameter", () => {
    if (!list) return;
    const nodeValues = [
      { name: "India", capital: "Delhi" },
      { name: "U.S", capital: "Washington" },
      { name: "Canada", capital: "Ottawa" },
      { name: "Australia", capital: "Canberra" },
      { name: "France", capital: "Paris" },
    ];

    /**
     * Append a list of the nodes to the list using pushAll method.
     */
    list.pushAll(nodeValues);
    expect(list.length).toBe(nodeValues.length);

    /**
     * Use the get method to get nodes at specific indexes.
     */
    expect(list.get(0)?.value).toEqual(nodeValues[0]);
    expect(list.get(3)?.value).toEqual(nodeValues[3]);
    expect(list.get(list.length - 1)?.value).toEqual(
      nodeValues[nodeValues.length - 1]
    );
    expect(list.get(list.length + 1)).toBe(undefined);
  });

  test("set method updates the value of the node whose index is passed in as a parameter", () => {
    if (!list) return;
    const nodeValues = [
      { name: "India", capital: "Delhi" },
      { name: "U.S", capital: "Washington" },
      { name: "Canada", capital: "Ottawa" },
      { name: "Australia", capital: "Canberra" },
      { name: "France", capital: "Paris" },
    ];

    /**
     * Append a list of nodes to the list using the pushAll method.
     */
    list.pushAll(nodeValues);

    /**
     * Update the value of the third node(index 2)
     */
    const initialValue = list.get(2)?.value;
    const updatedValue = {
      name: "Germany",
      capital: "Berlin",
    };

    list.set(2, updatedValue);

    expect(list.get(2)?.value).not.toEqual(initialValue);
    expect(list.get(2)?.value).toEqual(updatedValue);
  });

  test("has method checks whether an element/value exists in the list", () => {
    if (!list) return;
    /* Create a new list */
    list = new DoublyLinkedList<Country>(values, equals);
    expect(list.length).toBe(values.length);

    /* Check whether a given value exists in the list */
    expect(list.has({ name: "Italy", capital: "Rome" })).toBe(false);
    expect(list.has({ name: "India", capital: "Delhi" })).toBe(true);

    /* Validate the has method for primitive values */
    const nums = [1, 4, 33, 22, 11, 54, 60, 12];
    const numList = new DoublyLinkedList(nums);
    expect(numList.isEmpty).toBe(false);
    expect(numList.length).toBe(nums.length);
    expect(numList.has(33)).toBe(true);
    expect(numList.has(60)).toBe(true);
    expect(numList.has(100)).toBe(false);
  });

  test("insert method inserts a node at a given index.", () => {
    if (!list) return;
    const nodeValues = [
      { name: "India", capital: "Delhi" },
      { name: "U.S", capital: "Washington" },
      { name: "Australia", capital: "Canberra" },
      { name: "France", capital: "Paris" },
    ];

    /**
     * Append nodes to the list using pushAll
     */
    list.pushAll(nodeValues);
    const initialLength = list.length;
    expect(initialLength).toBe(nodeValues.length);

    /**
     * Insert a node at index 2 using insert method
     */
    const initialNode = list.get(2); // { name: "Australia", capital: "Canberra" }
    expect(initialNode?.value).toEqual({
      name: "Australia",
      capital: "Canberra",
    });

    const newNodeVal = { name: "Italy", capital: "Rome" };
    list.insert(newNodeVal, 2);

    /**
     * Test the updated list with the new node value
     * inserted at index 2
     */
    expect(list.length).toBe(initialLength + 1);
    expect(list.get(2)?.value).not.toEqual(initialNode?.value);
    expect(list.get(2)?.value).toEqual(newNodeVal);
    expect(list.get(2)?.next?.value).toEqual(initialNode?.value);
    expect(list.get(2)?.prev?.value).toEqual(nodeValues[1]);
  });

  test("insert method returns false if an invalid index is provided as input", () => {
    if (!list) return;
    const nodeValues = [
      { name: "India", capital: "Delhi" },
      { name: "U.S", capital: "Washington" },
      { name: "Australia", capital: "Canberra" },
    ];

    list.pushAll(nodeValues);

    const newNodeVal = { name: "Germany", capital: "Berlin" };
    expect(list.insert(newNodeVal, list.length + 1)).toBe(false);
    expect(list.insert(newNodeVal, -2)).toBe(false);
  });

  test("remove method removes a node at a given index", () => {
    if (!list) return;
    const nodeValues = [
      { name: "India", capital: "Delhi" },
      { name: "U.S", capital: "Washington" },
      { name: "Australia", capital: "Canberra" },
    ];

    /**
     * Append nodes into the list using pushAll method.
     */
    list.pushAll(nodeValues);
    const initialLength = list.length;
    expect(initialLength).toBe(nodeValues.length);

    /**
     * Remove a node using remove method
     */
    const removedNode = list.remove(1);
    expect(list.length).toBe(initialLength - 1);
    expect(removedNode).not.toBe(undefined);
    expect(removedNode?.value).toEqual(nodeValues[1]);

    /**
     * Test that the removed node does not have any
     * pointers to the next and previous nodes in the list.
     */
    expect(removedNode?.next).toBe(null);
    expect(removedNode?.prev).toBe(null);
  });

  test("remove method returns undefined if an invalid index is provided", () => {
    if (!list) return;
    const nodeValues = [
      { name: "India", capital: "Delhi" },
      { name: "U.S", capital: "Washington" },
    ];

    list.pushAll(nodeValues);
    const initialLength = list.length;

    expect(list.remove(initialLength)).toBe(undefined);
    expect(list.remove(-1)).toBe(undefined);
  });

  test("toArray method returns an array containing all the list node values", () => {
    if (!list) return;
    const nodeValues = [
      { name: "India", capital: "Delhi" },
      { name: "U.S", capital: "Washington" },
    ];

    /**
     * Append nodes to the list using pushAll method
     */
    list.pushAll(nodeValues);
    expect(list.length).toBe(nodeValues.length);
    expect(list.toArray()).toEqual(nodeValues);
  });

  test("toArray returns an empty array if the list is empty", () => {
    if (!list) return;
    expect(list.length).toBe(0); // List is initially empty
    expect(list.toArray()).toEqual([]);
  });

  test("reverse method reverses the list", () => {
    if (!list) return;
    const nodeValues = [
      { name: "India", capital: "Delhi" },
      { name: "U.S", capital: "Washington" },
    ];
    list.pushAll(nodeValues);
    expect(list.toArray()).toEqual(nodeValues);

    /**
     * Reverse the list
     */
    list.reverse();
    expect(list.toArray()).toEqual(nodeValues.reverse());
  });

  test("reverse returns undefined if the list is empty", () => {
    if (!list) return;
    expect(list.isEmpty).toBe(true);
    expect(list.reverse()).toBe(undefined);
  });

  test("delete method removes all the nodes in the list", () => {
    if (!list) return;

    /**
     * Append nodes to the list using pushAll method
     */
    const nodeValues = [
      { name: "India", capital: "Delhi" },
      { name: "U.S", capital: "Washington" },
      { name: "Australia", capital: "Canberra" },
    ];
    list.pushAll(nodeValues);
    expect(list.length).toBe(nodeValues.length);
    expect(list.head?.value).toEqual(nodeValues[0]);
    expect(list.tail?.value).toEqual(nodeValues[nodeValues.length - 1]);

    /**
     * Delete all nodes
     */
    const isDeleted = list.delete();
    expect(isDeleted).toBe(true);
    expect(list.length).toBe(0);
    expect(list.head).toBe(null);
    expect(list.tail).toBe(null);
  });

  test("delete returns false if the list has no nodes", () => {
    if (!list) return;
    expect(list.isEmpty).toBe(true);
    expect(list.delete()).toBe(false);
  });
});
