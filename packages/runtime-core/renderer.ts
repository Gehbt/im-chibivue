// 负责渲染
import { ReactiveEffect } from "../reactivity";
import {
  createComponentInstance,
  type Component,
  type ComponentInternalInstance,
  type InternalRenderFunction,
} from "./component";
import {
  createVNode,
  normalizeVNode,
  TextNode,
  type VNode,
  type VNodeElement,
  type VNodeText,
} from "./vnode";

// MARK:  定义渲染函数 接口
export type RootRenderFunction<HostElement = RendererElement> = (
  vnode: Component,
  container: HostElement,
) => void;

// 在dom里面才实现
export interface RendererOptions<HostNode = RendererNode, HostElement = RendererElement> {
  /**
   * @desc 处理prop
   */
  patchProp(this: void, el: HostElement, key: string, value: any): void;
  /**
   * @desc 通过 tagName 创建元素
   */
  createElement(this: void, type: string): HostElement;
  /**
   * @desc 裸的 text 节点
   */
  createText(this: void, text: string): HostNode;
  /**
   * @desc 原始的插入节点的文本内容
   */
  setText(this: void, node: HostNode, text: string): void;
  /**
   * @desc 插入节点(前插 | 后插)
   */
  insert(
    this: void,
    child: HostNode,
    parent: HostNode,
    anchor?: HostNode | null,
    option?: { toPost: boolean },
  ): void;
  /**
   * @desc 原始的插入节点的文本内容
   */
  setElementText(this: void, node: HostNode, text: string): void;

  parentNode(this: void, node: HostNode): HostNode | null;
}

// #region  定义渲染 接口
export interface RendererNode {
  [key: string]: any;
}

export interface RendererElement extends RendererNode {}
// #endregion

/**
 * @desc 渲染的工厂函数
 */
export function createRenderer(options: RendererOptions): {
  render: RootRenderFunction<RendererElement>;
} {
  const {
    // Element
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    // TextNode
    createText: hostCreateText,
    setText: hostSetText,
    // act
    insert: hostInsert,
    parentNode: hostParentNode,
  } = options;

  const patch = (n1: VNode | null, n2: VNode, container: RendererElement) => {
    const { type } = n2;
    if (type === TextNode) {
      /** @assert n1 is VNodeText | null, n2 is VNodeText */
      processText(n1 as VNodeText | null, n2 as VNodeText, container);
    } else if (typeof type === "string") {
      /** @assert n1 is VNodeElement | null, n2 is VNodeElement */
      processElement(n1 as VNodeElement | null, n2 as VNodeElement, container);
    } else if (typeof type === "object") {
      processComponent(n1, n2, container);
    } else {
      // noop or todo?
    }
  };

  const processElement = (
    n1: VNodeElement | null,
    n2: VNodeElement,
    container: RendererElement,
  ) => {
    if (n1 === null) {
      // 未创建
      mountElement(n2, container);
    } else {
      // 已创建
      patchElement(n1, n2);
    }
  };

  const mountElement = (vnode: VNodeElement, container: RendererElement) => {
    let el: RendererElement;
    const { type, props } = vnode;
    el = vnode.el = hostCreateElement(type);

    mountChildren(vnode.children as VNode[], el);
    // 类型层面 if 判断可消去
    if (props) {
      for (const key in props) {
        hostPatchProp(el, key, props[key]);
      }
    }

    hostInsert(el, container);
  };
  // patch 处理 children
  const mountChildren = (children: VNode[], container: RendererElement) => {
    for (let i = 0; i < children.length; i++) {
      const child = (children[i] = normalizeVNode(children[i]));
      patch(null, child, container);
    }
  };

  const patchElement = (n1: VNodeElement, n2: VNodeElement) => {
    const el = (n2.el = n1.el);

    const props = n2.props;

    patchChildren(n1, n2, el);

    for (const key in props) {
      if (props[key] !== (n1.props ? n1.props[key] : {})) {
        hostPatchProp(el, key, props[key]);
      }
    }
  };

  const patchChildren = (n1: VNodeElement, n2: VNodeElement, container: RendererElement) => {
    const c1 = n1.children as VNode[];
    const c2 = n2.children as VNode[];

    for (let i = 0; i < c2.length; i++) {
      const child = (c2[i] = normalizeVNode(c2[i]));
      patch(c1[i], child, container);
    }
  };

  const processText = (n1: VNodeText | null, n2: VNodeText, container: RendererElement) => {
    if (n1 === null) {
      n2.el = hostCreateText(n2.children);
      hostInsert(n2.el, container);
    } else {
      const el = (n2.el = n1.el);
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };

  const processComponent = (n1: VNode | null, n2: VNode, container: RendererElement) => {
    if (n1 == null) {
      mountComponent(n2, container);
    } else {
      updateComponent(n1, n2);
    }
  };
  const mountComponent = (initialVNode: VNode, container: RendererElement) => {
    const instance: ComponentInternalInstance = (initialVNode.component =
      createComponentInstance(initialVNode));

    const component = initialVNode.type as Component;
    if (component.setup) {
      instance.render = component.setup() as InternalRenderFunction;
    }
    // 启动重新计算
    setupRenderEffect(instance, initialVNode, container);
  };
  // 触发effect, 更新元素
  const setupRenderEffect = (
    instance: ComponentInternalInstance,
    initialVNode: VNode,
    container: RendererElement,
  ) => {
    const componentUpdateFn = () => {
      // 这里捕获了原本的 渲染方法
      const { render } = instance;
      if (!instance.isMounted) {
        // 没挂载, 只存在于 vnode 里
        const subTree = normalizeVNode(render());
        instance.subTree = subTree;
        patch(null, subTree, container);
        initialVNode.el = subTree.el;
        instance.isMounted = true;
      } else {
        let { next, vnode } = instance;

        if (next) {
          next.el = vnode.el;
          next.component = instance;
          instance.vnode = next;
          instance.next = null;
        } else {
          next = vnode;
        }

        const prevTree = instance.subTree;
        const nextTree = normalizeVNode(render());
        instance.subTree = nextTree;

        patch(prevTree, nextTree, hostParentNode(prevTree.el!)!);
        next.el = nextTree.el;
      }
    };

    const effect = (instance.effect = new ReactiveEffect(componentUpdateFn));
    const update = (instance.update = () => effect.run());
    update();
  };

  const updateComponent = (n1: VNode, n2: VNode) => {
    const instance = (n2.component = n1.component!);
    instance.next = n2;
    instance.update();
  };

  // MARK: render main
  const render: RootRenderFunction = (rootComponent, container) => {
    // 运行渲染函数
    const vnode = createVNode(rootComponent, {}, []);
    patch(null, vnode, container);
  };

  return { render };
}
