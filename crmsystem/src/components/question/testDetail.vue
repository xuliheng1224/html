<template>
  <div class="test_detail">
    <!-- 对错题 -->
    <div v-if="isTest">
      <div class="test_detail_t">基本信息</div>
      <div class="preview_height">
        <span class="preview_name">测试类型:</span>
        <span>{{form.testType}}</span>
      </div>
      <div class="preview_height">
        <span class="preview_name">测试名称:</span>
        <span>{{form.name}}</span>
      </div>
      <div class="preview_height">
        <span class="preview_name">卷首语:</span>
        <!-- <span>{{contentTxt}}</span> -->
        <div v-html="contentTxt" style="display: inline-grid;min-width: 500px;word-break: break-all;"></div>
      </div>
      <div class="preview_height">
        <span class="preview_name">适应阶段:</span>
        <span>{{adaptation()}}</span>
      </div>
      <div class="preview_height" style="margin-bottom: 30px;">
        <span class="preview_name">有效期:</span>
        <span>{{timeDate()}}</span>
      </div>
      <div class="test_detail_t">测试题目</div>
      <div style="margin-bottom: 30px">
        <div v-for="(item, index) in questionArr" :key="index">
          <div class="preview_height preview_l">
            <span>Q{{index + 1}}、</span>
            <span class="preview_t">({{typeFilter(item.qType)}})</span>
            <span>{{item.textarea}}</span>
          </div>
          <div v-for="(itemOpt, index) in item.tableData" :key="index + 86431">
            <div class="preview_height preview_opt_l" v-if="item.qType != 'QA'" :class="[itemOpt.isTrue ? 'preview_score' : '']">
              <span>{{itemOpt.opt}}、</span>
              <span>{{itemOpt.optCon}}</span>
              <span v-if="itemOpt.isTrue" class="preview_correct">正确</span>
            </div>
          </div>
        </div>
      </div>
      <div class="test_detail_t">测试结果</div>
      <div v-for="(item, index) in tableAnswer" :key="index + 15807">
        <div class="preview_height preview_l">
          <span style="margin-right: 10px">{{item.type}}:</span>
          <span>{{item.AnswerResult}}</span>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="test_detail_t">基本信息</div>
      <div class="preview_height">
        <span class="preview_name">测试类型:</span>
        <span>{{form.testType}}</span>
      </div>
      <div class="preview_height">
        <span class="preview_name">测试名称:</span>
        <span>{{form.name}}</span>
      </div>
      <div class="preview_height">
        <span class="preview_name">卷首语:</span>
        <!-- <span >{{contentTxt}}</span> -->
        <div v-html="contentTxt" style="display: inline-grid;min-width: 500px;word-break: break-all;"></div>
      </div>
      <div class="preview_height">
        <span class="preview_name">适应阶段:</span>
        <span>{{adaptation()}}</span>
      </div>
      <div class="preview_height" style="margin-bottom: 30px;">
        <span class="preview_name">有效期:</span>
        <span>{{timeDate()}}</span>
      </div>
      <div class="test_detail_t">测试题目</div>
      <div style="margin-bottom: 30px">
        <div v-for="(item, index) in questionArr" :key="index">
          <div class="preview_height preview_l">
            <span>Q{{index + 1}}、</span>
            <span class="preview_t">({{typeFilter(item.qType)}})</span>
            <span>{{item.textarea}}</span>
          </div>
          <div v-for="(itemOpt, index) in item.tableData" :key="index + 86431">
            <div class="preview_height preview_opt_l" v-if="item.qType != 'QA'">
              <span>{{itemOpt.opt}}、</span>
              <span>{{itemOpt.optCon}}</span>
              <span class="preview_score">({{itemOpt.score}}分)</span>
            </div>
          </div>
        </div>
      </div>
      <div class="test_detail_t">测试结果</div>
      <div v-for="(item, index) in tableAnswer" :key="index + 15807">
        <div class="preview_height preview_l">
          <span>{{item.scoreS}}</span>
          <span>-</span>
          <span style="margin-right: 10px">{{item.scoreE}}:</span>
          <span>{{item.AnswerResult}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { tool } from '../../common/util'
export default {
  data () {
    return {
      contentTxt: '',
      form: {
        testType: '基本对错题',
        name: '',
        regionS: '',
        regionE: '',
        apply: 'ANTENATAL',
        time: '0',
        startT: '',
        endT: ''
      },
      questionArr: [{
        options: [{value: 'SINGLE', label: '单选题'}, {value: 'MULTI', label: '多选题'}, {value: 'JUDGE', label: '判断题'}, {value: 'QA', label: '简答题'}],
        qType: '',
        textarea: '',
        tableData: [{opt: 'A', optCon: '', val: '1', isTrue: false, optionId: ''}],
        delOpt: [], // 删除的题目选项
        questionId: '',
        optAnswer: ''
      }],
      tableAnswer: [{
        type: '全对了',
        AnswerResult: ''
      }, {
        type: '错了',
        AnswerResult: '很遗憾，您错了X道题'
      }],
      isTest: false,
      timeNum: null
    }
  },
  mounted () {
    this.testDetail()
  },
  methods: {
    testDetail () {
      this.$store.dispatch('getTestQDetail', {queId: this.$route.params.id, vue: this})
    },
    adaptation () {
      if (this.form.apply === 'ANTENATAL') {
        return `孕期${this.form.regionS} ~ ${this.form.regionE}周`
      } else {
        let st = ''
        let et = ''
        switch (this.form.regionS) {
          case '0':
            st = '产后0天'
            break
          case '42':
            st = '产后42天'
            break
          case '180':
            st = '产后6个月'
            break
          case '365':
            st = '产后1年'
            break
          case '720':
            st = '产后2年'
            break
          case '1095':
            st = '产后3年'
            break
        }
        switch (this.form.regionE) {
          case '0':
            et = '产后0天'
            break
          case '42':
            et = '产后42天'
            break
          case '180':
            et = '产后6个月'
            break
          case '365':
            et = '产后1年'
            break
          case '720':
            et = '产后2年'
            break
          case '1095':
            et = '产后3年'
            break
        }
        return st + '~' + et
      }
    },
    timeDate () {
      if (this.timeNum === 1) {
        return '长期有效'
      } else {
        return `${tool.dateFormat(this.form.startT)} ~ ${tool.dateFormat(this.form.endT)}`
      }
    },
    typeFilter (item) {
      switch (item) {
        case 'SINGLE':
          return '单选题'
        case 'MULTI':
          return '多选题'
        case 'JUDGE':
          return '判断题'
        case 'QA':
          return '简答题'
      }
    }
  }
}
</script>
<style scoped lang="less">
.test_detail {
  color: #7C8C9B;
  font-size: 16px;
}
.test_detail_t {
  height: 44px;
  color: #3C93E2;
  font-size: 22px;
  padding: 0 20px;
  line-height: 44px;
  background: #F2F2F2;
  margin-bottom: 30px;
}
.preview_height {
  min-height: 33px;
  line-height: 33px;
  margin-left: 40px;
}
.preview_name {
  display: inline-block;
  width: 70px;
  text-align: right;
  margin-right: 10px;
}
.preview_l {
  margin-left: 40px;
}
.preview_opt_l {
  margin-left: 80px;
}
.preview_t {
  color: #e0e0e0;
}
.preview_score {
  color: #FF716C;
}
.preview_correct {
  color: #fff;
  background-color: #FF716C;
  border-radius: 2px;
}
</style>
