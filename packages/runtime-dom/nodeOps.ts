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
  createText: (text) => {
    return document.createTextNode(text);
  },
  /**
   * @desc 原始的插入节点的文本内容
   */
  setElementText(node, text) {
    node.textContent = text;
  },
  /**
   * @desc 插入节点(前插 | 后插)
   */
  insert(child, parent, anchor, option?) {
    // option 暂未使用到
    if (option && option.toPost) {
      parent.appendChild(child);
    } else {
      parent.insertBefore(child, anchor || null);
    }
  },
  /**
   * @desc 原始的插入节点的文本内容
   */
  setText(node, text) {
    node.nodeValue = text;
  },
};
