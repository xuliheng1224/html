<template>
  <div class="course-main">
    <div class="title">
      课程详情
    </div>
    <div class="course-cont" v-if="courseData.courseScheduleDto">
      <div class="course-cont-left">
        <div class="comm">
          <span class="course-mc">课程名称:</span>
          <span class="course-mc-text">{{courseData.courseScheduleDto.courseName}}</span>
        </div>
        <div class="comm">
          <span class="course-mc">上课讲师:</span>
          <span class="course-mc-text">{{courseData.courseScheduleDto.lecturerName}}</span>
        </div>
        <div class="comm">
          <span class="course-mc">预约人数:</span>
          <span class="course-mc-text">{{courseData.remindCount}}</span>
        </div>
        <div class="comm">
          <span class="course-mc">随堂测试:</span>
          <span class="course-mc-text">{{courseData.queAnswerUserCount}}</span>
        </div>
      </div>
      <div class="course-cont-left">
        <div class="comm">
          <span class="course-mc">适应孕期:</span>
          <span class="course-mc-text">孕期{{courseData.courseScheduleDto.weekMin}} ~ {{courseData.courseScheduleDto.weekMax}}</span>
        </div>
        <div class="comm">
          <span class="course-mc">上课地点:</span>
          <span class="course-mc-text">{{courseData.courseScheduleDto.classroomName}}</span>
        </div>
        <div class="comm">
          <span class="course-mc">签到人数:</span>
          <span class="course-mc-text">{{courseData.signinCount}}</span>
        </div>
        <div class="comm">
          <span class="course-mc">测试率:</span>
          <span class="course-mc-text">{{courseData.queAnswerRate}}%</span>
        </div>
      </div>
      <div class="course-cont-left">
        <div class="comm">
          <span class="course-mc">上课时间:</span>
          <span class="course-mc-text">{{courseData.courseScheduleDto.startDateStr}} ~ {{courseData.courseScheduleDto.endDateStr}}</span>
        </div>
        <div class="comm">
          <span class="course-mc">到课率:</span>
          <span class="course-mc-text">{{courseData.signinRate}}%</span>
        </div>
      </div>
    </div>
    <div class="nei-cont">
      <el-tabs type="border-card" @tab-click="tabClick">
        <el-tab-pane label="预约人列表">
          <el-table :data="remindData.list" border style="width: 100%" :header-cell-style="{color:'black',background: 'rgba(241,246,255,1)', 'text-align': 'center'}">
            <el-table-column prop="userId" label="编号" width="180">
            </el-table-column>
            <el-table-column prop="realName" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="gestationalWeek" label="孕周">
            </el-table-column>
            <el-table-column prop="userName" label="手机号" width="180">
            </el-table-column>
            <el-table-column prop="createTime" label="签到时间" width="180">
              <template slot-scope="scope">
                <span>{{formartTime(scope.row.createTime)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="registerSource" label="来源渠道">
            </el-table-column>
          </el-table>
          <div class="page-main" v-if="remindData.totalCount > 0">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 50, 100, 150]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="remindData.totalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="签到人列表">
          <el-table :data="signData.list" border style="width: 100%" :header-cell-style="{color:'black',background: 'rgba(241,246,255,1)', 'text-align': 'center'}">
            <el-table-column prop="userId" label="编号" width="180">
            </el-table-column>
            <el-table-column prop="realName" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="gestationalWeek" label="孕周">
            </el-table-column>
            <el-table-column prop="userName" label="手机号" width="180">
            </el-table-column>
            <el-table-column label="签到时间" width="180">
              <template slot-scope="scope">
                <span>{{formartTime(scope.row.createTime)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="registerSource" label="来源渠道">
            </el-table-column>
          </el-table>
          <div class="page-main" v-if="signData.totalCount > 0">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 50, 100, 150]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="signData.totalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="测试人列表" v-if="hasQueId">
          <el-table :data="testData.list" border style="width: 100%" :header-cell-style="{color:'black',background: 'rgba(241,246,255,1)', 'text-align': 'center'}">
            <el-table-column prop="userId" label="编号" width="180">
            </el-table-column>
            <el-table-column prop="realName" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="gestationalWeek" label="孕周">
            </el-table-column>
            <el-table-column prop="userName" label="手机号" width="180">
            </el-table-column>
            <el-table-column prop="correctRate" label="正确率" width="180">
            </el-table-column>
            <el-table-column prop="registerSource" label="来源渠道" width="180">
            </el-table-column>
            <el-table-column prop="times" label="第几次测试" width="180">
            </el-table-column>
            <el-table-column prop="queId" label="查看">
              <template slot-scope="scope">
                <span class="look-comm" @click="look(scope.row)">查看</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="page-main" v-if="testData.totalCount > 0">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 50, 100, 150]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="testData.totalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="问卷详情" v-if="hasQueId">
          <div class="answer" v-if="questionData.paper">
            <div class="answer-list" v-for="(item, index) in questionData.paper.topics" v-bind:key="item.queId">
              <div class="biao-ti">
                Q{{index+1}}、
                <span class="tip" v-if="item.type === 'SINGLE'">(单选)</span>
                <span class="tip" v-if="item.type === 'MULTI'">(多选)</span>
                <span class="tip" v-if="item.type === 'JUDGE'">(判断)</span>
                <span class="tip" v-if="item.type === 'QA'">(简答)</span>
                {{item.topic}}
              </div>
              <div class="xuanzhe">
                <div v-for="(it, childIndex) in item.options" v-bind:key="it.optionId">
                  <div v-bind:class="['xuanx', {'ok': it.isAnswer === 'Y'}]">
                    <span v-if="childIndex === 0">A</span> <span v-if="childIndex === 1">B</span> <span v-if="childIndex === 2">C</span>、{{it.queOption}}
                    <span v-if="it.isAnswer === 'Y'"><span class="ok-desc">正确</span> ✔</span>
                    <span style="color: #FF716C" v-if="questionData.paper.type === 'SURVEY'">({{it.score}}分)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <PeopleAnswer :dialogVisible="isShow" :times="times" v-on:prarentShow="showClick"></PeopleAnswer>
  </div>
</template>
<style lang="less" scoped src="../../../src/assets/less/course.less"></style>
<script>
import PeopleAnswer from './peopleAnswer'
import { tool } from '../../common/util'
import { mapState } from 'vuex'
export default {
  computed: mapState({
    remindData: state => state.remindDataStore.remindListData,
    signData: state => state.remindDataStore.signData,
    testData: state => state.remindDataStore.testList,
    courseData: state => state.remindDataStore.courseDetail,
    useTestDetailData: state => state.remindDataStore.useTestDetail,
    questionData: state => state.remindDataStore.questionDetail
  }),
  components: {
    PeopleAnswer
  },
  data () {
    return {
      currentPage4: 1,
      isShow: false,
      pageNo: '1',
      pageSize: 10,
      hasQueId: false,
      times: '',
      tabNumber: '0'
    }
  },
  mounted () {
    this.hasQueId = this.$route.query.queId !== ''
    this.getRemindData()
    this.getSignData()
    this.getTestListData()
    this.getCourseDetail()
    this.getQuestionstList(this.$route.query.queId)
  },
  methods: {
    tabClick (type) {
      this.pageNo = 1
      this.tabNumber = type.index
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      var _this = this
      _this.pageSize = val
      switch (_this.tabNumber) {
        case '0':
          _this.getRemindData()
          break
        case '1':
          _this.getSignData()
          break
        case '2':
          _this.getTestListData()
          break
        case '3':
          break
        default:
      }
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      var _this = this
      _this.pageNo = val
      switch (_this.tabNumber) {
        case '0':
          _this.getRemindData()
          break
        case '1':
          _this.getSignData()
          break
        case '2':
          _this.getTestListData()
          break
        case '3':
          break
        default:
      }
    },
    formartTime (strTime) {
      return tool.dateFormat(new Date(strTime))
    },
    look (use) {
      this.times = use.times
      this.getUseTestDetailData({queId: use.queId, userId: use.userId, scheduleId: this.$route.query.scheduleId, times: use.times})
      this.isShow = true
    },
    showClick () {
      this.isShow = false
    },
    getRemindData () {
      this.$store.dispatch('getRemindList', {scheduleId: this.$route.query.scheduleId, pageNo: this.pageNo, pageSize: this.pageSize})
    },
    getSignData () {
      this.$store.dispatch('getSignList', {scheduleId: this.$route.query.scheduleId, pageNo: this.pageNo, pageSize: this.pageSize})
    },
    getTestListData () {
      this.$store.dispatch('getTestList', {queId: this.$route.query.queId, scheduleId: this.$route.query.scheduleId, pageNo: this.pageNo, pageSize: this.pageSize})
    },
    getCourseDetail () {
      this.$store.dispatch('getCourseDetail', {scheduleId: this.$route.query.scheduleId})
    },
    getUseTestDetailData (options) {
      this.$store.dispatch('getUseTestDetail', options)
    },
    getQuestionstList (queId) {
      this.$store.dispatch('getQuestionDetail', {queId: queId})
    }
  }
}
</script>
