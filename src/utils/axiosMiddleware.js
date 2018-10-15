import axios from 'axios'
import { Message, MessageBox } from 'element-ui'

const service = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000
})

service.interceptors.request.use(config => {
  return config
})
service.interceptors.response.use(
  response => {
    let res = response.data
    if (res.code !== 0) {
      Message({ message: res.message, type: 'error', duration: 5 * 1000 })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '您已被登出，可以取消继续留在该页面，或者重新登录',
          '确认登出',
          {
            confirmButtonText: '重新登录',
            concelButtonText: '取消',
            type: 'warining'
          }
        ).then(() => {
          //todo dosomething
        })
      }
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    // 响应失败
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
