const fetch = require('node-fetch')
const querystring = require('querystring')
const FormData = require('form-data')

const errorHandler = (res) => {
  if (!res.ok) {
    console.log(res.status);
    console.log(res.statusText);
    console.log(res.headers.raw());
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
  formdata.append("access_token", accessToken)
  formdata.append("postId", post.postId)
  formdata.append("title", post.title)
  formdata.append("content", post.content)
  if (post.tag) {
    formdata.append("tag", post.tag)
  } else {
    formdata.append("tag", "")
  }

  return fetch("https://apis.daum.net/blog/v1/" + blogName + "/modify.json", {
    method: 'post',
    body: formdata
  }).then(errorHandler)
}
