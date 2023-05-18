import { MaxHeap, MinHeap } from "./src/index";

// const heap = new MaxHeap([22, 33, 45, 21]);
// console.log("max heap size: ", heap.size);
// console.log("max heap data: ", heap.heapData);
// console.log("Peek: ", heap.peek());

type Population = {
  name: string;
  population: number;
};

const ind: Population = {
  name: "India",
  population: 1000,
};

const chi: Population = {
  name: "China",
  population: 800,
};

const england: Population = {
  name: "England",
  population: 550,
};

const aus: Population = {
  name: "Australia",
  population: 45,
};

const germany: Population = {
  name: "Germany",
  population: 900,
};

const spain: Population = {
  name: "Spain",
  population: 300,
};

const italy: Population = {
  name: "Italy",
  population: 400,
};

const usa: Population = {
  name: "Usa",
  population: 700,
};

const comp = function (val1: Population, val2: Population) {
  if (val1.population > val2.population) return 1;
  else if (val1.population === val2.population) return 0;
  else return -1;
};

const heap2 = new MaxHeap<Population>(
  [chi, usa, ind, england, spain, germany, italy, aus],
  comp
);

const heap3 = new MinHeap<Population>(
  [chi, usa, ind, england, spain, germany, italy, aus],
  comp
);

console.log("max heap size: ", heap2.size);
console.log("max heap data: ", heap2.heapData);

console.log("Peek: ", heap2.peek());
console.log("Extract: ", heap2.extract());
console.log("Extract: ", heap2.extract());
console.log("Extract: ", heap2.extract());
console.log("Extract: ", heap2.extract());
console.log("Extract: ", heap2.extract());
console.log("Extract: ", heap2.extract());
console.log("Extract: ", heap2.extract());
console.log("Extract: ", heap2.extract());
console.log("Extract: ", heap2.extract());
console.log("Extract: ", heap2.extract());
console.log("Extract: ", heap2.extract());
console.log("Extract: ", heap2.extract());
console.log("Extract: ", heap2.extract());
console.log("Extract: ", heap2.extract());

console.log("Peek: ", heap3.peek());
console.log("Extract: ", heap3.extract());
console.log("Extract: ", heap3.extract());
console.log("Extract: ", heap3.extract());
console.log("Extract: ", heap3.extract());
console.log("Extract: ", heap3.extract());
console.log("Extract: ", heap3.extract());
console.log("Extract: ", heap3.extract());
console.log("Extract: ", heap3.extract());
console.log("Extract: ", heap3.extract());
console.log("Extract: ", heap3.extract());
console.log("Extract: ", heap3.extract());
console.log("Extract: ", heap3.extract());
console.log("Extract: ", heap3.extract());
console.log("Extract: ", heap3.extract());

const maxBinaryHeap = new MaxHeap([0, 1, 2, 3, 4, 5, 6, 7]);

console.log(maxBinaryHeap.heapData);
console.log(maxBinaryHeap.extract());
console.log(maxBinaryHeap.extract());
console.log(maxBinaryHeap.extract());
console.log(maxBinaryHeap.extract());
console.log(maxBinaryHeap.extract());
console.log(maxBinaryHeap.extract());
console.log(maxBinaryHeap.extract());
console.log(maxBinaryHeap.extract());
console.log(maxBinaryHeap.heapData);

const maxBinaryHeap2 = new MaxHeap([0, 1, 2, 3, 4, 5, 6, 7]);

console.log(maxBinaryHeap2.heapData);
console.log(maxBinaryHeap2.extract());
console.log(maxBinaryHeap2.extract());
console.log(maxBinaryHeap2.extract());
console.log(maxBinaryHeap2.extract());
console.log(maxBinaryHeap2.extract());
console.log(maxBinaryHeap2.extract());
console.log(maxBinaryHeap2.extract());
console.log(maxBinaryHeap2.extract());
console.log(maxBinaryHeap2.heapData);
