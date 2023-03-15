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
  });

  test("pushAll method to add multiple nodes to the list", () => {
    list.pushAll([
      {
        name: "U.S",
        capitalCity: "Washington",
      },
      {
        name: "U.K",
        capitalCity: "London",
      },
    ]);

    expect(list.length).toBe(3);
    expect(list.head?.value).toEqual({ name: "India", capitalCity: "Delhi" });
    expect(list.tail?.value).toEqual({
      name: "U.K",
      capitalCity: "London",
    });
  });

  test("pop method returns the last node/tail of the list", () => {
    const tail = list.tail;
    const poppedNode = list.pop();
    expect(poppedNode?.value).toEqual(tail?.value);
  });
});
