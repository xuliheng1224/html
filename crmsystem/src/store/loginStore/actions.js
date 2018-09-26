import * as types from './mutationType'
import { fetch } from '../../../src/common/fetch'
import cookies from 'js-cookie'
import { tool } from '../../common/util'
export const getLogin = ({commit}, options) => {
  return fetch({
    url: '/crm/login',
    method: 'post',
    data: {
      'account': options.user,
      'password': options.password
    },
    success: function (res) {
      if (res.data.code === '0000') {
        // 用户信息
        var user = {
          adminInfo: res.data.data.adminInfo,
          schoolInfos: res.data.data.schoolInfos,
          authTags: res.data.data.authTags,
          menuItems: res.data.data.menuItems
        }
        // 选择schoolInfos存入cookie
        var schoolInfos = {}
        user.schoolInfos.forEach((v, k) => {
          if (v.isDefault === 1) {
            schoolInfos = v
            return schoolInfos
          }
        })
        if (Object.keys(schoolInfos).length === 0) {
          schoolInfos = user.schoolInfos[0]
        }
        // 按钮权限
        var menuItems = res.data.data.menuItems
        // 存入cookie
        cookies.set('adminInfo', JSON.stringify(user.adminInfo), { expires: 30 })
        cookies.set('schoolInfos', JSON.stringify(schoolInfos), { expires: 30 })
        tool.localStorage.set('schoolInfos', JSON.stringify(user.schoolInfos))
        tool.localStorage.set('authTags', JSON.stringify(user.authTags))
        tool.localStorage.set('menuItems', JSON.stringify(user.menuItems))
        console.log(99, res)
        // 保存到store
        commit(types.LOGIN, user)
        commit(types.MENU, menuItems)
        options._this.$router.push('/')
      } else {
        options._this.$message.error(res.data.msg)
      }
    },
    fail: function (err) {
      console.log(err)
    }
  }, options._this)
}
export const logout = ({commit}, options) => {
  return fetch({
    url: '/crm/logout',
    method: 'post',
    success: function (res) {
      if (res.data.code === '0000' || res.data.code === '9002') {
        // 删除cookie的user
        cookies.remove('adminInfo')
        cookies.remove('schoolInfos')
        options._this.$emit('out')
        options._this.$router.push('/login')
      } else {
        options._this.$message.error(res.data.msg)
      }
    },
    fail: function (err) {
      console.log(err)
    }
  }, options._this)
}
