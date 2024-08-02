import "./style.css"
import { createApp } from "chibivue";
import { bootstrapWujie } from "../wujie-utils/bootstrap";

const app = () =>
  createApp({
    render() {
      return "<div>chibi hello world</div>";
    },
  });

bootstrapWujie(app);
// 兼容非wujie环境
if(!bootstrapWujie(app)){
  console.warn("非wujie环境")
  app().mount("#app");
}
