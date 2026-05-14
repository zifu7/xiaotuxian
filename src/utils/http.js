import axios from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "../stores/user";
// 因为不是组件，所以不能用useRouter
import router from "../router";
// 创建axios实例，配一个好的请求发送器。baseURL是基础地址，后续发请求时只需要写接口地址就行了，timeout是请求超时时间，单位是毫秒
const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 50000,
});

// axios请求拦截器。发送请求之前都会执行这个函数
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
  // 成功响应,简化数据结构，直接拿到后端返回的data数据
  (res) => res.data,
  // 响应失败
  (e) => {
    const userStore = useUserStore();
    // 统一错误提示
    ElMessage({
      type: "warning",
      message: e.response.data.message,
    });
    //401token失效处理
    //清除本地用户数据
    //跳转到登录页
    if (e.response.status === 401) {
      userStore.clearUserInfo();
      router.push("/login");
    }
    return Promise.reject(e);
  },
);

export default httpInstance;
