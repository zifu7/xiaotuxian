import { ref, onMounted } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { getCategoryAPI } from "@/apis/category";
export function useCategory() {
  const categoryData = ref({});
  const route = useRoute();
  //调用API获取分类数据，根据id来获取
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id);
    categoryData.value = res.result;
  };
  onMounted(() => {
    getCategory();
  });

  //路由参数变化时，如从居家点到户外。分类数据重新获取
  //用onBeforeRouteUpdate而不是watch.因为同一个页面被重复使用了，watch监听不到路由参数的变化，而onBeforeRouteUpdate可以监听到路由参数的变化
  onBeforeRouteUpdate((to) => {
    // 把最新的id传入getCategory函数，获取新的分类数据
    getCategory(to.params.id);
  });
  return {
    categoryData,
  };
}
