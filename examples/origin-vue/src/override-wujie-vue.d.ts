declare module "wujie-vue3" {
  import { bus, preloadApp, destroyApp, setupApp } from "wujie";
  import type { DefineComponent, Plugin } from "vue";

  declare const WujieVue: DefineComponent<{
    name: string;
    height?: string;
    loading?: HTMLElement;
    url?: string;
    sync?: boolean;
    prefix?: object;
    alive?: boolean;
    // fetch?: function;
    // fiber: function;
    // replace?: func;
    degrade?: boolean;
    // plugins: [];
    // beforeLoad?: function;
    // beforeMount?: function;
    // afterMount?: function;
    // beforeUnmount?: function;
    // afterUnmount?: function;
    // activated?: function;
    // deactivated?: function;
    // loadError?: function;
  }> &
    Plugin & {
      bus: typeof bus;
      setupApp: typeof setupApp;
      preloadApp: typeof preloadApp;
      destroyApp: typeof destroyApp;
    };

  export default WujieVue;
}
