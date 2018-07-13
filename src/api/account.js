import axios from '@/libs/axios'
import url from './url'

export const mainAccountInfo = ({ accountNumber }) => {
  const data = {
    }
  return axios.request({
    url:url.getAdmininfo + accountNumber,
    data,
    method: 'post'
  })
}

export const updateNickName = ({accountNumber,companyName,createTs, nickname}) => {
  const data = {
    accountNumber,
    companyName,
    createTs,
    nickname
  }
  return axios.request({
    url:url.updateAdminNickname,
    data,
    method: 'post'
  })
}

export const updatePassword = ({accountNumber,pwd}) => {
  const data = {
    accountNumber,
    pwd
  }
  return axios.request({
    url:url.updateAdminPassword,
    data,
    method: 'post'
  })
}

export const updateAccountInfo = ({accountNumber,email,tel,name,scopes,companyWebsite}) => {
  const data = {accountNumber,email,tel,name,scopes,companyWebsite}
  return axios.request({
    url:url.updateAdminProperty,
    data,
    method: 'post'
  })
}

export const querySubAccountList = ({accountNumber,subaccountNumber, status}) => {
  const data = {
    subaccountNumber, status
  }
  return axios.request({
    url:url.subAccountList + accountNumber,
    data,
    method: 'post'
  })
}

export const disableOrDeleteSubAccount = ({accountNumber,subaccountNumber, status}) => {
  const data = {
    subaccountNumber, status
  }
  return axios.request({
    url:url.disableOrDeleteSubAccount + accountNumber,
    data,
    method: 'post'
  })
}
