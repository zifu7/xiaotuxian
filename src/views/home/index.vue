<script setup>
// 1. 修复：统一首字母大写
import HomeCategory from "./components/HomeCategory.vue";
import HomeBanner from "./components/HomeBanner.vue";
import HomeNew from "./components/HomeNew.vue";
import HomeHot from "./components/HomeHot.vue";
import HomeProduct from "./components/HomeProduct.vue"; // 修复首字母大写
import HomePanel from "./components/HomePanel.vue";
</script>

<template>
  <!-- 2. 修复：最外层套一个根包裹容器 -->
  <div class="home-page">
    <div class="container">
      <HomeCategory />
      <HomeBanner />
    </div>

    <!-- 3. 所有组件都放进唯一根标签里 -->
    <HomeNew />
    <HomeHot />
    <!-- 4. 修复组件名首字母大写 -->
    <HomeProduct />

    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱" />
    <HomePanel title="人气爆款" sub-title="热销爆款 畅购无忧" />
  </div>
</template>

<style scoped>
/* 可选样式 */
.home-page {
  min-width: 1240px;
}
</style>
