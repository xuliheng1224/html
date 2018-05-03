//1.关于vue的路由   在main.js中使用
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '...';
const router = new VueRouter({
    routes: [
        { 
          path: '',
          name:'', 
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
    name:'',
    query:{
        id:66
    }
})
//取
this.$route.query.id

this.$router.push({
    name:'',
    params:{
        id:555
    }
})
this.$route.params.id

// 3.关于vue的请求 

import axios from 'axios'
Vue.prototype.$axios=axios;

import VueResource from 'vue-resource'
Vue.use(VueResource);

let postData = {
    'companyCode':'tur',
    'userName':'123456789123456789',
    'password':'123456'
}
this.$http.post("",postData).then((res) =>{
    console.log(response);
}).catch( (error)=> {
    console.log(error);
});

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

<div>
    <header>这是头部</header>
    <slot name="content"></slot>
</div>

/* <v-header>
    <div slot="content">
        这是内容啊
    </div>
</v-header> */

//7.component 购物车标签（切换标签）

// <button @click="choose='detail'">切换到详情页</button>
// <button @click="choose='dingdan'">切换到订单页</button>
// <component :is="choose"></component>

import detail from './detail';
import dingdan from './dingdan';

// data () {
//     return {
//       choose:'detail'
//     }
// }    

components:{
    detail,dingdan
}

//8.关于vue的props 子组件获取父组件的信息；

//父组件
<child parentmsg="fromfa"></child>
import child from './child';
export default{
    components:{
        child
    }
}

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

//关于vue的 $nextTick的用法

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

//关于vue路由的懒加载（按需引入）
