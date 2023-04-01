import Deque from "./index";
import { describe, expect, test, beforeEach } from "vitest";

/**
 * Test cases for deque.
 */
describe("Deque", () => {
  type Company = {
    name: string;
    foundingYear: string;
  };

  const values: Company[] = [
    { name: "Google", foundingYear: "1998" },
    { name: "Microsoft", foundingYear: "1975" },
    { name: "Amazon", foundingYear: "1994" },
    { name: "Apple", foundingYear: "1976" },
  ];

  let deque: Deque<Company> | undefined;

  /**
   * Before each test initialize a new deque.
   */
  beforeEach(() => {
    deque = new Deque<Company>();
  });

  test("Initially the deque is empty", () => {
    if (!deque) return;
    expect(deque.isEmpty).toBe(true);
    expect(deque.size).toBe(0);
    expect(deque.capacity).toBe(undefined);
  });

  test("append method appends an element to the deque", () => {
    if (!deque) return;
    const initialSize = deque.size;
    expect(initialSize).toBe(0);
    expect(deque.isEmpty).toBe(true);
    expect(deque.isFull).toBe(false);

    /**
     * Append a node to the deck using the append method.
     */
    deque.append(values[0]);
    expect(deque.size).toBe(initialSize + 1);
    expect(deque.isEmpty).toBe(false);
    expect(deque.front).toEqual(values[0]);
    expect(deque.back).toEqual(deque.front);

    /**
     * Append a second node to the deck
     * to test if the node is added to the back.
     */
    deque.append(values[1]);
    expect(deque.size).toBe(initialSize + 2);
    expect(deque.isEmpty).toBe(false);
    expect(deque.front).toBe(values[0]);
    expect(deque.back).toBe(values[1]);
    expect(deque.front).not.toEqual(deque.back);
  });

  test("appendAll method appends a list of elements/nodes", () => {
    if (!deque) return;
    const initialSize = deque.size;
    expect(initialSize).toBe(0);
    expect(deque.isEmpty).toBe(true);

    /**
     * Append a list of elements using appendAll.
     */
    deque.appendAll(values);

    expect(deque.size).not.toBe(0);
    expect(deque.size).toBe(initialSize + values.length);
    expect(deque.front).toEqual(values[0]);
    expect(deque.back).toEqual(values[values.length - 1]);
  });

  test("appendAll returns undefined if an empty array is passed as a parameter", () => {
    if (!deque) return;
    expect(deque.size).toBe(0);
    expect(deque.isEmpty).toBe(true);

    /**
     * Pass an empty array as a parameter to appendAll method.
     */
    expect(deque.appendAll([])).toBe(undefined);
    expect(deque.size).toBe(0);
    expect(deque.isEmpty).toBe(true);
  });

  test("prepend method prepends an element to the deque", () => {
    if (!deque) return;
    const initialSize = deque.size;
    expect(initialSize).toBe(0);
    expect(deque.isEmpty).toBe(true);

    /**
     * Append elements to the deque using appendAll.
     */
    deque.appendAll(values.slice(0, values.length - 1));

    expect(deque.isEmpty).toBe(false);
    expect(deque.size).toBe(initialSize + values.length - 1);
    expect(deque.front).toEqual(values[0]);
    expect(deque.back).toEqual(values[values.length - 2]);

    /**
     * Prepend an element using prepend.
     */
    deque.prepend(values[values.length - 1]);

    expect(deque.size).toBe(initialSize + values.length);
    expect(deque.front).not.toEqual(values[0]);
    expect(deque.front).toEqual(values[values.length - 1]);
  });

  test("prependAll method prepends a list of elements/nodes to the deque", () => {
    if (!deque) return;
    const initialSize = deque.size;
    expect(initialSize).toBe(0);
    expect(deque.isEmpty).toBe(true);

    /**
     * Prepend elements to the deque using prependAll.
     */
    deque.prependAll(values);
    expect(deque.isEmpty).toBe(false);
    expect(deque.size).toBe(initialSize + values.length);
    expect(deque.front).toEqual(values[values.length - 1]);
    expect(deque.back).toEqual(values[0]);
  });

  test("prependAll method returns undefined if an empty array is passed as a paramter", () => {
    if (!deque) return;
    expect(deque.size).toBe(0);
    expect(deque.isEmpty).toBe(true);

    /**
     * Pass an empty array as a parameter to prependAll method.
     */
    expect(deque.prependAll([])).toBe(undefined);
    expect(deque.size).toBe(0);
    expect(deque.isEmpty).toBe(true);
  });

  test("pop method returns the element at the back of the deque", () => {
    if (!deque) return;
    const initialSize = deque.size;
    expect(initialSize).toBe(0);
    expect(deque.isEmpty).toBe(true);

    /**
     * Add elements/values to the deque using the appendAll method.
     */
    deque.appendAll(values);

    expect(deque.size).toBe(initialSize + values.length);
    expect(deque.front).toEqual(values[0]);
    expect(deque.back).toEqual(values[values.length - 1]);

    /**
     * Use pop method.
     */
    expect(deque.pop()).toEqual(values[values.length - 1]);
    expect(deque.size).toBe(initialSize + values.length - 1);
  });

  test("the deque is reset if the last remaining node is popped", () => {
    if (!deque) return;
    const initialSize = deque.size;
    expect(initialSize).toBe(0);
    expect(deque.isEmpty).toBe(true);
    expect(deque.front).toBe(undefined);
    expect(deque.back).toBe(undefined);

    /**
     * Append a single node/element to the deque.
     */
    deque.append(values[0]);
    expect(deque.size).toBe(initialSize + 1);
    expect(deque.isEmpty).toBe(false);
    expect(deque.front).toEqual(values[0]);
    expect(deque.back).toEqual(deque.front);

    /**
     * Remove the element/node using pop.
     */
    expect(deque.pop()).toEqual(values[0]);
    expect(deque.front).toBe(undefined);
    expect(deque.back).toBe(undefined);
    expect(deque.isEmpty).toBe(true);
    expect(deque.size).toBe(initialSize);
  });

  test("pop method returns undefined if the deque is empty", () => {
    if (!deque) return;
    expect(deque.size).toBe(0);
    expect(deque.isEmpty).toBe(true);
    expect(deque.pop()).toBe(undefined);
  });

  test("shift method returns the element at the front of the deque", () => {
    if (!deque) return;
    const initialSize = deque.size;
    expect(initialSize).toBe(0);
    expect(deque.isEmpty).toBe(true);

    /**
     * Add elements to the deque using appendAll method.
     */
    deque.appendAll(values);

    expect(deque.size).toBe(initialSize + values.length);
    expect(deque.front).toEqual(values[0]);
    expect(deque.back).toEqual(values[values.length - 1]);
    expect(deque.shift()).toEqual(values[0]);
    expect(deque.size).toBe(initialSize + values.length - 1);
  });

  test("the deque is reset if the last remaining node is shifted", () => {
    if (!deque) return;
    const initialSize = deque.size;
    expect(initialSize).toBe(0);
    expect(deque.isEmpty).toBe(true);
    expect(deque.front).toBe(undefined);
    expect(deque.back).toBe(undefined);

    /**
     * Append a single node/element to the deque.
     */
    deque.append(values[0]);
    expect(deque.size).toBe(initialSize + 1);
    expect(deque.isEmpty).toBe(false);
    expect(deque.front).toEqual(values[0]);
    expect(deque.back).toEqual(deque.front);

    /**
     * Remove the element/node using shift.
     */
    expect(deque.shift()).toEqual(values[0]);
    expect(deque.front).toBe(undefined);
    expect(deque.back).toBe(undefined);
    expect(deque.isEmpty).toBe(true);
    expect(deque.size).toBe(initialSize);
  });

  test("shift method returns undefined if the deque is empty", () => {
    if (!deque) return;
    expect(deque.size).toBe(0);
    expect(deque.isEmpty).toBe(true);
    expect(deque.shift()).toBe(undefined);
  });

  test("toArray method returns an array containing all the values in the deque", () => {
    if (!deque) return;
    const initialSize = deque.size;
    expect(initialSize).toBe(0);
    expect(deque.isEmpty).toBe(true);

    /**
     * Append elements to deque using the appendAll method.
     */
    deque.appendAll(values);

    expect(deque.size).toBe(initialSize + values.length);
    expect(deque.toArray()).toEqual(values);
  });

  test("toArray method returns an empty array if the deque is empty", () => {
    if (!deque) return;
    expect(deque.size).toBe(0);
    expect(deque.isEmpty).toBe(true);
    expect(deque.toArray()).toEqual([]);
  });

  test("deque with a capacity provided, throws an error if the size exceeds capacity", () => {
    /**
     * Initialize a deque with a capacity of 4.
     */
    deque = new Deque<Company>(4);
    const initialSize = deque.size;
    expect(deque.capacity).toBe(4);
    expect(initialSize).toBe(0);
    expect(deque.isEmpty).toBe(true);
    expect(deque.isFull).toBe(false);

    /**
     * Append values to the deque using appendAll.
     */
    deque.appendAll(values);
    expect(deque.size).toBe(initialSize + values.length);
    expect(deque.isEmpty).toBe(false);
    expect(deque.isFull).toBe(true);

    /**
     * Since the deque is full, adding a new node/element
     * (by appending or prepending) show throw a capacity
     * error.
     */
    expect(
      () => deque && deque.append({ name: "Atlassian", foundingYear: "2002" })
    ).toThrowError("The deque is full. Cannot insert more nodes.");

    expect(
      () => deque && deque.prepend({ name: "Atlassian", foundingYear: "2002" })
    ).toThrowError("The deque is full. Cannot insert more nodes.");
  });
});
