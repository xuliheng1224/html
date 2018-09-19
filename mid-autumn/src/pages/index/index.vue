<template>
  <div class='bg' :style="{backgroundImage: 'url(https://image.bblink.cn/bg.png)', backgroundSize:'100% 100%'}">
    <div style="text-align: center;">
      <img src="https://image.bblink.cn/first.png" alt="" class='first'>
    </div>
    <div class='list'>
      <ul>
        <li v-for='(item, index) in items' :key='index' @click="msg=index">
          <img :src="msg===index ? selected : unselected" alt="">
          <span></span>
        </li>
      </ul>
    </div>
    <div class='next'>
      <img src="https://image.bblink.cn/next.png" alt="" @click='next'>
    </div>
    <i-toast id="toast" />
    <img :src="point" alt="" style="display: none;">
    <!-- <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">lll</button> -->
  </div>
</template>

<script>
const { $Toast } = require('../../../static/iView/base/index')
export default {
  data () {
    return {
      selected: 'https://image.bblink.cn/selected.png',
      unselected: 'https://image.bblink.cn/unselected.png',
      items: ['白', '红', '蓝', '黄', '绿'],
      msg: -1,
      point: ''
    }
  },
  methods: {
    next () {
      if (this.msg === -1) {
        console.log('请选择喜欢的颜色')
        $Toast({
          content: '请选择喜欢的颜色',
          type: 'warning'
        })
      } else {
        let data = this.items[this.msg]
        wx.setStorageSync('msg', data)
        wx.navigateTo({
          url: '../second/main'
        })
      }
    },
    getOpenId () {
      wx.login({
        success: (loginCode) => {
          var params = {
            appid: 'wx0919cce16c509c14',
            // clazz: 'WechatLogin',
            code: loginCode.code
            // packagz: 'auth'
          }// 填写微信小程序appid
          this.$http.auther(params).then((res) => {
            wx.setStorageSync('openId', res.data.openId)
            // 打点
            this.point = 'https://uv.hos-wifi.com/springrx/getActivity?log_type=1-mid-autumn&open_id=' + res.data.openid
            console.log(this.point)
          })
          // // 调用request请求api转换登录凭证
          // wx.request({
          //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&grant_type=authorization_code&js_code=' + loginCode.code,
          //   header: {
          //     'content-type': 'application/json'
          //   },
          //   success: (res) => {
          //     // console.log(res) // 获取openid
          //     wx.setStorageSync('openId', res.data.openid)
          //     // 打点
          //     this.point = 'https://uv.hos-wifi.com/springrx/getActivity?log_type=1-mid-autumn&open_id=' + res.data.openid
          //     console.log(this.point)
          //   }
          // })
          // wx.getUserInfo({
          //   success: (res) => {
          //     console.log(res.userInfo)
          //   }
          // })
        }
      })
    }
  },
  mounted () {
    this.getOpenId()
  },
  onShareAppMessage: function () {
    return {
      title: '中秋新头像get大法，还在等什么？',
      desc: '有人@你，测测宝宝超萌瞬间！',
      path: '/pages/index/main',
      success: function (res) {
        // console.log(res)
      }
    }
  }
}
</script>

<style scoped lang='less'>
.bg{
  position: absolute;
  left:0;
  right:0;
  top:0;
  bottom: 0;
  height: 1210rpx;
}
.first {
  width:537rpx;
  height:129rpx;
  margin:124rpx auto 56rpx;
}
.list{
  ul{
    li{
      display: flex;
      margin-left: 117rpx;
      align-items: center;
      margin-bottom: 20rpx;
      img{
        width:56rpx;
        height:56rpx;
        margin-right:61.3rpx;
      }
      span{
        display: block;
        width:398rpx;
        height:97rpx;
        border-radius:8px;
        border:4px solid rgba(112,55,2,1);
      }
      &:nth-child(1){
        span{
          background:rgba(255,255,255,1);
        }
      }
      &:nth-child(2){
        span{
          background:rgba(255,92,0,1);
        }
      }
      &:nth-child(3){
        span{
          background:rgba(148,211,255,1);
        }
      }
      &:nth-child(4){
        span{
          background:rgba(254,203,40,1);
        }
      }
      &:nth-child(5){
         margin-bottom: 51rpx;
        span{
          background:rgba(97,223,133,1);
        }
      }
    }
  }
}
.next {
  text-align: center;
  img{
    width:228rpx;
    height:94rpx;
  }
}
</style>
