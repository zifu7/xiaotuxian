//封装购物车模块的vuex
import { defineStore } from "pinia";
import { ref } from "vue";
export const useCartStore = defineStore(
  "cart",
  () => {
    //定义state-cartList
    const cartList = ref([]);
    //定义actions-addCart
    const addCart = (goods) => {
      //将商品添加到购物车
      //判断购物车中是否已经有该商品,如果有,数量加1,如果没有,push到购物车
      const item = cartList.value.find((item) => item.skuId === goods.skuId);
      if (item) {
        item.count++;
      } else {
        cartList.value.push(goods);
      }
    };
    //删除购物车中的商品
    const delCart = (skuId) => {
      //找到要删除的数组下标，用splice删除
      const idx = cartList.value.findIndex((item) => item.skuId === skuId);
      cartList.value.splice(idx, 1);
    };
    return {
      cartList,
      addCart,
      delCart,
    };
  },
  //持久化数据到localStorage中,刷新页面时数据不丢失
  {
    persist: true,
  },
);
