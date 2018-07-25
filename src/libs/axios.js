import Axios from 'axios'
import baseUrl from "./url"
import { Message } from 'iview'

class httpRequest {
  constructor () {
    this.options = {
      method: '',
      url: ''
    }
    // 存储请求队列
    this.queue = {}
  }
  // 销毁请求实例
  destroy (url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }
  interceptors (instance, url) {
    // 添加请求拦截器
    // instance.interceptors.request.use(config => {
    //   console.log("request:", config)
    //   return config
    // }, error => {
    //   return Promise.reject(error)
    // })
    // 添加拦截器
    instance.interceptors.response.use(res=>{
      console.log("response:", res.data);
      return res.data;
    }, err=>{
      Message.error('服务内部错误')
      return Promise.reject(err)
    });
  }

  // 创建实例
  create () {
    let conf = {
      baseURL: baseUrl.base,//baseUrl
      timeout: 3000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      }
    }
    return Axios.create(conf)
  }
  // 合并请求实例
  mergeReqest (instances = []) {
    //
  }
  // 请求实例
  request (options) {
    var instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
}

const axios = new httpRequest()
export default axios
