import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Ready from '../components/Ready'
import Blog from '../components/Blog'

class App extends Component {

	render() {
		const { blog, posts, postContent } = this.props

    if (blog) {
      return <Blog blog={blog} posts={posts} postContent={postContent} />
    } else {
      return <Ready />
    }
	}
}

App.propTypes = {
	blog: PropTypes.object,
	posts: PropTypes.array.isRequired,
  postContent: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
		blog: state.blog,
		posts: state.posts,
    postContent: state.postContent
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
