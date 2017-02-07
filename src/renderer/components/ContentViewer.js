import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

class ContentViewer extends Component {
  render() {
    const { post, onChangeMode } = this.props
    return (
      <div className="content">
        <h1 className="post-title">{post.title}</h1>
        <div className="viewer-btn">
          <RaisedButton onClick={onChangeMode}>수정</RaisedButton>
        </div>
        <div className="post-content" dangerouslySetInnerHTML={{__html: post.content}} />
      </div>
    )
  }
}

ContentViewer.propTypes = {
  post: PropTypes.object.isRequired,
  onChangeMode: PropTypes.func.isRequired
}

export default ContentViewer
