import { querySubAccountList,disableOrDeleteSubAccount,addSubAccount,modifySubAccount } from '@/api/account'
export default {
  state: {
    subAccountList:[]
  },
  mutations: {
    setSubAccountList (state, subAccountList) {
      state.subAccountList = subAccountList;
    }
  },

  actions: {

    handleQuerySubAccountList({commit}, {subaccountNickname,status}) {
      return new Promise((resolve, reject) => {
        querySubAccountList({subaccountNickname,status}
        ).then(res => {
          commit('setSubAccountList', res.data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

    handleDisableOrDeleteSubAccount({commit}, {subaccountId, status}) {
      return new Promise((resolve, reject) => {
        disableOrDeleteSubAccount({subaccountId, status}
        ).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleAddSubAccount({commit}, {accountNumber,subaccountNumber, subaccountNickname,remark,pwd,roleId}) {
      return new Promise((resolve, reject) => {
        addSubAccount({accountNumber,subaccountNumber, subaccountNickname,remark,pwd,roleId}
        ).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleModifySubAccount({commit}, {accountNumber,subaccountId,subaccountNumber, subaccountNickname,remark,pwd,roleId}) {
      return new Promise((resolve, reject) => {
        modifySubAccount({accountNumber,subaccountId,subaccountNumber, subaccountNickname,remark,pwd,roleId}
        ).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

  }
  }
