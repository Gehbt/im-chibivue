// effect 是作用域
import { createDep } from "./dep";
import type { Dep } from "./dep";

/**
 * @desc target(WeakMap) -> key(Map) -> dep(Set)
 */
type KeyToDepMap = Map<any, Dep>;
/**
 * @data
 * @desc key 为源对象, value 为源对象中 键以及键的缓存
 */
const targetMap = new WeakMap<any, KeyToDepMap>();

type ModuleLevelEffect = {
  activeEffect: ReactiveEffect | undefined;
};
// # Module Level Variable
// 利用模块的特性, 使得同时只会有一个
export const ModuleEffect: ModuleLevelEffect = {
  activeEffect: undefined,
};
// MARK: ReactiveEffect
export class ReactiveEffect<T = any> {
  constructor(
    // 这里的注册的fn 为计算函数, 在更新ReactiveEffect时触发
    /** @effectFn recalculate */ public fn: () => T,
  ) {
    // https://github.com/swc-project/swc/issues/9418
  }
  // 触发 fn运行
  run() {
    // 在执行 fn 之前保存 (模块的)activeEffect，并在执行完后恢复它。
    let saveAffect: ReactiveEffect | undefined = ModuleEffect.activeEffect;
    ModuleEffect.activeEffect = this;
    const res = this.fn();
    ModuleEffect.activeEffect = saveAffect;
    return res;
  }
  /**
   * @ignore
   */
  get [Symbol.toStringTag]() {
    return "ReactiveEffect";
  }
}

// 跟踪: 注入 dep
export function track(target: object, key: PropertyKey): void {
  // 准备: 获取依赖图
  let depsMap = targetMap.get(target);
  let dep: Dep | undefined;
  // 未建立 map
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  } else {
    // 查询, 可能没有
    dep = depsMap.get(key);
  }
  // 没有依赖 建立
  if (!dep) {
    dep = createDep();
  }
  // 设置 依赖
  depsMap.set(key, dep);

  if (ModuleEffect.activeEffect) {
    dep.add(ModuleEffect.activeEffect);
  }
}

/* #__NO_SIDE_EFFECTS__ */
// 触发: 查询dep 并触发
export function trigger(target: object, key?: PropertyKey): void {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;

  const dep = depsMap.get(key);
  if (!dep) return;

  // const effects = /* cloned! */ [...dep];
  for (const effect of dep) {
    effect.run();
  }
}
