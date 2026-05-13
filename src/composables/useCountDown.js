import { computed, ref } from "vue";
import dayjs from "dayjs";
//封装倒计时逻辑函数
export const useCountDown = () => {
  //响应式数据
  const time = ref(0);
  //格式化时间,安装dayjs插件进行格式化
  const formatTime = computed(() => dayjs.unix(time.value).format("mm分ss秒"));
  //开启倒计时的函数
  const start = (currentTime) => {
    time.value = currentTime;
    setInterval(() => {
      time.value--;
    }, 1000);
  };
  return {
    formatTime,
    start,
  };
};
