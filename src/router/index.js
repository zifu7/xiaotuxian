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
import { useUserStore } from "@/stores/user.js";
import FootPrint from "@/views/footPrint/index.vue";
// 访问某个路径router，显示对应的组件component
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
        //动态路由，:id表示占位符，可以匹配任意的id值，在组件中通过$route.params.id获取这个id值
        { path: "category/:id", component: Category },
        { path: "category/sub/:id", component: subCategory },
        { path: "detail/:id", component: Detail },
        { path: "cartlist", component: CartList },
        { path: "checkout", component: Checkout },
        { path: "pay", component: Pay },
        { path: "paycallback", component: PayBack },
        { path: "/footprint", component: FootPrint },
        {
          path: "member",
          component: Member,
          //只有登录之后才能访问会员中心，未登录状态访问会返回登录页
          meta: { requiresAuth: true },
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
// 路由守卫：拦截需要登录的页面
router.beforeEach((to, from) => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.userInfo.token) {
    return "/login";
  }
});

export default router;
