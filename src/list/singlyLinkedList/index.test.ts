import { EqualsFunc } from "../../utils";
import SinglyLinkedList from "./index";
import { describe, expect, test, beforeEach } from "vitest";

/**
 * Test cases for Singly Linked List.
 */

describe("Singly Linked List", () => {
  type Country = {
    name: string;
    capitalCity: string;
  };

  const values: Country[] = [
    {
      name: "India",
      capitalCity: "Delhi",
    },
    {
      name: "U.S",
      capitalCity: "Washington",
    },
    {
      name: "U.K",
      capitalCity: "London",
    },
    {
      name: "France",
      capitalCity: "Paris",
    },
    {
      name: "Canada",
      capitalCity: "Ottawa",
    },
  ];

  const equals: EqualsFunc<Country> = function (
    a: Country,
    b: Country
  ): boolean {
    return a.name === b.name && a.capitalCity === b.capitalCity;
  };

  let list: SinglyLinkedList<Country> | undefined;

  beforeEach(() => {
    list = new SinglyLinkedList<Country>();
  });

  test("List is initially empty", () => {
    if (!list) return;
    expect(list.isEmpty).toBe(true);
  });

  test("add list values during initialization", () => {
    if (!list) return;
    expect(list.isEmpty).toBe(true);

    list = new SinglyLinkedList(values);

    expect(list.isEmpty).toBe(false);
    expect(list.length).toBe(values.length);
    expect(list.get(0)?.value).toEqual(values[0]);
  });

  test("push method to add a node to the list", () => {
    if (!list) return;
    /**
     * Initially the list is empty.
     */
    expect(list.length).toBe(0);
    expect(list.isEmpty).toBe(true);

    /**
     * Add a node to the list using push.
     */
    list.push({
      name: "India",
      capitalCity: "Delhi",
    });

    expect(list.isEmpty).toBe(false);
    expect(list.head?.value).toEqual({ name: "India", capitalCity: "Delhi" });
    expect(list.length).toBe(1);
  });

  test("pushAll method to add multiple nodes to the list", () => {
    if (!list) return;
    /**
     * Initially the list is empty.
     */
    expect(list.length).toBe(0);
    expect(list.isEmpty).toBe(true);

    /**
     * Add values/nodes to the list using pushAll.
     */
    list.pushAll(values);

    expect(list.length).toBe(values.length);
    expect(list.head?.value).toEqual(values[0]);
    expect(list.tail?.value).toEqual(values[values.length - 1]);
  });

  test("pop method returns the last node/tail of the list", () => {
    if (!list) return;
    /**
     * Initially the list is empty.
     */
    const initialLength = list.length;
    expect(list.length).toBe(initialLength);
    expect(list.isEmpty).toBe(true);
    expect(list.head).toBe(null);
    expect(list.tail).toBe(null);

    /**
     * Add nodes/values using pushAll.
     */
    list.pushAll(values);
    expect(list.length).toBe(initialLength + values.length);

    const tail = list.tail;
    const poppedNode = list.pop();

    expect(poppedNode?.value).toEqual(tail?.value);
    expect(list.length).toBe(initialLength + values.length - 1);
  });

  test("pop method returns undefined if the list is empty", () => {
    if (!list) return;
    /**
     * Initially the list is empty.
     */
    expect(list.length).toBe(0);
    expect(list.isEmpty).toBe(true);

    /**
     * Using pop on an empty list will return undefined.
     */
    expect(list.pop()).toBe(undefined);
  });

  test("pop method effectively deletes/empties the list if the list has only one node", () => {
    if (!list) return;
    /**
     * Initially the list is empty.
     */
    expect(list.length).toBe(0);
    expect(list.isEmpty).toBe(true);

    /**
     * Add a single node to the list using push.
     */
    list.push(values[0]);
    expect(list.length).toBe(1);
    expect(list.isEmpty).toBe(false);
    expect(list.head?.value).toEqual(values[0]);
    expect(list.tail?.value).toEqual(values[0]);
    /**
     * pop the node
     */
    list.pop();
    expect(list.length).toBe(0);
    expect(list.isEmpty).toBe(true);
    expect(list.head).toBe(null);
    expect(list.tail).toBe(null);
  });

  test("shift method returns the first node/head of the list", () => {
    if (!list) return;
    /**
     * Initially the list is empty.
     */
    const initialLength = list.length;
    expect(list.length).toBe(initialLength);
    expect(list.isEmpty).toBe(true);

    /**
     * Add nodes using pushAll.
     */
    list.pushAll(values);
    expect(list.length).toBe(initialLength + values.length);

    /**
     * Remove node from the start/head using shift.
     */
    const head = list.head;
    const shiftedNode = list.shift();
    expect(shiftedNode).toEqual(head);
    expect(list.length).toBe(initialLength + values.length - 1);
  });

  test("shift method returns undefined if the list is empty", () => {
    if (!list) return;
    /**
     * Initially the list is empty.
     */
    expect(list.length).toBe(0);
    expect(list.isEmpty).toBe(true);

    /**
     * Using shift on an empty list will return undefined.
     */
    expect(list.shift()).toBe(undefined);
  });

  test("shift method effectively deletes/empties the list if the list has only one node", () => {
    if (!list) return;
    /**
     * Initially the list is empty.
     */
    expect(list.length).toBe(0);
    expect(list.isEmpty).toBe(true);

    /**
     * Add a single node to the list using push.
     */
    list.push(values[0]);
    expect(list.length).toBe(1);
    expect(list.isEmpty).toBe(false);
    expect(list.head?.value).toEqual(values[0]);
    expect(list.tail?.value).toEqual(values[0]);
    /**
     * shift the node
     */
    list.shift();
    expect(list.length).toBe(0);
    expect(list.isEmpty).toBe(true);
    expect(list.head).toBe(null);
    expect(list.tail).toBe(null);
  });

  test("unshift method adds a node at the start of the list", () => {
    if (!list) return;
    /**
     * Initially the list is empty.
     */
    const initialLength = list.length;
    expect(list.length).toBe(initialLength);
    expect(list.isEmpty).toBe(true);

    /**
     * Add nodes using pushAll.
     */
    list.pushAll(values);
    expect(list.length).toBe(initialLength + values.length);
    expect(list.isEmpty).toBe(false);

    /**
     * Add a new node to the start using unshift
     */
    const initialHead = list.head;
    list.unshift({
      name: "Australia",
      capitalCity: "Canberra",
    });

    /**
     * Test the updated list
     */
    expect(list.head?.value).not.toEqual(initialHead?.value);
    expect(list.head?.value).toEqual({
      name: "Australia",
      capitalCity: "Canberra",
    });
    expect(list.length).toBe(initialLength + values.length + 1);
  });

  test("unshift method adds an initial/first node to the list if the list is empty", () => {
    if (!list) return;
    /**
     * Initially the list is empty.
     */
    expect(list.length).toBe(0);
    expect(list.isEmpty).toBe(true);
    expect(list.head).toBe(null);
    expect(list.tail).toBe(null);

    /**
     * Add a node at the head using unshift
     */
    list.unshift(values[0]);
    expect(list.length).toBe(1);
    expect(list.isEmpty).toBe(false);
    expect(list.head).not.toBe(null);
    expect(list.tail).not.toBe(null);
    expect(list.head?.value).toEqual(list.tail?.value);
  });

  test("get method returns the correct node based on the index being passed as a parameter", () => {
    if (!list) return;
    /**
     * Initially the list is empty.
     */
    const initialLength = list.length;
    expect(list.length).toBe(initialLength);
    expect(list.isEmpty).toBe(true);

    /**
     * Add nodes to the list using pushAll.
     */
    list.pushAll(values);
    expect(list.length).toBe(initialLength + values.length);
    expect(list.isEmpty).toBe(false);

    expect(list.get(2)?.value).toEqual(values[2]);
  });

  test("get method returns undefined if we pass in an index value which does not exist", () => {
    if (!list) return;
    expect(list.length).toBe(0);
    expect(list.isEmpty).toBe(true);
    /**
     * Add nodes to the list using pushAll.
     */
    list.pushAll(values);
    expect(list.length).toBe(values.length);
    expect(list.isEmpty).toBe(false);
    expect(list.get(2)).not.toBe(undefined);

    /**
     * get method should return undefined if pass in an index as a negative value,
     * or an index with value higher than the list length.
     */
    expect(list.get(-2)).toBe(undefined);
    expect(list.get(list.length)).toBe(undefined);
  });

  test("set method updates the value of the node at the index being passed as a parameter", () => {
    if (!list) return;
    /**
     * Initially the list is empty
     */
    expect(list.isEmpty).toBe(true);

    /**
     * Add nodes to the list using pushAll
     */
    list.pushAll(values);
    expect(list.isEmpty).toBe(false);

    const testNode = list.get(2);
    const newValue = {
      name: "Spain",
      capitalCity: "Madrid",
    };

    expect(testNode?.value).not.toBe(undefined);
    expect(testNode?.value).not.toEqual(newValue);

    /**
     * Update the value to newValue
     */
    list.set(2, newValue);

    /**
     * Test the updated list.
     */
    expect(testNode?.value).not.toBe(undefined);
    expect(testNode?.value).toEqual(newValue);
  });

  test("has method checks whether an element/value exists in the list", () => {
    if (!list) return;
    /* Create a new list */
    list = new SinglyLinkedList<Country>(values, equals);
    expect(list.length).toBe(values.length);

    /* Check whether a given value exists in the list */
    expect(list.has({ name: "Italy", capitalCity: "Rome" })).toBe(false);
    expect(list.has({ name: "India", capitalCity: "Delhi" })).toBe(true);
  });

  test("insert method inserts a node at the index passed in as the parameter", () => {
    if (!list) return;
    /**
     * Initially the list is empty
     */
    const initialLength = list.length;
    expect(initialLength).toBe(0);
    expect(list.isEmpty).toBe(true);

    /**
     * Add new nodes to the list using pushAll
     */
    list.pushAll(values);
    expect(list.length).toBe(initialLength + values.length);
    expect(list.isEmpty).toBe(false);

    const initialNode = list.get(3);
    expect(initialNode).not.toBe(undefined);

    /**
     * Insert a node in position of an existing one.
     */
    const newNodeVal = { name: "Italy", capitalCity: "Rome" };
    list.insert(newNodeVal, 3);
    expect(initialNode?.value).not.toEqual(newNodeVal);
    expect(list.get(3)?.value).toEqual(newNodeVal);
    expect(list.get(3)?.next).toEqual(initialNode);
    expect(list.length).toBe(initialLength + values.length + 1);
  });

  test("remove method removes a node from the index passed in as parameter", () => {
    if (!list) return;
    /**
     * Initially the list is empty
     */
    const initialLength = list.length;
    const testIndex = 2;
    expect(initialLength).toBe(0);
    expect(list.isEmpty).toBe(true);

    /**
     * Add new nodes to the list using pushAll
     */
    list.pushAll(values);
    expect(list.length).toBe(initialLength + values.length);
    expect(list.isEmpty).toBe(false);

    const initialNode = list.get(testIndex);
    expect(initialNode).not.toBe(undefined);

    /**
     * Remove a node from a given index.
     */
    const removedNode = list.remove(testIndex);
    expect(initialNode?.value).toEqual(removedNode?.value);
    expect(list.length).toBe(initialLength + values.length - 1);
  });

  test("remove method returns undefined if an invalid index is passed or if the list is empty", () => {
    if (!list) return;
    /**
     * Initially the list is empty
     */
    const initialLength = list.length;
    expect(initialLength).toBe(0);
    expect(list.isEmpty).toBe(true);
    expect(list.remove(2)).toBe(undefined);

    /**
     * Add nodes using pushAll
     */
    list.pushAll(values);
    expect(list.length).toBe(values.length);
    expect(list.isEmpty).toBe(false);

    /**
     * Use an invalid index (Negative value or a value larger than the list length)
     */
    expect(list.remove(-2)).toBe(undefined);
    expect(list.remove(list.length)).toBe(undefined);
  });

  test("toArray method returns an array containing values all list nodes", () => {
    if (!list) return;
    /**
     * Add nodes to the list using pushAll.
     */
    list.pushAll(values);
    expect(list.toArray()).toEqual(values);
  });

  test("toArray method returns an empty array if the list is empty", () => {
    if (!list) return;
    /**
     * Initially the list is empty
     */
    expect(list.length).toBe(0);
    expect(list.isEmpty).toBe(true);

    expect(list.toArray()).toEqual([]);
  });

  test("reverse method reverses the ordering of the nodes in the list", () => {
    if (!list) return;
    /**
     * Initially the list is empty
     */
    expect(list.length).toBe(0);
    expect(list.isEmpty).toBe(true);

    /**
     * Add values to the list using the pushAll method.
     */
    list.pushAll(values);

    /**
     * Reverse the list.
     */
    list.reverse();
    expect(values).not.toEqual(list.toArray());
    expect(values.reverse()).toEqual(list.toArray());
  });

  test("delete method deletes the list", () => {
    if (!list) return;
    /**
     * Add values to the list using the pushAll method.
     */
    list.pushAll(values);

    const initialHead = list.head;
    const initialLength = list.length;

    expect(initialHead).not.toBe(undefined);
    expect(initialLength).not.toBe(0);
    expect(list.toArray()).not.toEqual([]);

    /**
     * Delete the list.
     */
    list.delete();

    expect(initialHead).not.toBe(list.head);
    expect(list.head).toBe(null);
    expect(list.length).not.toBe(initialLength);
    expect(list.length).toBe(0);
    expect(list.toArray()).toEqual([]);
  });
});
