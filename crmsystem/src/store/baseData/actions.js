import * as types from './mutationsType'
import { fetch } from '../../../src/common/fetch'
/**
 * 高危用户占比情况
 * @param commit
 */
export const getHightDieData = ({commit}, options) => {
  return fetch({
    url: '/crm//dataCenter/user/getUserHignPieData',
    method: 'get',
    params: {
      timeBegin: options.timeBegin,
      timeEnd: options.timeEnd
    },
    success: function (res) {
      if (res.data.code === '0000') {
        commit(types.HIGHTDAN, res.data.data)
      }
    },
    fail: function (err) {
      console.log(err)
    }
  })
}

/**
 * 获取用户统计数据
 * @param {*} param0
 * @param {*} options
 */
export const getUserData = ({commit}, options) => {
  return fetch({
    url: '/crm/dataCenter/user/getUserStatisticsData',
    method: 'get',
    params: {
      type: options.type,
      startDt: options.startDt,
      endDt: options.endDt
    },
    success: function (res) {
      if (res.data.data === '0000') {
        commit(types.USERDATA, res.data.data)
      }
    },
    fail: function (err) {
      console.log(err)
    }
  })
}
