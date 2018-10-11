<template>
    <div>
        <h2> 我的个人信息{{info}}</h2>
           <h3>{{size}}  <span @click='modify'>修改</span> </h3>
        <input type="text" style="border:1px solid black;outline:none;" v-model="msg">
        <input type="button" value="点击添加" @click='add'>
        <ul style="list-style:none;">
            <li v-for="(item,index) in list" :key="index">{{item.text}}</li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      info: "",
      msg: ""
    };
  },
  methods: {
    add() {
      if (this.msg) {
        this.$store.dispatch("add", this.msg);
      }
    },
    modify() {
      this.$store.dispatch("modify", "small");
    }
  },
  watch: {
    list(to, from) {
      console.log(to);
    }
  },
  mounted() {
    this.info = this.$route.params.id;
    console.log(this.info)
    // this.$nextTick(()=>{
    //    console.log(this.msg=this.$store.getters.getInfo)
    // })
    // console.log(this.getInfo.name)
    // console.log(this.getInfo.age)
    // console.log(this.list)
  },
  computed: {
    ...mapGetters(["getInfo", "list", "size"])
  }
};
</script>

<style scoped>
</style>