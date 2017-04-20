import { CALL_API } from 'redux-api-middleware'

import { API_ENDPOINT } from '../../constants'

export function callVisitorData() {
  return {
    [CALL_API]: {
      endpoint: 'http://www.example.com/api/users',
      method: 'GET',
      types: ['REQUEST', 'SUCCESS', 'FAILURE']
    }
  }
  // {
  //   [CALL_API]: {
  //     endpoint: `${API_ENDPOINT}/api/login`,
  //     method: 'GET',
  //     // headers: { 'Content-Type': 'application/json' },
  //     // body: JSON.stringify({ blah: 'blah'}),
  //     types: ['CALL_REQUEST',
  //       'CALL_SUCCESS',
  //       'CALL_FAILURE']
  //   }
  // }
}


