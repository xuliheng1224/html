var appid = '34565673434fdf54'
var wxConfig = function(checkUrl) {
  $.ajax({
    type: 'GET',
    url: 'http://test3.bblink.cn/msg/jssdk',
    params: {
      "url": location.href.split('#')[0],
      "appId": appid
    },
    success: function(data, status, xhr) {
      console.log(data);
      setConfig(data);
    },
    error: function(xhr, errorType, error) {
      var httpCode = xhr.status;
      //alert("error" + httpCode);
      if(httpCode == 401) {
        //alert('授权失败，请重新登录');
      } else {
        //window.location.href = 'error.html?type=' + errorType + '&code=' + httpCode + '&msg=' + encodeURIComponent(xhr.statusText) + '&url=' + encodeURIComponent(xhr.responseURL);
      }
    }
  });
}

function setConfig(data) {
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: data.appid, // 必填，公众号的唯一标识
    timestamp: data.timeStamp, // 必填，生成签名的时间戳
    nonceStr: data.nonceStr, // 必填，生成签名的随机串
    signature: data.signature, // 必填，签名，见附录1
    jsApiList: [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem',
      'translateVoice',
      'startRecord',
      'stopRecord',
      'onVoiceRecordEnd',
      'playVoice',
      'onVoicePlayEnd',
      'pauseVoice',
      'stopVoice',
      'uploadVoice',
      'downloadVoice',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'getNetworkType',
      'openLocation',
      'getLocation',
      'hideOptionMenu',
      'showOptionMenu',
      'closeWindow',
      'scanQRCode',
      'chooseWXPay',
      'openProductSpecificView',
      'addCard',
      'chooseCard',
      'openCard'
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
}

/*微信分享*/
function  wechatShare(title, desc, shareLink, img) {
  wx && wx.ready(function() {
    //分享到朋友圈
    wx.onMenuShareTimeline({
      title: title + ' ' + desc, // 分享标题
      link: shareLink, // 分享链接
      imgUrl: img, // 分享图标
      success: function() {
        alert(imgUrl)
      },
      cancel: function(res) {}
    });
    //分享给朋友
    wx.onMenuShareAppMessage({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: shareLink, // 分享链接
      imgUrl: img, // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function() {},
      cancel: function(res) {
        alert(imgUrl)
      }
    });
  })
}
// 微信扫描二维码
function scanQRCode() {
  wx.scanQRCode({
    needResult : 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    scanType : [ "qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
    success : function(res) {
      var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
      window.location.href = result;//因为我这边是扫描后有个链接，然后跳转到该页面
    }
  });
}
