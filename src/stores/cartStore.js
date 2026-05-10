//封装购物车模块的vuex
import { defineStore } from "pinia";
import { ref, computed } from "vue";
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
    //单选功能
    const singleCheck = (skuId, selected) => {
      const item = cartList.value.find((item) => item.skuId === skuId);
      item.selected = selected;
    };
    //全选功能
    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected));
    };

    //计算属性 总数量是所有count的和,总价格是所有count*price的和
    const allCount = computed(() => {
      return cartList.value.reduce((a, c) => a + c.count, 0);
    });
    const allPrice = computed(() => {
      return cartList.value.reduce((a, c) => a + c.count * c.price, 0);
    });
    //是否全选 every方法：如果item.selected都为true，则返回true，否则返回false
    const isAll = computed(() => cartList.value.every((item) => item.selected));

    return {
      cartList,
      allCount,
      allPrice,
      isAll,
      allCheck,
      addCart,
      delCart,
      singleCheck,
    };
  },
  //持久化数据到localStorage中,刷新页面时数据不丢失
  {
    persist: true,
  },
);
