'use strict'

import { app, BrowserWindow, ipcMain, Menu, Tray,globalShortcut,ipcRenderer } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
//托盘对象
var appTray = null;

//窗口
let mainWindow
let loadDownWindow = false
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

const downURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080#download`
  : `file://${__dirname}/index.html#download`


function createWindow() {
  Menu.setApplicationMenu(null)
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 360,
    useContentSize: true,
    width: 776,
    frame: false,
    resizable: false // 不可拖动大小
  })


  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  //系统托盘右键菜单
  var trayMenuTemplate = [
    {
      label: '打开主界面',
      click: function () { 
        mainWindow.show()
      } //打开相应页面
    },
    {
      label: '下载管理',
      click: function () { 
        loadDownWindow?
        loadDownWindow.show():
        (
          loadDownWindow = new BrowserWindow({
            useContentSize: true,
            width: 549,
            height: 439,
            frame: false,
            resizable: false // 不可拖动大小
          }),
          loadDownWindow.loadURL(downURL)
        )
      }
    },
    {
      label: '帮助',
      click: function () { }
    },
    {
      label: '关于',
      click: function () { }
    },
    {
      label: '退出',
      click: function () {
        app.quit();
      }
    }
  ];

  //系统托盘图标目录

  appTray = new Tray(__static + '/logo.ico');

  //图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

  //设置此托盘图标的悬停提示内容
  appTray.setToolTip('This is my application.');

  //设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu);



//注册打包后的调试工具快捷键
globalShortcut.register('CommandOrControl+F3',()=>{
  mainWindow.openDevTools()
})

loadDownWindow = new BrowserWindow({
  width: 549,
  height: 439,
  show: false, // 初始状态下不显示
  resizable: false, // 不可拖动大小
  frame: false, // 去掉默认结构
  backgroundColor: '#ffffff', // 背景颜色
  webPreferences: {
    devTools: true
  }
})
global.downloadWindowId = loadDownWindow.id;
console.log(global.downloadWindowId)
loadDownWindow.loadURL(downURL)

//这是初始化函数
}


//接收渲染进程消息
ipcMain.on('into', () => {
  mainWindow.setResizable(true)
  mainWindow.setSize(1280, 778)
  mainWindow.center()
  mainWindow.setResizable(false)
})
ipcMain.on('mini', () => {
  mainWindow.minimize()
})
ipcMain.on('unmaximize', () => {
  mainWindow.unmaximize()
  console.log('unmaximize')
})
ipcMain.on('maximize', () => {
  mainWindow.maximize()
  console.log('maximize')
})
ipcMain.on('close', () => {
  
  mainWindow.destroy()
})


//下载
ipcMain.on('download', () => {
  loadDownWindow.show()
  
})

ipcMain.on('close-download', () => {
  loadDownWindow.hide()
})






app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})






/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
