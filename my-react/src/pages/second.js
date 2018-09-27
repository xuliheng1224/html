import React, {Component} from 'react'
// import {getQueryString} from '../common/util'
import { fetch } from "../common/http"
import wx from 'weixin-js-sdk'
export default class Second extends  Component {
  componentDidMount () {
    // console.log(this.props.location.query.name) // 刷新会页面报错不存在name
    fetch({
      url: '/api/order/list',
      method: 'get',
      params: {},
      success: (res) => {
      },
      fail: function (err) {
        console.log(err)
      }
    })

  }
  check () {
    fetch({
      url: '/api/User/Wechat/jssdk',
      method: 'get',
      params: {
        'url': window.location.origin + '/',// window.location.href.split('#')[0], 
        // 测试
        'appId': 'wx5fbc1df873478202'
      },
      success: (res) => {
        if (res.status === 200) {
          let jsonData = res.data.data
          if (!jsonData.appid) return
          wx && wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: jsonData.appid, // 必填，公众号的唯一标识
            timestamp: jsonData.timeStamp, // 必填，生成签名的时间戳
            nonceStr: jsonData.nonceStr, // 必填，生成签名的随机串
            signature: jsonData.signature, // 必填，签名，见附录1
            jsApiList: [
              'checkJsApi',
              'scanQRCode',
              'hideAllNonBaseMenuItem',
              'showAllNonBaseMenuItem',
              'hideMenuItems',
              'showMenuItems',
              'hideOptionMenu',
              'showOptionMenu',
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'onMenuShareQZone'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
          wx && wx.ready(function() {
            //分享到朋友圈
            wx.onMenuShareTimeline({
              title: 'haha', // 分享标题
              link: 'http://www.baidu.com', // 分享链接
              imgUrl: 'http://image.bblink.cn/201603-44a3e99a1eec42ae9741792f78118a77.jpg', // 分享图标
              success: function() {
                alert(111)
              },
              cancel: function(res) {}
            });
            //分享给朋友
            wx.onMenuShareAppMessage({
              title: 'heihei', // 分享标题
              desc: 'youyou', // 分享描述
              link: 'http://www.baidu.com', // 分享链接
              imgUrl: 'http://image.bblink.cn/201603-44a3e99a1eec42ae9741792f78118a77.jpg', // 分享图标
              type: '', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function() {
                alert(222)
              },
              cancel: function(res) { 
              }
            })
          })
        }
      }
    }) 
    wx.error(function (res) {
      alert('出错了：' + res.errMsg)// 这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
    })
  }
  render () {
    return (
      <div>
        <h2 onClick={this.check.bind(this)}>
          分享
        </h2>
      </div>
    )
  }
}