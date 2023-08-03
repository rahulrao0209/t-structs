import BinarySearchTree from "./index";
import type { EqualsFunc, CompareFunc } from "../../utils";
import { describe, expect, test, beforeEach } from "vitest";

/**
 * Test cases for Binary Search Tree.
 */
describe("Binary Search Tree", () => {
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
    {
      brand: "Jeep",
      cost: 600,
    },
    {
      brand: "Toyota",
      cost: 400,
    },
  ];

  let binarySearchTree: BinarySearchTree<Vehicle> | undefined;

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
    binarySearchTree = new BinarySearchTree<Vehicle>([], compare, equals);
  });

  test("Initially the binary search tree is empty", () => {
    if (!binarySearchTree) return;
    expect(binarySearchTree.isEmpty).toBe(true);
    expect(binarySearchTree.height).toBe(0);
  });

  test("Initialize binary search tree with initial set of values", () => {
    binarySearchTree = new BinarySearchTree<Vehicle>(vehicles);
    expect(binarySearchTree.isEmpty).toBe(false);
    expect(binarySearchTree.height).not.toBe(0);
  });

  test("Add a node/element to the binary search tree using insert", () => {
    if (!binarySearchTree) return;
    expect(binarySearchTree.isEmpty).toBe(true);
    expect(binarySearchTree.height).toBe(0);

    /** Insert a node using the insert method */
    const node: Vehicle = {
      brand: "Porsche",
      cost: 750,
    };
    binarySearchTree.insert(node);

    expect(binarySearchTree.isEmpty).toBe(false);
    expect(binarySearchTree.height).not.toBe(0);
    expect(binarySearchTree.root?.value).toEqual({ ...node });
  });

  test("Add multiple nodes/elements to the binary search tree using insert", () => {
    if (!binarySearchTree) return;
    expect(binarySearchTree.isEmpty).toBe(true);
    expect(binarySearchTree.height).toBe(0);

    /** Insert multiple nodes using the insert method */
    binarySearchTree.insert(vehicles[0]);
    binarySearchTree.insert(vehicles[1], vehicles[2]);

    /** Verify whether all the nodes/elements have been added using has */
    expect(binarySearchTree.isEmpty).toBe(false);
    expect(binarySearchTree.height).not.toBe(0);

    vehicles.forEach((v: Vehicle, idx: number) => {
      if (idx > 2) return;
      expect(binarySearchTree?.has(v)).toBe(true);
    });
  });

  test("Add multiple nodes/elements to the binary search tree using insertAll", () => {
    if (!binarySearchTree) return;
    expect(binarySearchTree.isEmpty).toBe(true);
    expect(binarySearchTree.height).toBe(0);

    /** Insert multiple nodes using insertAll */
    binarySearchTree.insertAll(vehicles);
    expect(binarySearchTree.isEmpty).toBe(false);
    expect(binarySearchTree.height).not.toBe(0);
  });

  test("If a node/element value exists in the binary search tree using has", () => {
    if (!binarySearchTree) return;
    expect(binarySearchTree.isEmpty).toBe(true);
    expect(binarySearchTree.height).toBe(0);

    /** Insert multiple nodes using insertAll */
    binarySearchTree.insertAll(vehicles);
    expect(binarySearchTree.isEmpty).toBe(false);
    expect(binarySearchTree.height).not.toBe(0);

    /** Check whether the values we added exist in the binary search tree */
    vehicles.forEach((vehicle: Vehicle) =>
      expect(binarySearchTree?.has(vehicle))
    );
  });

  test("Pre-order traversal", () => {
    if (!binarySearchTree) return;
    expect(binarySearchTree.isEmpty).toBe(true);

    /** Insert multiple nodes using insertAll */
    binarySearchTree.insertAll(vehicles);
    expect(binarySearchTree.isEmpty).toBe(false);

    /** Expected pre-order ordering based on vehicle cost property */
    const expectedPreOrder: Vehicle[] = [
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
        brand: "Toyota",
        cost: 400,
      },
      {
        brand: "BMW",
        cost: 620,
      },
      {
        brand: "Jeep",
        cost: 600,
      },
    ];

    /** Traverse and get all the nodes using pre-order traversal */
    const preOrderValues = binarySearchTree.traverse("PRE_ORDER");

    /** Verify the ordering obtained with the expected ordering */
    preOrderValues.forEach((v: Vehicle, idx: number) => {
      expect(v).toEqual(expectedPreOrder[idx]);
    });
  });

  test("Post-order traversal", () => {
    if (!binarySearchTree) return;
    expect(binarySearchTree.isEmpty).toBe(true);

    /** Insert multiple nodes using insertAll */
    binarySearchTree.insertAll(vehicles);
    expect(binarySearchTree.isEmpty).toBe(false);

    /** Expected post-order ordering based on vehicle cost property */
    const expectedPostOrder: Vehicle[] = [
      {
        brand: "Toyota",
        cost: 400,
      },
      {
        brand: "Jeep",
        cost: 600,
      },
      {
        brand: "BMW",
        cost: 620,
      },
      {
        brand: "Mercedes",
        cost: 550,
      },
      {
        brand: "Tesla",
        cost: 800,
      },
      {
        brand: "Tata",
        cost: 300,
      },
    ];

    /** Traverse and get all the nodes using post-order traversal */
    const postOrderValues = binarySearchTree.traverse("POST_ORDER");

    /** Verify the ordering obtained with the expected ordering */
    postOrderValues.forEach((v: Vehicle, idx: number) => {
      expect(v).toEqual(expectedPostOrder[idx]);
    });
  });

  test("In-order traversal", () => {
    if (!binarySearchTree) return;
    expect(binarySearchTree.isEmpty).toBe(true);

    /** Insert multiple nodes using insertAll */
    binarySearchTree.insertAll(vehicles);
    expect(binarySearchTree.isEmpty).toBe(false);

    /** Expected in-order ordering based on vehicle cost property */
    const expectedInOrder: Vehicle[] = [
      {
        brand: "Tata",
        cost: 300,
      },
      {
        brand: "Toyota",
        cost: 400,
      },
      {
        brand: "Mercedes",
        cost: 550,
      },
      {
        brand: "Jeep",
        cost: 600,
      },
      {
        brand: "BMW",
        cost: 620,
      },
      {
        brand: "Tesla",
        cost: 800,
      },
    ];

    /** Traverse and get all the nodes using in-order traversal */
    const inOrderValues = binarySearchTree.traverse("IN_ORDER");

    /** Verify the ordering obtained with the expected ordering */
    inOrderValues.forEach((v: Vehicle, idx: number) => {
      expect(v).toEqual(expectedInOrder[idx]);
    });
  });

  test("Level-order traversal", () => {
    if (!binarySearchTree) return;
    expect(binarySearchTree.isEmpty).toBe(true);

    /** Insert multiple nodes using insertAll */
    binarySearchTree.insertAll(vehicles);
    expect(binarySearchTree.isEmpty).toBe(false);

    /** Expected level-order ordering based on vehicle cost property */
    const expectedLevelOrder: Vehicle[] = [
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
        brand: "Toyota",
        cost: 400,
      },
      {
        brand: "BMW",
        cost: 620,
      },
      {
        brand: "Jeep",
        cost: 600,
      },
    ];

    /** Traverse and get all the nodes using level-order traversal */
    const levelOrderValues = binarySearchTree.traverse("LEVEL_ORDER");

    /** Verify the ordering obtained with the expected ordering */
    levelOrderValues.forEach((v: Vehicle, idx: number) => {
      expect(v).toEqual(expectedLevelOrder[idx]);
    });
  });

  test("Removal of nodes from the binary search tree using remove", () => {
    if (!binarySearchTree) return;
    expect(binarySearchTree.isEmpty).toBe(true);
    expect(binarySearchTree.height).toBe(0);

    /** Insert multiple nodes using insertAll */
    binarySearchTree.insertAll(vehicles);
    expect(binarySearchTree.isEmpty).toBe(false);
    expect(binarySearchTree.height).not.toBe(0);

    /** Remove each node and verify if its being removed using the has method. */
    vehicles.forEach((v: Vehicle) => {
      expect(binarySearchTree?.has({ ...v })).toBe(true);
      binarySearchTree?.remove({ ...v });
      expect(binarySearchTree?.has({ ...v })).toBe(false);
    });

    /** Verify that the binary search tree is empty after removal of all nodes in the previous operation */
    expect(binarySearchTree.isEmpty).toBe(true);
    expect(binarySearchTree.height).toBe(0);
  });

  test("Removing nodes from a binary search tree with duplicates", () => {
    if (!binarySearchTree) return;
    expect(binarySearchTree.isEmpty).toBe(true);
    expect(binarySearchTree.height).toBe(0);

    /** Insert multiple nodes using insertAll */
    binarySearchTree.insertAll(vehicles);
    expect(binarySearchTree.isEmpty).toBe(false);
    expect(binarySearchTree.height).not.toBe(0);

    /** Add duplicates */
    const duplicateVehicles = vehicles.slice(2, vehicles.length);
    binarySearchTree.insertAll(duplicateVehicles);

    /** Verify if all nodes are present in the tree using has */
    vehicles.forEach((v: Vehicle) =>
      expect(binarySearchTree?.has(v)).toBe(true)
    );

    /** Remove all nodes from the tree using remove */
    [...vehicles, ...duplicateVehicles].forEach((v: Vehicle) => {
      binarySearchTree?.remove({ ...v });
    });

    /** Verify if all the nodes are removed from the tree using has */
    vehicles.forEach((v: Vehicle) =>
      expect(binarySearchTree?.has(v)).toBe(false)
    );

    /** Verify whether the tree is empty again and the height is zero */
    expect(binarySearchTree.isEmpty).toBe(true);
    expect(binarySearchTree.height).toBe(0);
  });

  test("Deleting the binary search tree using delete", () => {
    if (!binarySearchTree) return;
    expect(binarySearchTree.isEmpty).toBe(true);
    expect(binarySearchTree.height).toBe(0);
    expect(binarySearchTree.root).toBeNull();

    /** Insert mulitple nodes using insertAll */
    binarySearchTree.insertAll(vehicles);
    expect(binarySearchTree.isEmpty).toBe(false);
    expect(binarySearchTree.height).not.toBe(0);
    expect(binarySearchTree.root).not.toBeNull();

    /** Delete the binary tree using delete */
    binarySearchTree.delete();
    expect(binarySearchTree.isEmpty).toBe(true);
    expect(binarySearchTree.height).toBe(0);
    expect(binarySearchTree.root).toBeNull();
  });
});
