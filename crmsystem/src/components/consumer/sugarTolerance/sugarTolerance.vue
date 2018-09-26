<template>
  <div v-if="sugar.userGlycuresisTest">
    <div class="card">
      <span>空腹血糖:</span><time>{{sugar.userGlycuresisTest.fastingV}}</time>
    </div>
    <div class="card">
      <span>餐后1小时血糖:</span><time>{{sugar.userGlycuresisTest.oneHourV}}</time>
    </div>
    <div class="card">
      <span>餐后2小时血糖:</span><time>{{sugar.userGlycuresisTest.twoHourV}}</time>
    </div>
    <div class="card">
      <span>糖化血红蛋白:</span><time>{{sugar.userGlycuresisTest.threeHourV}}</time>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['sugar']
}
</script>
<style scoped lang="less">
  .card {
    font-size:14px;
    margin:30px;
    span{
      color: #444444;
    }
    time{
      color: #777777;
      margin-left: 15px;
    }
  }
</style>
