// 负责渲染
// #region  定义渲染 接口
export interface RendererNode {
  [key: string]: any;
}

export interface RendererElement extends RendererNode {}
// #endregion

export type RootRenderFunction<HostElement = RendererElement> = (
  message: string,
  container: HostElement,
) => void;

// 在dom里面才实现
export interface RendererOptions<HostNode = RendererNode> {
  setElementText(node: HostNode, text: string): void;
}

/**
 * @desc 渲染的工厂函数
 */
export function createRenderer(options: RendererOptions) {
  const { setElementText: hostSetElementText } = options;

  const render: RootRenderFunction = (message, container) => {
    hostSetElementText(container, message);
  };

  return { render };
}
