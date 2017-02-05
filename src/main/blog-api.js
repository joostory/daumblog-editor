const fetch = require('node-fetch')
const querystring = require('querystring')

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
