<template>
<div class="content" v-if="curriculumstatistics.pageResult">
  <div class="export" style="height:30px;text-align: right;"><el-date-picker v-model="ytimes" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
  <el-button type="primary" @click="getclass" style="margin-right:20px">筛选</el-button><el-button size="mini" type="primary" @click="getclassExport">导出列表</el-button></div>
          <div class="ment_top">
            <div class="curriculum_box">
              <div>
                <span class="number" style="display: block;">{{curriculumstatistics.scheduleDetail.courseBeganNum}}</span>
                <span class="explain">开课(节)</span>
              </div>
            </div>
            <div class="curriculum_box box_Middle">
              <div>
                <span class="number" style="display: block;">{{curriculumstatistics.scheduleDetail.orderNum}}</span>
                <span class="explain">预约(人数)</span>
              </div>
            </div>
            <div class="curriculum_box box_right">
              <div>
                <span class="number" style="display: block;">{{curriculumstatistics.scheduleDetail.signNum}}</span>
                <span class="explain">签到(人次)</span>
              </div>
            </div>
            <div class="curriculum_box">
              <div>
                <span class="number">{{curriculumstatistics.scheduleDetail.testNum}}</span>
                <br />
                <span class="explain">测试(人次)</span>
              </div>
            </div>
          </div>
          <div class="ment_table">
            <el-table :data="curriculumstatistics.pageResult.data" stripe @sort-change="getCurDsc" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
              <el-table-column prop="courseName" label="课程名称" width="400">
              </el-table-column>
              <el-table-column prop="orderNum" label="预约" sortable width="300">
              </el-table-column>
              <el-table-column prop="signNum" label="签到" sortable show-overflow-tooltip>
              </el-table-column>
              <!-- <el-table-column prop="signRate" label="到课率" sortable show-overflow-tooltip>
              </el-table-column> -->
              <el-table-column prop="testNum" label="测试" sortable show-overflow-tooltip>
              </el-table-column>
            </el-table>
            <div class="paging" >
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :page-size="curriculumstatistics.pageResult.pageSize" :page-sizes="[10, 50, 100]" layout=" total, sizes, prev, pager, next, jumper" :total="curriculumstatistics.pageResult.totalCount">
    </el-pagination></div>
          </div>
        </div>
</template>
<style scoped src="../../../static/css/schoolStatistics.css"></style>
<script>
import { mapState } from 'vuex'
import { tool } from '../../common/util'
export default {
  computed: mapState({
    curriculumstatistics: state => state.schoolStatistics.curriculumstatistics
  }),
  data () {
    return {
      ytimes: null,
      page: 10,
      order: null
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.getclass()
    })
  },
  methods: {
    // 请求列表
    getclass () {
      this.$store.dispatch('getRoomData', {_this: this, beganDate: this.ytimes !== null ? tool.dateFormat(this.ytimes[0]) : '', endDate: this.ytimes !== null ? tool.dateFormat(this.ytimes[1]) : '', pageSize: this.page, pageNo: 1})
    },
    // 分页
    handleCurrentChange (val) {
      this.$store.dispatch('getRoomData', {_this: this, beganDate: this.ytimes !== null ? tool.dateFormat(this.ytimes[0]) : '', endDate: this.ytimes !== null ? tool.dateFormat(this.ytimes[1]) : '', order: this.order, pageSize: this.page, pageNo: val})
    },
    handleSizeChange (val) {
      this.page = val
      this.$store.dispatch('getRoomData', {_this: this, pageSize: val, pageNo: 1})
    },
    // 导出列表
    getclassExport () {
      this.$store.dispatch('getRoomDataExport', {_this: this})
    },
    // 排序
    getCurDsc (obj) {
      switch (obj.prop) {
        case 'orderNum':
          if (obj.order === 'ascending') {
            this.order = 'sd.order_num asc'
          } else {
            this.order = 'sd.order_num desc'
          }
          this.$store.dispatch('getRoomData', {_this: this, beganDate: this.ytimes !== null ? tool.dateFormat(this.ytimes[0]) : '', endDate: this.ytimes !== null ? tool.dateFormat(this.ytimes[1]) : '', order: this.order, pageSize: this.page, pageNo: 1})
          break
        case 'signNum':
          if (obj.order === 'ascending') {
            this.order = 'sd.sign_num asc'
          } else {
            this.order = 'sd.sign_num desc'
          }
          this.$store.dispatch('getRoomData', {_this: this, beganDate: this.ytimes !== null ? tool.dateFormat(this.ytimes[0]) : '', endDate: this.ytimes !== null ? tool.dateFormat(this.ytimes[1]) : '', order: this.order, pageSize: this.page, pageNo: 1})
          break
        case 'signRate':
          if (obj.order === 'ascending') {
            this.order = 'signRate asc'
          } else {
            this.order = 'signRate desc'
          }
          this.$store.dispatch('getRoomData', {_this: this, beganDate: this.ytimes !== null ? tool.dateFormat(this.ytimes[0]) : '', endDate: this.ytimes !== null ? tool.dateFormat(this.ytimes[1]) : '', order: this.order, pageSize: this.page, pageNo: 1})
          break
        case 'testNum':
          if (obj.order === 'ascending') {
            this.order = 'sd.test_num asc'
          } else {
            this.order = 'sd.test_num desc'
          }
          this.$store.dispatch('getRoomData', {_this: this, beganDate: this.ytimes !== null ? tool.dateFormat(this.ytimes[0]) : '', endDate: this.ytimes !== null ? tool.dateFormat(this.ytimes[1]) : '', order: this.order, pageSize: this.page, pageNo: 1})
          break
      }
    }
  }
}
</script>
