// pinina,多个组件共享的数据，用pinia来管理，避免重复请求
import { ref } from "vue";
import { defineStore } from "pinia";
import { getCategoryAPI } from "@/apis/testAPI";
export const useCategoryStore = defineStore("category", () => {
  //存数据 state 导航列表数据
  const categoryList = ref([]);
  //方法  action 获取导航数据的方法
  const getCategory = async () => {
    const res = await getCategoryAPI();
    console.log(res);
    categoryList.value = res.result;
  };
  return { categoryList, getCategory };
});
