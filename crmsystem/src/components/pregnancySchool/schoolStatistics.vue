<template>
  <div class="page">
    <el-tabs type="border-card">
      <el-tab-pane label="课文统计">
        <TextStatistics></TextStatistics>
      </el-tab-pane>
      <el-tab-pane label="课程统计">
        <CurriculumStatistics></CurriculumStatistics>
      </el-tab-pane>
      <el-tab-pane label="课程用户统计">
        <UserStatistics></UserStatistics>
      </el-tab-pane>
      <el-tab-pane label="讲师统计">
        <LecturerStatistics></LecturerStatistics>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style scoped src="../../../static/css/schoolStatistics.css"></style>
<script>
import TextStatistics from './textStatistics'
import CurriculumStatistics from './curriculumStatistics'
import LecturerStatistics from './lecturerStatistics'
import UserStatistics from './userStatistics'
import { mapState } from 'vuex'
export default {
  computed: mapState({
    login: state => state.loginStore
  }),
  components: {
    TextStatistics,
    CurriculumStatistics,
    LecturerStatistics,
    UserStatistics
  },
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }]
    }
  },
  methods: {
    formatter (row, column) {
      return row.address
    }
  }
}
</script>
