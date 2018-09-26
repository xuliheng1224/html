<template>
  <div class="add-course-main">
    <el-dialog title="新增课程" :visible.sync="dialogVisible" width="30%" :show-close="false">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="选择课文" prop="courseId">
          <el-select v-model="ruleForm.courseId" placeholder="请选择课文">
            <el-option v-for="item in courseList" :key="item.courseId" :label="item.courseName" :value="item.courseId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上课时间" prop="addClassDate">
          <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm.addClassDate" type="date" placeholder="选择日期"></el-date-picker>
          <!-- <el-date-picker v-model="ruleForm.value4" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker> -->
        </el-form-item>
        <div class="select-time-main">
          <el-form-item label="" prop="value2">
            <el-time-picker class="select-time" value-format="HH:mm:ss" v-model="ruleForm.value2" placeholder="开始时间"></el-time-picker>
          </el-form-item>
          <div class="hg">-</div>
          <el-form-item label="" prop="value3">
            <el-time-picker prop="value3" value-format="HH:mm:ss" v-model="ruleForm.value3" placeholder="结束时间"></el-time-picker>
          </el-form-item>
        </div>
        <el-form-item label="选择讲师" prop="lecturerId">
          <el-select v-model="ruleForm.lecturerId" multiple placeholder="选择讲师">
            <el-option v-for="item in lecturerList" :key="item.lecturerId" :label="item.lecturerName" :value="item.lecturerId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上课教室" prop="input">
          <el-input class="room" v-model.trim="ruleForm.input"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="save">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import { tool } from '../../common/util.js'
import { mapState } from 'vuex'
export default {
  name: 'addCourseChild',
  computed: {
    ...mapState({
      courseList: state => state.addCourse.data.courseList,
      lecturerList: state => state.addCourse.data.lecturerList
    })
  },
  props: ['dialogVisible', 'scheduledId', 'editerObj'],
  data () {
    return {
      ruleForm: {
        courseId: '',
        lecturerId: [],
        // value4: [],
        value2: '',
        value3: '',
        addClassDate: '',
        input: ''
      },
      rules: {
        courseId: [
          { required: true, message: '请选择课文', trigger: 'blur' }
        ],
        // value4: [
        //   { required: true, message: '请选择上课时间', trigger: 'blur' }
        // ],
        lecturerId: [
          { required: true, message: '请选择讲师', trigger: 'blur' }
        ],
        input: [
          { required: true, message: '请输入上课教室', trigger: 'blur' }
        ],
        addClassDate: [
          { required: true, message: '请选择上课时间', trigger: 'blur' }
        ],
        value2: [
          { required: true, message: '请选择开始时间', trigger: 'blur' }
        ],
        value3: [
          { required: true, message: '请选择结束时间', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getSchedule(this.scheduledId)
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    cancel () {
      this.$refs['ruleForm'].resetFields()
      this.$emit('prarentShow')
    },
    getSchedule (scheduleId) {
      this.$store.dispatch('getScheduleEdit', { scheduleId: scheduleId })
    },
    save () {
      var _this = this
      _this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          _this.saveSchdule(_this.ruleForm.courseId, _this.ruleForm.lecturerId.join(','), _this.ruleForm.addClassDate + ' ' + _this.ruleForm.value2, _this.ruleForm.addClassDate + ' ' + _this.ruleForm.value3, _this.ruleForm.input, _this.editerObj.scheduleId)
        } else {
          return false
        }
      })
    },
    async saveSchdule (courseId, lecturerIds, startDateStr, endDateStr, classroomName, scheduleId) {
      var res = await this.$store.dispatch('saveShedule', { courseId: courseId, lecturerIds: lecturerIds, startDateStr: startDateStr, endDateStr: endDateStr, classroomName: classroomName, scheduleId: scheduleId })
      if (res.data.code === '0000') {
        this.cancel()
        this.$emit('getParentList')
      }
    }
  },
  watch: {
    'editerObj.courseId': function (v1) {
      this.ruleForm.courseId = v1
    },
    'editerObj.endDateStr': function (strTime) {
      if (strTime) {
        var dateArr = strTime.split(' ')
        this.ruleForm.addClassDate = dateArr[0]
        this.ruleForm.value3 = dateArr[1]
      } else {
        this.ruleForm.addClassDate = ''
        this.ruleForm.value3 = ''
      }
      // this.$set(this.ruleForm.value4, 1, strTime)
    },
    'editerObj.startDateStr': function (strTime) {
      if (strTime) {
        var dateArr = strTime.split(' ')
        this.ruleForm.addClassDate = dateArr[0]
        this.ruleForm.value2 = dateArr[1]
      } else {
        this.ruleForm.addClassDate = ''
        this.ruleForm.value2 = ''
      }
      // this.$set(this.ruleForm.value4, 0, strTime)
    },
    'editerObj.lectureId': function (strLecturId) {
      this.ruleForm.lecturerId = strLecturId === undefined ? [] : strLecturId.split(',')
    },
    'editerObj.classroomName': function (classRoom) {
      this.ruleForm.input = classRoom
    }
  }
}
</script>
<style lang="less" scoped>
.add-course-main {
  .room {
    width: 75%;
  }
  .select-time {
    margin-left: 90px;
  }
  .select-time-main {
    display: flex;
    align-items: center;
    justify-content: center;
    .hg {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: -20px;
      margin-left: 10px;
      margin-right: 10px;
    }
  }
}
</style>
