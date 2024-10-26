import { createVNode } from "./vnode";
import type { VNode, VNodeProps } from "./vnode";

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
