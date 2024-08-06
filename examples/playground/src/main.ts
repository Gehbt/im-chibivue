import "./style.css";
import { createApp } from "chibivue";
import { bootstrapWujie } from "../wujie-utils/bootstrap";
import App from "./App";

const app = () => createApp(App);

bootstrapWujie(app);
// 兼容非wujie环境
if (!bootstrapWujie(app)) {
  console.warn("非wujie环境");
  app().mount("#app");
}
