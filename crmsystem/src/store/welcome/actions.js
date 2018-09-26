import * as types from './mutationType'
import { fetch } from '../../../src/common/fetch'

export const getPieData = ({commit}) => {
  return fetch({
    url: '/crm/dataCenter/user/getUserCount',
    method: 'get',
    success: function (res) {
      if (res.data.code === '0000') {
        commit(types.WELCOME, res.data.data)
      }
    },
    fail: function (err) {
      console.log(err)
    }
  })
}
