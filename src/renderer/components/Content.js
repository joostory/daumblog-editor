import React, { Component, PropTypes } from 'react'

import ContentViewer from './ContentViewer'
import ContentEditor from './ContentEditor'

class Content extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      mode: "view"
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mode: "view"
    })
	}

  handleChangeViewerMode() {
    this.setState({
      mode: "view"
    })
  }

  handleChangeEditorMode() {
    this.setState({
      mode: "edit"
    })
  }

  render() {
    const { blog, post } = this.props
    const { mode } = this.state

    if (post) {
      if (mode == "edit") {
        return <ContentEditor blog={blog} post={post} onChangeMode={this.handleChangeViewerMode.bind(this)} />
      } else {
        return <ContentViewer blog={blog} post={post} onChangeMode={this.handleChangeEditorMode.bind(this)} />
      }

    } else {
      return (
        <div className="content">
          <div className="empty-message">글을 선택하세요.</div>
        </div>
      )
    }
  }
}

Content.propTypes = {
  blog: PropTypes.object.isRequired,
  post: PropTypes.object
}

export default Content
