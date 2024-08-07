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
export {};
