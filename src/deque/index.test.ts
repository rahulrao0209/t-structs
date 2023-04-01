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
});
