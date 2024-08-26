import { createVNode } from "./vnode";
import type { VNode, VNodeProps } from "./vnode";

export function h(
  type: string,
  props: VNodeProps,
  children: (VNode | string)[],
): VNode {
  // TODO: el
  return createVNode(type, props, children);
}
