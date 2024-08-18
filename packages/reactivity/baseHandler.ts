import { track, trigger } from "./effect";

type ProxyFunction<T extends object> = (target: T) => T;

export const mutableHandlersMaker: <T extends object>(
  reactive: ProxyFunction<T>,
) => ProxyHandler<T> = (reactive) => ({
  get(target: object, key, receiver: object): any {
    // Object.prototype.toString.call(Proxy_Obj) === "Reactive"
    if (key === Symbol.toStringTag) return "Reactive";
    // #region  doTrack
    // 在 get 前, 跟踪 effect
    (() => {
      track(target, key);
    })();
    // #endregion
    const res = Reflect.get(target, key, receiver);

    if (res !== null && typeof res === "object") {
      return reactive(res);
    } else {
      return res;
    }
  },

  set(target: object, key, value: unknown, receiver: object): boolean {
    let oldValue = target[key as keyof typeof target];
    Reflect.set(target, key, value, receiver);
    // #region doTrigger
    // 在 set 后, 触发 effect
    (() => {
      if (hasChanged(value, oldValue)) {
        trigger(target, key);
      }
    })();
    // #endregion
    return true;
  },
});

function hasChanged(
  value: unknown,
  oldValue: unknown,
): value is typeof oldValue {
  return !Object.is(value, oldValue);
}
