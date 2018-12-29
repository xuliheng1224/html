// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import VueTouch from 'vue-touch'
import store from './components/store/store'
import axios from 'axios'
Vue.prototype.$http = axios;


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueTouch)

// 增加cordova文件
if (window.location.protocol === 'file:') {
  let cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}

// const router = new VueRouter({
//     routes
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, store,
  components: { App },
  template: '<App/>'
})
