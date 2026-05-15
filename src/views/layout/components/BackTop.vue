<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const visible = ref(false);

// 监听滚动事件
const handleScroll = () => {
  // 滚动超过 300px 显示按钮
  visible.value = window.scrollY > 300;
};

// 回到顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // 平滑滚动
  });
};

// 组件挂载时添加监听
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// 组件卸载时移除监听（重要！防止内存泄漏）
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<template>
  <div v-show="visible" class="back-top" @click="scrollToTop">返回顶部</div>
</template>

<style scoped>
.back-top {
  position: fixed;
  right: 30px;
  bottom: 80px;
  width: 70px;
  height: 50px;
  background-color: #fff;
  border-radius: 25%;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  z-index: 999;
}

.back-top:hover {
  background-color: #27ba9b;
  color: #fff;
}

.back-top i {
  font-size: 24px;
}
</style>
