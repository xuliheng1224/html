import axios from 'axios'
import cookie from 'js-cookie'
export function fetch (options, _this) {
  return new Promise((resolve, reject) => {
    if (_this) {
      _this.$store.dispatch('loadingState', {load: true})
    }
    var adminInfo = cookie.get('adminInfo') ? JSON.parse(cookie.get('adminInfo')) : ''
    var schoolInfos = cookie.get('schoolInfos') ? JSON.parse(cookie.get('schoolInfos')) : ''
    const instance = axios.create({
      headers: {
        'Content-Type': options.responseType ? options.responseType : 'application/json',
        'crmtoken': adminInfo.token,
        'hosId': schoolInfos.hosId,
        'schoolId': schoolInfos.schoolId
      },
      timeout: 30 * 1000 // 设置30秒超时
    })
    instance(options)
      .then(response => {
        if (!response.data.code) {
          resolve(response)
          options.success(response)
        } else if (response.data.code.indexOf('9002') > -1) { // token失效
          cookie.remove('adminInfo')
          cookie.remove('schoolInfos')
          if (window.location.href.indexOf('login') === -1) {
            window.location.href = window.location.origin + '/login'
          }
        } else if (response.data.code.indexOf('0000') > -1) {
          resolve(response)
          options.success(response)
        } else {
          window.$global_this.$message.error(response.data.msg)
        }
        if (_this) {
          _this.$store.dispatch('loadingState', {load: false})
        }
      })
      .catch(error => {
        console.log('请求异常信息:' + error)
        window.$global_this.$message.error(error.message)
        if (_this) {
          _this.$store.dispatch('loadingState', {load: false})
        }
        reject(error)
      })
  })
}
