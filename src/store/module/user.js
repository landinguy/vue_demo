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
      sessionStorage.setItem("accountNickname", accountNickname);
    },
    setRoleId (state, roleId) {
      state.roleId = roleId;
      sessionStorage.setItem("roleId", roleId);
      state.access = roleId;
    },
  },
  getters:{
      accountId:state=>{
        state.accountId = state.accountId;
        return sessionStorage.getItem("accountId");
      },
    accountNumber:state=>{
        state.accountNumber = state.accountNumber;
        return sessionStorage.getItem("accountNumber")
      },
    roleId:state=>{
        state.roleId = state.roleId;
        state.access = sessionStorage.getItem("roleId");
        return sessionStorage.getItem("roleId")
    },
    accountNickname:state=>{
      state.accountNickname = state.accountNickname;
      return sessionStorage.getItem("accountNickname")
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
