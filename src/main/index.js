'use strict'

import { app, BrowserWindow, ipcMain, Menu, Tray } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
//托盘对象
var appTray = null;

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

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
      label: '意见反馈',
      click: function () { }
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










}
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
