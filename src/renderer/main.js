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


// IMAGE_URL_PREFIX: base.BASE_URL + '/file/preview/', // 图片地址
// IMAGE_DOWNLOAD_URL_PREFIX: base.BASE_URL + '/file/download/', // 下载图片的地址
// ANNEX_DOWNLOAD_URL_PREFIX: base.BASE_URL + '/file/annex/download/', // 下载附件的地址
const baseUrl = 'http://192.168.41.220:2030'
Vue.prototype.fp = baseUrl+'/file/preview';
Vue.prototype.fd = baseUrl+'/file/download/';
Vue.prototype.fad = baseUrl+'/file/annex/download/';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$electron = electron
Vue.prototype.$api = api
Vue.prototype.$global = global
Vue.use(ElementUI)


/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
