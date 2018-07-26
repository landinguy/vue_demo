import axios from '@/libs/axios'

export const send = (url, data) => {
  return axios.request({
    url:url,
    data:data,
    method: 'post'
  })
}

export const post = (url, data) =>{
  return new Promise((resolve, reject) => {
    send(url, data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}



