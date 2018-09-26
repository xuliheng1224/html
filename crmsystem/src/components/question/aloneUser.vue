<template>
  <div class="aloneUser">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="userId" label="编号"></el-table-column>
      <el-table-column prop="realName" label="名称"></el-table-column>
      <el-table-column prop="gestationalWeek" label="孕周"></el-table-column>
      <el-table-column prop="userName" label="手机号"></el-table-column>
      <el-table-column prop="correctRate" label="正确率"></el-table-column>
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
    this.aloneUserList()
  },
  methods: {
    aloneUserList () {
      this.$store.dispatch('aloneUserList', {pageNo: this.page, pageSize: this.pageSize, queId: this.$route.params.id, vue: this})
    },
    handleSizeChange (val) {
      this.page = 1
      this.pageSize = val
      this.aloneUserList()
    },
    handleCurrentChange (val) {
      this.page = val
      this.aloneUserList()
    }
  }
}
</script>
<style scoped lang="less">
</style>
