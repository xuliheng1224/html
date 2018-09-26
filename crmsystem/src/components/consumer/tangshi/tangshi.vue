<template>
  <div v-if="tang.tangshiTest">
    <div class="card">
      <span>检查结果:</span><time>{{tang.tangshiTest.resultV}}</time>
    </div>
    <div class="card">
      <span>21三体综合症:</span><time>{{tang.tangshiTest.syndromeToV}}</time>
    </div>
    <div class="card">
      <span>18三体综合症:</span><time>{{tang.tangshiTest.syndromeEtV}}</time>
    </div>
    <div class="card">
      <span>开放性神经管畸形（ONTD）:</span><time>{{tang.tangshiTest.openNeuV}}</time>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: ''
    }
  },
  props: ['tang']
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
