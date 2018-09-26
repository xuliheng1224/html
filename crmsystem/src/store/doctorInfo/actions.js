import * as types from './mutationsType'
import { fetch } from '../../../src/common/fetch'
// 获取医生信息列表
export const getLecturerList = ({commit}, options) => {
  return fetch({
    url: '/crm/lecturer/list',
    method: 'get',
    params: {
      keyword: options.keyword ? options.keyword : '',
      page: options.page ? options.page : '',
      pageSize: options.pageSize ? options.pageSize : ''
    },
    success: function (res) {
      if (res.data.code === '0000') {
        commit(types.DOCTORINFO, res.data)
      }
    },
    fail: function (err) {
      console.log(err)
    }
  })
}
