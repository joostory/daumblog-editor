import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ipcRenderer } from 'electron'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './containers/App'
import configureStore from './store/configureStore'
import * as actions from './actions'

injectTapEventPlugin()

const store = configureStore()

ipcRenderer.send('request-blog-info')

ipcRenderer.on("receive-blog-info", (e, info) => {
  console.log(e, info)
  store.dispatch(actions.receiveBlog(info))
  store.dispatch(actions.resetPosts())
  store.dispatch(actions.receivePostContent(null))
})

ipcRenderer.on("receive-posts", (e, posts) => {
  console.log(e, posts)
  store.dispatch(actions.receivePosts(posts))
})

ipcRenderer.on("receive-post-content", (e, postContent) => {
  console.log(e, postContent)
  store.dispatch(actions.receivePostContent(postContent))
})

render (
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
