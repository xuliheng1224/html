import * as types from './mutationsType'
import { fetch } from '../../common/fetch'

/**
 * 课程表新增和编辑获取课文和讲师
 * @param {} param0
 * @param {*} options
 */
export const getScheduleEdit = ({commit}, options) => {
  return fetch({
    url: '/crm/course/scheduleEdit',
    method: 'get',
    params: {
      scheduleId: options.scheduleId
    },
    success: function (res) {
      if (res.data.code === '0000') {
        commit(types.ADDCOURSE, res.data.data)
      }
    },
    fail: function (err) {
      console.log(err)
    }
  })
}

/**
 * 课程库保存
 * @param {*} param0
 * @param {*} options
 */
export const saveShedule = ({commit}, options) => {
  return fetch({
    url: '/crm/course/scheduleSave',
    method: 'post',
    data: {
      courseId: options.courseId,
      lecturerIds: options.lecturerIds,
      startDateStr: options.startDateStr,
      endDateStr: options.endDateStr,
      classroomName: options.classroomName,
      scheduleId: options.scheduleId
    },
    success: function (res) {
      if (res.data.code === '0000') {
        return res.data.data
      }
    },
    fail: function (err) {
      console.log(err)
    }
  })
}
