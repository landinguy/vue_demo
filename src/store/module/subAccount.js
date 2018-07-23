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
          commit('setSubAccountList', res.data.data)
          resolve(res)
        }).catch(err => {

          // const subAccountList = [
          //   {
          //     subaccountNumber:"test1",
          //     subaccountNickname:"测试账号",
          //     owner:"张三",
          //     status:"1",
          //   },
          //   {
          //     subaccountNumber:"test2",
          //     subaccountNickname:"测试账号",
          //     owner:"张三",
          //     status:"2",
          //   },
          //   {
          //     subaccountNumber:"test3",
          //     subaccountNickname:"测试账号",
          //     owner:"张三",
          //     status:"3",
          //   },
          // ]
          commit('setSubAccountList', res.data.data)
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
    handleAddSubAccount({commit}, {accountNumber,subaccountNumber, subaccountNickname,owner,pwd,roleId}) {
      return new Promise((resolve, reject) => {
        addSubAccount({accountNumber,subaccountNumber, subaccountNickname,owner,pwd,roleId}
        ).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleModifySubAccount({commit}, {accountNumber,subaccountId,subaccountNumber, subaccountNickname,owner,pwd,roleId}) {
      return new Promise((resolve, reject) => {
        modifySubAccount({accountNumber,subaccountId,subaccountNumber, subaccountNickname,owner,pwd,roleId}
        ).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

  }
  }
