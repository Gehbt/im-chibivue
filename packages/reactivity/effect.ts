import { type Dep, createDep } from "./dep";

// target -> key -> dep
type KeyToDepMap = Map<any, Dep>;
/**
 * @desc key 为源对象, value 为源对象中 键以及键的缓存
 */
const targetMap = new WeakMap<any, KeyToDepMap>();

// # Module Level Namespace
export namespace Effect {
  export let activeEffect: ReactiveEffect | undefined;
}
// MARK: export
export class ReactiveEffect<T = any> {
  constructor(
    // 这里的注册的fn 为在更新ReactiveEffect时触发
    /** @rerun */ fn: () => T,
  ) {
    // https://github.com/swc-project/swc/issues/9418
    this.fn = fn;
  }
  fn: () => T;
  // 触发 fn运行
  run() {
    // 在执行 fn 之前保存 (模块的)activeEffect，并在执行完后恢复它。
    let saveAffect: ReactiveEffect | undefined = Effect.activeEffect;
    Effect.activeEffect = this;
    const res = this.fn();
    Effect.activeEffect = saveAffect;
    return res;
  }
  get [Symbol.toStringTag]() {
    return "ReactiveEffect";
  }
}

// 跟踪: 注入 dep
export function track(target: object, key: PropertyKey): void {
  let depsMap = targetMap.get(target);
  let dep: Dep | undefined;

  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  } else {
    // 查询, 可能没有
    dep = depsMap.get(key);
  }

  if (!dep) {
    dep = createDep();
  }

  depsMap.set(key, dep);

  if (Effect.activeEffect) {
    dep.add(Effect.activeEffect);
  }
}

/* #__NO_SIDE_EFFECTS__ */
// 触发: 查询dep 并触发
export function trigger(target: object, key?: PropertyKey): void {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;

  const dep = depsMap.get(key);
  if (!dep) return;

  const effects = [...dep];
  for (const effect of effects) {
    effect.run();
  }
}
