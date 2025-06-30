import type { ReactiveEffect } from "../reactivity";
import type { ComponentOptions } from "./componentOptions";
import type { VNode, VNodeChild } from "./vnode";

export type Component = ComponentOptions;
// VDom 树(runtime层面)
export interface ComponentInternalInstance {
  type: Component;
  vnode: VNode;
  subTree: VNode;
  next: VNode | null;
  effect: ReactiveEffect;
  render: InternalRenderFunction;
  update: () => void;
  isMounted: boolean;
}

export interface InternalRenderFunction {
  (): VNodeChild;
}
// 构造 组件实例
export function createComponentInstance(
  vnode: VNode,
): ComponentInternalInstance {
  const type = vnode.type as Component;
  /**
   * @desc 这里的null属性为非空断言, 让使用变得方便, 同时需要保证 这些属性 只能在第一次写入后才能使用
   */
  const instance: ComponentInternalInstance = {
    type,
    vnode,
    next: null,
    /**
     * @desc write bail!
     */
    effect: null!,
    /**
     * @desc write bail!
     */
    subTree: null!,
    /**
     * @desc write bail!
     */
    update: null!,
    /**
     * @desc write bail!
     */
    render: null!,
    isMounted: false,
  };

  return instance;
}
