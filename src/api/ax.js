import axios from '@/libs/axios'

export const send = (url, type, data) => {
  return axios.request({
    url: url,
    data: data,
    method: type
  })
}

export const post = (url, data) => {
  return new Promise((resolve, reject) => {
    send(url, "post", data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export const get = (url, data) => {
  return new Promise((resolve, reject) => {
    send(url, "get", data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export const $del = (url, data) => {
  return new Promise((resolve, reject) => {
    send(url, "delete", data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}



