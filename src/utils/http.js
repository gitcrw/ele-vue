
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { Message, Loading } from 'element-ui'

import config from './config'

let loading;
// http://192.168.41.251:2030

axios.defaults.timeout = 200000//超时时间
axios.defaults.headers['Content-Type']  =  'application/x-www-form-urlencoded;charset=UTF-8'
console.log(config)
  //判断当前是什么环境切换ip
  if(process.env.NODE_ENV==='development'){
    axios.defaults.baseURL = config.dev.DEV_BASE
    Vue.prototype.default_path = config.dev.DEFAULT_PATH
  }else{
    axios.defaults.baseURL = config.pro.PRO_BASE
    Vue.prototype.default_path = config.pro.DEFAULT_PATH
  }   

  Vue.prototype.fp = axios.defaults.baseURL+'/file/preview';//图片地址
  Vue.prototype.fd = axios.defaults.baseURL+'/file/download/';//图片下载地址
  Vue.prototype.fad = axios.defaults.baseURL+'/file/annex/download/';//附件下载地址
  console.log(axios.defaults.baseURL)
// http request 拦截器
axios.interceptors.request.use(
  config => {
    config.headers['x-oss-token'] = localStorage.getItem('token')||null
    // loading = Loading.service({})
    return config
  },
  error => {
    // loading.close()
    return Promise.reject(error)
  },

  
)

// //http response 拦截器
axios.interceptors.response.use(

    response => {
      
        // if (response.data.errCode == 2) {
        //     router.push({
        //         path: "/login",
        //         querry: { redirect: router.currentRoute.fullPath }
        //     })
        // }
        // loading.close()
        return response;
    },
    error => {
      // loading.close()
      if(error.message.includes('timeout')){
        Message.error('请求超时，稍后再试')
        return Promise.reject(error)
      }
      Message.error('网络连接失败')
        return Promise.reject(error) 
    },

)

// request
export  function request(url, method, params = {},headers={},isQS=true) {
	// 首先判断是get请求还是post请求
  let data = method.toLocaleLowerCase() === 'get' ? 'params' : 'data';
  console.log(headers,isQS)
	return axios({
      headers,
    	method,
    	url,
      [data]: method.toLocaleLowerCase() === 'get' ?params:isQS?qs.stringify(params):params, // 差异点在于data的值,默认处理格式
	}).then((res) => {
    	return Promise.resolve(res.data);
	}).catch((err) => {
    	return Promise.reject(err);
	})
}
