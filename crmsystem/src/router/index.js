import Vue from 'vue'
import Router from 'vue-router'
const Match = resolve => {
  require.ensure(['@/components/question/match'], () => {
    resolve(require('@/components/question/match'))
  }, 'userquestiondata')
}
const Details = resolve => {
  require.ensure(['@/components/question/details'], () => {
    resolve(require('@/components/question/details'))
  }, 'details')
}
const Basic = resolve => {
  require.ensure(['@/components/question/basic'], () => {
    resolve(require('@/components/question/basic'))
  }, 'basic')
}
const TestType = resolve => {
  require.ensure(['@/components/question/testType'], () => {
    resolve(require('@/components/question/testType'))
  }, 'testType')
}
const UserBaseData = resolve => {
  require.ensure(['@/components/baseData/userBase'], () => {
    resolve(require('@/components/baseData/userBase'))
  }, 'userbasedata')
}
const Home = resolve => {
  require.ensure(['@/components/welcome/home'], () => {
    resolve(require('@/components/welcome/home'))
  }, 'home')
}
const Consumer = resolve => { // 用户基础信息列表
  require.ensure(['@/components/consumer/index'], () => {
    resolve(require('@/components/consumer/index'))
  }, 'consumer')
}
const Order = resolve => { // 订单管理
  require.ensure(['@/components/order/order'], () => {
    resolve(require('@/components/order/order'))
  }, 'order')
}
const Cloudclass = resolve => { // 云课堂
  require.ensure(['@/components/order/cloudclass'], () => {
    resolve(require('@/components/order/cloudclass'))
  }, 'order')
}
const Finddoctor = resolve => { // 寻医
  require.ensure(['@/components/order/finddoctor'], () => {
    resolve(require('@/components/order/finddoctor'))
  }, 'order')
}
const Membershipcard = resolve => { // 会员卡
  require.ensure(['@/components/order/membershipcard'], () => {
    resolve(require('@/components/order/membershipcard'))
  }, 'order')
}
const Hospital = resolve => { // 医院信息
  require.ensure(['@/components/hostpital/hostpital'], () => {
    resolve(require('@/components/hostpital/hostpital'))
  }, 'hospital')
}
const Card = resolve => { // 建党预约
  require.ensure(['@/components/card/card'], () => {
    resolve(require('@/components/card/card'))
  }, 'card')
}
const Bigcarddetail = resolve => { // 大卡详情
  require.ensure(['@/components/card/bigcarddetail'], () => {
    resolve(require('@/components/card/bigcarddetail'))
  }, 'card')
}
const Smallcarddetail = resolve => { // 小卡详情
  require.ensure(['@/components/card/smallcarddetail'], () => {
    resolve(require('@/components/card/smallcarddetail'))
  }, 'card')
}
const Cancellation = resolve => { // 核销
  require.ensure(['@/components/cancellation/cancellation'], () => {
    resolve(require('@/components/cancellation/cancellation'))
  }, 'Cancellation')
}
const SchoolInfo = resolve => { // 孕校信息
  require.ensure(['@/components/schoolInfo/schoolInfo'], () => {
    resolve(require('@/components/schoolInfo/schoolInfo'))
  }, 'SchoolInfo')
}
const SchoolStatistics = resolve => { // 孕校统计
  require.ensure(['@/components/pregnancySchool/schoolStatistics'], () => {
    resolve(require('@/components/pregnancySchool/schoolStatistics'))
  }, 'SchoolStatistics')
}
const DoctorInfo = resolve => { // 医生信息
  require.ensure(['@/components/doctorInfo/doctorInfo'], () => {
    resolve(require('@/components/doctorInfo/doctorInfo'))
  }, 'DoctorInfo')
}
const Login = resolve => {
  require.ensure(['@/components/login/login'], () => {
    resolve(require('@/components/login/login'))
  }, 'login')
}
const Test = resolve => {
  require.ensure(['@/components/test/test'], () => {
    resolve(require('@/components/test/test'))
  }, 'test')
}
const Course = resolve => {
  require.ensure(['@/components/course/course'], () => {
    resolve(require('@/components/course/course'))
  }, 'course')
}
const Textadd = resolve => { // 添加
  require.ensure(['@/components/textLibrary/textadd'], () => {
    resolve(require('@/components/textLibrary/textadd'))
  }, 'textLibrary')
}
const Textedit = resolve => { // 编辑
  require.ensure(['@/components/textLibrary/textedit'], () => {
    resolve(require('@/components/textLibrary/textedit'))
  }, 'textLibrary')
}
const Textdetail = resolve => { // 详情
  require.ensure(['@/components/textLibrary/textdetail'], () => {
    resolve(require('@/components/textLibrary/textdetail'))
  }, 'textLibrary')
}
const NOTFUND = resolve => { // 404 页面
  require.ensure(['@/components/NOT/found'], () => {
    resolve(require('@/components/NOT/found'))
  }, 'notfound')
}
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/baseData',
      name: 'BaseData',
      component: UserBaseData
    }, {
      path: '/consumer',
      name: 'Consumer',
      component: Consumer
    }, {
      path: '/order',
      name: 'Order',
      component: Order
    }, {
      path: '/hospital',
      name: 'hospital',
      component: Hospital
    }, {
      path: '/card',
      name: 'Card',
      component: Card
    }, {
      path: '/cancellation',
      name: '/Cancellation',
      component: Cancellation
    }, {
      path: '/schoolInfo/:name',
      name: 'schoolInfo',
      component: SchoolInfo
    }, {
      path: '/doctorInfo',
      name: 'doctorInfo',
      component: DoctorInfo
    }, {
      path: '/schoolStatistics',
      name: 'schoolStatistics',
      component: SchoolStatistics
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/match',
      name: 'match',
      component: Match
    }, {
      path: '/testType',
      name: 'testType',
      component: TestType
    }, {
      path: '/basic',
      name: 'basic',
      component: Basic
    }, {
      path: '/details/:name/:id',
      name: 'details',
      component: Details
    }, {
      path: '/test',
      name: 'test',
      component: Test
    }, {
      path: '/course',
      name: 'course',
      component: Course
    }, {
      path: '/textadd',
      name: 'textadd',
      component: Textadd
    }, {
      path: '/textdetail',
      name: 'textdetail',
      component: Textdetail
    }, {
      path: '/textedit',
      name: 'textedit',
      component: Textedit
    }, {
      path: '/cloudclass',
      name: 'cloudclass',
      component: Cloudclass
    }, {
      path: '/finddoctor',
      name: 'finddoctor',
      component: Finddoctor
    }, {
      path: '/membershipcard',
      name: 'membershipcard',
      component: Membershipcard
    }, {
      path: '/bigcarddetail',
      name: 'bigcarddetail',
      component: Bigcarddetail
    }, {
      path: '/smallcarddetail',
      name: 'smallcarddetail',
      component: Smallcarddetail
    }, {
      path: '*',
      name: '404',
      component: NOTFUND
    }
  ]
})
