import type { RendererOptions } from "../runtime-core";
// #region import utils
import { patchAttr } from "./modules/attrs";
import { patchEvent } from "./modules/events";
// #endregion

type DOMRendererOptions = RendererOptions<Node, Element>;

export const isOn = (key: string) => /^on[^a-z]/.test(key);
// 缺点是需要更高的es版本
export const isOn2 = (key: string) => key.startsWith("on");

export const isOnLow = (key: string) => key.length > 2 && key[0] === "o" && key[1] === "n";



export const patchProp: DOMRendererOptions["patchProp"] = (el, key, value) => {
  if (isOnLow(key)) {
    patchEvent(el, key, value);
  } else {
    patchAttr(el, key, value);
  }
};
