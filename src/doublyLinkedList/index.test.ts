import DoublyLinkedList from "./index";
import { describe, expect, test } from "vitest";

/**
 * Test cases for Doubly Linked List.
 */
describe("Working of Doubly Linked List", () => {
  const list = new DoublyLinkedList();

  test("List is initially empty", () => {
    expect(list.isEmpty).toBe(true);
  });
});
