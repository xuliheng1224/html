<template>
  <div>
      <!-- <div class="question_title" style="margin-bottom: 20px;">基础信息</div> -->
      <!-- 基础信息部分 -->
      <div class="baseInfo_main">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="测试类型">
            <div class="test_type">
              {{form.testType}} <a href="#" @click="jump('testType')" style="color: blue;text-decoration: none;">修改</a>
            </div>
          </el-form-item>
          <el-form-item label="测试名称">
            <el-input v-model.trim="form.name" placeholder="请输入测试名称"></el-input>
          </el-form-item>
          <div style="display: flex;">
            <div style="width: 68px; margin-right: 12px; text-align: right; color: #606266; font-size: 14px;">卷首语</div>
            <!-- <script id="editor" name="content" type="text/plain" style="width:100%;height:300px;"></script> -->
            <textarea id="editor" name="content" style="width:100%;height:300px;"></textarea>
          </div>
          <el-form-item label="适用阶段">
            <el-radio-group v-model="form.apply">
              <el-radio label="ANTENATAL" @change="shiyongjied">孕期</el-radio>
              <el-radio label="POSTPARTUM" @change="shiyongjied">育儿</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="" v-if="form.apply == 'ANTENATAL'">
            <el-col :span="11">
              <el-select v-model="form.regionS" placeholder="请选择">
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
            </el-col>
            <el-col class="line" :span="2">至</el-col>
            <el-col :span="11">
              <el-select v-model="form.regionE" placeholder="请选择">
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
            </el-col>
          </el-form-item>
          <el-form-item label="" v-if="form.apply == 'POSTPARTUM'">
            <el-col :span="11">
              <el-select v-model="form.regionS" placeholder="请选择">
                <el-option label="产后0天" value="0"></el-option>
                <el-option label="产后42天" value="42"></el-option>
                <el-option label="产后6个月" value="180"></el-option>
                <el-option label="产后1年" value="365"></el-option>
                <el-option label="产后2年" value="720"></el-option>
                <el-option label="产后3年" value="1095"></el-option>
              </el-select>
            </el-col>
            <el-col class="line" :span="2">至</el-col>
            <el-col :span="11">
              <el-select v-model="form.regionE" placeholder="请选择">
                <el-option label="产后0天" value="0"></el-option>
                <el-option label="产后42天" value="42"></el-option>
                <el-option label="产后6个月" value="180"></el-option>
                <el-option label="产后1年" value="365"></el-option>
                <el-option label="产后2年" value="720"></el-option>
                <el-option label="产后3年" value="1095"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="生效时间">
            <el-radio-group v-model="form.time">
              <el-radio label="0">自定义时间</el-radio>
              <el-radio label="1">长期有效</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="" v-if="form.time == '0'">
            <el-col :span="11">
              <el-date-picker
                v-model="form.startT"
                type="datetime"
                placeholder="选择开始日期时间">
              </el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker
                v-model="form.endT"
                type="datetime"
                placeholder="选择结束日期时间">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="说明">
            <div class="explain">
              <div>1、每个选项可配置分数，根据用户选择的选项将所对应的分数全部累加起来，按照分数来匹配结果文案并展示。</div>
              <div>2、选项分数不会在用户端展示，只作为测试的逻辑设置。</div>
              <div>3、选项分数请输入阿拉伯数字，若不填，将默认为 0。</div>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <!-- 题目部分 -->
      <div v-for="(item, index) in questionArr" :key="index">
        <div class="main_title">
          <div class="question_title question_p">题目{{index + 1}}</div>
          <div class="icons_con">
            <div class="icons" @click="addQuestion">
              <i class="el-icon-plus"></i>
            </div>
            <div class="icons" @click="moveUp(index)">
              <i class="el-icon-arrow-up"></i>
            </div>
            <div class="icons" @click="moveDown(index)">
              <i class="el-icon-arrow-down"></i>
            </div>
            <div @click="delQuestion(index, item)">
              <i class="el-icon-delete"></i>
            </div>
          </div>
        </div>
        <div class="baseInfo_main">
          <div class="q_main">
            <div class="q_name">题目类型</div>
            <el-select v-model="item.qType" placeholder="请选择题目类型">
              <el-option
                v-for="optItem in item.options"
                :key="optItem.value"
                :label="optItem.label"
                :value="optItem.value">
              </el-option>
            </el-select>
          </div>
          <div class="q_main">
            <div class="q_name">题干</div>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入题干"
              v-model.trim="item.textarea">
            </el-input>
          </div>
          <div style="margin-left:20px" v-if="item.qType != 'QA'">
            <el-table :data="item.tableData" border style="width: 100%">
              <el-table-column
                prop="opt"
                label="选项"
                width="50">
              </el-table-column>
              <el-table-column label="选项内容">
                <template slot-scope="scope">
                  <el-input v-model.trim="scope.row.optCon" placeholder="请输入选项内容"></el-input>
                </template>
              </el-table-column>
              <el-table-column  label="选项得分">
                <template slot-scope="scope">
                  <el-input v-model.trim="scope.row.score" placeholder="请输入选项得分"></el-input>
                </template>
              </el-table-column>
              <el-table-column  label="操作" width="200">
                <template slot-scope="scope">
                  <div style="color: #3C93E2;font-size: 25px">
                    <i class="el-icon-circle-plus-outline" @click="optAdd(index)"></i>
                    <i class="el-icon-arrow-up" @click="optUp(index, scope.$index)"></i>
                    <i class="el-icon-arrow-down" @click="optDown(index, scope.$index)"></i>
                    <i class="el-icon-delete" @click="optDel(index, scope.$index, item, scope.row)"></i>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="question_title" style="padding: 20px 0">结果文案</div>
      <div class="baseInfo_main">
        <div style="margin-left:20px">
          <el-table :data="tableAnswer" border style="width: 100%">
            <el-table-column label="得分区间" width="200">
              <template slot-scope="scope">
                <div style="display: flex;align-items: center">
                  <el-input v-model.trim="scope.row.scoreS"></el-input>-
                  <el-input v-model.trim="scope.row.scoreE"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="结果文案">
              <template slot-scope="scope">
                <el-input v-model.trim="scope.row.AnswerResult" placeholder="请输入结果文案"></el-input>
              </template>
            </el-table-column>
            <el-table-column  label="操作" width="200">
              <template slot-scope="scope">
                <div style="color: #3C93E2;font-size: 25px">
                  <i class="el-icon-circle-plus-outline" @click="answerAdd()"></i>
                  <i class="el-icon-delete" @click="answerDel(scope.$index, scope.row)"></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin: 50px  0 40px 0">
            <el-button type="primary" round @click="preview">预览</el-button>
            <el-button type="primary" round @click="holdData('PUBLISH')">保存并发布</el-button>
            <el-button type="primary" round @click="holdData('NORMAL')">保存</el-button>
            <el-button round @click="cancel">取消</el-button>
          </div>
        </div>
      </div>
      <el-dialog
        title="预览"
        :visible.sync="dialogVisible"
        width="30%">
        <div>
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
            <div id="preview_con" v-html="contentTxt" style="display: inline-grid;min-width: 500px;word-break: break-all;"></div>
          </div>
          <div class="preview_height">
            <span class="preview_name">适应阶段:</span>
            <span>{{adaptation()}}</span>
          </div>
          <div class="preview_height" style="margin-bottom: 30px;">
            <span class="preview_name">有效期:</span>
            <span>{{timeDate()}}</span>
          </div>
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
          <div v-for="(item, index) in tableAnswer" :key="index + 15807">
            <div class="preview_height preview_l">
              <span>{{item.scoreS}}</span>
              <span>-</span>
              <span style="margin-right: 10px">{{item.scoreE}}:</span>
              <span>{{item.AnswerResult}}</span>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from 'vuex'
