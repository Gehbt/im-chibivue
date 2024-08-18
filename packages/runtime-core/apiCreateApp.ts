// ~/packages/runtime-core apiCreateApp.ts

// ~/packages/runtime-core apiCreateApp.ts
import { ReactiveEffect } from "../reactivity";
import type { Component } from "./component";
import type { RootRenderFunction } from "./renderer";

export interface App<HostElement = any> {
  // 这里使用 方法的形式而不是更严格的 属性的形式 是因为 实际上把 string 也认为是 Element
  mount(rootContainer: HostElement | string): void;
  unmount(): void;
}

export type CreateAppFunction<HostElement> = (
  rootComponent: Component,
) => App<HostElement>;

export function createAppAPI<HostElement>(
  render: RootRenderFunction<HostElement>,
): CreateAppFunction<HostElement> {
  return function createApp(rootComponent) {
    const app: App<HostElement> = {
      mount(rootContainer: HostElement) {
        // 得到渲染函数
        const componentRender = rootComponent.setup!();

        const updateComponent = () => {
          // 先渲染 根节点
          const root_vnode = componentRender();
          render(root_vnode, rootContainer);
        };

        // MARK: effect
        const effect = new ReactiveEffect(updateComponent);
        effect.run();
      },
      unmount() {
        // TODO: unmount
      },
    };

    return app;
  };
}
