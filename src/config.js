import axios from 'axios';  
// loading 组件
import { Toast } from 'antd-mobile';


// 拦截请求
// 给全局添加 loading 状态
axios.interceptors.request.use((config) => {
  Toast.loading('加载中...', 0);
  return config;
});


// 拦截响应
axios.interceptors.response.use((config) => {
  Toast.hide();
  return config;
});