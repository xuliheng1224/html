import Vue from 'vue'
import App from './App'
import flyioPlugin from './utils/apiUtil'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(flyioPlugin)
const app = new Vue(App)
app.$mount()
