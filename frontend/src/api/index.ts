import axios from "axios";
import { ElNotification } from "element-plus";
import { getToken } from "@/composables/auth"
const service = axios.create({
    baseURL:"/api",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = getToken();
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么

    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    ElNotification({
        title: 'error',
        message: error.message || "请求失败" ,
        type: "error",
        duration: 3000
      });
    return Promise.reject(error);
  });
export default service;