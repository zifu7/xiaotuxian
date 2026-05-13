//createRouter创建router实例
//createWebHistory创建history模式的路由
import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/login/index.vue";
import Layout from "@/views/layout/index.vue";
import Home from "@/views/home/index.vue";
import Category from "@/views/category/index.vue";
import subCategory from "@/views/subCategory/index.vue";
import Detail from "@/views/detail/index.vue";
import CartList from "@/views/cartList/index.vue";
import Checkout from "@/views/checkOut/index.vue";
import Pay from "@/views/pay/index.vue";
import PayBack from "@/views/pay/payBack.vue";
import Member from "@/views/member/index.vue";
import UserInfo from "@/views/member/components/userInfo.vue";
import UserOrder from "@/views/member/components/userOrder.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/",
      component: Layout,
      children: [
        { path: "", component: Home },
        { path: "category/:id", component: Category },
        { path: "category/sub/:id", component: subCategory },
        { path: "detail/:id", component: Detail },
        { path: "cartlist", component: CartList },
        { path: "checkout", component: Checkout },
        { path: "pay", component: Pay },
        { path: "paycallback", component: PayBack },
        {
          path: "member",
          component: Member,
          children: [
            {
              path: "",
              component: UserInfo,
            },
            {
              path: "order",
              component: UserOrder,
            },
          ],
        },
      ],
    },
  ],
  // 路由切换时滚动行为
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

export default router;
