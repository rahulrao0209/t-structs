import Queue from "./index";
import { describe, expect, test, beforeEach } from "vitest";

/**
 * Test cases for queue.
 */
describe("Queue", () => {
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

  let queue: Queue<Company> | undefined;

  beforeEach(() => {
    queue = new Queue<Company>();
  });

  test("Initially the queue is empty", () => {
    if (!queue) return;
    expect(queue.size).toBe(0);
    expect(queue.isEmpty).toBe(true);
    expect(queue.isFull).toBe(false);
  });

  test("enqueue method adds a value to the queue", () => {
    if (!queue) return;
    const initialSize = queue.size;
    expect(initialSize).toBe(0);

    /**
     * Add a value to the queue using the enqueue method.
     */
    queue.enqueue(values[0]);
    expect(queue.size).toBe(initialSize + 1);
    expect(queue.isEmpty).toBe(false);
  });

  test("enqueueAll method adds/enqueues a list of values to the queue", () => {
    if (!queue) return;
    const initialSize = queue.size;
    expect(initialSize).toBe(0);
    expect(queue.isEmpty).toBe(true);

    /**
     * Add a list of values using the enqueueAll method.
     */
    queue.enqueueAll(values);
    expect(queue.size).toBe(initialSize + values.length);
    expect(queue.isEmpty).toBe(false);
  });

  test("enqueueAll method returns undefined if an empty array is passed as a parameter", () => {
    if (!queue) return;
    expect(queue.enqueueAll([])).toBe(undefined);
  });

  test("dequeue method removes and returns a value from the front of the queue.", () => {
    if (!queue) return;
    const initialSize = queue.size;
    expect(initialSize).toBe(0);
    expect(queue.isEmpty).toBe(true);

    /**
     * Add a list of values using the enqueueAll method.
     */
    queue.enqueueAll(values);
    expect(queue.size).toBe(initialSize + values.length);
    expect(queue.isEmpty).toBe(false);

    /**
     * Dequeue a value from the queue.
     */
    const dequeuedValue = queue.dequeue();
    expect(dequeuedValue).toBe(values[0]);
    expect(queue.size).toBe(initialSize + values.length - 1);
  });
});
