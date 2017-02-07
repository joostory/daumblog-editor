import * as types from '../constants/ActionTypes'

export const receiveBlog = (blog) => {
	return { type: types.RECEIVE_BLOG, blog }
}

export const receivePosts = (posts) => {
	return { type: types.RECEIVE_POSTS, posts }
}

export const resetPosts = () => {
	return { type: types.RESET_POSTS }
}

export const receivePostContent = (postContent) => {
	return { type: types.RECEIVE_POST_CONTENT, postContent }
}
