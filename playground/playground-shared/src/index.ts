declare global {
  interface Window {
    // 是否存在无界
    __POWERED_BY_WUJIE__?: boolean;
    // 子应用 mount 函数
    __WUJIE_MOUNT: () => void;
    // 子应用 unmount 函数
    __WUJIE_UNMOUNT: () => void;
    // 子应用无界实例
    __WUJIE: { mount: () => void; id: number };
  }
}

// 这里的 _App 只是为了占位，实际使用时应该是 对于包定义的VueApp<Element>
declare type _App<HostElement = any> = {
  mount(rootContainer: HostElement | string): void;
  unmount(): void;
};

/**
 * 初始化无界子应用
 * @param vueApp 子应用的Vue实例工厂函数
 * @param entry 子应用的挂载点，默认是 "#app"
 * @returns
 */
export function bootstrapWujie<VueApp extends _App>(
  vueApp: () => VueApp,
  entry: string = "#app",
): boolean {
  if (window.__POWERED_BY_WUJIE__) {
    window.__WUJIE_MOUNT = () => {
      const instance: VueApp = vueApp();
      instance.mount(entry);
      window.__WUJIE_UNMOUNT = () => {
        instance.unmount();
      };
    };
    window.__WUJIE.mount();
  }
  return !!window.__POWERED_BY_WUJIE__;
}
