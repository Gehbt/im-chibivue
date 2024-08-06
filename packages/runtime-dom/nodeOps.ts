import type { RendererOptions } from "../runtime-core";
type NodeOperationType = Omit<RendererOptions<Node, Element>, "patchProp">;
// 处理各种类型节点的函数
export const nodeOps: NodeOperationType = {
  /**
   * @desc 通过 tagName 创建元素
   */
  createElement: (tagName) => {
    return document.createElement(tagName);
  },
  /**
   * @desc 裸的 text 节点
   */
  createText: (text: string) => {
    return document.createTextNode(text);
  },
  /**
   * @desc 原始的插入节点的文本内容
   */
  setElementText(node, text) {
    node.textContent = text;
  },

  insert(child, parent, anchor) {
    parent.insertBefore(child, anchor || null);
  },
};
