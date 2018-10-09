export const GETTOKEN_REQUEST = 'GETTOKEN_REQUEST'
export const GETTOKEN_SUCCESS = 'GETTOKEN_SUCCESS'
export const GETTOKEN_FAIL = 'GETTOKEN_FAIL'

export function getToken () {
  return {
    types: [GETTOKEN_REQUEST, GETTOKEN_SUCCESS, GETTOKEN_FAIL],
    promise: client => client.get(`/crm/upload/getUpToken`)
  }
}