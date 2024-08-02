import "./assets/main.css";
import 'virtual:uno.css'
import { createApp } from "vue";
import App from "./App.vue";
import WujieVue from "wujie-vue3";
import { credentialsFetch, hostMap, lifecycles } from "../wujie-utils";
import { members } from "../wujie-utils/member-name.json" with { type: "json" };

const { setupApp, preloadApp } = WujieVue;
const app = createApp(App);

setupApp({
  name: "aff-vue",
  url: hostMap("aff-vue"),
  exec: true,
  fetch: credentialsFetch,
  ...lifecycles,
});

app.mount("#app");
