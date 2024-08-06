// ~/packages/runtime-core apiCreateApp.ts

// ~/packages/runtime-core apiCreateApp.ts
import type { Component } from "./component";
import type { RootRenderFunction } from "./renderer";

export interface App<HostElement = any> {
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
        const vnode = rootComponent.render!();
        console.log("vnode", vnode); // Check the log
        render(vnode, rootContainer);
      },
      unmount() {
        // TODO: unmount
      },
    };

    return app;
  };
}
