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

export const updateNickName = ({accountId, nickname}) => {
  const data = {
    accountId,
    nickname
  }
  return axios.request({
    url:url.updateAdminNickname,
    data,
    method: 'post'
  })
}

export const updatePassword = ({accountId,oriPwd,pwd}) => {
  const data = {
    accountId,
    oriPwd,
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

export const querySubAccountList = (querySubAccountList) => {
  const data = querySubAccountList
  return axios.request({
    url:url.subAccountList,
    data,
    method: 'post'
  })
}

export const disableOrDeleteSubAccount = ({subaccountId, status}) => {
  const data = {subaccountId, status}
  return axios.request({
    url:url.disableOrDeleteSubAccount,
    data,
    method: 'post'
  })
}

export const addSubAccount = ({accountNumber,subaccountNumber, subaccountNickname,remark,pwd,roleId}) => {
  const data = {accountNumber,subaccountNumber, subaccountNickname,remark,pwd,roleId}
  return axios.request({
    url:url.addSubAccount,
    data,
    method: 'post'
  })
}

export const modifySubAccount = ({accountNumber,subaccountId,subaccountNumber, subaccountNickname,remark,pwd,roleId}) => {
  const data = {accountNumber,subaccountId,subaccountNumber, subaccountNickname,remark,pwd,roleId}
  return axios.request({
    url:url.modifySubAccount,
    data,
    method: 'post'
  })
}
