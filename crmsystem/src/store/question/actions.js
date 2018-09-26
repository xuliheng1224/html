import * as types from './mutationType'
import { fetch } from '../../../src/common/fetch'
/**
 * 高危用户占比情况
 * @param commit
 */
/**
 * {alwaysEffective, des, endTime, startTime, gestationalRangeEnd, gestationalRangeStart, gestationalType, que, results, topics, status, type, vue} 新增
 * {queId, deletedTopicIds, alwaysEffective, des, endTime, startTime, gestationalRangeEnd, gestationalRangeStart, gestationalType, que, results, topics, status, type, vue} 基本对错题编辑
 * deletedTopicIds, queId, deletedResultIds, alwaysEffective, des, endTime, startTime, gestationalRangeEnd, gestationalRangeStart, gestationalType, que, results, topics, type, status 匹配题编辑
 * **/
export const setQuestionList = ({commit}, {deletedResultIds, queId, deletedTopicIds, alwaysEffective, des, endTime, startTime, gestationalRangeEnd, gestationalRangeStart, gestationalType, que, results, topics, status, type, vue}) => {
  return fetch({
    url: '/crm/test/save',
    method: 'post',
    data: {deletedResultIds, queId, deletedTopicIds, alwaysEffective, des, endTime, startTime, gestationalRangeEnd, gestationalRangeStart, gestationalType, que, results, topics, status, type},
    success: function (res) {
      if (res.status === 200) {
        vue.$router.push({path: '/schoolInfo/testQuestionnaire'})
        vue.$notify({
          title: '成功',
          message: res.data.msg,
          type: 'success'
        })
      }
    },
    fail: function (err) {
      console.log(err)
    }
  })
}

// 基本对错题-->获取编辑数据
export const getTestDetail = ({commit}, {queId, vue}) => {
  return fetch({
    url: '/crm/test/testDetail',
    method: 'get',
    params: {queId},
    success: function (res) {
      let data = res.data.data.paper
      // setTimeout(function () {
      //   UE.getEditor('testEditor').setContent(data.des)
      // }, 2000)
      window.editor.sync()
      window.editor.html(data.des)
      // 绑定上部基础信息
      vue.form = {testType: '基本对错题', name: data.que, regionS: data.gestationalRangeStart.toString(), regionE: data.gestationalRangeEnd.toString(), apply: data.gestationalType, time: data.alwaysEffective.toString(), startT: new Date(data.startTime), endT: new Date(data.endTime)}
      // 题模块的数据绑定
      vue.questionArr = data.topics.map(item => {
        let num = ''
        let arr = item.options.map((itemOpt, index) => {
          if (item.type === 'MULTI') {
          } else {
            if (itemOpt.isAnswer === 'Y') {
              num = (index + 1).toString()
            }
          }
          return {opt: itemOpt.optionMark, optCon: itemOpt.queOption, val: (index + 1).toString(), isTrue: itemOpt.isAnswer === 'Y', optionId: itemOpt.optionId}
        })
        return {options: [{value: 'SINGLE', label: '单选题'}, {value: 'MULTI', label: '多选题'}, {value: 'JUDGE', label: '判断题'}, {value: 'QA', label: '简答题'}], qType: item.type, textarea: item.topic, tableData: arr, delOpt: [], questionId: item.topicId, optAnswer: num}
      })
      // 结果文案的数据绑定
      vue.tableAnswer[0].AnswerResult = data.results[0].result
      commit(types.TESTQUESTION, data)
    },
    fail: function (err) {
      console.log(err)
    }
  })
}

// 匹配题-->获取编辑数据
export const getMatchDetail = ({commit}, {queId, vue}) => {
  return fetch({
    url: '/crm/test/testDetail',
    method: 'get',
    params: {queId},
    success: function (res) {
      let data = res.data.data.paper
      // setTimeout(function () {
      //   // $('#editor').html(data.des)
      //   // vue.contentTxt = data.des
      //   // console.log(6666, vue.contentTxt)
      // }, 1000)
      /* eslint-disable*/
      window.editor.sync()
      window.editor.html(data.des)
      // 绑定上部基础信息
      vue.form = {testType: '选项得分匹配题', name: data.que, regionS: data.gestationalRangeStart.toString(), regionE: data.gestationalRangeEnd.toString(), apply: data.gestationalType, time: data.alwaysEffective.toString(), startT: new Date(data.startTime), endT: new Date(data.endTime)}
      // // 题模块的数据绑定
      vue.questionArr = data.topics.map(item => {
        let arr = item.options.map((itemOpt, index) => {
          return {opt: itemOpt.optionMark, optCon: itemOpt.queOption, score: itemOpt.score, optId: itemOpt.optionId}
        })
        return {delOptId: [], options: [{value: 'SINGLE', label: '单选题'}, {value: 'MULTI', label: '多选题'}, {value: 'JUDGE', label: '判断题'}, {value: 'QA', label: '简答题'}], qType: item.type, textarea: item.topic, tableData: arr, topicId: item.topicId}
      })
      // // 结果文案的数据绑定
      vue.tableAnswer = data.results.map(item => {
        return {scoreS: item.scoreStart, scoreE: item.scoreEnd, AnswerResult: item.result, AnswerId: item.resultId}
      })
      commit(types.TESTQUESTION, data)
    },
    fail: function (err) {
      console.log(err)
    }
  })
}

