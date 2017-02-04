const { app, BrowserWindow, ipcMain } = require('electron')
const url = require('url')
const path = require('path')
const fs = require('fs')
const electronOauth2 = require('electron-oauth2')

let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../../app/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  ipcMain.on("request-auth", (e) => {
    let oauth2info = JSON.parse(fs.readFileSync(path.join(__dirname, "../../oauth2info.json"), 'utf8'))

    const daumOauth = electronOauth2(oauth2info, {
      alwaysOnTop: true,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: false
      }
    });

    daumOauth.getAccessToken({})
      .then(auth => {
        e.sender.send('receive-auth', auth)
      });
  })
})

app.on('window-all-closed', () => {
  app.quit()
})
