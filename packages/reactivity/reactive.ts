import { mutableHandlersMaker } from "./baseHandler";

export function reactive<T extends object>(target: T): T {
  const proxy = new Proxy<T>(target, mutableHandlersMaker<T>(reactive));
  return proxy;
}
