import { login,logout } from '@/api/user'


export default {
  state: {
    accountId:'',
    accountNumber: '',
    accountNickname: '',
    roleId: '',
    access:"",
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
      state.roleId = roleId;
      sessionStorage.setItem("roleId", roleId);
      state.access = roleId;
    },
  },
  getters:{
      accountId:state=>{
        return sessionStorage.getItem("accountId")
      },
    accountNumber:state=>{
        return sessionStorage.getItem("accountNumber")
      },
    roleId:state=>{
      state.access = sessionStorage.getItem("roleId");
      return sessionStorage.getItem("roleId")
    }
  },

  actions: {
    // 登录
    handleLogin ({ commit }, {username, passwd}) {
      return new Promise((resolve, reject) => {
        login({
          username,
          passwd
        }).then(res => {
          console.log(res)
          commit('setAccountId', res.data.accountId);
          commit('setAccountNumber', res.data.accountNumber);
          commit('setAccountNickname', res.data.accountNickname);
          commit('setRoleId', res.data.roleId);
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          commit('setAccountId', '');
          commit('setAccountNumber',  '');
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

  }
}
