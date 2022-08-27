import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: 'http://120.24.64.5:8088/mall-admin',
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 在发送请求之前做些什么
    let token = Cookies.get('token')
    if (token) {
      config.headers = config.headers || {}   // 当config.headers为undefined时,为{}
      config.headers.Authorization = token
    }
    return config;
  },
  (error: AxiosError) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    return response;
  },
  (error: AxiosError) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default instance