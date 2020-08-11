import {request} from '../../utils/http'
//登录
let LoginUrl = '/user/login'
//角色权限
let rolePromiseUrl = '/acl/role/api/authority'
// let rolePromiseUrl = 'https://www.fastmock.site/mock/de7c0e07d588123285a1984ef3d50570/api/acl/role/api/authority'

//所有项目
let allProjectUrl = '/project/all'
// let allProjectUrl = 'https://www.fastmock.site/mock/de7c0e07d588123285a1984ef3d50570/api/project/all'

//文件项目
let folderProjectUrl = '/folder/project'
//进入文件夹
let floderDetailUrl = '/folder/detail'
//创建项目
let createProUrl = '/assignment/save'

//上传文件到oss
let uploadUrl = '/file/common/upload'
//上传文件到文件夹
let uploadFolderUrl = '/file/upload/folder'
//更新用户信息
let upUserUrl = '/user/updateUserAttribute'
//修改密码
let updatePWdUrl = '/user/updatePassword'

//我的任务
let tasksUrl = '/assignment/page'
//详情
let tasksDetailUrl = '/assignment/info'
let tasksDetailUrl2 = '/assignment/reviews'
//更新
let taskDetUpdateUrl = '/assignment/update'
//评论
let taskDetplUrl = '/assignment_review/save'
//评论列表
let taskplListUrl = '/assignment/reviews/'

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
function POST_UPLOADFOLDER(params){
  let headers={'Content-Type': 'multipart/form-data'}
  return request(uploadFolderUrl,'post',params,headers,false)
}

function POST_UPUSERINFO(params){
  return request(upUserUrl,'post',params)
}
function POST_UPDATEPWD(params){
  return request(updatePWdUrl,'post',params)
}
function GET_TASKS(params){
  return request(tasksUrl,'get',params)
}

function GET_TASKSDETAIL(params){
  let {id} = params
    return request(tasksDetailUrl+'/'+id,'get',params)
}
function GET_TASKSDETAIL2(params){
  let {id} = params
    return request(tasksDetailUrl2+'/'+id,'get',params)
}
function POST_TASKDETUPDATE(params){
  let headers={'Content-Type': 'application/json'}
    return request(taskDetUpdateUrl,'post',params,headers,false)
}
function POST_TASKDETPL(params){
    return request(taskDetplUrl,'post',params)
}
function GET_TASKSPLLIST(params){
  let {id} = params
    return request(taskplListUrl+id,'get',params)
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
  POST_UPDATEPWD,
  GET_TASKS,
  GET_TASKSDETAIL,
  GET_TASKSDETAIL2,
  POST_TASKDETUPDATE,
  POST_TASKDETPL,
  GET_TASKSPLLIST,
  POST_UPLOADFOLDER
}
export default api
