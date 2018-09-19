<template>
  <div class="upload-main">
    <div class='bg' :style="{backgroundImage: 'url(https://image.bblink.cn/bg.png)', backgroundSize:'100% 100%' , backgroundRepeat: 'no-repeat'}">
      <div class="tx-main">
        <img class="tx-img" src="https://image.bblink.cn/examples.png" alt="" srcset="">
      </div>
      <div class="text-mian">
        备注：宝宝清晰正面照片
      </div>
      <div class="btn-main">
        <img src="https://image.bblink.cn/upload.png" class="btn-img" @click="chooseImageFun" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgUrl: '',
      uploadToken: '',
      doneImg: ''
    }
  },
  mounted () {
    console.log(this.$http)
    this.getUploadToke()
  },
  methods: {
    jump () {
      var self = this
      wx.navigateTo({
        url: '../mix/main?imgUrl=' + self.doneImg
      })
    },
    chooseImageFun () {
      var self = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          console.log(res)
          // self.jump()
          self.upload(res.tempFilePaths[0])
        }
      })
    },
    // 保存图片
    upload (path) {
      var self = this
      wx.showToast({
        icon: 'loading',
        title: '正在上传',
        duration: 10000
      })
      wx.uploadFile({
        url: 'https://upload.qiniup.com/',
        filePath: path,
        name: 'file',
        header: {'Content-Type': 'multipart/form-data'},
        formData: {
          'token': self.uploadToken
        },
        success: function (res) {
          console.log(JSON.parse(res.data))
          if (res.statusCode !== 200) {
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
          } else {
            // 人脸识别
            var ty = wx.getStorageSync('msg2')
            var id = '0'
            if (ty === '木马') {
              id = '16014'
            } else if (ty === '蛋糕') {
              id = '16012'
            } else {
              id = '16013'
            }
            self.$http.upload({url: `https://image.bblink.cn/${JSON.parse(res.data).key}`, cosmetic: id}).then(res => {
              console.log(res)
              if (res.code === '0000') {
                if (res.data.ret === '0') {
                  wx.hideToast()
                  self.doneImg = res.data.image
                  self.jump()
                } else {
                  wx.hideToast()
                  wx.showModal({
                    title: '提示',
                    content: '请上传正脸',
                    showCancel: false
                  })
                }
              } else {
                wx.hideToast()
                wx.showModal({
                  title: '提示',
                  content: '服务器9000',
                  showCancel: false
                })
              }
            })
          }
        },
        fail: function (e) {
          console.log(e)
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
          wx.hideToast()
        }
      })
    },
    getUploadToke () {
      var self = this
      wx.request({
        url: 'https://api.bblink.cn/crm/upload/getUpToken',
        success: function (res) {
          console.log(res.data)
          self.uploadToken = res.data
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.upload-main {
  .bg {
    // position: absolute;
    // top: 0;
    // left: 0;
    // right: 0;
    // bottom: 0;
    width: 100%;
    height: 1210rpx;
  }
  .tx-main {
    width: 750rpx;
    height: 550rpx;
    padding-top: 263rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    .tx-img {
      width: 550rpx;
      height: 550rpx;
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
    margin-top: 32rpx;
  }
  .btn-main {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 121rpx;
    .btn-img {
      width: 347rpx;
      height: 93rpx;
    }
  }
}
</style>

