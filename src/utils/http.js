import axios from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "../stores/user";
// 创建axios实例
const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
});

// axios请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    //从pinia获取token数据
    const userStore = useUserStore();
    //按照后端要求拼接token数据
    const token = userStore.userInfo.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
