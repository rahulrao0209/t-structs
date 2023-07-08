export type CompareFunc<T> = (a: T, b: T) => 1 | -1 | 0;
export type EqualsFunc<T> = (a: T, b: T) => boolean;

export const defaultCompare = function <T>(a: T, b: T) {
  if (a > b) return 1;
  else if (a < b) return -1;
  else return 0;
};

export const defaultEquals = function <T>(a: T, b: T) {
  return a === b;
};
