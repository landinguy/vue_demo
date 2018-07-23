import Axios from 'axios'
import baseUrl from "./url"


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

  // 创建实例
  create () {
    let conf = {
      baseURL: baseUrl.base,//baseUrl
      timeout: 2000,
      withCredentials: true,
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // 'Access-Control-Allow-Origin':'http://192.168.2.39:8080',
        // 'Access-Control-Allow-Headers':'Content-Type,Content-Length, Authorization,\'Origin\',Accept,X-Requested-With',
        // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        // 'Access-Control-Allow-Credentials':true,
        'Content-Type': 'application/json; charset=utf-8',
        // 'X-URL-PATH': location.pathname
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
    // this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
}

const axios = new httpRequest()
export default axios
