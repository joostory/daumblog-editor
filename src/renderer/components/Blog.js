import React, { Component, PropTypes } from 'react'
import { ipcRenderer } from 'electron'

import Sidebar from './Sidebar'
import Content from './Content'

class Blog extends Component {

  render() {
    const { blog, posts, postContent } = this.props

    return (
      <div>
        <Sidebar blog={blog} posts={posts} />
        <Content blog={blog} post={postContent} />
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  posts: PropTypes.array,
  postContent: PropTypes.object
}

export default Blog
