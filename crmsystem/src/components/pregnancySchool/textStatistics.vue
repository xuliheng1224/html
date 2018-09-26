<template>
<div class="content" v-if="textstatistics.courseDetailCount">
  <div class="export" style="height:30px;text-align: right;"><el-button size="mini" type="primary" @click="getClassDataExport">导出列表</el-button></div>
          <div class="ment_top">
            <div class="ment_box">
              <div>
                <span class="number">{{textstatistics.courseCountTotal.courseNum}}</span>
                <br />
                <span class="explain">课程(节)</span>
              </div>
            </div>
            <div class="ment_box box_Middle">
              <div>
                <span class="number">{{textstatistics.courseCountTotal.courseBeganNum}}</span>
                <br />
                <span class="explain">已开课(次节)</span>
              </div>
            </div>
            <div class="ment_box">
              <div>
                <span class="number">{{textstatistics.courseCountTotal.lastCourseNum}}</span>
                <br />
                <span class="explain">最近课程表(次节)</span>
              </div>
            </div>
          </div>
          <div class="ment_table">
            <el-table :data='textstatistics.courseDetailCount'
                      stripe
                      @sort-change="getTextDsc"
                      style="width: 100%"
                      :default-sort="{prop: 'date', order: 'descending'}">
              <el-table-column prop="courseName"
                               label="课程名称"
                               show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="courseNum"  label="开课数"  sortable ='custom'  show-overflow-tooltip >
                               <template slot-scope="scope">
                                <div style="width:50px;display:inline-block;">{{scope.row.courseNum}}</div>
                                <div style="width:150px;display:inline-block;"><el-progress :text-inside="true" :stroke-width="18" :percentage="toNum(scope.row.currency)"></el-progress></div>
                               </template>
              </el-table-column>
              <el-table-column prop="signNum" label="签到人数" sortable ='custom' show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="orderNum" label="预约次数" sortable ='custom' show-overflow-tooltip>
              </el-table-column>
              <!-- <el-table-column prop="signRate" label="到课率" sortable ='custom' show-overflow-tooltip :formatter = "formatter" >
              </el-table-column> -->
            </el-table>
          </div>
        </div>
</template>
<style scoped src="../../../static/css/schoolStatistics.css"></style>
<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    textstatistics: state => state.schoolStatistics.textstatistics
  }),
  data () {
    return {
    }
  },
  mounted () {
    this.getcourse()
  },
  methods: {
    getcourse () {
      this.$store.dispatch('getClassData', {_this: this})
    },
    formatter (row, column) {
      var str = Number(row.signRate).toFixed(0)
      str += '%'
      return str
    },
    getClassDataExport () {
      this.$store.dispatch('getClassDataExport', {_this: this})
    },
    toNum (val) {
      var num = val
      if (num === '') {
        num = 0
      }
      return parseInt(num)
    },
    getTextDsc (obj) {
      switch (obj.prop) {
        case 'courseNum':
          var order
          if (obj.order === 'ascending') {
            order = 'course_num asc'
          } else {
            order = 'course_num desc'
          }
          this.$store.dispatch('getClassData', {_this: this, order: order, pageSize: this.page, pageNo: 1})
          break
        case 'signNum':
          if (obj.order === 'ascending') {
            order = 'sign_num asc'
          } else {
            order = 'sign_num desc'
          }
          this.$store.dispatch('getClassData', {_this: this, order: order, pageSize: this.page, pageNo: 1})
          break
        case 'orderNum':
          if (obj.order === 'ascending') {
            order = 'order_num asc'
          } else {
            order = 'order_num desc'
          }
          this.$store.dispatch('getClassData', {_this: this, order: order, pageSize: this.page, pageNo: 1})
          break
        case 'signRate':
          if (obj.order === 'ascending') {
            order = 'sign_rate asc'
          } else {
            order = 'sign_rate desc'
          }
          this.$store.dispatch('getClassData', {_this: this, order: order, pageSize: this.page, pageNo: 1})
          break
      }
    }
  }
}
</script>
