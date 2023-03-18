import SinglyLinkedList from "./index";
import { describe, expect, test } from "vitest";

/**
 * Test cases for Singly Linked List.
 */
type Country = {
  name: string;
  capitalCity: string;
};

describe("Working of Singly Linked List", () => {
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
});
