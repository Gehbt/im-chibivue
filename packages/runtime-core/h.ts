import { createVNode } from "./vnode";
import type { VNode, VNodeProps } from "./vnode";
// 如果要做重载, 需要有底层dom的实现

// export function h<T extends "button">(
//   type: "button",
//   props: HTMLButtonElement | VNodeProps,
//   children: (VNode | string)[],
// ): VNode;
export function h<T extends string>(
  type: T,
  props: VNodeProps | null,
  children: (VNode | string)[],
): VNode;
export function h(
  type: string,
  props: VNodeProps | null,
  children: (VNode | string)[],
): VNode {
  // TODO: el
  return createVNode(type, props, children);
}
