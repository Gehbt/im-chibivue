export type AnyFunction = (...args: any[]) => unknown;
export type VoidFunction = (...args: any[]) => void;
export const NOOP: AnyFunction = () => {};
