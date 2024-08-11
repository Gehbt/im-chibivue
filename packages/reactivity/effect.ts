import { type Dep, createDep } from "./dep";

// target -> key -> dep
type KeyToDepMap = Map<any, Dep>;
const targetMap = new WeakMap<any, KeyToDepMap>();

// # Module Level
export let activeEffect: ReactiveEffect | undefined;

export class ReactiveEffect<T = any> {
  constructor(fn: () => T) {
    this.fn = fn;
  }
  fn: () => T;

  run() {
    let parent: ReactiveEffect | undefined = activeEffect;
    activeEffect = this;
    const res = this.fn();
    activeEffect = parent;
    return res;
  }
  get [Symbol.toStringTag]() {
    return "ReactiveEffect";
  }
}

export function track(target: object, key: PropertyKey) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = createDep();
    depsMap.set(key, dep);
  }

  if (activeEffect) {
    dep.add(activeEffect);
  }
}

/* @__NO_SIDE_EFFECTS__ */
export function trigger(target: object, key?: PropertyKey) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;

  const dep = depsMap.get(key);

  if (dep) {
    const effects = [...dep];
    for (const effect of effects) {
      effect.run();
    }
  }
}
