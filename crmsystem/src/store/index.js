import Vue from 'vue'
import Vuex from 'vuex'
import loginStore from './loginStore/index'
import loading from './loadIng'
import welcome from './welcome/index'
import schoolStatistics from './schoolStatistics/index'
import consumer from './consumer/index'
import baseData from './baseData/index'
import doctorInfo from './doctorInfo/index'
import question from './question/index'
import schoolInfo from './schoolInfo/index'
import remindDataStore from './course/index'
import addCourse from './addCourse/index'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    loginStore,
    loading,
    welcome,
    schoolStatistics,
    consumer,
    baseData,
    doctorInfo,
    question,
    schoolInfo,
    remindDataStore,
    addCourse
  },
  strict: debug
})
