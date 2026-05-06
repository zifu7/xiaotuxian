import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
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
const pinia = createPinia();
app.use(pinia);
// 注册pinia持久化插件
pinia.use(piniaPluginPersistedstate);

app.use(router);
app.use(lazyPlugin);
app.use(componentPlugin);
app.mount("#app");
