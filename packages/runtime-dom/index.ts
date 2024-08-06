import {
  type CreateAppFunction,
  createAppAPI,
  createRenderer,
} from "../runtime-core";
import { nodeOps } from "./nodeOps";
import { patchProp } from "./patchProp";

const { render } = createRenderer({ ...nodeOps, patchProp });
const createAppMeta = createAppAPI(render);
// 包装后的 createApp
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
