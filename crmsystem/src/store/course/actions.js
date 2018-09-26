import * as types from './mutationType'
import { fetch } from '../../../src/common/fetch'

/**
 * 课程详情预约人列表
 * @param commit
 * @param options
 */
export const getRemindList = ({commit}, options) => {
  return fetch({
    url: '/crm/course/remindList',
    method: 'get',
    params: {
      scheduleId: options.scheduleId,
      pageNo: options.pageNo,
      pageSize: options.pageSize
    },
    success: function (res) {
      if (res.data.code === '0000') {
        commit(types.REMINDLIST, res.data.data)
      }
    },
    fail: function (err) {
      console.log(err)
    }
  })
}
/**
 * 课程签到人列表
 * @param commit
 * @param options
 */
export const getSignList = ({commit}, options) => {
  return fetch({
    url: '/crm/course/signList',
    method: 'get',
    params: {
      scheduleId: options.scheduleId,
      pageNo: options.pageNo,
      pageSize: options.pageSize
    },
    success: function (res) {
      if (res.data.code === '0000') {
        commit(types.SIGNLIST, res.data.data)
      }
    },
    fail: function (err) {
      console.log(err)
    }
  })
}
/**
 * 课程表测试人列表
 * @param commit
 * @param options
 */
export const getTestList = ({commit}, options) => {
  return fetch({
    url: '/crm/test/testList',
    method: 'get',
    params: {
      queId: options.queId,
      scheduleId: options.scheduleId,
      pageNo: options.pageNo,
      pageSize: options.pageSize
    },
    success: function (res) {
      if (res.data.code === '0000') {
        commit(types.TESTLIST, res.data.data)
      }
    },
    fail: function (err) {
      console.log(err)
    }
  })
}
/**
 * 课程详情信息
 * @param commit
 * @param options
 */
export const getCourseDetail = ({commit}, options) => {
  return fetch({
    url: '/crm/course/scheduleDetail',
    method: 'get',
    params: {
      scheduleId: options.scheduleId
    },
    success: function (res) {
      if (res.data.code === '0000') {
        commit(types.COURSEDETAIL, res.data.data)
      }
    },
    fail: function (err) {
      console.log(err)
    }
  })
}
/**
 * 课程表测试人详情
 * @param commit
 * @param options
 */
export const getUseTestDetail = ({commit}, options) => {
  return fetch({
    url: '/crm/test/courseTestDetail',
    method: 'get',
    params: options,
    success: function (res) {
      if (res.data.code === '0000') {
        commit(types.USETESTDETAIL, res.data.data)
      }
    },
    fail: function (err) {
      console.log(err)
    }
  })
}
/**
 * 测试详情
 * @param {} param0
 * @param {*} options
 */
export const getQuestionDetail = ({commit}, options) => {
  return fetch({
    url: '/crm/test/testDetail',
    method: 'get',
    params: {
      queId: options.queId
    },
    success: function (res) {
      if (res.data.code === '0000') {
        commit(types.QUESTIONDETAIL, res.data.data)
      }
    },
    fail: function (err) {
      console.log(err)
    }
  })
}
