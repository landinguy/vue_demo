import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import iView from 'iview'
import store from '@/store'
import {canTurnTo} from '@/libs/util'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes
})
// router.beforeEach((to, from, next) => {
//   iView.LoadingBar.start()
//   if (to.name != "login" && store.getters.accountId == null) {
//     next({
//       replace: true,
//       name: 'login'
//     })
//   }
//   else {
//     next();
//   }
//   // store.dispatch('handleMainAccountInfo',"").then(user => {
//   //   console.log("to:" + to.name, user.access)
//   //   if (canTurnTo(to.name, user.access, routes)) next() // 有权限，可访问
//   //   else next({ replace: true, name: 'error404' }) // 无权限，重定向到401页面
//   // })
//   // console.log("accountId:" + store.getters.accountId)
// })
//
// router.afterEach(to => {
//   iView.LoadingBar.finish()
//   window.scrollTo(0, 0)
// })
export default router
