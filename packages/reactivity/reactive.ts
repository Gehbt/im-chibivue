import { mutableHandlersMaker } from "./baseHandler";

export function reactive<T extends object>(target: T): T {
  const proxy = new Proxy<T>(target, {
    ...mutableHandlersMaker<T>(reactive),
    // get: (target, key, receiver) => {
    //   if (key === Symbol.toStringTag) return "Reactive";
    //   else return Reflect.get(target, key, receiver);
    // },
  });
  return proxy;
}
