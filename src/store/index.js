import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import home from './module/home'
import account from './module/account'
import subAccount from "./module/subAccount"
import statistics from "./module/statistics"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    home,
    account,
    subAccount,
    statistics
  }
})
