
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 20000
axios.defaults.baseURL = 'http://192.168.41.220:2030'// 基本地址
axios.defaults.headers['Content-Type']  =  'application/x-www-form-urlencoded; charset=UTF-8'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    config.data = qs.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-oss-token': localStorage.getItem('token')
    }
    return config
  },
  error => {
    return Promise.reject(err)
  }
)

// //http response 拦截器
// axios.interceptors.response.use(
//     response => {
//         if (response.data.errCode == 2) {
//             router.push({
//                 path: "/login",
//                 querry: { redirect: router.currentRoute.fullPath }
//             })
//         }
//         return response;
//     },
//     error => {
//         return Promise.reject(error)
//     }
// )

// request
export  function request(url, method, params = {}) {
	// 首先判断是get请求还是post请求
	let data = method.toLocaleLowerCase() === 'get' ? 'params' : 'data';
	return axios({
    	method,
    	url,
    	[data]: params // 差异点在于data的值
	}).then((res) => {
    	return Promise.resolve(res.data);
	}).catch((err) => {
    	return Promise.reject(err);
	})
}
