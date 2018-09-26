<template>
  <div class="pa-mian">
    <el-dialog :visible.sync="dialogVisible" width="30%" :show-close="false" :close-on-click-modal="false">
      <div class="use-info" v-if="useDetail.courseScheduleDto">
        <div class="dia-cont">
          <div class="left-comm">适应孕周:</div>
          <div class="right-comm">孕期 {{useDetail.courseScheduleDto.weekMin}} ~ {{useDetail.courseScheduleDto.weekMax}}</div>
        </div>
        <div class="dia-cont">
          <div class="left-comm">上课时间:</div>
          <div class="right-comm">{{formateDate(useDetail.queUserDto.startTime)}} ~ {{formateDate(useDetail.queUserDto.endTime)}}</div>
        </div>
        <div class="dia-cont">
          <div class="left-comm">上课讲师:</div>
          <div class="right-comm">{{useDetail.courseScheduleDto.lecturerName}}</div>
        </div>
        <div class="dia-cont">
          <div class="left-comm">测试人姓名:</div>
          <div class="right-comm">{{useDetail.queUserDto.realName}}</div>
        </div>
        <div class="dia-cont">
          <div class="left-comm">孕周:</div>
          <div class="right-comm">{{useDetail.queUserDto.gestationalWeek}}</div>
        </div>
        <div class="dia-cont">
          <div class="left-comm">手机号:</div>
          <div class="right-comm">{{useDetail.queUserDto.userName}}</div>
        </div>
      </div>
      <div class="timu-main">
        <div class="timu-title">
          测试题目
          <div class="sel-cis">
            第
            <el-select class="select-xx" v-model="selObj.value" @change="selectNum">
              <el-option v-for="item in selObj.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            次
          </div>
        </div>
        <div class="answer" v-if="useDetail.answerPaper">
            <div class="answer-list" v-for="(item, index) in useDetail.answerPaper.quePaper.topics" v-bind:key="item.topicId">
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
                  <div v-bind:class="['xuanx', {'ok': it.isAnswer === 'Y' || it.optionId === useDetail.answerPaper.answerTopicDtos[index].answers[0]}]">
                    <span v-if="childIndex === 0">A</span> <span v-if="childIndex === 1">B</span> <span v-if="childIndex === 2">C</span>、{{it.queOption}}
                    <span v-if="it.isAnswer === 'Y'"><span class="ok-desc">正确</span> ✔</span>
                    <span style="color: #FF716C" v-if="useDetail.answerPaper.quePaper.type === 'SURVEY'">({{it.score}}分)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div class="timu-title">测试结果</div>
        <div class="result" v-if="useDetail.queUserDto">
          正确率： {{useDetail.queUserDto.correctRate}}
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancel">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style lang="less" scoped src="../../../src/assets/less/peopleAnswer.less"></style>
<script>
import { mapState } from 'vuex'
import { tool } from '../../common/util.js'
export default {
  computed: {
    ...mapState({
      useDetail: state => state.remindDataStore.useTestDetail
    }),
    selObj: function () {
      var options = []
      for (let i = 1; i <= this.times; i++) {
        var obj = {value: i, label: i}
        options.push(obj)
      }
      return {options, value: this.times}
    }
  },
  props: ['dialogVisible', 'times'],
  data () {
    return {
    }
  },
  methods: {
    cancel () {
      this.$emit('prarentShow')
    },
    formateDate (strTime) {
      return tool.dateFormat(strTime)
    },
    selectNum (val) {
      this.$store.dispatch('getUseTestDetail', {queId: this.useDetail.queId, userId: this.useDetail.queUserDto.userId, scheduleId: this.useDetail.scheduleId, time: val})
    }
  }
}
</script>
