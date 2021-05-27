import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

// 创建axios示例
const service = axios.create({
  // 如果执行npm run dev 值为/api /api只是为开发环境配置的代理
  // 如果执行npm run build 值为/prd-api 到时候配置/prd-api的代理
  // 反向代理的值完全由我们自己决定

  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础地址
  timeout: 5000 // 请求响应时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // config.headers['Authorization'] = `${store.getters.token}`
      if (!config.params) {
        config.params = []
      }
      // config.params['token'] = `${store.getters.token}`
      config.params['token'] = store.getters.token
    }
    return config
  },
  error => {
    return Promise.reject(error) // 返回执行错误，让当前的执行链跳出成功 直接进入catch
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // console.log(response)
    // response.setContentType('application/json;charset=utf-8')
    return response
  },
  error => {
    Message.error(error.message) // 提示错误信息
    return Promise.reject(error) // 返回执行错误，让当前的执行链跳出成功 直接进入catch
  }
)

export default service
