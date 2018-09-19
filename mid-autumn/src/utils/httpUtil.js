var Fly = require('flyio/dist/npm/wx')
const request = new Fly()
request.interceptors.request.use(request => {
  request.headers['clazz'] = 'WeAppLogin'
  request.headers['packagz'] = 'auth'
  return request
})
request.interceptors.response.use(
  (response, promise) => {
    // wx.hideLoading()
    // debugger
    // console.log(response)
    return promise.resolve(response.data)
  }, (err, promise) => {
    // wx.hideNavigationBarLoading()
    wx.showToast({
      title: err.message,
      icon: 'none',
      duration: 1000
    })
    return promise.resolve()
  }
)
export default request