// 详情-->测试详情
export const getTestQDetail = ({commit}, {queId, vue}) => {
  return fetch({
    url: '/crm/test/testDetail',
    method: 'GET',
    params: {queId},
    success: function (res) {
      if (res.status === 200) {
        let data = res.data.data.paper
        // let regex = /(<([^>]+)>)/ig
        // 绑定上部基础信息
        vue.timeNum = data.alwaysEffective
        if (data.type === 'TEST') {
          vue.isTest = true
          // vue.contentTxt = data.des 前面是去除标签<p></p>  后面是去除空格&nbsp;
          // vue.contentTxt = data.des.replace(regex, '').replace(/\s/ig, '').replace(/&nbsp;/ig, '')
          vue.contentTxt = data.des
          vue.form = {testType: '基本对错题', name: data.que, regionS: data.gestationalRangeStart.toString(), regionE: data.gestationalRangeEnd.toString(), apply: data.gestationalType, time: data.alwaysEffective.toString(), startT: new Date(data.startTime), endT: new Date(data.endTime)}
          // 题模块的数据绑定
          vue.questionArr = data.topics.map(item => {
            let num = ''
            let arr = item.options.map((itemOpt, index) => {
              if (item.type === 'MULTI') {
              } else {
                if (itemOpt.isAnswer === 'Y') {
                  num = (index + 1).toString()
                }
              }
              return {opt: itemOpt.optionMark, optCon: itemOpt.queOption, val: (index + 1).toString(), isTrue: itemOpt.isAnswer === 'Y', optionId: itemOpt.optionId}
            })
            return {options: [{value: 'SINGLE', label: '单选题'}, {value: 'MULTI', label: '多选题'}, {value: 'JUDGE', label: '判断题'}, {value: 'QA', label: '简答题'}], qType: item.type, textarea: item.topic, tableData: arr, delOpt: [], questionId: item.topicId, optAnswer: num}
          })
          // 结果文案的数据绑定
          vue.tableAnswer[0].AnswerResult = data.results[0].result
        } else {
          vue.isTest = false
          // vue.contentTxt = data.des 前面是去除标签<p></p>  后面是去除空格&nbsp;
          // vue.contentTxt = data.des.replace(regex, '').replace(/&nbsp;/ig, '')
          vue.contentTxt = data.des
          vue.form = {testType: '选项得分匹配题', name: data.que, regionS: data.gestationalRangeStart.toString(), regionE: data.gestationalRangeEnd.toString(), apply: data.gestationalType, time: data.alwaysEffective.toString(), startT: new Date(data.startTime), endT: new Date(data.endTime)}
          // // 题模块的数据绑定
          vue.questionArr = data.topics.map(item => {
            let arr = item.options.map((itemOpt, index) => {
              return {opt: itemOpt.optionMark, optCon: itemOpt.queOption, score: itemOpt.score, optId: itemOpt.optionId}
            })
            return {delOptId: [], options: [{value: 'SINGLE', label: '单选题'}, {value: 'MULTI', label: '多选题'}, {value: 'JUDGE', label: '判断题'}, {value: 'QA', label: '简答题'}], qType: item.type, textarea: item.topic, tableData: arr, topicId: item.topicId}
          })
          // // 结果文案的数据绑定
          vue.tableAnswer = data.results.map(item => {
            return {scoreS: item.scoreStart, scoreE: item.scoreEnd, AnswerResult: item.result, AnswerId: item.resultId}
          })
        }
      }
    },
    fail: function (err) {
      console.log(err)
    }
  })
}

// 详情-->独立用户统计
export const aloneUserList = ({commit}, {pageNo, pageSize, queId, vue}) => {
  return fetch({
    url: '/crm/test/aloneUserList',
    method: 'GET',
    params: {pageNo, pageSize, queId},
    success: function (res) {
      if (res.status === 200) {
        vue.tableData = res.data.data.list
        vue.count = res.data.data.totalCount
      }
    }
  })
}

// 详情-->随堂用户统计
export const scheduleTestUser = ({commit}, {pageNo, pageSize, queId, vue}) => {
  return fetch({
    url: '/crm/test/scheduleTestUserList',
    method: 'GET',
    params: {pageNo, pageSize, queId},
    success: function (res) {
      if (res.status === 200) {
        vue.tableData = res.data.data.list
        vue.count = res.data.data.totalCount
      }
    }
  })
}

// 详情-->随堂测试统计
export const scheduleTest = ({commit}, {pageNo, pageSize, queId, vue}) => {
  return fetch({
    url: '/crm/test/scheduleTestList',
    method: 'GET',
    params: {pageNo, pageSize, queId},
    success: function (res) {
      if (res.status === 200) {
        vue.tableData = res.data.data.list
        vue.count = res.data.data.totalCount
      }
    }
  })
}
