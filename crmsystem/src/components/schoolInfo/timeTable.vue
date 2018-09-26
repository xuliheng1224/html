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
                <div class="input_box">
                    <div class="title">讲师名称</div>
                    <div>
                        <el-select class="title_box" v-model="teacherValue" placeholder="请选择讲师名称">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="input_box">
                    <div class="title">上课时间</div>
                    <div>
                        <div class="block">
                            <el-date-picker v-model="time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                        </div>
                    </div>
                </div>
                <div class="input_box">
                    <div class="title">适应孕周</div>
                    <div>
                        <el-select class="title_box" v-model="week" placeholder="请选择适应孕周">
                          <el-option label="1" value="1"></el-option>
                          <el-option label="2" value="2"></el-option>
                          <el-option label="3" value="3"></el-option>
                          <el-option label="4" value="4"></el-option>
                          <el-option label="5" value="5"></el-option>
                          <el-option label="6" value="6"></el-option>
                          <el-option label="7" value="7"></el-option>
                          <el-option label="8" value="8"></el-option>
                          <el-option label="9" value="9"></el-option>
                          <el-option label="10" value="10"></el-option>
                          <el-option label="11" value="11"></el-option>
                          <el-option label="12" value="12"></el-option>
                          <el-option label="13" value="13"></el-option>
                          <el-option label="14" value="14"></el-option>
                          <el-option label="15" value="15"></el-option>
                          <el-option label="16" value="16"></el-option>
                          <el-option label="17" value="17"></el-option>
                          <el-option label="18" value="18"></el-option>
                          <el-option label="19" value="19"></el-option>
                          <el-option label="20" value="20"></el-option>
                          <el-option label="21" value="21"></el-option>
                          <el-option label="22" value="22"></el-option>
                          <el-option label="23" value="23"></el-option>
                          <el-option label="24" value="24"></el-option>
                          <el-option label="25" value="25"></el-option>
                          <el-option label="26" value="26"></el-option>
                          <el-option label="27" value="27"></el-option>
                          <el-option label="28" value="28"></el-option>
                          <el-option label="29" value="29"></el-option>
                          <el-option label="30" value="30"></el-option>
                          <el-option label="31" value="31"></el-option>
                          <el-option label="32" value="32"></el-option>
                          <el-option label="33" value="33"></el-option>
                          <el-option label="34" value="34"></el-option>
                          <el-option label="35" value="35"></el-option>
                          <el-option label="36" value="36"></el-option>
                          <el-option label="37" value="37"></el-option>
                          <el-option label="38" value="38"></el-option>
                          <el-option label="39" value="39"></el-option>
                          <el-option label="40" value="40"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="input_box">
                    <div class="title">课程状态</div>
                    <div>
                        <el-select class="title_box" v-model="stateValue" placeholder="请选择课程状态">
                            <el-option v-for="item in stateOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="input_btn">
                <div>
                    <el-button class="confirm_btn" @click="confirm">确认</el-button>
                    <el-button class="eliminate_btn" @click="reset">清除</el-button>
                </div>
            </div>
        </div>
        <div class="search_table">
            <div class="search_add">
                <span class="btn_text" @click="exportExcel">导出列表</span>
                <span v-if="authTagsArr.indexOf('schedule_add') > -1">
                  <i class="el-icon-circle-plus"></i>
                  <span class="btn_text" @click="addClick">添加</span>
                </span>
            </div>
            <el-table :data="tableData" stripe style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                <el-table-column prop="scheduleId" label="编号" width="180"></el-table-column>
                <el-table-column prop="courseName" label="名称" width="200"></el-table-column>
                <el-table-column prop="address" label="适应阶段" width="180" :formatter="formatter"></el-table-column>
                <el-table-column prop="lecturerName" label="讲师" width="150"></el-table-column>
                <el-table-column  label="上课时间" width="330" >
                  <template slot-scope="scope">
                      <div>{{sTimeFormatter(scope.row.startTime)}}~{{sTimeFormatter(scope.row.endTime)}}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="classroomName" width="130" label="上课地点"></el-table-column>
                <el-table-column prop="category" label="课程状态" width="80"></el-table-column>
                <el-table-column prop="updateUid" label="最后操作人" width="100"></el-table-column>
                <el-table-column prop="updateTime" width="160" label="最后操作时间" :formatter="uTimeFormatter"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button v-if="authTagsArr.indexOf('schedule_detail') > -1" @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                        <el-button v-if="authTagsArr.indexOf('schedule_edit') > -1" type="text" size="small" @click="addClick(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination
            style="margin-top: 20px;text-align: center"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 50, 100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="count">
        </el-pagination>
        <div>
          <AddCourse ref="addCourseChild" :dialogVisible='isShowModal' :scheduledId='scheduledId' :editerObj="editerObj" v-on:prarentShow="addClick" v-on:getParentList="init"></AddCourse>
        </div>
    </div>
