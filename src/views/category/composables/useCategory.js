import { ref, onMounted } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { getCategoryAPI } from "@/apis/category";
export function useCategory() {
  const categoryData = ref({});
  const route = useRoute();
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id);
    categoryData.value = res.result;
  };
  onMounted(() => {
    getCategory();
  });

  //路由参数变化时，分类数据重新获取
  onBeforeRouteUpdate((to) => {
    // 把最新的id传入getCategory函数，获取新的分类数据
    getCategory(to.params.id);
  });
  return {
    categoryData,
  };
}
