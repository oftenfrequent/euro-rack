import { CALL_API } from 'redux-api-middleware'
import { API_ENDPOINT } from '../../constants'
// import {
//   AUTH_LOGIN_REQUEST,
//   AUTH_LOGIN_SUCCESS,
//   AUTH_LOGIN_FAILURE,
//   AUTH_SIGNUP_REQUEST,
//   AUTH_SIGNUP_SUCCESS,
//   AUTH_SIGNUP_FAILURE
// } from '../../constants/ActionTypes'


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

// export function logout () {
//   return {
//     [CALL_API]: {
//       endpoint: 'http://localhost:3000/logout',
//       method: 'GET',
//       types: ['AUTH_LOGIN_REQUEST',
// 						  'AUTH_LOGIN_SUCCESS',
// 						  'AUTH_LOGIN_FAILURE']
//     }
//   }
// }
