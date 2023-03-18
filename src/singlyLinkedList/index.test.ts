import SinglyLinkedList from "./index";
import { describe, expect, test } from "vitest";

/**
 * Test cases for Singly Linked List.
 */
type Country = {
  name: string;
  capitalCity: string;
};

describe("Singly Linked List", () => {
  const list = new SinglyLinkedList<Country>();

  test("List is initially empty", () => {
    expect(list.isEmpty).toBe(true);
  });

  test("push method to add a node to the list", () => {
    list.push({
      name: "India",
      capitalCity: "Delhi",
    });

    expect(list.isEmpty).toBe(false);
    expect(list.head?.value).toEqual({ name: "India", capitalCity: "Delhi" });
    expect(list.length).toBe(1);

    /**
     * Delete the list
     */
    list.delete();
  });

  test("pushAll method to add multiple nodes to the list", () => {
    list.pushAll([
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
    ]);

    expect(list.length).toBe(5);
    expect(list.head?.value).toEqual({ name: "India", capitalCity: "Delhi" });
    expect(list.tail?.value).toEqual({
      name: "Canada",
      capitalCity: "Ottawa",
    });
  });

  test("pop method returns the last node/tail of the list", () => {
    const tail = list.tail;
    const initialLength = list.length;
    const poppedNode = list.pop();
    expect(poppedNode?.value).toEqual(tail?.value);
    expect(list.length).toBe(initialLength - 1);
  });

  test("shift method returns the first node/head of the list", () => {
    const head = list.head;
    const initialLength = list.length;
    const shiftedNode = list.shift();
    expect(shiftedNode).toEqual(head);
    expect(list.length).toBe(initialLength - 1);
  });

  test("unshift method adds a node at the start of the list", () => {
    const initialHead = list.head;
    const initialLength = list.length;

    /**
     * Add a new node to the start using unshift
     */
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
    expect(list.length).toBe(initialLength + 1);
  });

  test("get method returns the correct node based on the index being passed as a parameter", () => {
    /**
     * Based on the current state of the list,
     * the node {name: 'U.K' capital: 'London'} should be at index 2
     */

    expect(list.get(2)?.value).toEqual({
      name: "U.K",
      capitalCity: "London",
    });
  });

  test("get method returns undefined if we pass in an index value which does not exist", () => {
    /**
     * get method should return undefined if pass in an index as a negative value,
     * or an index with value higher than the list length.
     */
    expect(list.get(-2)).toBe(undefined);
    expect(list.get(list.length)).toBe(undefined);
  });

  test("set method updates the value of the node at the index being passed as a parameter", () => {
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

  test("insert method inserts a node at the index passed in as the parameter", () => {
    const initialLength = list.length;
    const initialNode = list.get(3);

    expect(initialNode).not.toBe(undefined);
    expect(initialLength).not.toBe(0);

    /**
     * Insert a node in position of an existing one.
     */
    const newNodeVal = { name: "Italy", capitalCity: "Rome" };
    list.insert(newNodeVal, 3);
    expect(initialNode?.value).not.toEqual(newNodeVal);
    expect(list.get(3)?.value).toEqual(newNodeVal);
    expect(list.get(3)?.next).toEqual(initialNode);
    expect(list.length).toBe(initialLength + 1);
  });

  test("remove method removes a node from the index passed in as parameter", () => {
    const initialLength = list.length;
    const initialNode = list.get(2);

    expect(initialLength).not.toBe(0);
    expect(initialNode).not.toBe(undefined || null);

    /**
     * Remove a node from index 1
     */
    const removedNode = list.remove(2);
    expect(initialNode?.value).toEqual(removedNode?.value);
    expect(list.length).toBe(initialLength - 1);
  });

  test("toArray method returns an array containing values all list nodes", () => {
    let current = list.head;
    const values = [];
    while (current) {
      values.push(current.value);
      current = current.next;
    }

    expect(list.toArray()).toEqual(values);
  });

  test("reverse method reverses the ordering of the nodes in the list", () => {
    const initialListValues = list.toArray();

    /**
     * Reverse the list.
     */
    list.reverse();
    expect(initialListValues).not.toEqual(list.toArray());
    expect(initialListValues.reverse()).toEqual(list.toArray());
  });

  test("delete method deletes the list", () => {
    const initialHead = list.head;
    const initialLength = list.length;

    expect(initialHead).not.toBe(undefined || null);
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
