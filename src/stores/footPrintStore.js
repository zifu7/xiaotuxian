import { defineStore } from "pinia";
import { ref } from "vue";

export const useFootprintStore = defineStore(
  "footprint",
  () => {
    // 足迹列表，每个元素存 { skuId, name, price, picture, timestamp }
    const footprintList = ref([]);

    // 添加足迹
    const addFootprint = (goods) => {
      // 移除已存在的相同商品（只保留最新的）
      const index = footprintList.value.findIndex((item) => item.skuId === goods.skuId);
      if (index !== -1) {
        footprintList.value.splice(index, 1);
      }
      // 添加到数组最前面
      footprintList.value.unshift({
        ...goods,
        timestamp: Date.now(),
      });
      // 只保留最近 20 条
      footprintList.value = footprintList.value.slice(0, 20);
    };

    // 清空足迹
    const clearFootprint = () => {
      footprintList.value = [];
    };

    return {
      footprintList,
      addFootprint,
      clearFootprint,
    };
  },
  {
    persist: true, // 持久化到 localStorage
  },
);
