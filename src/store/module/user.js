import { login } from '@/api/user'


export default {
  state: {
    accountId:'',
    accountNumber: '',
    accountNickname: '',
    roleId: '',
    access:[],
  },
  mutations: {
    setAccountId (state, accountId) {
      state.accountId = accountId
      sessionStorage.setItem("accountId", accountId);
    },
    setAccountNumber (state, accountNumber) {
      state.accountNumber = accountNumber
      sessionStorage.setItem("accountNumber", accountNumber);
    },
    setAccountNickname (state, accountNickname) {
      state.accountNickname = accountNickname;
    },
    setRoleId (state, roleId) {
      state.roleId = roleId
    }
  },
  getters:{
      accountId:state=>{
        return sessionStorage.getItem("accountId")
      },
    accountNumber:state=>{
        return sessionStorage.getItem("accountNumber")
      }
  },

  actions: {
    // 登录
    handleLogin ({ commit }, {username, passwd}) {
      // userName = userName.trim()
      console.log("%",username, passwd)
      return new Promise((resolve, reject) => {
        login({
          username,
          passwd
        }).then(res => {
          commit('setAccountId', res.data.data.accountId);
          commit('setAccountNumber', res.data.data.accountNumber);
          commit('setAccountNickname', res.data.data.accountNickname);
          commit('setRoleId', res.data.data.roleId);
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setToken', '')
          resolve()
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },

  }
}
