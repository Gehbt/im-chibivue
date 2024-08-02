import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { bootstrapWujie } from '../wujie-utils/bootstrap'
const app = () => createApp(App)
bootstrapWujie(app);
// 兼容非wujie环境
if(!bootstrapWujie(app)){
  console.warn("非wujie环境")
  app().mount("#app");
}
