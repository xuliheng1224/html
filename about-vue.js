//vue项目的搭建  https://segmentfault.com/a/1190000016344599 vue相关问题
// 1.安装node.js
// 2.npm install -g cnpm --registry=https://registry.npm.taobao.org
// 3.cnpm install -g vue-cli
// 4.vue init webpack Vue-Project
// 5.cd Vue-Project && cnpm i
// 6.npm run dev
// webpack 的反向代理
// 在config/index.js 中的dev对象中找到
// proxyTable:{
//   '/api': {
//     target: 'http://www.123369.com.cn',
//     secure: false,  // 如果是https接口，需要配置这个参数
//     changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
//     pathRewrite: {
//       '^/api': '/api'
//     }
//   }
// }
// 请求的url 是'/api/....'
// axios 的封装
import axios from 'axios'
import cookie from 'js-cookie'
export function fetch(options, _this) {
    return new Promise((resolve, reject) => {
        if (_this) {
            _this.$store.dispatch('loadingState', { load: true })
        }
        var adminInfo = cookie.get('adminInfo') ? JSON.parse(cookie.get('adminInfo')) : ''
        var schoolInfos = cookie.get('schoolInfos') ? JSON.parse(cookie.get('schoolInfos')) : ''
        const instance = axios.create({
            headers: {
                'Content-Type': options.responseType ? options.responseType : 'application/json',
                'crmtoken': adminInfo.token,
                'hosId': schoolInfos.hosId,
                'schoolId': schoolInfos.schoolId
            },
            timeout: 30 * 1000 // 设置30秒超时
        })
        instance(options)
            .then(response => {
                if (!response.data.code) {
                    resolve(response)
                    options.success(response)
                } else if (['9002'].includes(response.data.code)) { // token失效
                    cookie.remove('adminInfo')
                    cookie.remove('schoolInfos')
                    if (window.location.href.indexOf('login') === -1) {
                        window.location.href = window.location.origin + '/login'
                    }
                } else if (['0000'].includes(response.data.code)) {
                    resolve(response)
                    options.success(response)
                } else {
                    window.$global_this.$message.error(response.data.msg)
                }
                // if (_this) {
                //     _this.$store.dispatch('loadingState', {load: false})
                // }
            })
            .catch(error => {
                console.log('请求异常信息:' + error)
                window.$global_this.$message.error(error.message)
                // if (_this) {
                //     _this.$store.dispatch('loadingState', {load: false})
                // }
                reject(error)
            })
    })
}

fetch({
    url: '/api/',
    method: 'get', // post ,data:{}
    params: {},
    responseType: '',
    success: (res) => { },
    fail: (err) => { }

}, this)
//1.关于vue的路由   在main.js中使用
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '...';
const router = new VueRouter({
    routes: [
        {
            path: '',
            name: '',
            component: '',
        }
    ]
})

Vue.use(VueRouter)

// 2.关于vue的传参（query,params)
//     query是在url后面介个‘？’传参相当于ajax的get
//     params就相当于ajax的post
//     如果你使用params传参，当页面刷新的时候会获取不到传入的值
//传
this.$router.push({
    path: '',//或者name都行
    query: {
        id: 66
    }
})
//取
this.$route.query.id

this.$router.push({
    name: '',//用path取不到传入的值
    params: {
        id: 555
    }
})
this.$route.params.id

// 3.关于vue的请求 

import axios from 'axios'
Vue.prototype.$http = axios;

import VueResource from 'vue-resource'
Vue.use(VueResource);

let postData = {
    'companyCode': 'tur',
    'userName': '123456789123456789',
    'password': '123456'
}

//get 请求传参
this.$http.get(url, { params: postData }).then((res) => {

}).catch((err) => {

})

//post传参
this.$http.post("", postData).then((res) => {
    console.log(res);
}).catch((error) => {
    console.log(error);
})

//4.关于vue的自定义过滤器filters， 自定义指令directives，可以看作对象，然后调用方法


//监听watch，计算属性computed

/* <div> {{val|add}}</div>
    <input type='text' v-focus />
filters:{
    add(val){
        return val + 3
    }
    some(score){
        if (score < 20) {
                score = '不合格';
            } else if (score >= 20 && score <= 27) {
                score = '合格';
            } else if (score >= 28 && score <= 31) {
                score = '良好';
            } else if (score > 31) {
                score = '优秀';
            }
            return score
    }
    
    directives:{
        focus(el){
            el.classList.add('active')
        }
    }
    
    <div>{{info}}</div>
    computed:{
        info(){
            return this.msg.split('').reverse().join('')
        }
    } 
    
    <div>{{number}}</div>
    watch:{
        number(new ,old){
            console.log(new.old)
        }
    }
} */

//5.关于vue的ref
//refs相当于是vue所有含有ref的一个对象

// <h3 ref="p3" class="p3">ref的测试</h3>
// <h4 ref="p4" class="p4">ref的测试</h4>

// clickMe(){
//     console.log(this.$refs)；
//     this.$refs.p3.className = "p33333"；
// }

//6.slot标签是一个占位符

// <div>
//     <header>这是头部</header>
//     <slot name="content"></slot>
// </div>

/* <v-header>
    <div slot="content">
        这是内容啊
    </div>
</v-header> */

//7.component 购物车标签（切换标签）

// <button @click="choose='detail'">切换到详情页</button>
// <button @click="choose='dingdan'">切换到订单页</button>
// <component :is="choose"></component>

//import detail from './detail';
//import dingdan from './dingdan';

// data () {
//     return {
//       choose:'detail'
//     }
// }    

// components:{
//     detail,dingdan
// }

//8.关于vue的props 子组件获取父组件的信息；

