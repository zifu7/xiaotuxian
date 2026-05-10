import request from "@/utils/http";
//获取详情页的订单信息
export const getCheckInfoAPI = () => {
  return request({
    url: "/member/order/pre",
  });
};
