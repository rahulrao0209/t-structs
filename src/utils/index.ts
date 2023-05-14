export type CompareFunc<T> = (a: T, b: T) => number;

export const defaultCompare = <T>(a: T, b: T) => {
  if (a < b) return -1;
  else if (a === b) return 0;
  else return 1;
};
