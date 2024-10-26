import type { App as VueApp } from "chibivue";

export function bootstrapWujie(app: () => VueApp<Element>): boolean {
  if (window.__POWERED_BY_WUJIE__) {
    window.__WUJIE_MOUNT = () => {
      const instance = app();
      instance.mount("#app");
      window.__WUJIE_UNMOUNT = () => {
        instance.unmount();
      };
    };
    window.__WUJIE.mount();
  }
  return !!window.__POWERED_BY_WUJIE__;
}