//父组件
// <child parentmsg="fromfa"></child>
// import child from './child';
// export default{
//     components:{
//         child
//     }
// }

//子组件
/* <div>{{info}}</div>
export default {
    props:['parentmsg'],
    data(){
        return{
            info:this.parentmsg
        }
    }
} */


//9.vue的$emit  子组件向父组件推送信息

//子组件
/* <div @click='send'>向父组件推送信息</div>

methods:{
    send(){
        this.$emit('toParent','这是从子组件传过来的')
    }
}     
*/

//父组件

/* <child @toparent='accept'></child>

methods:{
    accept(data){
        console.log(data)
    }
} */

//10.关于vue的 $nextTick的用法

// `Vue.nextTick(callback)`，当数据发生变化，更新后执行回调。（全局）
// `Vue.$nextTick(callback)`，当dom发生变化，更新后执行的回调。

// <ul id="demo">
//     <li v-for="(index,item) in list" :key="index">{{item}}</div>
// </ul>

// new Vue({
//     el:'#demo',
//     data:{
//         list=[0,1,2,3,4,5,6,7,8,9,10]
//     },
//     methods:{
//         push:function(){
//             this.list.push(11);
//             Vue.nextTick(function(){ 
//                 alert('数据已经更新')
//             });
//             this.$nextTick(function(){
//                 alert('v-for渲染已经完成')
//             })
//         }

//11.关于vue路由的懒加载（按需引入）
// 懒加载：

// 　　　　也叫延迟加载，即在需要的时候进行加载，随用随载。

// 为什么需要懒加载？

// 　　　　像vue这种单页面应用，如果没有应用懒加载，运用webpack打包后的文件将会异常的大，造成进入首页时，需要加载的内容过多，时间过长，会出啊先长时间的白屏，即使做了loading也是不利于用户体验，而运用懒加载则可以将页面进行划分，需要的时候加载页面，可以有效的分担首页所承担的加载压力，减少首页加载用时

// 　　　　简单的说就是：进入首页不用一次加载过多资源造成用时过长！！！

// r就是resolve
const detail = r => require.ensure([], () => r(require('../components/list/detail')), 'list');
// 路由也是正常的写法  这种是官方推荐的写的 按模块划分懒加载 
const router = new Router({
    routes: [
        {
            path: '/list/blog',
            component: detail,
            name: 'blog'
        },
        ...login,
        ...mine
    ]
})

//12.vue传参加密；

var b = new Base64();
//加密
var id = b.encode('mine')

//解密
b.decode(id);

//13.引入fastclick
import FastClick from 'fastclick'
//main.js
FastClick.attach(document.body);

//13.vue 的手势事件vueTouch

// npm install vue-touch@next --save

// iimport VueTouch from 'vue-touch';
// Vue.use(VueTouch)

/* <v-touch v-on:swipeleft='left'>左划</v-touch>
<v-touch v-on:swiperight='right'>右划</v-touch> */

//14.vuex 状态集的管理
//  Vuex 依赖 Promise。如果你支持的浏览器并没有实现 Promise (比如 IE)，那么你可以使用一个 polyfill 的库，例如 es6-promise。

//  npm install vuex --save
//  npm install es6-promise --save 


main.js
import store from './components/store/store'
new Vue({
    el: '#app',
    router, store,
    components: { App },
    template: '<App/>'
})

Store.js
import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})

export default store;

State.js
const state = {
    getInfo: {
        name: 'xuliheng',
        age: 24
    },
    size: 'big',
    list: [
        { text: "111" },
        { text: "222" }
    ]
}

export default state;


getters.js

const getters = {
    getInfo(state) {
        return state.getInfo
    },
    list(state) {
        return state.list
    },
    size(state) {
        return state.size;
    }

}

export default getters;

actions.js

const actions = {
    add({ commit }, msg) {
        commit('add', msg)
    },
    modify({ commit }, size) {
        commit('modify', size)
    }
}

export default actions;

mutations.js

const mutations = {
    modify(state, size) {
        state.size = size;
    },
    add(state, msg) {
        let a = { text: msg }
        state.list.push(a);
    }
}

export default mutations;


//取值
import { mapGetters } from 'vuex';
computed: {
    //  ...mapGetters([
    //     'getInfo',
    //     'list',
    //     'size'
    // ])
}


//存
methods: {
    // add(){
    // if(this.msg){

    //     this.$store.dispatch('add' , this.msg)
    // }

    // },
    // modify(){
    //     this.$store.dispatch('modify','small')
    // }
}

//15 destroyed() 生命周期 在离开这个页面的时候调用，一般用于隐藏弹出框，遮罩层等
//  destroyed() {
//     // 离开时隐藏弹出按钮（如果用户没有手动操作）
//     if (this.hidePop) {
//       this.hidePop = false;
//     }
//   }

// 关于vuex 的另一种
// 在store 下的index下:
// import Vue from 'vue';
import Vuex from 'vuex';
import login from './login' //路由模块

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        login
    }
})
// login模块下
// index.js
import * as types from './mutationType'
import * as types from './actions'
const state = () => ({
    info: {}
})
const mutations = {
    [types.INFO](state, data) {
        state.info = data
    }
}
export default {
    state, actions, mutations
}
// mutationType.js
export const INFO = 'INFO'
// actions.js
import * as types from './mutationType'
import { fetch } from '../common/fetch'
export const getInfo = ({ commit }, op) => {
    return fetch({
        url: '',
        success: (res) => {
            commit('INFO', op)
        }
    })
}

//存入 op传this进去
this.$store.dispatch('getInfo', op)

//取出
import { mapState } from 'vuex'
// computed: {
// 	...mapState({
// 		info: state => state.login.info
// 	})
// }
