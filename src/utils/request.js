import axios from "axios";
import { Message } from "element-ui";
import Vue from "vue";
import router from "../router";

//前端API地址
const BASEURL =
  process.env.NODE_ENV === "production"
    ? " "
    : "http://localhost:5000/admin/api";
const service = axios.create({
  baseURL: BASEURL, //http://192.168.31.102:8080/devApi/ == http://wwww.web-jshtml.cn/productApi
  timeout: 15000
});

// 添加请求拦截器
//在请求头添加参数
service.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    //token
    if (localStorage.token) {
      config.headers.Authorization = "Bearer " + localStorage.token;
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 添加响应拦截器
// service.interceptors.response.use(
//   function(response) {
//     // console.log(response);
//     let data = response;

//     // return response;
//     if (data.resCode !== 0) {
//       //有错误
//       // Message.error(data.message);
//       return Promise.reject(data.message);
//     } else {
//       // Do something with response data
//       return response;
//     }
//   },
//   function(error) {
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );

service.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    if (err.response.data.message) {
      Message.error(err.response.data.message);

      // console.log(err.response);
      if (err.response.status === 401) {
        console.log(Vue.prototype);
        router.push("/login");
      }

      return Promise.reject(err);
    }
  }
);

export default service;
