import { type Dep, createDep } from "./dep";

// target -> key -> dep
type KeyToDepMap = Map<any, Dep>;
const targetMap = new WeakMap<any, KeyToDepMap>();

// # Module Level Namespace
export namespace Effect {
  export let activeEffect: ReactiveEffect | undefined;
}
// MARK: export
export class ReactiveEffect<T = any> {
  constructor(public fn: () => T) {}

  run() {
    let parent: ReactiveEffect | undefined = Effect.activeEffect;
    Effect.activeEffect = this;
    const res = this.fn();
    Effect.activeEffect = parent;
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

  if (Effect.activeEffect) {
    dep.add(Effect.activeEffect);
  }
}

/* #__NO_SIDE_EFFECTS__ */
export function trigger(target: object, key?: PropertyKey) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;

  const dep = depsMap.get(key);
  if (!dep) return;

  const effects = [...dep];
  for (const effect of effects) {
    effect.run();
  }
}
