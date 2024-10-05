export type AnyFunction = (...args: any[]) => unknown;
// builtin
// export type VoidFunction = (...args: any[]) => void;
/** @async */
export type AsyncFunction = (...args: any[]) => Promise<any>;
export const NOOP: AnyFunction = () => {};

export const isAsyncFunction = (fn: object): fn is AsyncFunction => {
  return Symbol.toStringTag in fn && fn[Symbol.toStringTag] === "AsyncFunction";
};
