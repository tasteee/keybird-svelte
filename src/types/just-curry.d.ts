/**
 * A currying function that allows partial application of arguments.
 * 
 * @param fn The function to be curried.
 * @param args Initial arguments to be applied to the function.
 * @returns Either the result of the function if all arguments are provided,
 *          or a new function expecting the remaining arguments.
 */

declare module 'just-curry' {
  function justCurry<T extends (...args: any[]) => any>(
    fn: T,
    ...args: Parameters<T>
  ): T extends (...args: infer P) => infer R
    ? P extends [...Parameters<T>, ...infer _]
      ? R
      : (...args: Partial<Parameters<T>>) => ReturnType<T>;

  export = justCurry;
}