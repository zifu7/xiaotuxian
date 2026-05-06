import axios from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "../stores/user";
import router from "../router";
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
    const userStore = useUserStore();
    // 统一错误提示
    ElMessage({
      typr: "warning",
      message: e.response.data.message,
    });
    //401token失效处理
    //清除本地用户数据
    //跳转到登录页
    if (e.response.status === 401) {
      userStore.clearUserInfo();
      // 这里不使用userouter。在组建script中使用userouter,普通js中不行
      router.push("/login");
    }
    return Promise.reject(e);
  },
);

export default httpInstance;
