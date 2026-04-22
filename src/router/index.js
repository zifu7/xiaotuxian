//createRouter创建router实例
//createWebHistory创建history模式的路由
import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/login/index.vue";
import Layout from "@/views/layout/index.vue";
import Home from "@/views/home/index.vue";
import Category from "@/views/category/index.vue";
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
      ],
    },
  ],
});

export default router;
