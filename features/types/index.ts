/**
 * ### Prettify a type to clear its compositions.
 *
 * @example
 * type Example1 = { example1: string; }
 * type Example2 = { example2: boolean; }
 * type Result1 = Example1 & Example2; // Example1 & Example2
 * type Result2 = Prettify<Example1 & Example2>; // { example1: string; example2: boolean; }
 */
export type Prettify<T> = {
  [k in keyof T]: T[k];
} & {};
