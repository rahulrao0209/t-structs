import Stack from "./index";
import { describe, expect, test, beforeEach, afterEach } from "vitest";

/**
 * Test cases for stack
 */
describe("Stack", () => {
  type Company = {
    name: string;
    foundingYear: string;
  };

  let stack: Stack<Company> | undefined;

  /**
   * Before each test case, initialize a new stack.
   */
  beforeEach(() => {
    stack = new Stack<Company>();
  });

  /**
   * After each test case, populate the stack with list
   * of values.
   */
  //   afterEach(() => {
  //     const values = [
  //       { name: "Google", foundingYear: "1998" },
  //       { name: "Microsoft", foundingYear: "1975" },
  //       { name: "Amazon", foundingYear: "1994" },
  //       { name: "Apple", foundingYear: "1976" },
  //     ];

  //     if (!stack) stack = new Stack<Company>();
  //     stack.pushAll(values);
  //   });

  test("Initially the stack is empty", () => {
    if (!stack) return;
    expect(stack.size).toBe(0);
    expect(stack.isEmpty).toBe(true);
    expect(stack.isFull).toBe(false);
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

  test("pushAll method adds list of values to the stack", () => {});
});
