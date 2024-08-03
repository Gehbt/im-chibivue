import {
  type CreateAppFunction,
  createAppAPI,
  createRenderer,
} from "../runtime-core";
import { nodeOps } from "./nodeOps";

const { render } = createRenderer(nodeOps);
const createAppMeta = createAppAPI(render);

export const createApp: CreateAppFunction<Element> = (rootComponent) => {
  const app = createAppMeta(rootComponent);
  const { mount } = app;
  // 重写(修饰) mount 方法，
  app.mount = (selector: string) => {
    const container = document.querySelector(selector);
    if (!container) return;
    mount(container);
  };

  return app;
};
