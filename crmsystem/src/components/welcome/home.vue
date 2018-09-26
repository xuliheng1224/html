<template>
  <div class="welcome">
    <div class="home-main">
      <div class="now-user comm">
        <div class="cz-center">
          <img src="../../assets/image/now.png" class="img-icon" alt="" srcset="">
          <div class="number">{{user.data.totalCount}}</div>
          <div class="text-comm">总用户数</div>
        </div>
      </div>
      <div class="week-user comm">
        <div class="cz-center">
          <img src="../../assets/image/week.png" class="img-icon" alt="" srcset="">
          <div class="number">{{user.data.weekCount}}</div>
          <div class="text-comm">本周新增户数</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    user: state => state.welcome
  }),
  data () {
    return {
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$store.dispatch('getPieData')
    }
  }
}
</script>
<style lang="less" scoped>
  .home-main {
    width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 90px;
    position: relative;
    .week-user {
      margin-left: 200px;
    }
    .comm {
      width: 415px;
      height: 364px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 29px 34px 0px rgba(126, 175, 255, 0.1);
      border-radius: 4px;
      // display: flex;
      // justify-content: center;
      // align-items: center;
      // text-align: center;
      position: relative;
      float: left;
      text-align: center;
      .cz-center {
       width: 415px;
       margin: 0 auto;
       margin-top: 70px;
      }
      .img-icon {
        width: 67px;
      }
      .number {
        font-size: 58px;
        color: rgba(68, 68, 68, 1);
      }
      .text-comm {
        font-size: 24px;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
</style>
