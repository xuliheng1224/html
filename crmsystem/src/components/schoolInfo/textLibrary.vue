<template>
  <div class="content">
      <div class="ment_top">
          <div class="search_input">
              <div class="input_box">
                <div class="title">课文名称</div>
                <div>
                    <el-input class="title_box" v-model.trim="input" placeholder="请输入课文名称"></el-input>
                </div>
              </div>
          </div>
          <div class="input_btn">
            <div>
              <el-button class="confirm_btn" @click="init">确认</el-button>
              <el-button class="eliminate_btn" @click="reset">清除</el-button>
            </div>
          </div>
      </div>
      <div class="search_table">
        <div class="search_add">
          <span class="btn_text" @click="exportExcel">导出列表</span>
          <i class="el-icon-circle-plus"></i>
          <span class="btn_text" @click='textadd' v-if="auth.indexOf('course_add') > -1">添加</span>
        </div>
        <el-table :data="tableData" stripe style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column prop="courseId" label="课文编号" width="400"></el-table-column>
          <el-table-column prop="courseName" label="课文名称" width="300"></el-table-column>
          <el-table-column prop="address" label="适应阶段" :formatter="formatter"></el-table-column>
          <el-table-column prop="startCount" label="已上课次数"></el-table-column>
          <el-table-column prop="address" label="创建时间" :formatter="timeFormatter"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="textdetail(scope.row.courseId)" type="text" size="small" v-if="auth.indexOf('course_detail') > -1">详情</el-button>
              <el-button type="text" size="small" @click="textedit(scope.row.courseId)" v-if="auth.indexOf('course_edit') > -1">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        style="margin-top: 20px;text-align: center;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count">
      </el-pagination>
  </div>
</template>
<style scoped src="../../../static/css/schoolInfo.css"></style>
<script>
import { tool } from '../../common/util'
import fomateDate from '../../common/fomateDate.js'
export default {
  data () {
    return {
      page: 1,
      pageSize: 10,
      count: 0,
      input: '',
      tableData: [],
      auth: []
    }
  },
  mounted () {
    this.init()
    this.auth = tool.localStorage.get('authTags')
  },
  methods: {
    formatter (row, column) {
      if (row.courseExt.gestationalType === 'ANTENATAL') {
        return `孕期${row.courseExt.weekMin} - ${row.courseExt.weekMax}周`
      } else {
        return `${row.courseExt.weekMinStr} ~ ${row.courseExt.weekMaxStr}`
      }
    },
    timeFormatter (row, column) {
      return fomateDate(row.createTime)
    },
    init () {
      this.page = 1
      this.pageConfirm()
    },
    pageConfirm () {
      this.$store.dispatch('getCourseList', {pageNo: this.page, pageSize: this.pageSize, keyword: this.input, vue: this})
    },
    reset () {
      this.input = ''
    },
    // 导出列表
    exportExcel () {
      this.$store.dispatch('exportExcel', {keyword: this.input, vue: this})
    },
    // 添加
    textadd () {
      this.$router.push({path: '/textadd'})
    },
    // 详情
    textdetail (courseId) {
      this.$router.push({path: '/textdetail', query: {courseId: courseId}})
    },
    // 编辑
    textedit (courseId) {
      this.$router.push({path: '/textedit', query: {courseId: courseId}})
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.pageConfirm()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.page = val
      this.pageConfirm()
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
