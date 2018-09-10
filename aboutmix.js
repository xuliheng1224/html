// 如果使用mapvue creat里面的事件会在不同的页面调用 绑定的事件都要用@
// 获取用户openId
function getOpenId() {
  wx.login({
    success: (loginCode) => {
      var appid = 'wx0919cce16c509c14' // 填写微信小程序appid
      var secret = '30a3c18e8de1dc069310ad597be2ac34' // 填写微信小程序secret
      // 调用request请求api转换登录凭证
      wx.request({
        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&grant_type=authorization_code&js_code=' + loginCode.code,
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {
          // console.log(res) // 获取openid
          wx.setStorageSync('openId', res.data.openid)
        }
      })
      // wx.getUserInfo({
      //   success: (res) => {
      //     console.log(res.userInfo)
      //   }
      // })
    }
  })
}
// 请求
wx.request({
  url: 'test.php', //仅为示例，并非真实的接口地址
  method: 'GET', // 非必填
  data: {
     x: '' ,
     y: ''
  },
  header: {
  	'content-type': 'application/json' // 默认值
  },
  success: function(res) {
    console.log(res.data)
  }
})
// 获取用户信息
// <button open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="onGotUserInfo">获取用户信息</button>
onGotUserInfo: (e) => {
  wx.login({
    success: () => {
      wx.getUserInfo({
        success: (res) => {
          console.log(res)
          this.userInfo = res.userInfo
        }
      })
    }
  })
}