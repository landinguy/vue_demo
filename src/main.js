// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import '../static/common.less'
import axios from 'axios'
// require('@/mock')

Vue.use(iView);

Vue.config.productionTip = false;
Vue.prototype.baseUrl = "http://192.168.3.101:8090";
// Vue.prototype.baseUrl = "http://27.115.67.203:40026";
axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
