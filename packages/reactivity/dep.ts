import type { ReactiveEffect } from "./effect";
// Dependency set
export type Dep = Set<ReactiveEffect>;

/**
 * @desc A.K.A. init Dep Set
 */
export const createDep = (effects?: ReactiveEffect[]): Dep => {
  const dep: Dep = new Set<ReactiveEffect>(effects);
  // TODO: more?
  return dep;
};
