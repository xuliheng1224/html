<template>
  <div class="hello">
    <input type="button" value="进去mine" @click="mine">
    <ul>
      <li v-for="(item,index) in list" :key="index" @click="up(index)">{{item}} 上移</li>
    </ul>
    <input type="button" value="点击增加list" @click="push">
    <h2>{{val|add}}</h2>
    <input type="text" v-focus style="border:2px solid #000;">
    <div>{{info}}</div>
    <h3 ref="p3" class="p3">ref的测试</h3>
    <h4 ref="p4" class="p3">ref的测试</h4>
    <h1 @click="remove">{{number}}</h1>
    <v-header>
      <div @click="sao">这是内容啊</div>
    </v-header>
    <child parentmsg="fromfa" @toParent="accept"></child>
    <button @click="choose='detail'">切换到详情页</button>
    <button @click="choose='dingdan'">切换到订单页</button>
    <component :is="choose"></component>
  </div>
</template>

<script>
import vHeader from "./header";
import detail from "./detail";
import dingdan from "./dingdan";
import child from "./child";
import Vue from "vue";
export default {
  name: "HelloWorld",
  data() {
    return {
      // parentmsg:'fromfa',
      choose: "detail",
      msg: "Welcome to Your Vue.js App",
      val: 24,
      number: 8,
      titel: "sdsdsd",
      list: [1, 2, 3, 4, 5, 6]
    };
  },
  components: {
    vHeader,
    detail,
    dingdan,
    child
  },
  methods: {
    up(index) {
      console.log(index);

      if (index === 0) {
        this.list.push(this.list[0]);
        this.list.splice(0, 1);
        return;
      }
      this.list.splice(index + 1, 0, this.list[index - 1]);
      this.list.splice(index - 1, 1);
    },
    sao() {
      if (window.cordova && window.cordova.plugins.barcodeScanner) {
        window.cordova.plugins.barcodeScanner.scan(
          result => {
            if (result && result.text) {
              alert(result.text);
            }
          },
          err => {
            console.log(err);
          },
          {
            prompt: "", // 提示文字
            resultDisplayDuration: 0 // 扫描成功文字停留时间
          }
        );
      }
    },
    mine() {
      var b = new Base64();
      var id = b.encode("mine");
      console.log(id);
      this.$router.push({
        path: "/mine",
        query: {
          id: id
        }
      });
    },
    push() {
      // this.list.push(this.list.length + 1);
      // Vue.nextTick(function() {
      //   alert("数据已经更新");
      // });
      // this.$nextTick(function() {
      //   alert("v-for渲染已经完成");
      // });
      let comment = [{ path: "../detail.vue" }];
      this.$router.options.routes.push({
        path: "/mine/detail",
        name: "/mine/detail",
        component: r =>
          require.ensure(
            [],
            () => r(require("../components/mine/information")),
            "mine"
          )
      });
      this.$router.addRoutes(this.$router.options.routes);
      this.$router.push({
        path: "/mine/detail",
        query: {
          id: 2
        }
      });
    },
    // sds d
    remove() {
      this.number = 0;
    },
    accept(data) {
      console.log(data);
    }
  },
  filters: {
    add(val) {
      return val + 5;
    }
  },
  directives: {
    focus(el) {
      el.classList.add("active");
    }
  },
  computed: {
    info() {
      return this.msg
        .split("")
        .reverse()
        .join("");
    }
  },
  watch: {
    number(to, from) {
      if (to === 0) {
        console.log("ffdf");
      }
    }
  },
  created() {
    console.log(this.$router.options.routes);

    let root = process.env;
  },
  mounted() {
    this.$refs.p3.className = "p33333";
    console.log(this);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
