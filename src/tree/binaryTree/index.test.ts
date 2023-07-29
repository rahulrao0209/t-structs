import BinaryTree from "./index";
import type { EqualsFunc, CompareFunc } from "../../utils";
import { describe, expect, test, beforeEach } from "vitest";

/**
 * Test cases for a general binary tree.
 */
describe("Binary Tree", () => {
  type Vehicle = {
    brand: string;
    cost: number;
  };

  const vehicles: Vehicle[] = [
    {
      brand: "Tata",
      cost: 300,
    },
    {
      brand: "Tesla",
      cost: 800,
    },
    {
      brand: "Mercedes",
      cost: 550,
    },
    {
      brand: "BMW",
      cost: 620,
    },
  ];

  let binaryTree: BinaryTree<Vehicle> | undefined;

  /**
   * Comparison logic for our custom Vehicle type.
   * @param {Vehicle} a
   * @param {Vehicle} b
   * @returns {1 | -1 | 0}
   */
  const compare: CompareFunc<Vehicle> = function (
    a: Vehicle,
    b: Vehicle
  ): 1 | -1 | 0 {
    if (+a.cost > +b.cost) return 1;
    else if (+a.cost < +b.cost) return -1;
    else return 0;
  };

  /**
   * Equality logic for our custom Vehicle type.
   * @param {Vehicle} a
   * @param {Vehicle} b
   * @returns {boolean}
   */
  const equals: EqualsFunc<Vehicle> = function (
    a: Vehicle,
    b: Vehicle
  ): boolean {
    return a.brand === b.brand && +a.cost === +b.cost;
  };

  /** Before each test initialize a new Binary tree. */
  beforeEach(() => {
    binaryTree = new BinaryTree<Vehicle>([], compare, equals);
  });

  test("Initially the binary tree is empty", () => {
    if (!binaryTree) return;
    expect(binaryTree.isEmpty).toBe(true);
    expect(binaryTree.height).toBe(0);
  });

  test("Initialize binary tree with initial set of values", () => {
    binaryTree = new BinaryTree<Vehicle>(vehicles);
    expect(binaryTree.isEmpty).toBe(false);
    expect(binaryTree.height).not.toBe(0);
  });

  test("Add a node/element to the binary tree using insert", () => {
    if (!binaryTree) return;
    expect(binaryTree.isEmpty).toBe(true);
    expect(binaryTree.height).toBe(0);

    /** Insert a node using insert method. */
    const node = {
      brand: "Ferrari",
      cost: 900,
    };
    binaryTree.insert(node);

    expect(binaryTree.isEmpty).toBe(false);
    expect(binaryTree.height).not.toBe(0);
    expect(binaryTree.root?.value).toEqual(node);
  });

  test("Add multiple nodes/elements to the binary tree using insertAll", () => {
    if (!binaryTree) return;
    expect(binaryTree.isEmpty).toBe(true);
    expect(binaryTree.height).toBe(0);

    /** Insert multiple nodes using insertAll */
    binaryTree.insertAll(vehicles);
    expect(binaryTree.isEmpty).toBe(false);
    expect(binaryTree.height).not.toBe(0);
  });

  test("If a node/element value exists in the binary tree using has", () => {
    if (!binaryTree) return;
    expect(binaryTree.isEmpty).toBe(true);

    /** Insert multiple nodes using insertAll */
    binaryTree.insertAll(vehicles);
    expect(binaryTree.isEmpty).toBe(false);

    /** Check whether the values we added exist in the binary tree */
    vehicles.forEach((vehicle: Vehicle) => expect(binaryTree?.has(vehicle)));
  });

  test("Pre-order traversal", () => {
    if (!binaryTree) return;
    expect(binaryTree.isEmpty).toBe(true);

    /** Insert multiple nodes using insertAll */
    binaryTree.insertAll(vehicles);
    expect(binaryTree.isEmpty).toBe(false);

    /** Traverse and get all the nodes using pre-order traversal */
    const preOrderValues = binaryTree.traverse("PRE_ORDER");

    /** Verify whether all the nodes have been traversed */
    const set = new Set(vehicles);
    preOrderValues.forEach((v: Vehicle) => {
      expect(set.has(v)).toBe(true);
    });
  });

  test("Post-order traversal", () => {
    if (!binaryTree) return;
    expect(binaryTree.isEmpty).toBe(true);

    /** Insert multiple nodes using insertAll */
    binaryTree.insertAll(vehicles);
    expect(binaryTree.isEmpty).toBe(false);

    /** Traverse and get all the nodes using post-order traversal */
    const postOrderValues = binaryTree.traverse("POST_ORDER");

    /** Verify whether all the nodes have been traversed */
    const set = new Set(vehicles);
    postOrderValues.forEach((v: Vehicle) => {
      expect(set.has(v)).toBe(true);
    });
  });

  test("In-order traversal", () => {
    if (!binaryTree) return;
    expect(binaryTree.isEmpty).toBe(true);

    /** Insert multiple nodes using insertAll */
    binaryTree.insertAll(vehicles);
    expect(binaryTree.isEmpty).toBe(false);

    /** Traverse and get all the nodes using in-order traversal */
    const postOrderValues = binaryTree.traverse("IN_ORDER");

    /** Verify whether all the nodes have been traversed */
    const set = new Set(vehicles);
    postOrderValues.forEach((v: Vehicle) => {
      expect(set.has(v)).toBe(true);
    });
  });

  test("Level-order traversal / Breadth first traversal", () => {
    if (!binaryTree) return;
    expect(binaryTree.isEmpty).toBe(true);

    /** Insert multiple nodes using insertAll */
    binaryTree.insertAll(vehicles);
    expect(binaryTree.isEmpty).toBe(false);

    /** Traverse and get all the nodes using level-order(breadth-first-search) traversal */
    const postOrderValues = binaryTree.traverse("LEVEL_ORDER");

    /** Verify whether all the nodes have been traversed */
    const set = new Set(vehicles);
    postOrderValues.forEach((v: Vehicle) => {
      expect(set.has(v)).toBe(true);
    });
  });

  test("Removal of nodes from binary tree using remove", () => {
    if (!binaryTree) return;
    expect(binaryTree.isEmpty).toBe(true);
    expect(binaryTree.height).toBe(0);

    /** Insert multiple nodes using insertAll */
    binaryTree.insertAll(vehicles);
    expect(binaryTree.isEmpty).toBe(false);
    expect(binaryTree.height).not.toBe(0);

    /** Remove each node and verify if its being removed using the has method. */
    vehicles.forEach((v: Vehicle) => {
      expect(binaryTree?.has({ ...v })).toBe(true);
      binaryTree?.remove({ ...v });
      expect(binaryTree?.has({ ...v })).toBe(false);
    });

    /** Verify that the binary tree is empty after removal of all nodes in the previous operation */
    expect(binaryTree.isEmpty).toBe(true);
    expect(binaryTree.height).toBe(0);
  });

  test("Deleting binary tree using delete", () => {
    if (!binaryTree) return;
    expect(binaryTree.isEmpty).toBe(true);
    expect(binaryTree.height).toBe(0);
    expect(binaryTree.root).toBeNull();

    /** Insert mulitple nodes using insertAll */
    binaryTree.insertAll(vehicles);
    expect(binaryTree.isEmpty).toBe(false);
    expect(binaryTree.height).not.toBe(0);
    expect(binaryTree.root).not.toBeNull();

    /** Delete the binary tree using delete */
    binaryTree.delete();
    expect(binaryTree.isEmpty).toBe(true);
    expect(binaryTree.height).toBe(0);
    expect(binaryTree.root).toBeNull();
  });
});
