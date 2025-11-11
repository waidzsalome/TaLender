import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // 判断是否是 401 错误（未授权）
    if (error.response && error.response.status === 401) {
      console.warn("Invaid user token");

      // 清除本地 token（可选）
      localStorage.removeItem("token");

      // 使用浏览器跳转
      window.location.href = "/loginrequired";
    }
    return Promise.reject(error);
  }
);

export default request;
