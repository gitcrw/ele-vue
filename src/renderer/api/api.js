import {request} from '../../utils/http'
//登录
let LoginUrl = '/user/login'
//角色权限
// let rolePromiseUrl = '/acl/role/api/authority'
let rolePromiseUrl = 'https://www.fastmock.site/mock/de7c0e07d588123285a1984ef3d50570/api/acl/role/api/authority'

//所有项目
// let allProjectUrl = '/project/all'
let allProjectUrl = 'https://www.fastmock.site/mock/de7c0e07d588123285a1984ef3d50570/api/project/all'

//文件项目
let folderProjectUrl = '/folder/project'
//进入文件夹
let floderDetailUrl = '/folder/detail'
//创建项目
let createProUrl = '/assignment/save'

//上传文件到oss
let uploadUrl = '/file/common/upload'
//更新用户信息
let upUserUrl = '/user/updateUserAttribute'
//修改密码
let updatePWdUrl = '/user/updatePassword'


function POST_LOGIN (params) {
  return request(LoginUrl,'post',params)
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

function POST_UPLOAD(params){
  let headers={'Content-Type': 'multipart/form-data'}
  return request(uploadUrl,'post',params,headers,false)
}
function POST_UPUSERINFO(params){
  return request(upUserUrl,'post',params)
}
function POST_UPDATEPWD(params){
  return request(updatePWdUrl,'post',params)
}


const api = {
  POST_LOGIN,
  GET_ALLPROJECT,
  GET_ROLEPROMISE,
  GET_FOLDERPROJECT,
  GET_FOLDERDETAIL,
  POST_CREATEPRO,
  POST_UPLOAD,
  POST_UPUSERINFO,
  POST_UPDATEPWD
}
export default api
