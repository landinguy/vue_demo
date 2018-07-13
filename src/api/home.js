import axios from '@/libs/axios'
import url from './url'

export const total = ({admin, st, et }) => {
  const data = {
    st,
    et,
    admin
  }
  return axios.request({
    url:url.homeTotal,
    data,
    method: 'post'
  })
}

export const trend = ({ admin, st, et }) => {
  const data = {
    st,
    et,
    admin
  }
  return axios.request({
    url:url.homeTrend,
    data,
    method: 'post'
  })
}
