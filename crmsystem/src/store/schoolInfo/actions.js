// import * as types from './mutationsType'
import { fetch } from '../../../src/common/fetch'
/**
 * 高危用户占比情况
 * @param commit
 */
// 学校二维码-->生成二维码接口
export const getQrcode = ({commit}, {vue}) => {
  return fetch({
    url: '/crm/course/school/qrcode',
    method: 'get',
    // params: {type},
    success: function (res) {
      if (res.status === 200) {
        vue.qrCode = res.data.data.schoolExt.qrCode
        vue.qrCodeSignin = res.data.data.schoolExt.signinQrCode
        vue.qrCodeWeChat = res.data.data.schoolExt.qrCodeWeChat
        vue.qrCodeSigninWeChat = res.data.data.schoolExt.qrCodeSigninWeChat
      }
    }
  })
}

// 学校二维码-->生成二维码接口
export const createQrCode = ({commit}, {type, vue}) => {
  return fetch({
    url: '/crm/course/createQrCode',
    method: 'get',
    params: {type},
    success: function (res) {
      if (res.status === 200) {
        switch (type) {
          case 'qrCode':
            vue.qrCode = res.data.data.imagePath
            break
          case 'qrCodeSignin':
            vue.qrCodeSignin = res.data.data.imagePath
            break
          case 'qrCodeWeChat':
            vue.qrCodeWeChat = res.data.data.imagePath
            break
          case 'qrCodeSigninWeChat':
            vue.qrCodeSigninWeChat = res.data.data.imagePath
            break
        }
      }
    }
  })
}

// 学校二维码-->下载二维码接口
export const downloadCode = ({commit}, {type, qrCode, vue}) => {
  return fetch({
    url: '/crm/course/linkSchoolQrCode',
    method: 'get',
    responseType: 'blob',
    params: {type, qrCode},
    success: function (res) {
      if (res.status === 200) {
        let blob = new Blob([res.data], {type: 'application/x-jpg;charset=utf-8'})
        let objectUrl = URL.createObjectURL(blob)
        window.location.href = objectUrl
      }
    }
  })
}

// 课文素材管理-->列表接口
export const getWareList = ({commit}, {state, pageNo, pageSize, keyword, type, status, vue}) => {
  return fetch({
    url: '/crm/course/wareList',
    method: 'get',
    params: {pageNo, pageSize, keyword, type, status},
    success: function (res) {
      if (res.status === 200) {
        vue.tableData = res.data.data.list
        vue.count = res.data.data.totalCount
      }
    }
  })
}

// 课文库-->列表接口
export const getCourseList = ({commit}, {keyword, pageNo, pageSize, vue}) => {
  return fetch({
    url: '/crm/course/courseList',
    method: 'get',
    params: {pageNo, pageSize, keyword},
    success: function (res) {
      if (res.status === 200) {
        vue.tableData = res.data.data.list
        vue.count = res.data.data.totalCount
      }
    }
  })
}

// 课程表-->讲师接口
export const getTeacherList = ({commit}, {vue}) => {
  return fetch({
    url: '/crm/course/lecturerList',
    method: 'get',
    success: function (res) {
      if (res.status === 200) {
        vue.options = res.data.data.map(item => {
          return {value: item.lecturerId, label: item.lecturerName}
        })
        vue.init()
      }
    }
  })
}

// 课程表-->列表接口
export const getScheduleList = ({commit}, {pageNo, pageSize, courseName, lectureId, category, startDateStr, endDateStr, week, vue}) => {
  return fetch({
    url: '/crm/course/scheduleList',
    method: 'get',
    params: {pageNo, pageSize, courseName, lectureId, category, startDateStr, endDateStr, week},
    success: function (res) {
      if (res.status === 200) {
        vue.tableData = res.data.data.list
        vue.count = res.data.data.totalCount
      }
    }
  })
}

// 测试问卷-->列表接口
export const getQList = ({commit}, {pageNo, pageSize, que, type, statusFlag, startDateStr, endDateStr, vue}) => {
  return fetch({
    url: '/crm/test/list',
    method: 'get',
    params: {pageNo, pageSize, que, type, statusFlag, startDateStr, endDateStr},
    success: function (res) {
      if (res.status === 200) {
        vue.tableData = res.data.data.list
        vue.count = res.data.data.totalCount
      }
    }
  })
}

// 课文库-->导出excel表格
export const exportExcel = ({commit}, {keyword, vue}) => {
  return fetch({
    url: '/crm/course/exportCourseList',
    method: 'get',
    params: {keyword},
    responseType: 'blob',
    success: function (res) {
      if (res.status === 200) {
        let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
        let fileName = '课文库.xls'
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, fileName)
        } else {
          var link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = fileName
          link.click()
          window.URL.revokeObjectURL(link.href)
        }
      }
    }
  })
}

// 课程表-->导出excel表格
export const exportScheduleList = ({commit}, {startDateStr, endDateStr, week, category, courseName, lectureId, vue}) => {
  return fetch({
    url: '/crm/course/exportScheduleList',
    method: 'get',
    params: {startDateStr, endDateStr, week, category, courseName, lectureId},
    responseType: 'blob',
    success: function (res) {
      if (res.status === 200) {
        let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
        // let objectUrl = URL.createObjectURL(blob)
        // window.location.href = objectUrl
        let fileName = '课程表.xls'
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, fileName)
        } else {
          var link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = fileName
          link.click()
          window.URL.revokeObjectURL(link.href)
        }
      }
    }
  })
}

// 测试问卷-->删除
export const deleteQlist = ({commit}, {queId, vue}) => {
  return fetch({
    url: '/crm/test/delete',
    method: 'get',
    params: {queId},
    success: function (res) {
      if (res.status === 200) {
        if (vue.isTrue) {
          vue.pageConfirm()
        } else {
          vue.init()
        }
      }
    }
  })
}
// 查看课文素材管理详情
export const getWareDetail = ({commit}, {wareId, vue}) => {
  return fetch({
    url: '/crm/course/wareDetail',
    method: 'get',
    params: {wareId},
    success: function (res) {
      if (res.status === 200) {
        vue.wareDetail = res.data.data
        console.log(vue.wareDetail.wareUrl)
      }
    }
  })
}
