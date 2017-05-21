import { CALL_API } from 'redux-api-middleware'
import { API_ENDPOINT } from '../../constants'


export function userLogin (username, password) {
  return {
    [CALL_API]: {
      endpoint: `${API_ENDPOINT}/login`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      types: ['AUTH_LOGIN_REQUEST',
						  'AUTH_LOGIN_SUCCESS',
						  'AUTH_LOGIN_FAILURE']
    }
  }
}

export function userSignup (username, password) {
  return {
    [CALL_API]: {
      endpoint: `${API_ENDPOINT}/signup`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      types: ['AUTH_SIGNUP_REQUEST',
              'AUTH_SIGNUP_SUCCESS',
              'AUTH_SIGNUP_FAILURE']
    }
  }
}
