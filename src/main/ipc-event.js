const { ipcMain, session } = require('electron')
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
      nodeIntegration: false,
      session: session.fromPartition("daum:oauth2:" + new Date())
    }
  });

  daumOauth.getAccessToken({})
    .then(auth => {
      storage.set('auth', auth)
      fetchInfo(e, auth.access_token)
    });
}

const expireAuth = (e) => {
  storage.remove('auth', (error) => {
    e.sender.send('receive-blog-info', null)
  })
}

const fetchInfo = (e, accessToken) => {
  blogApi.fetchInfo(accessToken)
    .then(res => {
      e.sender.send('receive-blog-info', res.channel)
    })
    .catch(err => {
      console.log("fetchInfo failed", err)
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

const requestPosts = (e, blogName) => {
  storage.get('auth', (error, auth) => {
    if (error) throw error

    if (!auth || !auth.access_token) {
      e.sender.send('receive-blog-info')
    }

    blogApi.fetchPosts(auth.access_token, blogName)
      .then(res => {
        e.sender.send('receive-posts', res.channel.item)
      })
      .catch(err => {
        console.log("fetchPosts failed", err)
        e.sender.send('receive-posts')
      })

  })
}

const requestPostContent = (e, blogName, postId) => {
  storage.get('auth', (error, auth) => {
    if (error) throw error

    if (!auth || !auth.access_token) {
      e.sender.send('receive-blog-info')
    }

    blogApi.fetchPostContent(auth.access_token, blogName, postId)
      .then(res => {
        e.sender.send('receive-post-content', res.channel)
      })
      .catch(err => {
        console.log("fetchPostContent failed", err)
        e.sender.send('receive-post-content')
      })

  })
}

const savePostContent = (e, blogName, post) => {
  storage.get('auth', (error, auth) => {
    if (error) throw error

    if (!auth || !auth.access_token) {
      e.sender.send('receive-blog-info')
    }

    blogApi.savePostContent(auth.access_token, blogName, post)
      .then(res => {
        e.sender.send('receive-post-content', post)
      })
      .catch(err => {
        console.log("savePostContent failed", err)
        // e.sender.send('receive-post-content')
      })

  })
}

module.exports.init = () => {
  ipcMain.on("request-auth", requestAuth)
  ipcMain.on("expire-auth", expireAuth)
  ipcMain.on("request-blog-info", requestBlogInfo)
  ipcMain.on("request-posts", requestPosts)
  ipcMain.on("request-post-content", requestPostContent)
  ipcMain.on("save-post-content", savePostContent)
}
