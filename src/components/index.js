//把components里面的所有组件都进行全局化注册
//通过插件的方式
import sku from "./xtxSku/index.vue";
import imageView from "./imageView/index.vue";
export const componentPlugin = {
  install(app) {
    //app.component("组件名字",组件对象)
    app.component("xtxSku", sku);
    app.component("xtxImageView", imageView);
  },
};
