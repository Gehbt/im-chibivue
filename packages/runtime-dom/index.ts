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
  const { mount: oldMount } = app;
  // 重写(修饰) mount 方法， 这段代码几乎表现了 vue 的本质, 加层/包装, 而当前库就是对vue在浏览器环境下的加层
  app.mount = function overrideMount(selector: string) {
    const container = document.querySelector(selector);
    if (!container) return;
    oldMount(container);
  };

  return app;
};
