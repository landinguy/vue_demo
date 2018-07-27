import Axios from 'axios'
import baseUrl from "./url"
import { Message, Spin} from 'iview'

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

  handleSpinCustom () {
    Spin.show({
      render: (h) => {
        return h('div', [
          h('Icon', {
            style: 'animation: ani-demo-spin 1s linear infinite',
            props: {
              type: 'load-c',
              size: 72
            }
          }),
          h('div', 'Loading')
        ])
      }
    });
  }
  interceptors (instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      this.handleSpinCustom ();
      console.log("request:", config)
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 添加拦截器
    instance.interceptors.response.use(res=>{
      console.log("response:", res);
      if (res.status == 200) {
        if(res.data.code == -1){
          Message.error(res.data.msg)
        }
        Spin.hide();
        return res.data;
      }
      else if (res.status === 401) {
        window.location.href = '/#/login'
        Message.error('未登录，或登录失效，请登录')
      }
      Spin.hide()
    }, err=>{
      Spin.hide();
      Message.error('服务器内部错误')
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
    console.log("options", options);
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
}

const axios = new httpRequest()
export default axios
