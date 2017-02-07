import * as types from '../constants/ActionTypes'
import { combineReducers } from 'redux'

const initialState = []

export default (state = initialState, action) => {
	switch (action.type) {
		case types.RECEIVE_POSTS:
			return state.concat(action.posts)
    case types.RESET_POSTS:
      return []
		default:
			return state
	}
}
