import "./assets/main.css";
import "virtual:uno.css";
import "virtual:unocss-devtools";
import { createApp } from "vue";
import WujieVue from "wujie-vue3";

import { credentialsFetch, hostMap, lifecycles } from "../wujie-utils";
import { members } from "../wujie-utils/member-name.json" with { type: "json" };
import { setupWujie } from "../wujie-utils/setup";
import App from "./App.vue";

const { setupApp, preloadApp } = WujieVue;
const app = createApp(App);

// setupApp({
//   name: "aff-vue",
//   url: hostMap("aff-vue"),
//   exec: true,
//   fetch: credentialsFetch,
//   ...lifecycles,
// });

// setupApp({
//   name: "playground",
//   url: hostMap("playground"),
//   exec: true,
//   fetch: credentialsFetch,
//   ...lifecycles,
// });
setupWujie(setupApp, members, {
  exec: true,
  fetch: credentialsFetch,
  ...lifecycles,
});
app.mount("#app");
