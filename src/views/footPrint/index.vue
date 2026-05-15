<script setup>
import { useFootprintStore } from "@/stores/footprintStore";
import { ElMessage } from "element-plus";

const footprintStore = useFootprintStore();
const { footprintList } = footprintStore;

const handleClear = () => {
  footprintStore.clearFootprint();
  ElMessage.success("已清空足迹");
};
</script>
<template>
  <div class="footprint-container">
    <div class="header">
      <h2>我的足迹</h2>
      <el-button v-if="footprintList.length" @click="handleClear" type="danger" plain>
        清空足迹
      </el-button>
    </div>

    <div v-if="footprintList.length" class="goods-list">
      <div v-for="item in footprintList" :key="item.skuId" class="goods-item">
        <RouterLink :to="`/detail/${item.skuId}`">
          <img :src="item.picture" :alt="item.name" />
          <div class="info">
            <p class="name">{{ item.name }}</p>
            <p class="price">¥{{ item.price }}</p>
          </div>
        </RouterLink>
      </div>
    </div>

    <el-empty v-else description="暂无浏览记录" />
  </div>
</template>

<style scoped>
.footprint-container {
  width: 1200px;
  margin: 20px auto;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.goods-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}
.goods-item {
  border: 1px solid #eee;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.3s;
}
.goods-item:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
.goods-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.info {
  margin-top: 10px;
}
.name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
}
.price {
  color: #ff6b6b;
  font-weight: bold;
  margin-top: 8px;
}
</style>