import { tool } from '../../common/util'
export default {
  // name: 'UE',
  computed: mapState({
    matchQuestion: state => state.question.testQuestion
  }),
  // components: {
  //   UE
  // },
  data () {
    return {
      contentTxt: '',
      form: {
        testType: '选项得分匹配题',
        name: '',
        regionS: '',
        regionE: '',
        apply: 'ANTENATAL',
        time: '0',
        startT: '',
        endT: ''
      },
      questionArr: [{
        delOptId: [], // 删除的题目选项
        options: [{value: 'SINGLE', label: '单选题'}, {value: 'MULTI', label: '多选题'}, {value: 'JUDGE', label: '判断题'}, {value: 'QA', label: '简答题'}],
        qType: '',
        textarea: '',
        tableData: [{opt: 'A', optCon: '', score: '', optId: ''}],
        topicId: ''
      }],
      tableAnswer: [{
        scoreS: '',
        scoreE: '',
        AnswerResult: '',
        AnswerId: ''
      }],
      dialogVisible: false,
      deldResultIds: [], // 删除的结果文案Id集合
      delTopicId: [] // 删除的题目id集合
    }
  },
  mounted () {
    KindEditor.ready(function (K) {        
        window.editor = K.create('#editor', {
          resizeType: 0,
          filePostName  : 'img',
          uploadJson: '/msg/upload',
          dir: 'image',
          afterCreate: function () {
            this.sync()
          },
          afterBlur: function () {
            this.sync()
          },
          afterUpload: function (url) {
            console.log(url)                  
          }
        })
    })
    let _this = this
    if (this.$route.query.id) {
      setTimeout(function () {
        _this.getMatchDetail()
      }, 100)
    }
  },
  methods: {
    jump (url) {
      this.$router.push(url)
    },
    // 适应阶段
    shiyongjied (event) {
      this.form.regionS = ''
      this.form.regionE = ''
    },
    // 获取编辑数据
    getMatchDetail () {
      this.$store.dispatch('getMatchDetail', {queId: this.$route.query.id, vue: this})
    },
    getContentTxt () {
      var arr = []
      // arr.push(UE.getEditor('editor').getContent())
      this.contentTxt = arr.join('\n')
    },
    addQuestion () {
      var obj = {
        delOptId: [],
        options: [{value: 'SINGLE', label: '单选题'}, {value: 'MULTI', label: '多选题'}, {value: 'JUDGE', label: '判断题'}, {value: 'QA', label: '简答题'}],
        qType: '',
        textarea: '',
        tableData: [{opt: 'A', optCon: '', score: '', optId: ''}],
        topicId: ''
      }
      this.questionArr.push(obj)
    },
    delQuestion (index, row) {
      let str = ''
      if (this.$route.query.id) {
        this.matchQuestion.topics.map(item => {
          if (row.textarea === item.topic) {
            str = item.topicId
          }
        })
        this.delTopicId.push(str)
      }
      this.questionArr.splice(index, 1)
    },
    moveUp (index) {
      if (index === 0) {
        this.$message({
          message: '已经是最上面的一个了！！！',
          type: 'success'
        })
      } else {
        let obj = Object.assign({}, this.questionArr[index])
        let obj1 = Object.assign({}, this.questionArr[index - 1])
        this.questionArr.splice(index, 1, obj1)
        this.questionArr.splice(index - 1, 1, obj)
      }
    },
    moveDown (index) {
      if (index + 1 === this.questionArr.length) {
        this.$message({
          message: '已经是最后一个了！！！',
          type: 'success'
        })
      } else {
        let obj = Object.assign({}, this.questionArr[index])
        let obj1 = Object.assign({}, this.questionArr[index + 1])
        this.questionArr.splice(index, 1, obj1)
        this.questionArr.splice(index + 1, 1, obj)
      }
    },
    optAdd (index) {
      if (this.questionArr[index].tableData.length === 5) {
        this.$message({
          message: '无更多选项了！！！',
          type: 'success'
        })
      } else {
        let arr = [{opt: 'B', optCon: '', score: '', optId: ''}, {opt: 'C', optCon: '', score: '', optId: ''}, {opt: 'D', optCon: '', score: '', optId: ''}, {opt: 'E', optCon: '', score: '', optId: ''}]
        this.questionArr[index].tableData.push(arr[this.questionArr[index].tableData.length - 1])
      }
    },
    optDel (index, rowIndex, row, row1) {
      if (this.$route.query.id) {
        this.matchQuestion.topics.map(item => {
          if (row.textarea === item.topic) {
            item.options.map(item1 => {
              if (item1.queOption === row1.optCon) {
                this.questionArr[index].delOptId.push(item1.optionId)
              }
            })
          }
        })
      }
      this.questionArr[index].tableData.splice(rowIndex, 1)
      let arr = ['A', 'B', 'C', 'D', 'E']
      for (var i = 0; i < this.questionArr[index].tableData.length; i++) {
        this.questionArr[index].tableData[i].opt = arr[i]
      }
    },
    optUp (index, rowIndex) {
      if (rowIndex === 0) {
        this.$message({
          message: '已经是最上面的一个了！！！',
          type: 'success'
        })
      } else {
        let obj = Object.assign({}, this.questionArr[index].tableData[rowIndex])
        let obj1 = Object.assign({}, this.questionArr[index].tableData[rowIndex - 1])
        let optArr = []
        optArr.push(obj.opt)
        optArr.push(obj1.opt)
        this.questionArr[index].tableData.splice(rowIndex, 1, obj1)
        this.questionArr[index].tableData.splice(rowIndex - 1, 1, obj)
        this.questionArr[index].tableData[rowIndex].opt = optArr[0]
        this.questionArr[index].tableData[rowIndex - 1].opt = optArr[1]
      }
    },
    optDown (index, rowIndex) {
      if (rowIndex + 1 === this.questionArr[index].tableData.length) {
        this.$message({
          message: '已经是最后的一个了！！！',
          type: 'success'
        })
      } else {
        let obj = Object.assign({}, this.questionArr[index].tableData[rowIndex])
        let obj1 = Object.assign({}, this.questionArr[index].tableData[rowIndex + 1])
        let optArr = []
        optArr.push(obj.opt)
        optArr.push(obj1.opt)
        this.questionArr[index].tableData.splice(rowIndex, 1, obj1)
        this.questionArr[index].tableData.splice(rowIndex + 1, 1, obj)
        this.questionArr[index].tableData[rowIndex].opt = optArr[0]
        this.questionArr[index].tableData[rowIndex + 1].opt = optArr[1]
      }
    },
    answerAdd () {
      var obj = {scoreS: '', scoreE: '', AnswerResult: '', AnswerId: ''}
      this.tableAnswer.push(obj)
    },
    answerDel (index, row) {
      this.deldResultIds.push(row.AnswerId)
      this.tableAnswer.splice(index, 1)
    },
    holdData (str) {
      // this.getContentTxt()
      editor.sync()
      this.contentTxt = $('#editor').val()
      // 校验开始
      if (!this.form.name) {
        this.$message({
          message: '请输入测试名称',
          type: 'warning'
        })
        return false
      }
      if (!this.contentTxt) {
        this.$message({
          message: '请输入卷首语',
          type: 'warning'
        })
        return false
      }
      if (!this.form.regionS || !this.form.regionE) {
        this.$message({
          message: '请选择适用阶段',
          type: 'warning'
        })
        return false
      }
      if (Number(this.form.regionE) - Number(this.form.regionS) < 0) {
        this.$message({
          message: '结束适用阶段不可小于开始适用阶段',
          type: 'warning'
        })
        return false
      }
      if ((this.form.time === '0' && !this.form.startT) || (this.form.time === '0' && !this.form.endT)) {
        this.$message({
          message: '请选择生效时间',
          type: 'warning'
        })
        return false
      }
      if ((this.form.time === '0' && new Date(tool.dateFormat(this.form.endT)).getTime() - new Date(tool.dateFormat(this.form.startT)).getTime() < 0)) {
        this.$message({
          message: '生效结束时间不可小于开始时间',
          type: 'warning'
        })
        return false
      }
      for (var i = 0; i < this.questionArr.length; i++) {
        if (!this.questionArr[i].qType) {
          this.$message({
            message: `请选择第${i + 1}题的题目类型`,
            type: 'warning'
          })
          return false
        }
        if (!this.questionArr[i].textarea) {
          this.$message({
            message: `请选择第${i + 1}题的题干`,
            type: 'warning'
          })
          return false
        }
        for (var j = 0; j < this.questionArr[i].tableData.length; j++) {
          if (this.questionArr[i].qType !== 'QA') { // 不是简单题的才去验证选项内容和正确答案
            if (!this.questionArr[i].tableData[j].optCon) {
              this.$message({
                message: `请输入第${i + 1}题${this.questionArr[i].tableData[j].opt}选项的选项内容`,
                type: 'warning'
              })
              return false
            }
            if (!this.questionArr[i].tableData[j].score && this.questionArr[i].tableData[j].score !== 0) {
              this.$message({
                message: `请输入第${i + 1}题${this.questionArr[i].tableData[j].opt}选项的选项得分`,
                type: 'warning'
              })
              return false
            }
          }
        }
      }
      for (var k = 0; k < this.tableAnswer.length; k++) {
           (!this.tableAnswer[k].scoreS && this.tableAnswer[k].scoreS !== 0) || (!this.tableAnswer[k].scoreE && this.tableAnswer[k].scoreE !== 0)
        if ((!this.tableAnswer[k].scoreS && this.tableAnswer[k].scoreS !== 0) || (!this.tableAnswer[k].scoreE && this.tableAnswer[k].scoreE !== 0)) {
          this.$message({
            message: `请输入第${k + 1}条结果文案的得分区间`,
            type: 'warning'
          })
          return false
        }
        if (!this.tableAnswer[k].AnswerResult) {
          this.$message({
            message: `请输入第${k + 1}条的结果文案`,
            type: 'warning'
          })
          return false
        }
      }
      // 校验结束
      let results1 = this.tableAnswer.map(item => { 
        if (this.$route.query.id) { // 编辑
          return {result: item.AnswerResult, resultType: 'SCORE', scoreEnd: item.scoreE, scoreStart: item.scoreS, resultId: item.AnswerId}
        } else { // 新增
          return {result: item.AnswerResult, resultType: 'SCORE', scoreEnd: item.scoreE, scoreStart: item.scoreS}
        }
      })
      let topics1 = this.questionArr.map((item, tIndex) => {
        let options = item.tableData.map((item1, index) => {
          let str1 = item1.optCon + '-' + item1.score
          if (this.$route.query.id) { // 编辑
            return {optionMark: item1.opt, queOption: str1, sort: index, optionId: item1.optId}
          } else { // 新增
            return {optionMark: item1.opt, queOption: str1, sort: index}
          }
        })
        if (this.$route.query.id) { // 编辑
          return {deletedOptionIds: item.delOptId.join(','), options: options, topic: item.textarea, type: item.qType, sort: tIndex, topicId: item.topicId}
        } else { // 新增
          return {options: options, topic: item.textarea, type: item.qType, sort: tIndex}
        }
      })
      if (this.$route.query.id) { // 编辑
        this.$store.dispatch('setQuestionList', {deletedTopicIds: this.delTopicId.join(','), queId: this.$route.query.id, deletedResultIds: this.deldResultIds.join(','), alwaysEffective: this.form.time, des: this.contentTxt, endTime: this.form.time === '0' ? tool.dateFormat(this.form.endT) : '', startTime: this.form.time === '0' ? tool.dateFormat(this.form.startT) : '', gestationalRangeEnd: this.form.regionE, gestationalRangeStart: this.form.regionS, gestationalType: this.form.apply, que: this.form.name, results: results1, topics: topics1, type: 'SURVEY', status: str, vue: this})
      } else { // 新增
        this.$store.dispatch('setQuestionList', {alwaysEffective: this.form.time, des: this.contentTxt, endTime: this.form.time === '0' ? tool.dateFormat(this.form.endT) : '', startTime: this.form.time === '0' ? tool.dateFormat(this.form.startT) : '', gestationalRangeEnd: this.form.regionE, gestationalRangeStart: this.form.regionS, gestationalType: this.form.apply, que: this.form.name, results: results1, topics: topics1, type: 'SURVEY', status: str, vue: this})
      }
    },
    preview () {
      editor.sync()
      this.contentTxt = $('#editor').val()
      let re = new RegExp(/^\d+$/)
      // this.getContentTxt()
      // 校验开始
      if (!this.form.name) {
        this.$message({
          message: '请输入测试名称',
          type: 'warning'
        })
        return false
      }
      if (!this.contentTxt) {
        this.$message({
          message: '请输入卷首语',
          type: 'warning'
        })
        return false
      }
      if (!this.form.regionS || !this.form.regionE) {
        this.$message({
          message: '请选择适用阶段',
          type: 'warning'
        })
        return false
      }
      if (Number(this.form.regionE) - Number(this.form.regionS) < 0) {
        this.$message({
          message: '结束适用阶段不可小于开始适用阶段',
          type: 'warning'
        })
        return false
      }
      if ((this.form.time === '0' && !this.form.startT) || (this.form.time === '0' && !this.form.endT)) {
        this.$message({
          message: '请选择生效时间',
          type: 'warning'
        })
        return false
      }
      if ((this.form.time === '0' && new Date(tool.dateFormat(this.form.endT)).getTime() - new Date(tool.dateFormat(this.form.startT)).getTime() < 0)) {
        this.$message({
          message: '生效结束时间不可小于开始时间',
          type: 'warning'
        })
        return false
      }
      for (var i = 0; i < this.questionArr.length; i++) {
        if (!this.questionArr[i].qType) {
          this.$message({
            message: `请选择第${i + 1}题的题目类型`,
            type: 'warning'
          })
          return false
        }
        if (!this.questionArr[i].textarea) {
          this.$message({
            message: `请选择第${i + 1}题的题干`,
            type: 'warning'
          })
          return false
        }
        for (var j = 0; j < this.questionArr[i].tableData.length; j++) {
          if (this.questionArr[i].qType !== 'QA') { // 不是简单题的才去验证选项内容和正确答案
            if (!this.questionArr[i].tableData[j].optCon) {
              this.$message({
                message: `请输入第${i + 1}题${this.questionArr[i].tableData[j].opt}选项的选项内容`,
                type: 'warning'
              })
              return false
            }
            if (!this.questionArr[i].tableData[j].score && this.questionArr[i].tableData[j].score !== 0) {
              this.$message({
                message: `请输入第${i + 1}题${this.questionArr[i].tableData[j].opt}选项的选项得分`,
                type: 'warning'
              })
              return false
            }
            if (!re.test(this.questionArr[i].tableData[j].score)) { 
        　　　　this.$message({
                message: `第${i + 1}题${this.questionArr[i].tableData[j].opt}选项只能输入数字`,
                type: 'warning'
              })
              return false
        　　} 
          }
        }
      }
      for (var k = 0; k < this.tableAnswer.length; k++) {
        if ((!this.tableAnswer[k].scoreS && this.tableAnswer[k].scoreS !== 0) || (!this.tableAnswer[k].scoreE && this.tableAnswer[k].scoreE !== 0)) {
          this.$message({
            message: `请输入第${k + 1}条结果文案的得分区间`,
            type: 'warning'
          })
          return false
        }
        if (!re.test(this.tableAnswer[k].scoreS)) { 
    　　　　this.$message({
            message: `第${k + 1}条结果文案的得分区间只能输入数字`,
            type: 'warning'
          })
          return false
    　　} 
        if (!this.tableAnswer[k].AnswerResult) {
          this.$message({
            message: `请输入第${k + 1}条的结果文案`,
            type: 'warning'
          })
          return false
        }
      }
      // 校验结束
      this.dialogVisible = true
      setTimeout(function () {
        $('#preview_con img').width(200)
      }, 0)
    },
    getcontentTxt1 () {
      console.log(this.contentTxt)
      let regex = /(<([^>]+)>)/ig
      if (this.contentTxt) {
        return this.contentTxt.replace(regex, '').replace(/&nbsp;/ig, '')
      }
    },
    cancel () {
      this.$router.push({path: '/schoolInfo/testQuestionnaire'})
    },
    adaptation () {
      if (this.form.apply === 'ANTENATAL') {
        return `孕期${this.form.regionS} ~ ${this.form.regionS}周`
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
      if (this.form.time === '1') {
        return '长期有效'
      } else {
        return tool.dateFormat(this.form.startT) + '~' + tool.dateFormat(this.form.endT)
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
.question_title {
    font-size: 22px;
    color: #3C93E2;
    // margin-bottom: 20px;
}
.baseInfo_main {
  background-color: #ffffff;
  padding: 20px 20px 10px 0;
}
.test_type, .explain {
  color: #606266;
}
.line {
  text-align: center;
}
.main_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.question_p {
  padding: 20px 0;
}
.icons_con {
  width: 150px;
  height: 69px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  color: #3C93E2;
  // margin-bottom: 20px;
  margin-right: 20px;
}
.icons {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid #3C93E2;
  text-align: center;
  line-height: 25px;
}
.q_main {
  display: flex;
  align-items: center;
  margin-bottom: 22px;
}
.q_name {
  width: 68px;
  padding-right: 12px;
  color: #606266;
  font-size: 14px;
  text-align: right;
}
.preview_height {
  min-height: 33px;
  line-height: 33px;
}
.preview_name {
  display: inline-block;
  width: 70px;
  text-align: right;
  margin-right: 10px;
}
.preview_l {
  margin-left: 10px;
}
.preview_opt_l {
  margin-left: 50px;
}
.preview_t {
  color: #e0e0e0;
}
.preview_score {
  color: #FF716C;
}
.el-select, .el-date-editor {
  width: 100%;
}
</style>
