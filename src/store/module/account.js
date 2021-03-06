import { mainAccountInfo,updateNickName,updatePassword,updateAccountInfo } from '@/api/account'
export default {
  state: {
    accountNumber:"admin",
    companyName:"小沃科技",
    createTs:"2018-07-06 14:12:00",
    nickname:"测试",
    email:"email",
    tel:"110",
    name:"刘涛",
    scopes:"科技",
    companyWebsite:"www.111.c0m",
    access:""
  },
  mutations: {
    setAccountInfo (state, accountInfo) {
      state.accountNumber = accountInfo.accountNumber;
      state.companyName = accountInfo.companyName;
      state.createTs = accountInfo.createTs;
      state.nickname = accountInfo.nickname;

      state.email = accountInfo.email;
      state.tel = accountInfo.tel;
      state.name = accountInfo.name;
      state.scopes = accountInfo.scopes;
      state.companyWebsite = accountInfo.companyWebsite;
      state.access = accountInfo.access;
    }
  },

  actions: {

    handleMainAccountInfo ({ commit }, {accountNumber}) {
      return new Promise((resolve, reject) => {
        mainAccountInfo({
          accountNumber,
        }).then(res => {

          const accountInfo = res.data;
          commit('setAccountInfo', accountInfo)

          resolve()
        }).catch(err => {

          // const accountInfo = {
          //   accountNumber:"admin",
          //   companyName:"小沃科技",
          //   createTs:"2018-07-06 14:12:00",
          //   nickname:"测试",
          //   email:"email",
          //   tel:"110",
          //   name:"姓名",
          //   scopes:"科技",
          //   companyWebsite:"www.111.c0m",
          //   access:["super"]
          // }
          // commit('setAccountInfo', accountInfo)
          // resolve(accountInfo)
          reject(err)
        })
      })
    },

    handleUpdateNickName ({ commit }, { accountId, nickname}) {
      return new Promise((resolve, reject) => {
        updateNickName({ accountId, nickname}
        ).then(res => {
          resolve()
        }).catch(err => {

          reject(err)
        })
      })
    },

    handleUpdatePassword ({ commit }, {accountId,oriPwd, pwd}) {
      return new Promise((resolve, reject) => {
        updatePassword({accountId,oriPwd,pwd}
        ).then(res => {
          resolve(res)
        }).catch(err => {

          reject(err)
        })
      })
    },

    handleUpdateAccountInfo ({ commit }, {accountNumber,email,tel,name,scopes,companyWebsite}) {
      return new Promise((resolve, reject) => {
        updateAccountInfo({ accountNumber,email,tel,name,scopes,companyWebsite}
        ).then(res => {

          resolve()
        }).catch(err => {

          reject(err)
        })
      })
    },

  }
}
