import httpInstance from "@/utils/http";
// 接口函数，httpInstance从home/category/head接口获取数据
export function getCategoryAPI() {
  return httpInstance({
    url: "home/category/head",
  });
}
