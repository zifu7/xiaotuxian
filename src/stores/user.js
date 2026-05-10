import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from "@/apis/user.js";
import { mergeCartAPI } from "@/apis/cart.js";
import { useCartStore } from "./cartStore.js";
export const useUserStore = defineStore(
  "user",
  () => {
    //定义管理用户数据的state
    const userInfo = ref({});
    //定义获取接口数据的action
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password });
      userInfo.value = res.result;
      const cartStore = useCartStore();
      //合并购物车操作
      await mergeCartAPI(
        cartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count,
          };
        }),
      );
      //获取最新的购物车列表
      cartStore.upDateCartList();
    };
    //退出时清除数据
    const clearUserInfo = () => {
      userInfo.value = {};
      //清空购物车数据
      const cartStore = useCartStore();
      cartStore.clearCart();
    };

    //以对象的格式把state和action return
    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
    };
  },
  {
    persist: true,
  },
);
