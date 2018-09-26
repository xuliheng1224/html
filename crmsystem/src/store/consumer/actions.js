import * as types from './mutationType'
import { fetch } from '../../../src/common/fetch'
export const userList = ({commit}, options) => {
  return fetch({
    url: '/crm/user/list',
    method: 'get',
    params: {
      ageStart: options.ageStart ? options.ageStart : '',
      ageEnd: options.ageEnd ? options.ageEnd : '',
      label: options.label ? options.label : '',
      realName: options.realName ? options.realName : '',
      page: options.page ? options.page : 1,
      pageSize: options.pageSize ? options.pageSize : 10
    },
    success: function (res) {
      if (res.data.code === '0000') {
        commit(types.USERLIST, res.data)
      } else {
        options._this.$message.error(res.data.msg)
      }
    },
    fail: function (err) {
      console.log(err)
    }
  }, options._this)
}
export const userInfos = ({commit}, options) => {
  return fetch({
    url: '/crm/user/detail',
    method: 'get',
    params: {
      type: options.type,
      userId: options.userId
    },
    success: function (res) {
      if (res.data.code === '0000') {
        switch (options.type) {
          case 1:
            commit(types.USERINFOS, res.data.data)
            break
          case 2:
            commit(types.SCHOOLS, res.data.data)
            break
          case 3:
            commit(types.ANTENATAL, res.data.data)
            break
          case 4:
            commit(types.TANGS, res.data.data)
            break
          case 5:
            commit(types.BC, res.data.data)
            break
          case 6:
            commit(types.SUGARS, res.data.data)
            break
          case 7:
            commit(types.PARTUMS, res.data.data)
            break
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
export const highRisk = ({commit}, options) => {
  return fetch({
    url: '/crm/user/addHighRisk',
    method: 'post',
    data: {
      userId: options.userId,
      highRisk: options.highRisk
    },
    success: function (res) {
      if (res.data.code === '0000') {
        console.log(res.data)
      } else {
        options._this.$message.error(res.data.msg)
      }
    },
    fail: function (err) {
      console.log(err)
    }
  }, options._this)
}
