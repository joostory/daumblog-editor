import * as types from '../constants/ActionTypes'
import { combineReducers } from 'redux'
import blog from './blog'
import posts from './posts'
import postContent from './postContent'

export default combineReducers({
  blog,
  posts,
  postContent
})
