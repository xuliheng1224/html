<template>
<div class="content">
    <div class="code">
        <div class="code_left">
            学校二维码
        </div>
        <div class="code_middle">
            <div class="code_img">
                <i v-if="qrCode == ''" class="el-icon-picture-outline"></i>
                <img  v-else :src="qrCode" alt="">
            </div>
        </div>
        <div class="code_right">
            <div class="code_btn">
                <el-button class="generate" type="primary" v-if="menuBtn.indexOf('school_qrcode_create')>-1" @click="buildCode('qrCode')">生成</el-button>
                <br />
                <el-button v-if="menuBtn.indexOf('school_qrcode_down')>-1" @click="downloadCode('qrCode')">下载</el-button>
            </div>
        </div>
    </div>
    <div class="code">
        <div class="code_left">
            签到二维码
        </div>
        <div class="code_middle">
            <div class="code_img">
                <i v-if="qrCodeSignin == ''" class="el-icon-picture-outline"></i>
                <img  v-else :src="qrCodeSignin" alt="">
            </div>
        </div>
        <div class="code_right">
            <div class="code_btn">
                <el-button class="generate" type="primary" v-if="menuBtn.indexOf('school_qrcode_create')>-1" @click="buildCode('qrCodeSignin')">生成</el-button>
                <br />
                <el-button v-if="menuBtn.indexOf('school_qrcode_down')>-1" @click="downloadCode('qrCodeSignin')">下载</el-button>
            </div>
        </div>
    </div>
    <div class="code">
        <div class="code_left">
            <span>学校二维码</span>
            <br/>
            <span>(小程序)</span>
        </div>
        <div class="code_middle">
            <div class="code_img">
                <i v-if="qrCodeWeChat == ''" class="el-icon-picture-outline"></i>
                <img v-else :src="qrCodeWeChat" alt="">
            </div>
        </div>
        <div class="code_right">
            <div class="code_btn">
                <el-button class="generate" type="primary" v-if="menuBtn.indexOf('school_qrcode_create')>-1" @click="buildCode('qrCodeWeChat')">生成</el-button>
                <br />
                <el-button v-if="menuBtn.indexOf('school_qrcode_down')>-1" @click="downloadCode('qrCodeWeChat')">下载</el-button>
            </div>
        </div>
    </div>
    <div class="code">
        <div class="code_left">
            <span>签到二维码</span>
            <br/>
            <span>(小程序)</span>
        </div>
        <div class="code_middle">
            <div class="code_img">
                <i v-if="qrCodeSigninWeChat == ''" class="el-icon-picture-outline"></i>
                <img  v-else :src="qrCodeSigninWeChat" alt="">
            </div>
        </div>
        <div class="code_right">
            <div class="code_btn">
                <el-button class="generate" type="primary" v-if="menuBtn.indexOf('school_qrcode_create')>-1" @click="buildCode('qrCodeSigninWeChat')">生成</el-button>
                <br />
                <el-button v-if="menuBtn.indexOf('school_qrcode_down')>-1" @click="downloadCode('qrCodeSigninWeChat')">下载</el-button>
            </div>
        </div>
    </div>
</div>
</template>
<style scoped src="../../../static/css/schoolInfo.css"></style>
<script>
import { tool } from '../../common/util'
export default {
  data () {
    return {
      qrCode: '',
      qrCodeSignin: '',
      qrCodeWeChat: '',
      qrCodeSigninWeChat: '',
      menuBtn: []
    }
  },
  mounted () {
    this.menuBtn = JSON.parse(tool.localStorage.get('authTags'))
    this.$store.dispatch('getQrcode', {vue: this})
  },
  methods: {
    buildCode (str) {
      this.$store.dispatch('createQrCode', {type: str, vue: this})
    },
    downloadCode (str) {
      switch (str) {
        case 'qrCode':
          this.$store.dispatch('downloadCode', {type: str, qrCode: this.qrCode, vue: this})
          break
        case 'qrCodeSignin':
          this.$store.dispatch('downloadCode', {type: str, qrCode: this.qrCodeSignin, vue: this})
          break
        case 'qrCodeWeChat':
          this.$store.dispatch('downloadCode', {type: str, qrCode: this.qrCodeWeChat, vue: this})
          break
        case 'qrCodeSigninWeChat':
          this.$store.dispatch('downloadCode', {type: str, qrCode: this.qrCodeSigninWeChat, vue: this})
          break
      }
    }
  }
}
</script>
