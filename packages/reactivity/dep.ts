import type { ReactiveEffect } from "./effect";

// Dependency set, 1 -> n
export type Dep = Set<ReactiveEffect>;

/**
 * @takeover vein
 */
class DepSet<T> extends Set<T> {
  override get [Symbol.toStringTag]() {
    return "DependencySet";
  }
}

/**
 * @desc A.K.A. init Dep Set
 */
export const createDep = (effects?: ReactiveEffect[]): Dep => {
  const dep: Dep = new DepSet<ReactiveEffect>(effects);
  // TODO: more?
  return dep;
};
