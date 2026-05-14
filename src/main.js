//引入核心库
// 创建vue应用
import { createApp } from "vue";
// 创建pinia实例
import { createPinia } from "pinia";
// 根组件,所有组件的父组件
import App from "./App.vue";
// 路由配置，管理页面跳转
import router from "./router";
// pinia持久化插件，让数据存到localStorage中，在刷新页面时保持数据不丢失！！！！！！！！！！
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// 引入初始化样式
import "@/styles/common.scss";
//引入测试接口函数，通过打印测试接口是否能正常调用，后续开发中可以删除
import { getCategoryAPI } from "@/apis/testAPI";
getCategoryAPI().then((res) => {
  console.log(res);
});
// 引入自定义指令插件，实现图片懒加载
import { lazyPlugin } from "@/directives";
//引入全局组件插件
import { componentPlugin } from "@/components/index.js";
// 把app作为根组件创建vue应用实例
const app = createApp(App);

// 定义全局指令
const pinia = createPinia();
app.use(pinia);
// 注册pinia持久化插件
pinia.use(piniaPluginPersistedstate);

app.use(router);
app.use(lazyPlugin);
app.use(componentPlugin);
//把vue应用实例挂载到index.html中的id为app的元素上
//mount之前，vue应用还没有渲染到页面上，mount之后，vue接管了#app元素，vue应用就渲染到页面上了
app.mount("#app");
