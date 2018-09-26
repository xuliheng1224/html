<template>
  <div id="app">
    <div v-if="isLogin || user.adminInfo">
      <el-container>
        <el-header style="height:106px; padding: 0;">

          <Head @out="out"></Head>
        </el-header>
        <el-container class="container-main">
          <el-aside width="200px" class="left-aside">
            <Menu></Menu>
          </el-aside>
          <el-main v-loading="load.loadState" class="right-aside">
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
    </div>
    <div class="login-main" v-else>
      <router-view/>
    </div>  
    <el-dialog class="browser-tip" :visible.sync="dialogVisible" width="30%" :close-on-click-modal='false' :show-close='false' :before-close="handleClose">
      <h1>你使用的浏览器已经过时！</h1>
      <h3 class="badbrowser-user-browser"></h3>
      <p>您可以继续浏览器本网站，但是不保证能够正确执行所有的功能。</p>
      <p>你可以根据下面的链接来升级您的浏览器</p>
      <p>
          <a class="oldbrowser__browserLink" title="Download Google Chrome" style="background-position: 0px 0px;"
            href="https://www.google.com/chrome/" target="_blank"></a>
          <a class="oldbrowser__browserLink" title="Download Mozilla Firefox" style="background-position: -60px 0px;"
            href="https://www.mozilla.org/ru/firefox/new/" target="_blank"></a>
          <a class="oldbrowser__browserLink" title="Download Opera" style="background-position: -120px 0px;"
            href="http://www.opera.com/download" target="_blank"></a>
          <a class="oldbrowser__browserLink" title="Download Safari" style="background-position: -180px 0px;"
            href="https://www.apple.com/safari/" target="_blank"></a>
          <a class="oldbrowser__browserLink" title="Download Internet Explorer" style="background-position: -240px 0px;"
            href="https://download.cnet.com/Internet-Explorer/3000-2356_4-10013275.html" target="_blank"></a>           
      </p>     
    </el-dialog>
  </div>
</template>

<script>
import Menu from "./components/menu/menu"
import Head from "./components/menu/head"
import { mapState } from 'vuex'
import cookies from 'js-cookie'
import { browser } from './common/browser.js'
export default {
  computed: mapState({
    load: state => state.loading,
    user: state => state.loginStore.user
  }),
  components: {
    Menu,
    Head
  },
  data () {
    return {
      isLogin: false,
      dialogVisible: false
    }
  },
  methods: {
    out () {
      this.isLogin = false
      this.$store.commit('LOGIN', '')
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    }
  },
  mounted () {
    if (cookies.get('adminInfo')) {
      this.isLogin = true
    }
    console.log(browser.verion())
    if (browser.verion().brow === 'IE' && browser.verion().version <= 9) {
      this.dialogVisible = true
    }
  }
}
</script>
<style>
body,
html {
  margin: 0px;
  height: 100%;
  font-family: MicrosoftYaHei;
}
#app {
  width: 100%;
  height: 100%;
  min-width: 1400px;
}
main {
  background: rgba(246, 245, 249, 1);
}
main.el-main {
  overflow: unset;
  float: right;
}
.login-main {
  width: 100%;
  height: 100%;
}
.el-tabs--border-card {
  background: #fff;
  border: 1px solid #dcdfe6;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.container-main {
  position: relative;
}
.left-aside {
  float: left;
}
.right-aside {
  float: right;
  width: 1707px;
  min-height: 1000px;
}
.browser-tip {
  text-align: center;
}
.oldbrowser__browserLink {
  display: inline-block;
    width: 60px;
    height: 66px;
    background: url('../src/assets/image/browsers.png') no-repeat 0 0;
    margin: 0 10px;
}
</style>
