import MinHeap from "./index";
import { EqualsFunc } from "../../../utils";
import { describe, expect, test, beforeEach } from "vitest";

/**
 * Test cases for MinHeap
 */
describe("MinHeap", () => {
  type Company = {
    name: string;
    foundingYear: string;
  };

  const values = [
    { name: "Google", foundingYear: "1998" },
    { name: "Microsoft", foundingYear: "1975" },
    { name: "Amazon", foundingYear: "1994" },
    { name: "Atlassian", foundingYear: "2002" },
    { name: "Apple", foundingYear: "1976" },
  ];

  let minHeap: MinHeap<Company> | undefined;

  /**
   * Comparison logic for our custom company type.
   * @param {Company} a
   * @param {Company} b
   * @returns {number}
   */
  const compare = function (a: Company, b: Company): number {
    if (+a.foundingYear > +b.foundingYear) return 1;
    else if (+a.foundingYear < +b.foundingYear) return -1;
    else return 0;
  };

  /**
   * Equality logic for our custom company type.
   * @param {Company} a
   * @param {Company} b
   * @returns {boolean}
   */
  const equals: EqualsFunc<Company> = function (
    a: Company,
    b: Company
  ): boolean {
    return a.name === b.name && a.foundingYear === b.foundingYear;
  };

  /**
   * Before each test initialize a new heap.
   */
  beforeEach(() => {
    minHeap = new MinHeap<Company>();
  });

  test("initially the heap is empty", () => {
    if (!minHeap) return;
    expect(minHeap.isEmpty()).toBe(true);
    expect(minHeap.size).toBe(0);
  });

  test("add heap values during initialization", () => {
    minHeap = new MinHeap<Company>(values, compare);

    expect(minHeap.isEmpty()).toBe(false);
    expect(minHeap.size).toBe(values.length);
  });

  test("has method returns whether an element/value is present in the heap", () => {
    minHeap = new MinHeap<Company>(values, compare, equals);

    /**
     * Check that a given value exists in the heap.
     */
    expect(
      minHeap.has({
        name: "Atlassian",
        foundingYear: "2002",
      })
    ).toBe(true);

    /**
     * Check that a given value does not exist in the heap.
     */
    expect(
      minHeap.has({
        name: "TCS",
        foundingYear: "1968",
      })
    ).toBe(false);

    /**
     * Check has method for primitive types
     */
    const numHeap = new MinHeap([5, 24, 22, 111, 2, 6]);
    expect(numHeap.has(111)).toBe(true);
    expect(numHeap.has(1000)).toBe(false);
  });

  test("insert method inserts adds an element to the heap", () => {
    minHeap = new MinHeap<Company>([], compare);

    /**
     * Initially the heap is empty
     */
    expect(minHeap.isEmpty()).toBe(true);
    expect(minHeap.size).toBe(0);

    /**
     * Add an element to the heap using insert
     */
    minHeap.insert({
      name: "Microsoft",
      foundingYear: "1975",
    });

    expect(minHeap.isEmpty()).toBe(false);
    expect(minHeap.size).toBe(1);
  });

  test("insertAll method adds a list of elements to the heap", () => {
    minHeap = new MinHeap<Company>([], compare);

    expect(minHeap.isEmpty()).toBe(true);
    expect(minHeap.size).toBe(0);

    /* Add a list of elements using insert all method */
    minHeap.insertAll(values);
    expect(minHeap.isEmpty()).toBe(false);
    expect(minHeap.size).toBe(values.length);
  });

  test("peek method returns the top element/value of the heap without removing it", () => {
    minHeap = new MinHeap<Company>(values, compare);

    const initialSize = minHeap.size;
    expect(minHeap.isEmpty()).toBe(false);
    expect(minHeap.size).toBe(values.length);

    expect(minHeap.peek()).toEqual({
      name: "Microsoft",
      foundingYear: "1975",
    });
    expect(minHeap.size).toBe(initialSize);

    /* Check peek method for primitives */
    const nums = [5, 24, 22, 111, 2, 6];
    const numHeap = new MinHeap(nums);
    expect(numHeap.size).toBe(nums.length);
    expect(numHeap.peek()).toBe(2);
  });

  test("extract method removes and returns the top element in the heap", () => {
    minHeap = new MinHeap<Company>(values, compare);

    const initialSize = minHeap.size;
    expect(minHeap.isEmpty()).toBe(false);
    expect(initialSize).toBe(values.length);

    expect(minHeap.extract()).toEqual({
      name: "Microsoft",
      foundingYear: "1975",
    });
    expect(minHeap.size).toBe(values.length - 1);

    expect(minHeap.extract()).toEqual({ name: "Apple", foundingYear: "1976" });
    expect(minHeap.size).toBe(values.length - 2);

    expect(minHeap.extract()).toEqual({ name: "Amazon", foundingYear: "1994" });
    expect(minHeap.size).toBe(values.length - 3);

    expect(minHeap.extract()).toEqual({ name: "Google", foundingYear: "1998" });
    expect(minHeap.size).toBe(values.length - 4);

    expect(minHeap.extract()).toEqual({
      name: "Atlassian",
      foundingYear: "2002",
    });
    expect(minHeap.size).toBe(0);
    expect(minHeap.isEmpty()).toBe(true);

    /* Check extract method for primitive values */
    const nums = [5, 24, 22, 111, 2, 6];
    const numHeap = new MinHeap(nums);

    expect(numHeap.isEmpty()).toBe(false);
    expect(numHeap.size).toBe(nums.length);

    /* Extract all values one by one */
    expect(numHeap.extract()).toBe(2);
    expect(numHeap.extract()).toBe(5);
    expect(numHeap.extract()).toBe(6);
    expect(numHeap.extract()).toBe(22);
    expect(numHeap.extract()).toBe(24);
    expect(numHeap.extract()).toBe(111);

    expect(numHeap.size).toBe(0);
    expect(numHeap.isEmpty()).toBe(true);
  });
});
