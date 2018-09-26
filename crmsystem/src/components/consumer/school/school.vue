<template>
  <div v-if="school.courseInfoList">
    <el-table
      :data="school.courseInfoList"
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        label="课程类型"
        width="180">
        <template slot-scope="scope">
          <span>{{scope.row.type == 1 ? '线上' : '线下' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="courseName"
        label="课程名称">
      </el-table-column>
      <el-table-column
        prop="startTimeCH"
        label="上课时间">
      </el-table-column>
      <el-table-column
        prop="signinTimeCH"
        label="签到时间">
      </el-table-column>
      <el-table-column
        label="测试结果">
        <template slot-scope="scope">
          <span>{{scope.row.rightCount}}/{{scope.row.queCount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="chakan(scope.row.userId, scope.row.queId, scope.row.scheduleId, scope.row.times)" :disabled='scope.row.isTest !== "Y" || scope.row.times === 0'>{{scope.row.isTest === 'N' || scope.row.times === 0 ? '--' : '查看测试卷'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <PeopleAnswer :dialogVisible="isShow" :times="times" v-on:prarentShow="showClick"></PeopleAnswer>
  </div>
</template>

<script>
// import { fetch } from '../../../common/fetch'
import PeopleAnswer from '../../course/peopleAnswer'
export default {
  components: {
    PeopleAnswer
  },
  data () {
    return {
      page: 1,
      pageSize: 10,
      isShow: false,
      times: ''
    }
  },
  methods: {
    chakan (userId, queId, scheduleId, times) {
      this.times = times.toString()
      this.isShow = true
      var options = {
        queId: queId,
        userId: userId,
        scheduleId: scheduleId,
        times: this.times
      }
      this.$store.dispatch('getUseTestDetail', options)
    },
    showClick () {
      this.isShow = !this.isShow
    }
  },
  props: ['school'],
  mounted () {
  }
}
</script>

<style scoped>

</style>
