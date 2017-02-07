import React, { Component, PropTypes } from 'react'
import { ipcRenderer } from 'electron'
import RaisedButton from 'material-ui/RaisedButton'

class Ready extends Component {

  handleRequestAuth() {
    ipcRenderer.send("request-auth")
  }

  render() {
    return (
      <div className="ready">
        <h1>Daum Blog Editor</h1>
        <RaisedButton onClick={this.handleRequestAuth}>인증</RaisedButton>
      </div>
    )
  }
}

export default Ready
