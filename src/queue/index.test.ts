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

  test("dequeue method returns undefined if the queue is empty", () => {
    if (!queue) return;
    expect(queue.size).toBe(0);
    expect(queue.isEmpty).toBe(true);

    /**
     * dequeue method will return undefined if the queue is empty.
     */
    expect(queue.dequeue()).toBe(undefined);
  });

  test("peek method returns the value at the front/start of the queue without removing it", () => {
    if (!queue) return;
    const initialSize = queue.size;
    expect(initialSize).toBe(0);
    expect(queue.isEmpty).toBe(true);

    /**
     * Add values to the queue using the enqueueAll method.
     */
    queue.enqueueAll(values);
    expect(queue.size).toBe(initialSize + values.length);
    expect(queue.isEmpty).toBe(false);

    /**
     * Use peek method to get the value at the front/start of the queue
     * without removing it.
     */
    expect(queue.peek()).toBe(values[0]);
    expect(queue.size).toBe(initialSize + values.length);
  });

  test("peek method returns undefined if the queue is empty", () => {
    if (!queue) return;
    expect(queue.size).toBe(0);
    expect(queue.isEmpty).toBe(true);

    /**
     * Using peek method on an empty queue will return undefined.
     */
    expect(queue.peek()).toBe(undefined);
  });

  test("toArray method returns a list/array of all the values in the queue", () => {
    if (!queue) return;
    const initialSize = queue.size;
    expect(initialSize).toBe(0);
    expect(queue.isEmpty).toBe(true);

    /**
     * Add values to the queue using the enqueueAll method.
     */
    queue.enqueueAll(values);
    expect(queue.size).toBe(initialSize + values.length);
    expect(queue.isEmpty).toBe(false);

    /**
     * toArray will return a list of all the values in the queue.
     */
    expect(queue.toArray()).toEqual(values);
  });

  test("toArray method returns an empty array/list if the queue is empty", () => {
    if (!queue) return;
    expect(queue.size).toBe(0);
    expect(queue.isEmpty).toBe(true);

    /**
     * Use toArray on an empty queue
     */
    expect(queue.toArray()).toEqual([]);
  });

  test("queue with a capacity provided, throws error if the size exceeds capacity", () => {
    const capacity = 2;
    queue = new Queue<Company>(2);

    /**
     * Initially the queue is empty and has a capacity of 2.
     */
    expect(queue.size).toBe(0);
    expect(queue.isEmpty).toBe(true);
    expect(queue.isFull).toBe(false);
    expect(queue.capacity).toBe(capacity);

    /**
     * enqueue two nodes using enqueueAll method.
     */
    const subArray = values.slice(0, 2);
    queue.enqueueAll(subArray);
    expect(queue.size).toBe(subArray.length);
    expect(queue.isEmpty).toBe(false);
    expect(queue.isFull).toBe(true);

    /**
     * As the queue is full now, pushing another element
     * should throw a capacity exceeded error.
     */
    expect(
      () => queue && queue.enqueue({ name: "Apple", foundingYear: "1976" })
    ).toThrowError("The queue is full. Cannot insert more nodes.");
  });
});
