const { ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
const electronOauth2 = require('electron-oauth2')
const storage = require('electron-json-storage')
const blogApi = require('./blog-api')

const requestAuth = (e) => {
  let oauth2info = JSON.parse(fs.readFileSync(path.join(__dirname, "../../oauth2info.json"), 'utf8'))

  let daumOauth = electronOauth2(oauth2info, {
    alwaysOnTop: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false
    }
  });

  daumOauth.getAccessToken({})
    .then(auth => {
      storage.set('auth', auth)
      fetchInfo(e, auth.access_token)
    });
}

const fetchInfo = (e, accessToken) => {
  blogApi.fetchInfo(accessToken)
    .then(res => {
      e.sender.send('receive-blog-info', res.channel)
    })
    .catch(err => {
      e.sender.send('receive-blog-info')
    })
}

const requestBlogInfo = (e) => {
  storage.get('auth', (error, auth) => {
    if (error) throw error

    if (!auth || !auth.access_token) {
      e.sender.send('receive-blog-info')
    }

    fetchInfo(e, auth.access_token)
  })
}

module.exports.init = () => {
  ipcMain.on("request-auth", requestAuth)
  ipcMain.on("request-blog-info", requestBlogInfo)
}
