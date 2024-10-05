import type { ComponentInternalInstance } from "./component";

export type VNodeTypes = string | TextNodeSymbol;
export interface VNodeProps {
  [key: string]: any;
}
export const TextNode: unique symbol = Symbol();
export type TextNodeSymbol = typeof TextNode;

type VNodeChildAtom = VNode | string;
export type VNodeChild = VNodeChildAtom; // | VNodeArrayChildren;
export type VNodeArrayChildren = Array<VNodeArrayChildren | VNodeChildAtom>;

// MARK: define VNode
export type VNodeNormalizedChildren = string | VNodeArrayChildren;
export interface VNode<HostNode = any> {
  type: VNodeTypes;
  props: VNodeProps | null;
  children: VNodeNormalizedChildren;
  // real element
  el: HostNode | undefined;

  component: ComponentInternalInstance | null;
}
export interface VNodeText<HostNode = any> extends VNode<HostNode> {
  /** @override VNode */ type: TextNodeSymbol;
  /** @override VNode */ props: null;
  /** @override VNode */ children: string;
}
export interface VNodeElement<HostNode = any> extends VNode<HostNode> {
  /** @override VNode */ type: string;
  /** @override VNode */ props: VNodeProps;
  /** @override VNode */ children: VNodeArrayChildren;
}
/// createVNode
// TEXT
export function createVNode(
  type: TextNodeSymbol,
  props: null,
  children: string,
): VNodeText;
// ELEMENT
export function createVNode(
  type: string,
  props: VNodeProps,
  children: VNodeNormalizedChildren,
): VNode;
// 兜底
export function createVNode(
  type: VNodeTypes,
  props: VNodeProps | null,
  children: VNodeNormalizedChildren,
): VNode;
export function createVNode(
  type: VNodeTypes,
  props: VNodeProps | null,
  children: VNodeNormalizedChildren,
): VNode {
  const vnode: VNode = {
    type,
    props,
    children,
    el: undefined,
    component: null,
  };
  return vnode;
}

export function normalizeVNode(child: VNodeChild): VNode {
  if (typeof child === "object") {
    return { ...child };
  } else {
    return createVNode(TextNode, null, String(child));
  }
}
