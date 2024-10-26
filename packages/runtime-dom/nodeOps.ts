import type { RendererOptions } from "../runtime-core";
type NodeOperationType = Omit<RendererOptions<Node, Element>, "patchProp">;
// 处理各种类型节点的函数
export const nodeOps: NodeOperationType = {
  /**
   * @desc 通过 tagName 创建元素
   */
  createElement: (tagName): Element => {
    return document.createElement(tagName);
  },
  /**
   * @desc 裸的 text 节点
   */
  createText: (text): Node => {
    return document.createTextNode(text);
  },
  /**
   * @desc 原始的插入节点的文本内容
   */
  setText(node, text): void {
    node.nodeValue = text;
  },
  /**
   * @desc 原始的插入节点的文本内容
   */
  setElementText(node, text): void {
    node.textContent = text;
  },
  /**
   * @desc 插入节点(前插 | 后插)
   */
  insert(child, parent, anchor, option?): void {
    // 注意: option (使用处)暂未使用到
    if (option && option.toPost) {
      parent.appendChild(child);
    } else {
      parent.insertBefore(child, anchor || null);
    }
  },
  /**
   * @desc 获取父节点
   */
  parentNode: (node): ParentNode | null => {
    return node.parentNode;
  },
};
/// 有返回的成员的都是 property, 没有的都是 method
