import { track, trigger } from "./effect";
declare const __proxied__: unique symbol;
type Proxied<O> = O & { [__proxied__]?: 1 };
type ProxyFunction<T extends object> = (target: T) => /* be proxy */ Proxied<T>;

export const mutableHandlersMaker: <T extends object>(
  reactive: ProxyFunction<T>,
) => ProxyHandler<T> = (reactive: ProxyFunction<any>) => ({
  get(target: object, key, receiver: object): any {
    if (key === Symbol.toStringTag) return "Reactive";
    // #region  doTrack
    // 在 get 前, 跟踪 effect
    (() => {
      // 读的时候 lazy get
      // -- 检查单个属性的 dirty flag，刷新这个属性
      track(target, key);
    })();
    // #endregion
    const res = Reflect.get(target, key, receiver);

    if (isNonNullObject(res)) {
      return reactive(res);
    } else {
      return res;
    }
  },

  set(target: object, key, value: unknown, receiver: object): boolean {
    let oldValue = target[key as keyof typeof target];
    const res = Reflect.set(target, key, value, receiver);
    // #region doTrigger
    // 在 set 后, 触发 effect
    (() => {
      // set 的时候 eager 更新
      if (hasChanged(value, oldValue)) {
        trigger(target, key);
      }
    })();
    // #endregion
    return res;
  },
});

function isNonNullObject<T extends object | null>(obj: T): obj is NonNullable<T> {
  return obj !== null && typeof obj === "object";
}

/**
 * @desc 对比新旧值是否有变化
 */
function hasChanged(value: unknown, oldValue: unknown): boolean {
  return !Object.is(value, oldValue);
}
