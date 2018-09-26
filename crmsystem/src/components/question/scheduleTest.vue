<template>
  <div class="aloneUser">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="scheduleId" label="编号"></el-table-column>
      <el-table-column prop="courseName" label="名称"></el-table-column>
      <el-table-column prop="realName" :formatter="adaptFormatter" label="适应阶段"></el-table-column>
      <el-table-column prop="lecturerName" label="讲师"></el-table-column>
      <el-table-column prop="gestationalWeek" :formatter="timeFormatter" label="上课时间"></el-table-column>
      <el-table-column prop="testCount" label="参与人数"></el-table-column>
      <el-table-column prop="allRightCount" label="全对人数"></el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 20px;text-align: center;"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count">
    </el-pagination>
  </div>
</template>
<script>
import { tool } from '../../common/util'
export default {
  data () {
    return {
      page: 1,
      pageSize: 10,
      tableData: [],
      count: 0
    }
  },
  mounted () {
    this.scheduleTest()
  },
  methods: {
    scheduleTest () {
      this.$store.dispatch('scheduleTest', {pageNo: this.page, pageSize: this.pageSize, queId: this.$route.params.id, vue: this})
    },
    timeFormatter (row, column) {
      return `${tool.dateFormat(row.startTime)}~${tool.dateFormat(row.endTime)}`
    },
    adaptFormatter (row, column) {
      if (row.gestationalType === 'ANTENATAL') {
        return `孕期${row.weekMin}~${row.weekMax}周`
      } else {
        return `${row.weekMinStr}~${row.weekMaxStr}`
      }
    },
    handleSizeChange (val) {
      this.page = 1
      this.pageSize = val
      this.scheduleTest()
    },
    handleCurrentChange (val) {
      this.page = val
      this.scheduleTest()
    }
  }
}
</script>
<style scoped lang="less">
</style>
