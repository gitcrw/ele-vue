import {request} from '../../utils/http'
//登录
let LoginUrl = '/user/login'
//角色权限
let rolePromiseUrl = '/acl/role/api/authority'
//所有项目
let allProjectUrl = '/project/all'
//文件项目
let folderProjectUrl = '/folder/project'
//进入文件夹
let floderDetailUrl = '/folder/detail'
//创建项目
let createProUrl = '/assignment/save'


function POST_LOGIN (params) {
  let headers ={'Content-Type': 'application/x-www-form-urlencoded'}
  console.log(headers)
  return request(LoginUrl,'post',params,headers)
}
function GET_ROLEPROMISE (params) {
  return request(rolePromiseUrl, 'get',params)
}
function GET_ALLPROJECT (params) {
  return request(allProjectUrl,'get', params)
}
function GET_FOLDERPROJECT (params) {
  return request(folderProjectUrl,'get', params)
}
function GET_FOLDERDETAIL (params) {
  return request(floderDetailUrl,'get', params)
}

function POST_CREATEPRO (params) {
  let headers={'Content-Type': 'application/json'}
  return request(createProUrl,'post',params,headers,false)
}

const api = {
  POST_LOGIN,
  GET_ALLPROJECT,
  GET_ROLEPROMISE,
  GET_FOLDERPROJECT,
  GET_FOLDERDETAIL,
  POST_CREATEPRO
}
export default api
