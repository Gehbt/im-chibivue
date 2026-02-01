import "./style.css";
import { bootstrapWujie } from "@im-chibivue/playground-shared";
import { createApp } from "im-chibivue";

import App from "./App";

const app = () => createApp(App);

const wujie = bootstrapWujie(app);
// 兼容非wujie环境
if (!wujie) {
  console.warn("非wujie环境");
  app().mount("#app");
}
