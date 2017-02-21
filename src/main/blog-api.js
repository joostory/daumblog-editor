const fetch = require('node-fetch')
const querystring = require('querystring')
const FormData = require('form-data')

const errorHandler = (res) => {
  if (!res.ok) {
    throw res.json()
  }

  return res.json()
}

module.exports.fetchInfo = (accessToken) => {
  return fetch("https://apis.daum.net/blog/v1/info.json?" + querystring.stringify({
    access_token: accessToken
  })).then(errorHandler)
}

module.exports.fetchPosts = (accessToken, blogName) => {
  return fetch("https://apis.daum.net/blog/v1/" + blogName + "/list.json?" + querystring.stringify({
    access_token: accessToken
  })).then(errorHandler)
}

module.exports.fetchPostContent = (accessToken, blogName, postId) => {
  return fetch("https://apis.daum.net/blog/v1/" + blogName + "/read.json?" + querystring.stringify({
    access_token: accessToken,
    postId: postId
  })).then(errorHandler)
}

module.exports.savePostContent = (accessToken, blogName, post) => {
  let formdata = new FormData()
  formdata.append("postId", post.postId)
  formdata.append("title", post.title)
  formdata.append("content", post.content)
  formdata.append("blogName", blogName)
  if (post.tag) {
    formdata.append("tag", post.tag)
  } else {
    formdata.append("tag", "TEST1,TEST2")
  }

  return fetch("https://apis.daum.net/blog/v1/" + blogName + "/modify.json?" + querystring.stringify({
    access_token: accessToken
  }), {
    method: 'post',
    body: formdata
  }).then(errorHandler)
}
