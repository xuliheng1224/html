<template>
  <div class='bg' :style="{backgroundImage: 'url(https://image.bblink.cn/bg.png)', backgroundSize:'100% 100%'}">
    <img src="https://image.bblink.cn/third.png" alt="" class='info'>
    <div class='content'>
      <div class='title'>1、宝宝性别</div>
      <div class='choose'>
        <div v-for='(item, index) in items' :key='index' @click="msg=index" class='option'>
          <img :src="msg===index ? selected : unselected" alt="">
          <span>{{item.item}}</span>
        </div>
      </div>
      <div class='title'>2、宝宝生日</div>
      <div>
        <view class="section">
          <picker mode="date" :value="date" start="2000-01-01" end="2020-12-31" @change="bindDateChange">
            <view class="picker">
              <input type="text" placeholder="例：2016-5-18" class='text' :value="date">
            </view>
          </picker>
        </view>
      </div>
    </div>
    <div class='next'>
      <img src="https://image.bblink.cn/last.png" alt="" @click='last'>
      <img src="https://image.bblink.cn/submit.png" alt="" @click='next'>
    </div>
    <i-toast id="toast" />
    <img :src="point" alt="" style="display: none;">
  </div>
</template>

<script>
const { $Toast } = require('../../../static/iView/base/index')
export default {
  data () {
    return {
      selected: 'https://image.bblink.cn/selected.png',
      unselected: 'https://image.bblink.cn/unselected.png',
      items: [{item: '小公主', sex: '女'}, {item: '小王子', sex: '男'}],
      msg: -1,
      date: '',
      point: ''
    }
  },
  methods: {
    bindDateChange (e) {
      // console.log(e.target.value)
      this.date = e.target.value
    },
    last () {
      wx.navigateTo({
        url: '../second/main'
      })
    },
    next () {
      if (this.msg === -1) {
        // console.log('请选择宝宝性别')
        $Toast({
          content: '请选择宝宝性别',
          type: 'warning'
        })
      } else {
        if (this.date === '') {
          // console.log('请填写宝宝生日')
          $Toast({
            content: '请填写宝宝生日',
            type: 'warning'
          })
        } else {
          let data = this.items[this.msg].sex
          var openId = wx.getStorageSync('openId') || ''
          var res = wx.getStorageSync('msg') + ',' + wx.getStorageSync('msg2') + ',' + data + ',' + this.date + ',' + openId
          console.log(res)
          this.$http.info({answer: res}).then((response) => {
            // console.log(response)
            if (response === '200') {
              wx.navigateTo({
                url: '../upload/main'
              })
            }
          })
        }
      }
    }
  },
  mounted () {
    // 打点
    this.point = 'https://uv.hos-wifi.com/springrx/getActivity?log_type=3-mid-autumn&open_id=' + wx.getStorageSync('openId')
    console.log(this.point)
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
}
.info {
  margin-top:164rpx;
  margin-left:129rpx;
  margin-bottom: 82rpx;
  width:478rpx;
  height:59rpx;
}
.content {
  margin-left:112rpx;
}
.title {
  font-size:46rpx;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  color:rgba(112,54,1,1);
  line-height:65rpx;
  letter-spacing:2rpx;
  margin-bottom: 58rpx;
}
.choose {
  display: flex;
  margin-bottom: 104rpx;
  .option {
    display: flex;
    align-items: center;
    &:nth-child(1){
      margin-right:90rpx;
    }
    img {
      width:56rpx;
      height:56rpx;
      margin-left:20rpx;
      margin-right:23rpx;
    }
    span{
      font-size:38rpx;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:rgba(112,54,1,1);
      letter-spacing:2rpx;
    }
  }
}
.text{
  width:514rpx;
  height:88rpx;
  padding: 19rpx 21rpx 21rpx;
  box-sizing: border-box;
  background:rgba(255,255,255,1);
  border-radius:8rpx;
  border:2rpx solid rgba(112,55,2,1);
  color:rgba(186,166,149,1);
  pointer-events: none;
}
.next {
  text-align: center;
  margin-top:152rpx;
  img{
    width:228rpx;
    height:94rpx;
    &:nth-child(2){
      margin-left:100rpx;
    }
  }
}
#toast{
  margin: auto;
}
</style>
