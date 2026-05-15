<script setup>
import LayoutNav from "./components/LayoutNav.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutFixed from "./components/LayoutFixed.vue";
import BackTop from "./components/BackTop.vue";
import { useCategoryStore } from "@/stores/category";
import { onMounted } from "vue";
const categoryStore = useCategoryStore();
// 在多个子组件的公共父组件里调用接口函数，获取数据，避免重复请求
onMounted(() => {
  categoryStore.getCategory();
});
</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <!-- 添加key,强制组件重新渲染，解决路由切换时数据不更新的问题 -->
  <!-- <RouterView :key="$route.fullPath" /> -->
  <RouterView />
  <LayoutFooter />
  <BackTop />
</template>
