import MaxHeap from "./index";
import { EqualsFunc, defaultCompare, defaultEquals } from "../../utils";
import { describe, expect, test, beforeEach } from "vitest";

/**
 * Test cases for MaxHeap
 */
describe("MaxHeap", () => {
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

  let maxHeap: MaxHeap<Company> | undefined;

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
    maxHeap = new MaxHeap<Company>();
  });

  test("initially the heap is empty", () => {
    if (!maxHeap) return;
    expect(maxHeap.isEmpty()).toBe(true);
    expect(maxHeap.size).toBe(0);
  });

  test("add heap values during initialization", () => {
    maxHeap = new MaxHeap<Company>(values, compare);

    expect(maxHeap.isEmpty()).toBe(false);
    expect(maxHeap.size).toBe(values.length);
  });

  test("contains method returns whether an element/value is present in the heap", () => {
    maxHeap = new MaxHeap<Company>(values, compare, equals);

    /**
     * Check that a given value exists in the heap.
     */
    expect(
      maxHeap.contains({
        name: "Atlassian",
        foundingYear: "2002",
      })
    ).toBe(true);

    /**
     * Check that a given value does not exist in the heap.
     */
    expect(
      maxHeap.contains({
        name: "TCS",
        foundingYear: "1968",
      })
    ).toBe(false);

    /**
     * Check contains method for primitive types
     */
    const numHeap = new MaxHeap([5, 24, 22, 111, 2, 6]);
    expect(numHeap.contains(111)).toBe(true);
    expect(numHeap.contains(1000)).toBe(false);
  });

  test("insert method inserts adds an element to the heap", () => {
    maxHeap = new MaxHeap<Company>([], compare);

    /**
     * Initially the heap is empty
     */
    expect(maxHeap.isEmpty()).toBe(true);
    expect(maxHeap.size).toBe(0);

    /**
     * Add an element to the heap using insert
     */
    maxHeap.insert({
      name: "Microsoft",
      foundingYear: "1975",
    });

    expect(maxHeap.isEmpty()).toBe(false);
    expect(maxHeap.size).toBe(1);
  });

  test("insertAll method adds a list of elements to the heap", () => {
    maxHeap = new MaxHeap<Company>([], compare);

    expect(maxHeap.isEmpty()).toBe(true);
    expect(maxHeap.size).toBe(0);

    /* Add a list of elements using insert all method */
    maxHeap.insertAll(values);
    expect(maxHeap.isEmpty()).toBe(false);
    expect(maxHeap.size).toBe(values.length);
  });

  test("peek method returns the top element/value of the heap without removing it", () => {
    maxHeap = new MaxHeap<Company>(values, compare);

    const initialSize = maxHeap.size;
    expect(maxHeap.isEmpty()).toBe(false);
    expect(maxHeap.size).toBe(values.length);

    expect(maxHeap.peek()).toEqual({
      name: "Atlassian",
      foundingYear: "2002",
    });
    expect(maxHeap.size).toBe(initialSize);

    /* Check peek method for primitives */
    const nums = [5, 24, 22, 111, 2, 6];
    const numHeap = new MaxHeap(nums);
    expect(numHeap.size).toBe(nums.length);
    expect(numHeap.peek()).toBe(111);
  });
});
