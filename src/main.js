import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
// 引入初始化样式
import "@/styles/common.scss";
import { getCategoryAPI } from "@/apis/testAPI";
getCategoryAPI().then((res) => {
  console.log(res);
});
// 引入懒加载插件
import { lazyPlugin } from "@/directives";
//引入全局组件插件
import { componentPlugin } from "@/components/index.js";
const app = createApp(App);

// 定义全局指令
app.use(createPinia());
app.use(router);
app.use(lazyPlugin);
app.use(componentPlugin);
app.mount("#app");
