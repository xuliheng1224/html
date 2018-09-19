import request from './httpUtil'
const host = 'https://api.bblink.cn'
const api = {
  // test地址
  policy: params => request.get(`${host}/api/school/v1.3/scheduleDetail`, params),
  auther: params => request.get(`https://babyhos.bblink.cn/api/v1/user/center`, params),
  info: params => request.get(`https://uv.hos-wifi.com/springrx/getActivityForm`, params),
  upload: params => request.post(`${host}/activity/face/merge?url=${params.url}&cosmetic=${params.cosmetic}`)
}
// export default api
export default {
  // 作为组件库(install)
  install: function (Vue, name = '$http') {
    Object.defineProperty(Vue.prototype, name, { value: api }) // 将组件库挂载在原型对象上
  }
}
