import axios from "axios";
import { CheckStatus } from "./checkStatus";

var requestStatus = true;

//创建 axios 实例
const service = axios.create({
  baseURL: "/api",
  timeout: 5000,
  headers: {
    // "Content-Type": "application/form-data;charset=UTF-8"
    "Content-Type": "application/json;charset=UTF-8"
    // authorization: localStorage.getItem("token") || ""
  }
});

// 添加请求拦截
service.interceptors.request.use((config) => {
  if (localStorage.getItem("token")) {
    config.headers.token = localStorage.getItem("token") || "";
  }
  return config;
});

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    const status = response.data.status;
    if (status !== 200) {
      !requestStatus || CheckStatus(status);
      requestStatus = false;
      return;
    }
    requestStatus = true;
    return response.data;
  },
  (error) => {
    !requestStatus || CheckStatus(error.response.status);
    requestStatus = false;
    return error.response.data;
  }
);

export default service;
