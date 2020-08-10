var path = require("path");
const { remote } = require('electron');

const pro = {
    
    PRO_BASE : 'http://192.168.2.251:2030',// 线上环境地址
    DEFAULT_PATH: path.dirname(remote.app.getPath('exe'))
}
const dev = {
    DEV_BASE : 'http://192.168.41.220:2030',// 开发环境地址
    DEFAULT_PATH: process.env.INIT_CWD,
}

const config = {
    pro,
    dev
}
export default config