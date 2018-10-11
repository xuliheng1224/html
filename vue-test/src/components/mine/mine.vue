<template>
    <div>
        我的{{msg}}

        <input type="button" value="点击个人信息" @click='information'>

        <v-touch v-on:swipeleft='left'>左划</v-touch>
        <v-touch v-on:swiperight='right'>右划</v-touch>
    </div>
</template>

<script>
export default {
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    left() {
      console.log("left");
    },
    right() {
      console.log("right");
    },
    information() {
      this.$router.push({
        path: "/mine/information/information",
        // params: {
        //   id: "information"
        // }
      });
    }
  },
  mounted() {
    var b = new Base64();
    this.msg = b.decode(this.$route.query.id);
    var obj = {
      a: "aaa",
      b: "bbb"
    };
    this.$http
      .get("static/data.json", { params: obj })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
</style>