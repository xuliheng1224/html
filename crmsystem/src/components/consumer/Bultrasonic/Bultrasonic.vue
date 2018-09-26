<template>
  <div v-if="bc.jixingTest">
    <div class="card">
      <span>检查结果:</span><time>{{bc.jixingTest.resultV}}</time>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['bc']
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
