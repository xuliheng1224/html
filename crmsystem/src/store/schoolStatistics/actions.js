import * as types from './mutationType'
import { fetch } from '../../../src/common/fetch'
// 获取课文统计数据
export const getClassData = ({commit}, options) => {
  return fetch({
    url: '/crm/dataCenter/course',
    method: 'get',
    params: {
      order: options.order ? options.order : ''
    },
    success: function (res) {
      if (res.data.code === '0000') {
        commit(types.TEXTSTATISTICS, res.data.data)
      } else {
        options._this.$message.error(res.data.msg)
      }
    },
    fail: function (err) {
      console.log(err)
    }
  }, options._this)
}
// 导出课文统计数据
export const getClassDataExport = ({commit}, options) => {
  return fetch({
    url: '/crm/dataCenter/exportCourse',
    method: 'get',
    responseType: 'blob',
    success: function (res) {
      if (res.status === 200) {
        let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
        var fileName = '课文统计.xls'
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, fileName)
        } else {
          var link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = fileName
          link.click()
          window.URL.revokeObjectURL(link.href)
        }
      } else {
        options._this.$message.error(res.data.msg)
      }
    },
    fail: function (err) {
      console.log(err)
    }
  }, options._this)
}
// 获取课程统计数据
export const getRoomData = ({commit}, options) => {
  return fetch({
    url: '/crm/dataCenter/classroom',
    method: 'get',
    params: {
      beganDate: options.beganDate ? options.beganDate : '',
      endDate: options.endDate ? options.endDate : '',
      order: options.order ? options.order : '',
      pageSize: options.pageSize ? options.pageSize : '',
      pageNo: options.pageNo ? options.pageNo : ''
    },
    success: function (res) {
      if (res.data.code === '0000') {
        commit(types.CURRICULUMSTATISTICS, res.data.data)
      } else {
        options._this.$message.error(res.data.msg)
      }
    },
    fail: function (err) {
      console.log(err)
    }
  }, options._this)
}
// 导出课程统计数据列表
export const getRoomDataExport = ({commit}, options) => {
  return fetch({
    url: '/crm/dataCenter/exportClassroom',
    method: 'get',
    responseType: 'blob',
    success: function (res) {
      if (res.status === 200) {
        let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
        var fileName = '课程统计.xls'
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, fileName)
        } else {
          var link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = fileName
          link.click()
          window.URL.revokeObjectURL(link.href)
        }
      } else {
        options._this.$message.error(res.data.msg)
      }
    },
    fail: function (err) {
      console.log(err)
    }
  }, options._this)
}
// 获取讲师统计数据
export const getLecturer = ({commit}, options) => {
  return fetch({
    url: '/crm/dataCenter/lecturerInfo',
    method: 'get',
    params: {
      order: options.order ? options.order : '',
      pageSize: options.pageSize ? options.pageSize : '',
      pageNo: options.pageNo ? options.pageNo : ''
    },
    success: function (res) {
      if (res.data.code === '0000') {
        commit(types.LECTURERSTATISTICS, res.data)
      } else {
        options._this.$message.error(res.data.msg)
      }
    },
    fail: function (err) {
      console.log(err)
    }
  }, options._this)
}
// 导出讲师统计数据列表
export const getLecturerExport = ({commit}, options) => {
  return fetch({
    url: '/crm/dataCenter/exportLecturerInfo',
    method: 'get',
    responseType: 'blob',
    success: function (res) {
      if (res.status === 200) {
        let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
        var fileName = '讲师统计.xls'
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, fileName)
        } else {
          var link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = fileName
          link.click()
          window.URL.revokeObjectURL(link.href)
        }
      } else {
        options._this.$message.error(res.data.msg)
      }
    },
    fail: function (err) {
      console.log(err)
    }
  }, options._this)
}
// 获取课程用户统计数据
export const getDataTop = ({commit}, options) => {
  return fetch({
    url: '/crm/dataCenter/user/getDataTop',
    method: 'get',
    params: {
      timeBegin: options.timeBegin,
      timeEnd: options.timeEnd
    },
    success: function (res) {
      if (res.data.code === '0000') {
        commit(types.USERSTATISTICS, res.data.data)
      } else {
        options._this.$message.error(res.data.msg)
      }
    },
    fail: function (err) {
      console.log(err)
    }
  }, options._this)
}
// 获取课程用户统计数据图表
export const getUserBarData = ({commit}, options) => {
  return fetch({
    url: '/crm/dataCenter/user/getUserBarData',
    method: 'get',
    params: {
      timeBegin: options.timeBegin,
      timeEnd: options.timeEnd
    },
    success: function (res) {
      if (res.data.code === '0000') {
      //  commit(types.USERSTATISTICS, res.data.data)
      } else {
        options._this.$message.error(res.data.msg)
      }
    },
    fail: function (err) {
      console.log(err)
    }
  }, options._this)
}
