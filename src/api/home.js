import axios from '@/libs/axios'
import url from './url'

export const total = ({accountId, st, et }) => {
  const data = {
    st,
    et
  }
  console.log(data)
  return axios.request({
    url:url.homeTotal + accountId,
    data,
    method: 'post'
  })
}

export const trend = ({ accountId, st, et }) => {
  const data = {
    st,
    et
  }

  return axios.request({
    url:url.homeTrend + accountId,
    data,
    method: 'post'
  })
}
