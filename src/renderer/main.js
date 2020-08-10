import Vue from 'vue'
import axios from 'axios'
import electron from 'electron'
import App from './App'
import router from './router'
import store from './store'

import api from './api/api'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import global from '../utils/global'



if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$electron = electron
Vue.prototype.$api = api
Vue.prototype.$global = global

Vue.prototype.$config =  
Vue.use(ElementUI)


/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
