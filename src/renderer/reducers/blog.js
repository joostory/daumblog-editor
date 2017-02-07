import * as types from '../constants/ActionTypes'
import { combineReducers } from 'redux'

const initialState = null

export default (state = initialState, action) => {
	switch (action.type) {
		case types.RECEIVE_BLOG:
			return action.blog
		default:
			return state
	}
}
