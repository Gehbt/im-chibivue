import { type ReactiveEffect } from "./effect";

export type Dep = Set<ReactiveEffect>;

/**
 * @desc A.K.A. createDepSet
 */
export const createDep = (effects?: ReactiveEffect[]): Dep => {
  const dep: Dep = new Set<ReactiveEffect>(effects);
  // TODO: more
  return dep;
};
