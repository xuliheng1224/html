// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import VueTouch from 'vue-touch'
import store from './components/store/store'
import axios from 'axios'
Vue.prototype.$http=axios;


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueTouch)

// const router = new VueRouter({
//     routes
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store,
  components: { App },
  template: '<App/>'
})
