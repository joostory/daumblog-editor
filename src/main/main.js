const { app, BrowserWindow, ipcMain } = require('electron')
const url = require('url')
const path = require('path')
const fs = require('fs')
const ipc = require('./ipc-event')

let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    autoHideMenuBar: true
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../../app/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  if (process.env.NODE_ENV == "development") {
    mainWindow.webContents.openDevTools()
  }

  ipc.init()
})

app.on('window-all-closed', () => {
  app.quit()
})
