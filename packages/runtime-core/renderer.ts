// 负责渲染
import type { VNode } from "./vnode";
// #region  定义渲染 接口
export interface RendererNode {
  [key: string]: any;
}

export interface RendererElement extends RendererNode {}
// #endregion

// #region  定义渲染函数 接口
export type RootRenderFunction<HostElement = RendererElement> = (
  vnode: VNode,
  container: HostElement,
) => void;

// 在dom里面才实现
export interface RendererOptions<
  HostNode = RendererNode,
  HostElement = RendererElement,
> {
  patchProp(el: HostElement, key: string, value: any): void;
  createElement(type: string): HostElement;
  createText(text: string): HostNode;
  insert(child: HostNode, parent: HostNode, anchor?: HostNode | null): void;
  //  暂未使用到
  setElementText(node: HostNode, text: string): void;
}

/**
 * @desc 渲染的工厂函数
 */
export function createRenderer(options: RendererOptions) {
  const {
    // patch
    patchProp: hostPatchProp,

    createElement: hostCreateElement,
    createText: hostCreateText,
    insert: hostInsert,
  } = options;
  const render: RootRenderFunction = (vnode, container) => {
    // remove old elements
    while (container.firstChild) container.removeChild(container.firstChild); // Add code to remove all elements
    const el = renderVNode(vnode);
    hostInsert(el, container);
  };
  return { render };
  function renderVNode(vnode: VNode | string) {
    if (typeof vnode === "string") return hostCreateText(vnode);
    const el = hostCreateElement(vnode.type);
    Object.entries(vnode.props).forEach(([key, value]) => {
      hostPatchProp(el, key, value);
    });
    for (const child of vnode.children) {
      const childEl = renderVNode(child);
      hostInsert(childEl, el);
    }
    return el;
  }
}
