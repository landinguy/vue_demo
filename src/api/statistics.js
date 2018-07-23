import axios from '@/libs/axios'
import url from './url'

export const statisticsCount = ({ st, et, accountId }) => {
  const data = { st, et, accountId }
  return axios.request({
    url:url.statisticsCount,
    data,
    method: 'post'
  })
}


export const statisticsList = ({st,et,page,pageSize,accountId}) => {
  const data = {st,et,page,pageSize,accountId}
  return axios.request({
    url:url.statisticsList,
    data,
    method: 'post'
  })
}

export const statisticsDetailCount = ({st, et, accountId}) => {
  const data = {st, et, accountId}
  return axios.request({
    url:url.statisticsDetailCount,
    data,
    method: 'post'
  })
}


export const statisticsDetailList = ({st,et,page,pageSize,accountId}) => {
  const data = {st,et,page,pageSize,accountId}
  return axios.request({
    url:url.statisticsDetailList,
    data,
    method: 'post'
  })
}
