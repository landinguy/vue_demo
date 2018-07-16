import { querySubAccountList,disableOrDeleteSubAccount } from '@/api/account'
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

    handleQuerySubAccountList({commit}, {accountNumber,subaccountNumber, status}) {
      return new Promise((resolve, reject) => {
        querySubAccountList({accountNumber,subaccountNumber, status}
        ).then(res => {
          resolve()
        }).catch(err => {

          const subAccountList = [
            {
              subaccountNumber:"test1",
              subaccountNickname:"测试账号",
              owner:"张三",
              status:"1",
            },
            {
              subaccountNumber:"test2",
              subaccountNickname:"测试账号",
              owner:"张三",
              status:"2",
            },
            {
              subaccountNumber:"test3",
              subaccountNickname:"测试账号",
              owner:"张三",
              status:"3",
            },
          ]
          commit('setSubAccountList', subAccountList)
          reject(err)
        })
      })
    },

    handleDisableOrDeleteSubAccount({commit}, {accountNumber,subaccountNumber, status}) {
      return new Promise((resolve, reject) => {
        disableOrDeleteSubAccount({accountNumber,subaccountNumber, status}
        ).then(res => {
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
  }
  }
