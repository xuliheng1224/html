<template>
  <div v-if="partum.postpartumHealthQue">
    <div class="card">
      <span>分娩孕周:</span><time>{{partum.postpartumHealthQue.gestationalWeekCH}}</time>
    </div>
    <div class="card">
      <span>分娩日期:</span><time>{{partum.postpartumHealthQue.gestationalDate}}</time>
    </div>
    <div class="card">
      <span>分娩方式:</span><time>{{partum.postpartumHealthQue.gestationalTypeCH}}</time>
    </div>
    <div class="card">
      <span>分娩侧切口:</span><time>{{partum.postpartumHealthQue.sideCutWoundCH}}</time>
    </div>
    <div class="card">
      <span>分娩异常:</span><time>{{partum.postpartumHealthQue.gestationalAbnormalCH}}</time>
    </div>
    <div class="card">
      <span>喂养方式:</span><time>{{partum.postpartumHealthQue.feedingModeCH}}</time>
    </div>
    <div class="card">
      <span>宝宝出生身高:</span><time>{{partum.postpartumHealthQue.babyHeight}}cm</time>
    </div>
    <div class="card">
      <span>宝宝出生体重:</span><time>{{partum.postpartumHealthQue.babyWeight}}g</time>
    </div>
    <div class="card">
      <span>宝宝异常情况:</span><time>{{partum.postpartumHealthQue.babyAbnormalCH}}</time>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['partum']
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
