<template>
  <div class="hello">
    <h1>{{ msg }}</h1>    
    <h2>{{val|add}}</h2>
    <input type="text" v-focus style="border:2px solid #000;">
    <div>{{info}}</div>
    <h3 ref="p3" class="p3">ref的测试</h3>
    <h4 ref="p4" class="p3">ref的测试</h4>
    <h1 @click="remove">{{number}}</h1>
    <v-header>
      <div >
        这是内容啊
      </div>
    </v-header>
    

      <child parentmsg="fromfa" @toParent='accept'></child>
   
      
    <button @click="choose='detail'">切换到详情页</button>
    <button @click="choose='dingdan'">切换到订单页</button>
    <component :is="choose"></component>
  </div>
</template>

<script>
import vHeader from './header';
import detail from './detail';
import dingdan from './dingdan';
import child from './child';

export default {
  name: 'HelloWorld',
  data () {
    return {
      // parentmsg:'fromfa',
      choose:'detail',
      msg: 'Welcome to Your Vue.js App',
      val: 24,
      msg:"i love you",
      number:8,
      titel:'sdsdsd'
    }

  },
  components:{
    vHeader,
    detail,
    dingdan,
    child
  },
  methods:{
    remove(){
      this.number = 0;
    },
    accept(data){
      console.log(data)
    }    
  },
  filters:{
    add(val){
      return val+5;
    }
  },
  directives:{
    focus(el){
      el.classList.add('active')
    }
  },
  computed:{
    info(){
      return this.msg.split('').reverse().join('')
    }
  },
  watch:{
    number(to,from){
      if(to === 0){
        console.log('ffdf')
      }
    }
  },
  mounted(){
   this.$refs.p3.className = "p33333"
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