</template>
<style scoped src="../../../static/css/schoolInfo.css"></style>
<script>
import { tool } from '../../common/util'
import fomateDate from '../../common/fomateDate.js'
import AddCourse from './addCourse'
export default {
  components: {
    AddCourse
  },
  data () {
    return {
      page: 1,
      pageSize: 10,
      count: 0,
      week: '',
      teacherValue: '',
      stateValue: '',
      stateOpt: [{value: '1', label: '未开始'}, {value: '2', label: '进行中'}, {value: '3', label: '已结束'}],
      input: '',
      time: '',
      options: [],
      tableData: [],
      isTrue: false,
      isShowModal: false,
      scheduledId: '',
      editerObj: {},
      authTagsArr: []
    }
  },
  mounted () {
    this.authTagsArr = tool.localStorage.get('authTags')
    this.getTeacherList()
  },
  methods: {
    getTeacherList () {
      this.$store.dispatch('getTeacherList', {vue: this})
    },
    init () {
      this.$store.dispatch('getScheduleList', {pageNo: this.page, pageSize: this.pageSize, vue: this})
    },
    confirm () {
      this.page = 1
      this.isTrue = true
      this.$store.dispatch('getScheduleList', {pageNo: 1, pageSize: this.pageSize, courseName: this.input, lectureId: this.teacherValue, category: this.stateValue, startDateStr: this.time[0] ? tool.dateFormat(this.time[0]) : '', endDateStr: this.time[0] ? tool.dateFormat(this.time[1]) : '', week: this.week, vue: this})
    },
    pageConfirm () {
      this.$store.dispatch('getScheduleList', {pageNo: this.page, pageSize: this.pageSize, courseName: this.input, lectureId: this.teacherValue, category: this.stateValue, startDateStr: this.time[0] ? tool.dateFormat(this.time[0]) : '', endDateStr: this.time[0] ? tool.dateFormat(this.time[1]) : '', week: this.week, vue: this})
    },
    exportExcel () {
      if (this.input === '' && this.time === '' && this.week === '' && this.teacherValue === '' && this.stateValue === '') {
        this.$store.dispatch('exportScheduleList', {vue: this})
      } else {
        this.$store.dispatch('exportScheduleList', {startDateStr: this.time[0] ? tool.dateFormat(this.time[0]) : '', endDateStr: this.time[0] ? tool.dateFormat(this.time[1]) : '', week: this.week, category: this.stateValue, courseName: this.input, lectureId: this.teacherValue, vue: this})
      }
    },
    formatter (row, column) {
      if (row.gestationalType === 'ANTENATAL') {
        return `孕期${row.weekMin} - ${row.weekMax}周`
      } else {
        return `${row.weekMinStr} ~ ${row.weekMaxStr}`
      }
    },
    sTimeFormatter (time) {
      return fomateDate(time)
    },
    uTimeFormatter (row, column) {
      return fomateDate(row.updateTime)
    },
    reset () {
      this.input = ''
      this.time = ''
      this.week = ''
      this.teacherValue = ''
      this.stateValue = ''
    },
    handleSizeChange (val) {
      this.pageSize = val
      if (this.isTrue) {
        this.pageConfirm()
      } else {
        this.init()
      }
    },
    handleCurrentChange (val) {
      this.page = val
      if (this.isTrue) {
        this.pageConfirm()
      } else {
        this.init()
      }
    },
    handleClick (row) {
      console.log(row)
      this.$router.push({path: '/course?scheduleId=' + row.scheduleId + '&queId=' + row.queId})
    },
    addClick (dt) {
      console.log(dt)
      if (dt && dt.scheduleId) {
        this.scheduledId = dt.scheduleId
        this.editerObj = dt
        // this.$refs.addCourseChild.getSchedule(this.scheduledId)
      } else {
        this.scheduledId = ''
        this.editerObj = {}
      }
      this.isShowModal = !this.isShowModal
    }
  }
}
</script>
