// 定义懒加载插件
import { useIntersectionObserver } from "@vueuse/core";
export const lazyPlugin = {
  install(app) {
    app.directive("lazy", {
      mounted(el, binding) {
        // el是指令绑定的元素 img
        // binding.value是指令的值 图片地址 url
        // console.log(el, binding.value);
        // 当图片进入视口区域则为true,否则为false
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          console.log(isIntersecting);
          if (isIntersecting) {
            el.src = binding.value;
            // 停止监听
            stop();
          }
        });
      },
    });
  },
};
