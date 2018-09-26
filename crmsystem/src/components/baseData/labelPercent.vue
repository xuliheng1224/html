<template>
  <div class="lable-main">
    <div class="lable-title">
      <div class="desc">
        高危标签占比情况
        <el-tooltip class="item hover-icon" effect="dark" content="不同高危标签的用户占总高危用户的比例" placement="bottom-start">
          <el-button> <img src="../../assets/image/answer.png" class="answer-icon" alt="" srcset=""></el-button>
        </el-tooltip>
      </div>
      <el-table :data="pipe.listData" stripe :header-cell-style="{color:'black',background: 'rgba(241,246,255,1)'}" style="width: 100%" class="use-table">
        <el-table-column prop="name" label="标签">
        </el-table-column>
        <el-table-column prop="value" label="人数" width="100">
        </el-table-column>
        <el-table-column prop="rate" label="占比" width="100">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style lang="less" scoped src="../../../src/assets/less/labelPercent.less"></style>
<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    pipe: state => state.baseData.data
  }),
  data () {
    return {
    }
  }
}
</script>
