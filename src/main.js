import { createApp } from "vue";
import { createPinia } from "pinia";
import { useIntersectionObserver } from "@vueuse/core";
import App from "./App.vue";
import router from "./router";
// 引入初始化样式
import "@/styles/common.scss";
import { getCategoryAPI } from "@/apis/testAPI";
getCategoryAPI().then((res) => {
  console.log(res);
});
const app = createApp(App);
// 图片懒加载指令，当图片进入可视区域时才加载图片
app.directive("lazy", {
  mounted(el, binding) {
    // el是指令绑定的元素 img
    // binding.value是指令的值 图片地址 url
    console.log(el, binding.value);
    // 当图片进入视口区域则为true,否则为false
    useIntersectionObserver(el, ([{ isIntersecting }]) => {
      console.log(isIntersecting);
    });
  },
});
app.use(createPinia());
app.use(router);

// 定义全局指令
app.mount("#app");
