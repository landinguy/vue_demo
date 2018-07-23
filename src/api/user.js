import axios from '@/libs/axios'
import url from './url'
// import axios from 'axios'

export const login = ({ username, passwd }) => {
  const data = {
    username,
    passwd
  }
  return axios.request({
    url:url.login,
    data:data,
    method: 'post'
  })
  // axios.defaults.withCredentials = true;
  // return axios.post("http://192.168.2.58:8090"+url.login, data)



}

