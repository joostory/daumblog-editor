import React, { Component, PropTypes } from 'react'
import { ipcRenderer } from 'electron'

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

class Sidebar extends Component {

  componentWillMount() {
    const { blog } = this.props
    ipcRenderer.send('request-posts', blog.name)
  }

  handleSelectPost(postId) {
    const { blog } = this.props
    ipcRenderer.send('request-post-content', blog.name, postId)
  }

  handleExpireAuth() {
    ipcRenderer.send('expire-auth')
  }

  render() {
    const { blog, posts } = this.props

    console.log(posts)

    return (
      <div className="sidebar">
        <div className="blog-info">
          <div className="blog-image"><Avatar src={blog.profileThumbnailImageUrl} size={100} /></div>
          <div className="blog-name">
            {blog.title}
            <button className="btn btn-expire" onClick={this.handleExpireAuth}>연결해제</button>
          </div>
        </div>

        {posts &&
          <List>
            {posts.map(item =>
              <ListItem
                key={item.postId}
                primaryText={item.title}
                secondaryText={item.date}
                onClick={e => {this.handleSelectPost(item.postId)}}
              />
            )}
          </List>
        }
      </div>
    )
  }
}

Sidebar.propTypes = {
  blog: PropTypes.object.isRequired,
  posts: PropTypes.array
}

export default Sidebar
