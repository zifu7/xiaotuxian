import axios from "axios";

// 创建axios实例
const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
});

// axios请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (e) => Promise.reject(e),
);

// axios响应式拦截器
httpInstance.interceptors.response.use(
  // 成功响应
  (res) => res.data,
  // 响应失败
  (e) => {
    ElMessage({
      typr: "warning",
      message: e.response.data.message,
    });
    return Promise.reject(e);
  },
);

export default httpInstance;
