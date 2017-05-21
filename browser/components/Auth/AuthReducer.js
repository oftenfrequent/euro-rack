import { Map, fromJS } from 'immutable';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_REMOVE_USER
} from '../../constants/ActionTypes'

export default function(state = Map(), action) {
  switch (action.type){
    case AUTH_LOGIN_REQUEST :
      return state.set('attempted', true)
    case AUTH_LOGIN_SUCCESS :
      return state.set('success', true)
                  .set('user', fromJS(action.payload.user))
    case AUTH_LOGIN_FAILURE :
      return state.set('success', false)
    case AUTH_REMOVE_USER :
      return state.set('success', false)
                  .set('user', fromJS({}))
  }
  return state;
}
