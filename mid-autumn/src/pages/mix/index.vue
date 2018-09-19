<template>
  <div class="mix-main">
    <div class='bg' :style="{backgroundImage: 'url(https://image.bblink.cn/bg.png)', backgroundSize:'100% 100%' , backgroundRepeat: 'no-repeat'}">
      <div>
        <!-- 画布大小按需定制 这里我按照背景图的尺寸定的  -->
     <canvas canvas-id="shareImg" style="width:750px;height:1080px"></canvas>    
      <div class="tx-main">
        <img class="tx-img" :src="prurl" alt="" srcset="">
      </div>
      <!-- <div class="text-mian">
        结果：{{desc}}
      </div> -->
      <div class="btn-main">      
        <button class="btn-comm"  @click="saveImage">保存图片</button>       
        <button class="btn-comm" open-type="share">分享给好友</button> 
      </div>
      <div class="new-main" @click="jump">
        重新测试
      </div>
      </div>      
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgUrl: '',
      prurl: '',
      canvasHeight: '',
      desc: '单纯的机灵鬼',
      type: '0'
    }
  },
  mounted () {
    console.log(this.$root.$mp.query)
    this.imgUrl = this.$root.$mp.query.imgUrl
    this.judgeText()
    this.getImgs()
  },
  methods: {
    jump () {
      console.log(11)
      wx.navigateBack({
        delta: 4
        // url: '../index/main'
        // success: function (res) {
        //   console.log(res)
        // },
        // fail: function (err) {
        //   console.log(err)
        // }
      })
    },
    // 画布生成图片
    doneImg () {
      var that = this
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        // width: 575,
        // height: 869,
        width: 750,
        height: 1080,
        destWidth: 750,
        destHeight: 1080,
        canvasId: 'shareImg',
        success: function (res) {
          console.log(res.tempFilePath)
          /* 这里 就可以显示之前写的 预览区域了 把生成的图片url给image的src */
          that.prurl = res.tempFilePath
          wx.hideLoading()
          // that.saveImage()
        },
        fail: function (res) {
          console.log(8)
          wx.hideLoading()
          console.log(res)
        }
      }, that)
    },
    // 保存图片
    saveImage () {
      var that = this
      wx.saveImageToPhotosAlbum({
        filePath: that.prurl,
        success (res) {
          wx.showModal({
            content: '图片已保存到相册，赶紧晒一下吧~',
            showCancel: false,
            confirmText: '好的',
            confirmColor: '#333',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.hidden = true
              }
            }
          })
        }
      })
    },
    getImgs () {
      var that = this
      wx.showLoading({
        title: '努力生成中...'
      })
      /* promise可以忽略 是用来改善异步回调执行顺序 与本功能没有大的关系 */
      let promise1 = new Promise(function (resolve, reject) {
        /* 获得要在画布上绘制的图片 */
        wx.getImageInfo({
          src: `https://image.bblink.cn/18autumn/${that.type}.jpg`,
          success: function (res) {
            resolve(res)
          },
          fail: function (err) {
            console.log('错误')
            console.log(err)
          }
        })
      })
      let promise2 = new Promise(function (resolve, reject) {
        wx.getImageInfo({
          src: that.imgUrl.replace(/http/, 'https'),
          success: function (res) {
            resolve(res)
          },
          fail: function (err) {
            console.log('错误')
            console.log(err)
          }
        })
      })
      /* 图片获取成功才执行后续代码 */
      Promise.all(
        [promise1, promise2]
      ).then(res => {
        console.log(5)
        console.log(res)
        const ctx = wx.createCanvasContext('shareImg')
        ctx.setFillStyle('white')
        /* 绘制图像到画布  图片的位置你自己计算好就行 参数的含义看文档 */
        /* ps: 网络图片的话 就不用加/路径了 反正我这里路径得加 */
        // ctx.drawImage(res[1].path, 0, 0, 575, 869)
        ctx.drawImage(res[1].path, 0, 0, 750, 1080)
        ctx.drawImage(res[0].path, 10, 860, 705, 210)
        /* 绘制 */
        ctx.stroke()
        ctx.draw()
        console.log(6)
        setTimeout(function () {
          that.doneImg()
        }, 500)
      })
    },
    judgeText () {
      var ty = wx.getStorageSync('msg2')
      var cl = wx.getStorageSync('msg')
      var that = this
      if (ty === '口红') {
        switch (cl) {
          case '白':
            that.desc = '单纯的小仙女'
            that.type = '1'
            break
          case '蓝':
            that.desc = '稳重的小仙女'
            that.type = '2'
            break
          case '红':
            that.desc = '热情的小仙女'
            that.type = '3'
            break
          case '黄':
            that.desc = '明朗的小仙女'
            that.type = '4'
            break
          case '绿':
            that.desc = '有强烈好奇心的小仙女'
            that.type = '5'
            break
        }
      } else if (ty === '蛋糕') {
        switch (cl) {
          case '白':
            that.desc = '单纯的吃货宝宝'
            that.type = '6'
            break
          case '蓝':
            that.desc = '稳重的吃货宝宝'
            that.type = '7'
            break
          case '红':
            that.desc = '热情的吃货宝宝'
            that.type = '8'
            break
          case '黄':
            that.desc = '明朗的吃货宝宝'
            that.type = '9'
            break
          case '绿':
            that.desc = '有强烈好奇心的吃货宝宝'
            that.type = '10'
            break
        }
      } else {
        switch (cl) {
          case '白':
            that.desc = '单纯的机灵鬼'
            that.type = '11'
            break
          case '蓝':
            that.desc = '稳重的机灵鬼'
            that.type = '12'
            break
          case '红':
            that.desc = '热情的机灵鬼'
            that.type = '13'
            break
          case '黄':
            that.desc = '明朗的机灵鬼'
            that.type = '14'
            break
          case '绿':
            that.desc = '有强烈好奇心的机灵鬼'
            that.type = '15'
            break
        }
      }
    }
  },
  onShareAppMessage: function () {
    return {
      title: '中秋新头像get大法，还在等什么？',
      desc: '有人@你，测测宝宝超萌瞬间！',
      path: '/pages/index/main',
      success: function (res) {
        console.log(res)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.mix-main {   
  canvas{
    position: fixed;
    top: 0;
    left: 400px;
  }
  .bg {
    // position: absolute;
    // top: 0;
    // left: 0;
    // right: 0;
    // bottom: 0;
    width: 100%;
    height: 1210rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tx-main {
    width: 750rpx;
    height: 720rpx;
    // margin-top: 183rpx;
    // padding-top: 9vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .tx-img {
      width: 501rpx;
      height: 720rpx;
      border-width:0;    
    }
  }
  .text-mian {
    text-align: center;
    font-size: 32rpx;
    font-family: PingFangSC-Regular;
    font-weight: bold;
    color: rgba(112, 55, 2, 1);
    line-height: 45rpx;
    letter-spacing: 1rpx;
    margin-top: 3vh;
  }
  .btn-main {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 587rpx;
    margin-top: 4vh;
    margin-bottom: 2vh;
    .btn-comm {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 227rpx;
      height: 74rpx;
      background: rgba(252, 204, 40, 1);
      border-radius: 4rpx;
      border: 3rpx solid rgba(112, 55, 2, 1);
      font-size: 30rpx;
      font-family: PingFangSC-Medium;
      font-weight: bold;
      color: rgba(112, 55, 2, 1);
      letter-spacing: 1rpx;
      &.right-md {
        margin-left: 60rpx;
      }
    }
  }
  .new-main {
    margin: 0 auto;
    width: 514rpx;
    height: 74rpx;
    text-align: center;
    background: rgba(252, 204, 40, 1);
    border-radius: 4rpx;
    border: 3rpx solid rgba(112, 55, 2, 1);
    font-size: 32rpx;
    font-family: PingFangSC-Medium;
    font-weight: bold;
    color: rgba(112, 55, 2, 1);
    line-height: 74rpx;
    letter-spacing: 1rpx;
  }
}
</style>

