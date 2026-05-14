//封装购物车模块的vuex
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useUserStore } from "./user.js";
import { insertCartAPI, findNewCartListAPI, delCartAPI } from "@/apis/cart";
export const useCartStore = defineStore(
  "cart",
  () => {
    const store = useUserStore();
    //如果拿到了token,那islogin就是true,用户登录了，否则就是false，用户没有登录
    const isLogin = computed(() => store.userInfo.token);
    //定义state-cartList
    const cartList = ref([]);
    //获取最新购物车列表
    const upDateCartList = async () => {
      const res = await findNewCartListAPI();
      cartList.value = res.result;
    };
    //定义actions-addCart
    const addCart = async (goods) => {
      const { skuId, count } = goods;
      if (isLogin.value) {
        //登录之后的加入购物车逻辑,调用接口。后端会判断数据是否已经存在，如果存在就数量加1，如果不存在就添加
        await insertCartAPI({ skuId, count });
        upDateCartList();
      } else {
        //将商品添加到购物车，使用本地数据
        //判断购物车中是否已经有该商品,如果有,数量加1,如果没有,push到购物车
        const item = cartList.value.find((item) => item.skuId === goods.skuId);
        if (item) {
          item.count++;
        } else {
          cartList.value.push(goods);
        }
      }
    };
    //删除购物车中的商品
    const delCart = async (skuId) => {
      if (isLogin.value) {
        //登录之后的删除购物车逻辑,调用接口,删除后获取最新的购物车列表
        await delCartAPI([skuId]);
        upDateCartList();
      } else {
        //找到要删除的数组下标，用splice删除
        const idx = cartList.value.findIndex((item) => item.skuId === skuId);
        cartList.value.splice(idx, 1);
      }
    };
    //清空购物车
    const clearCart = () => {
      cartList.value = [];
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
    //reduce是累计器，a是累计的结果，c是当前项，0是初始值
    const allCount = computed(() => {
      return cartList.value.reduce((a, c) => a + c.count, 0);
    });
    const allPrice = computed(() => {
      return cartList.value.reduce((a, c) => a + c.count * c.price, 0);
    });
    //是否全选 every方法：如果item.selected都为true，则返回true，否则返回false
    const isAll = computed(() => cartList.value.every((item) => item.selected));
    //已选择的数量
    const selectedCount = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count, 0),
    );
    //已选择商品价格
    const selectedPrice = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count * c.price, 0),
    );
    return {
      cartList,
      allCount,
      allPrice,
      isAll,
      selectedCount,
      selectedPrice,
      clearCart,
      allCheck,
      addCart,
      delCart,
      singleCheck,
      upDateCartList,
    };
  },
  //持久化数据到localStorage中,刷新页面时数据不丢失
  {
    persist: true,
  },
);
