<template>
<div class="content" v-if="lecturerstatistics">
  <div class="export" style="height:30px;text-align: right;"><el-button size="mini" type="primary" @click="getLecturerInfosExport">导出列表</el-button></div>
          <div class="ment_top">
            <div class="lecturer_box">
              <div>
                <div class="lecturer_text">当前讲师总人数：</div>
                <div class="number">{{lecturerstatistics.totalCount}}</div>
              </div>
            </div>
          </div>
          <div class="lecturer_table">
            <el-table
              :data="lecturerstatistics.data"
              stripe
              @sort-change="getLecturerDsc"
              style='width:100%'
              >
              <el-table-column
                prop="doctorName"
                label="姓名"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="courseendCount"
                label="已结束课程"
                sortable ='custom'
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="已结束课程占比"
                show-overflow-tooltip>
                <template slot-scope="scope">
                                <div style="width:50px;display:inline-block;">{{scope.row.endRate}}</div>
                                <div style="width:150px;display:inline-block;"><el-progress :text-inside="true" :stroke-width="18" :percentage="toNum(scope.row.endRate)"></el-progress></div>
                               </template>
              </el-table-column>
              <el-table-column
                prop="typeCount"
                label="已结束课程种类"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="startingCount"
                label="进行中课程数"
                sortable ='custom'
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="nostartCount"
                label="未开始课程数"
                sortable ='custom'
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
          </div>
          <div class="paging" >
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :page-size="lecturerstatistics.pageSize" :page-sizes="[10, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="lecturerstatistics.totalCount">
    </el-pagination></div>
        </div>
</template>
<style scoped src="../../../static/css/schoolStatistics.css"></style>
<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    lecturerstatistics: state => state.schoolStatistics.lecturerstatistics
  }),
  data () {
    return {
      page: 10
    }
  },
  mounted () {
    this.getLecturerInfo()
  },
  methods: {
    formatter (row, column) {
      return row.address
    },
    getLecturerInfo () {
      this.$store.dispatch('getLecturer', {_this: this, pageSize: this.page, pageNo: 1})
    },
    handleSizeChange (val) {
      this.page = val
      this.$store.dispatch('getLecturer', {_this: this, pageSize: val, pageNo: 1})
    },
    handleCurrentChange (val) {
      this.$store.dispatch('getLecturer', {_this: this, pageSize: this.page, pageNo: val})
    },
    getLecturerInfosExport () {
      this.$store.dispatch('getLecturerExport', {_this: this})
    },
    toNum (val) {
      var num = val
      if (num === '') {
        num = 0
      }
      return parseInt(num)
    },
    // 排序
    getLecturerDsc (obj) {
      switch (obj.prop) {
        case 'courseendCount':
          var order
          if (obj.order === 'ascending') {
            order = 'courseend_count asc'
          } else {
            order = 'courseend_count desc'
          }
          this.$store.dispatch('getLecturer', {_this: this, order: order, pageSize: this.page, pageNo: 1})
          break
        case 'startingCount':
          if (obj.order === 'ascending') {
            order = 'starting_count asc'
          } else {
            order = 'starting_count desc'
          }
          this.$store.dispatch('getLecturer', {_this: this, order: order, pageSize: this.page, pageNo: 1})
          break
        case 'nostartCount':
          if (obj.order === 'ascending') {
            order = 'nostart_count asc'
          } else {
            order = 'nostart_count desc'
          }
          this.$store.dispatch('getLecturer', {_this: this, order: order, pageSize: this.page, pageNo: 1})
          break
      }
    }
  }
}
</script>
