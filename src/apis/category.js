import request from "@/utils/http";
// params是路由参数
export const getCategoryAPI = (id) => {
  return request({
    url: "/category",
    params: {
      id,
    },
  });
};
