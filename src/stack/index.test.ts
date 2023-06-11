import Stack from "./index";
import { describe, expect, test, beforeEach } from "vitest";

/**
 * Test cases for stack
 */
describe("Stack", () => {
  type Company = {
    name: string;
    foundingYear: string;
  };

  const values = [
    { name: "Google", foundingYear: "1998" },
    { name: "Microsoft", foundingYear: "1975" },
    { name: "Amazon", foundingYear: "1994" },
    { name: "Apple", foundingYear: "1976" },
  ];
  let stack: Stack<Company> | undefined;

  /**
   * Before each test case, initialize a new stack.
   */
  beforeEach(() => {
    stack = new Stack<Company>();
  });

  test("Initially the stack is empty", () => {
    if (!stack) return;
    expect(stack.size).toBe(0);
    expect(stack.isEmpty).toBe(true);
    expect(stack.isFull).toBe(false);
  });

  test("Stack can be populated during initialization", () => {
    stack = new Stack([
      { name: "Google", foundingYear: "1998" },
      { name: "Microsoft", foundingYear: "1975" },
    ]);

    expect(stack.isEmpty).toBe(false);
    expect(stack.size).toBe(2);

    /** Add two more items using pushAll */
    stack.pushAll([
      { name: "Amazon", foundingYear: "1994" },
      { name: "Apple", foundingYear: "1976" },
    ]);
    expect(stack.size).toBe(4);
  });

  test("push method adds a value to the stack", () => {
    if (!stack) return;
    const initialSize = stack.size;
    expect(initialSize).toBe(0);

    /**
     * Add a value to the stack using push.
     */
    stack.push({ name: "Google", foundingYear: "1998" });
    expect(stack.size).toBe(initialSize + 1);
  });

  test("push method adds multiple values to the stack", () => {
    if (!stack) return;
    const initialSize = stack.size;
    expect(initialSize).toBe(0);

    /** Add multiple values to stack using push */
    stack.push(
      { name: "Google", foundingYear: "1998" },
      { name: "Apple", foundingYear: "1976" }
    );

    expect(stack.size).toBe(initialSize + 2);
  });

  test("pushAll method adds list of values to the stack", () => {
    if (!stack) return;
    const initialSize = stack.size;
    expect(initialSize).toBe(0);
    expect(stack.isEmpty).toBe(true);

    /**
     * Use pushAll to add multiple values to the stack.
     */
    stack.pushAll(values);
    expect(stack.size).toBe(values.length);
  });

  test("pushAll method returns undefined if an empty list is passed in as a paramter", () => {
    if (!stack) return;
    expect(stack.size).toBe(0);
    expect(stack.isEmpty).toBe(true);

    /**
     * Pass an empty array to pushAll.
     */
    expect(stack.pushAll([])).toBe(undefined);
    expect(stack.size).toBe(0);
    expect(stack.isEmpty).toBe(true);
  });

  test("pop method removes and returns the top value from the stack", () => {
    if (!stack) return;
    const initialSize = stack.size;
    expect(initialSize).toBe(0);

    /**
     * Add values to the stack using pushAll.
     */
    stack.pushAll(values);
    expect(stack.size).toBe(initialSize + values.length);

    /**
     * pop an item from the the stack.
     */
    expect(stack.pop()).toEqual(values[values.length - 1]);
    expect(stack.size).toBe(initialSize + values.length - 1);
  });

  test("pop method returns undefined if the stack is empty", () => {
    if (!stack) return;
    /**
     * Stack is initially empty.
     */
    expect(stack.size).toBe(0);
    expect(stack.isEmpty).toBe(true);

    /**
     * Use pop method on an empty stack.
     */
    expect(stack.pop()).toBe(undefined);
  });

  test("peek method returns the top value without removing it from the stack", () => {
    if (!stack) return;
    expect(stack.size).toBe(0);
    /**
     * Add values to the stack using the pushAll method.
     */
    stack.pushAll(values);
    expect(stack.size).toBe(values.length);

    /**
     * Use peek to get the top value from stack without removing it.
     */
    expect(stack.peek()).toEqual(values[values.length - 1]);
    expect(stack.size).toBe(values.length);
  });

  test("peek method returns undefined if the stack is empty", () => {
    if (!stack) return;
    expect(stack.size).toBe(0);
    expect(stack.isEmpty).toBe(true);

    /**
     * Use peek method on an empty stack
     */
    expect(stack.peek()).toBe(undefined);
  });

  test("toArray method returns a list of all the values in a stack", () => {
    if (!stack) return;
    expect(stack.size).toBe(0);

    /**
     * Push values onto the stack using pushAll.
     */
    stack.pushAll(values);
    expect(stack.size).toBe(values.length);

    /**
     * Use toArray to get a list of all the values in the stack.
     */
    expect(stack.toArray()).toEqual(values.reverse());
  });

  test("toArray returns an empty array if the stack is empty", () => {
    if (!stack) return;
    expect(stack.size).toBe(0);
    expect(stack.isEmpty).toBe(true);

    /**
     * Use toArray on an empty stack.
     */
    expect(stack.toArray()).toEqual([]);
  });

  test("initialize a stack with a capacity value", () => {
    const capacity = 2;
    stack = new Stack<Company>([], capacity);

    /**
     * Initially the stack is empty and has a capacity of two.
     */
    expect(stack.size).toBe(0);
    expect(stack.isEmpty).toBe(true);
    expect(stack.isFull).toBe(false);
    expect(stack.capacity).toBe(capacity);

    /**
     * Add 2 nodes to the stack using the pushAll.
     * The isFull property should evaluate to true when
     * the stack is at capacity.
     */
    const subArray = values.slice(0, 2);
    stack.pushAll(subArray);
    expect(stack.size).toBe(subArray.length);
    expect(stack.isEmpty).toBe(false);
    expect(stack.isFull).toBe(true);

    /**
     * As the stack isFull now, pushing another element
     * should throw an overflow error.
     */
    expect(
      () => stack && stack.push({ name: "Apple", foundingYear: "1976" })
    ).toThrowError(
      "Stack Overflow! The stack is full and new nodes cannot be added."
    );
  });
});
