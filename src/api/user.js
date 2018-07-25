import axios from '@/libs/axios'
import url from './url'

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
}

export const logout = () => {
  const data = {}
  return axios.request({
    url: url.logout,
    data: data,
    method: 'post'
  })
}
