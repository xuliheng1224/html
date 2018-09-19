<template>
  <div class='bg' :style="{backgroundImage: 'url(https://image.bblink.cn/bg.png)', backgroundSize:'100% 100%'}">
    <div style="text-align: center;">
      <img src="https://image.bblink.cn/second.png" alt="" class='second'>
    </div>
    <div class='list'>
      <ul>
        <li v-for='(item, index) in items' :key='index' @click="msg=index">
          <img :src="msg===index ? selected : unselected" alt="" class='fimg'>
          <img :src="item.src" alt="" class='simg'>
        </li>
      </ul>
    </div>
    <div class='next'>
      <img src="https://image.bblink.cn/last.png" alt="" @click='last'>
      <img src="https://image.bblink.cn/next.png" alt="" @click='next'>
    </div>
    <i-toast id="toast" />
    <img :src="point" alt="" style="display:none;">
  </div>
</template>

<script>
const { $Toast } = require('../../../static/iView/base/index')
export default {
  data () {
    return {
      selected: 'https://image.bblink.cn/selected.png',
      unselected: 'https://image.bblink.cn/unselected.png',
      items: [{
        src: 'https://image.bblink.cn/horse.png',
        result: '木马'
      }, {
        src: 'https://image.bblink.cn/lipstick.png',
        result: '口红'
      }, {
        src: 'https://image.bblink.cn/cake.png',
        result: '蛋糕'
      }],
      msg: -1,
      point: ''
    }
  },
  methods: {
    next () {
      if (this.msg === -1) {
        console.log('请选择喜欢的物品')
        $Toast({
          content: '请选择喜欢的物品',
          type: 'warning'
        })
      } else {
        let data = this.items[this.msg].result
        wx.setStorageSync('msg2', data)
        wx.navigateTo({
          url: '../info/main'
        })
        // console.log(this.msg)
      }
    },
    last () {
      wx.navigateTo({
        url: '../index/main'
      })
    }
  },
  mounted () {
    // 打点
    this.point = 'https://uv.hos-wifi.com/springrx/getActivity?log_type=2-mid-autumn&open_id=' + wx.getStorageSync('openId')
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
.second {
  width:537rpx;
  height:129rpx;
  margin:124rpx auto 56rpx;
}
.list{
  ul{
    li{
      display: flex;
      margin-left: 114rpx;
      align-items: center;
      margin-bottom: 20rpx;
      .fimg{
        width:56rpx;
        height:56rpx;
      }
      &:nth-child(1){
        .fimg{
          margin-right: 152rpx;
        }
        .simg{
          width:165rpx;
          height:146rpx;
        } 
      }
      &:nth-child(2){
        .fimg{
          margin-top:20rpx;
          margin-right: 149rpx;
        }
        .simg{
          width:180rpx;
          height:198rpx;
        }  
      }
      &:nth-child(3){
        margin-bottom: 56rpx;
        .fimg{
          margin-top:40rpx;
          margin-right: 166rpx;
        }
        .simg{
          width:125rpx;
          height:176rpx;
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
    &:nth-child(2){
      margin-left:100rpx;
    }
  }
}
</style>
