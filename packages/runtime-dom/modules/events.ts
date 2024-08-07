import type { AnyFunction } from "../../shared";

type EventFunction = AnyFunction;
/**
 * @desc 就像一个 事件的Ref
 * @desc 注意: 是 callable 对象
 */
interface Invoker extends EventListener {
  value: EventFunction;
}
interface VueSignElement extends Element {
  /**
   * @desc vei = vue event invokers -- 其实是个 map, 用来
   * */
  _vei?: Record<string, Invoker | undefined>;
}
// #region 注册事件
export function addEventListener(
  el: Element,
  event: string,
  handler: EventListener,
) {
  el.addEventListener(event, handler);
}

export function removeEventListener(
  el: Element,
  event: string,
  handler: EventListener,
) {
  el.removeEventListener(event, handler);
}
// #endregion

// #region 主功能
export function patchEvent(
  el: VueSignElement,
  rawName: string,
  value: EventFunction | null,
) {
  const invokers = el._vei || (el._vei = {});
  //# 单例模式
  const existingInvoker = invokers[rawName];

  if (value && existingInvoker) {
    // patch 更新为新的值
    existingInvoker.value = value;
  } else {
    const eventName = parseName(rawName);
    if (value) {
      // add
      invokers[rawName] = createInvoker(value);
      const newInvoker = invokers[rawName];
      addEventListener(el, eventName, newInvoker);
    } else if (existingInvoker) {
      // remove
      removeEventListener(el, eventName, existingInvoker);
      delete invokers[rawName];
    }
  }
}
// #endregion

function parseName(rawName: string): string {
  // 因为 处理的 是onXXX, 所以需要去掉on
  return rawName.slice(2).toLocaleLowerCase();
}

function createInvoker(initialValue: EventFunction): Invoker {
  // 这里其实类似与委托, 把原生的 event 转发
  const invoker: Invoker = (e: Event) => {
    invoker.value(e);
  };
  invoker.value = initialValue;
  return invoker;
}
