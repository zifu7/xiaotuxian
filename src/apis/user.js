// 封装所有和用户相关的接口
// 引入一个封装好的axios实例，来发请求
// api是用来获取后端数据的，通过地址来获取数据，地址是后端提供的接口地址
import request from "@/utils/http";
//loginAPI接收{ account, password }对象，发一个POST请求，携带account和password参数
export const loginAPI = ({ account, password }) => {
  return request({
    url: "/login",
    method: "POST",
    data: {
      account,
      password,
    },
  });
};
//猜你喜欢
export const getLikeListAPI = ({ limit = 4 }) => {
  return request({
    url: "/goods/relevant",
    params: {
      limit,
    },
  });
};
