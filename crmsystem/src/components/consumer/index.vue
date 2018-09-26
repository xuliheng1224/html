<template>
  <div>
    <div v-if="isTrue">
      <div class='search'>
        <div class='search_content'>
          <el-form :label-position="labelPosition" label-width="80px">
            <el-form-item label="姓名">
              <el-input v-model.trim="name" placeholder="请输入"></el-input>
            </el-form-item>
            <!--<el-form-item label="注册时间">-->
              <!--<el-date-picker-->
                <!--v-model="registrationTime"-->
                <!--type="datetimerange"-->
                <!--:picker-options="pickerOptions2"-->
                <!--range-separator="至"-->
                <!--start-placeholder="开始日期"-->
                <!--end-placeholder="结束日期"-->
                <!--align="right">-->
              <!--</el-date-picker>-->
            <!--</el-form-item>-->
            <el-form-item label="年龄">
              <el-select v-model="AgeValue1" placeholder="请选择" style="width:49%;">
                <el-option
                  v-for="item in Age"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="AgeValue2" placeholder="请选择" style="width:49%;">
                <el-option
                  v-for="item in Age"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form :label-position="labelPosition" label-width="80px">
            <el-form-item label="标签">
              <el-select v-model="tag" placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <el-button type="primary" class="suresearch" @click="search">搜索</el-button>
        <el-button type="primary" class="clear" @click="clear">清除</el-button>
      </div>
      <div class='list'>
        <div class="listhead">
          <el-button type="primary" @click="all" v-if="auth.indexOf('user_export_excel_all') > -1">导出所有用户Excel</el-button>
          <el-button type="primary" @click="excel" v-if="auth.indexOf('user_export_excel') > -1">导出所选用户Excel</el-button>
          <el-button type="primary" @click="pdf" v-if="auth.indexOf('user_pdf_down') > -1">下载pdf文档</el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="userlist.data"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="changeFun"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="realName"
            label="姓名"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="userStatus"
            label="标签"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="注册渠道"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.source ? scope.row.source : "--"}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="hosName"
            label="来源医院"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="绑定医生"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>--</span>
            </template>
          </el-table-column>
          <el-table-column
            label="用户详情"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="chakan(scope.row.userId, scope.row.realName)" style="cursor: pointer;" :disabled='auth.indexOf("user_detail") <= -1'>查看</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="产前档案"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="antenatal(scope.row.userId, scope.row.realName)" style="cursor: pointer;" :disabled='auth.indexOf("user_detail") <= -1|| scope.row.prenatal==="无"'>{{scope.row.prenatal}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="唐氏筛查"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="tangshi(scope.row.userId, scope.row.realName)" style="cursor: pointer;" :disabled='auth.indexOf("user_detail") <= -1|| scope.row.downs==="无"'>{{scope.row.downs}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="排畸B超"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="Bultrasonic(scope.row.userId, scope.row.realName)" style="cursor: pointer;" :disabled='auth.indexOf("user_detail") <= -1|| scope.row.deformity==="无"'>{{scope.row.deformity}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="糖耐量筛查"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="sugarTolerance(scope.row.userId, scope.row.realName)" style="cursor: pointer;" :disabled='auth.indexOf("user_detail") <= -1|| scope.row.bloodsugar==="无"'>{{scope.row.bloodsugar}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="产后档案"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="postpartum(scope.row.userId, scope.row.realName)" style="cursor: pointer;" :disabled='auth.indexOf("user_detail") <= -1|| scope.row.postpartum==="无"'>{{scope.row.postpartum}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="学习信息"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="school(scope.row.userId, scope.row.realName)" style="cursor: pointer;" :disabled='auth.indexOf("user_detail") <= -1|| scope.row.school==="无"'>{{scope.row.school}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="footers">
          <el-pagination
            background
            :current-page="currPage"
            @size-change="sizeChange"
            @current-change="currentChange"
            :page-sizes="[10, 50, 100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="userlist.totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
    <Detail v-if="!isTrue" @toParent="accept" :typeValue="typeValue" :userId="userId" :currentPage="currPage" :names='names'></Detail>
  </div>
</template>

<script>
import Detail from './detail/detail'
import { mapState } from 'vuex'
import { tool } from '../../common/util'
import { fetch } from '../../common/fetch'
export default {
  components: {
    Detail
  },
  computed: mapState({
    userlist: state => state.consumer.userlist
  }),
  data () {
    return {
      userId: '',
      typeValue: 0,
      isTrue: true,
      bars: 10,
      background: '#999999',
      name: '',
      names: '',
      currPage: 1,
      // registrationTime: '',
      AgeValue1: '',
      AgeValue2: '',
      tag: '',
      Age: [{
        value: '1',
        label: '1'
      }, {
        value: '2',
        label: '2'
      }, {
        value: '3',
        label: '3'
      }, {
        value: '4',
        label: '4'
      }, {
        value: '5',
        label: '5'
      }, {
        value: '6',
        label: '6'
      }, {
        value: '7',
        label: '7'
      }, {
        value: '8',
        label: '8'
      }, {
        value: '9',
        label: '9'
      }, {
        value: '10',
        label: '10'
      }, {
        value: '11',
        label: '11'
      }, {
        value: '12',
        label: '12'
      }, {
        value: '13',
        label: '13'
      }, {
        value: '14',
        label: '14'
      }, {
        value: '15',
        label: '15'
      }, {
        value: '16',
        label: '16'
      }, {
        value: '17',
        label: '17'
      }, {
        value: '18',
        label: '18'
      }, {
        value: '19',
        label: '19'
      }, {
        value: '20',
        label: '20'
      }, {
        value: '21',
        label: '21'
      }, {
        value: '22',
        label: '22'
      }, {
        value: '23',
        label: '23'
      }, {
        value: '24',
        label: '24'
      }, {
        value: '25',
        label: '25'
      }, {
        value: '26',
        label: '26'
      }, {
        value: '27',
        label: '27'
      }, {
        value: '28',
        label: '28'
      }, {
        value: '29',
        label: '29'
      }, {
        value: '30',
        label: '30'
      }, {
        value: '31',
        label: '31'
      }, {
        value: '32',
        label: '32'
      }, {
        value: '33',
        label: '33'
      }, {
        value: '34',
        label: '34'
      }, {
        value: '35',
        label: '35'
      }, {
        value: '36',
        label: '36'
      }, {
        value: '37',
        label: '37'
      }, {
        value: '38',
        label: '38'
      }, {
        value: '39',
        label: '39'
      }, {
        value: '40',
        label: '40'
      }],
      labelPosition: 'right',
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      options: [{
        value: '正常围产',
        label: '正常围产'
      }, {
        value: '高危围产',
        label: '高危围产'
      }, {
        value: '终止妊娠',
        label: '终止妊娠'
      }, {
        value: '完成分娩',
        label: '完成分娩'
      }],
      // createTimeStartStr: '',
      // createTimeEndStr: '',
      ageStart: '',
      ageEnd: '',
      realName: '',
      label: '',
      useridstr: '',
      auth: []
    }
  },
  methods: {
    // 复选框状态改变
    changeFun (val) {
      var userids = []
      val.forEach((v, k) => {
        userids.push(v.userId)
      })
      this.useridstr = userids.join(',')
    },
    // 导出所有用户excel
    all () {
      fetch({
        url: '/crm/user/downExcelAll',
        method: 'get',
        responseType: 'blob',
        success: (res) => {
          if (res.status === 200) {
            tool.download(res.data, '用户信息.xls', 'application/vnd.ms-excel;charset=utf-8')
            this.$notify({
              title: '导出成功',
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
        },
        fail: function (err) {
          console.log(err)
        }
      }, this)
    },
    // 所选用户
    excel () {
      fetch({
        url: '/crm/user/downData',
        method: 'get',
        responseType: 'blob',
        params: {
          type: 2,
          userIds: this.useridstr
        },
        success: (res) => {
          if (res.status === 200) {
            tool.download(res.data, '用户信息.xls', 'application/vnd.ms-excel;charset=utf-8')
            this.$notify({
              title: '导出成功',
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
        },
        fail: function (err) {
          console.log(err)
        }
      }, this)
    },
    //  pdf
    pdf () {
      fetch({
        url: '/crm/user/downData',
        method: 'get',
        responseType: 'blob',
        params: {
          type: 1,
          userIds: ''
        },
        success: (res) => {
          if (res.status === 200) {
            tool.download(res.data, '用户信息.pdf', 'application/pdf;charset=utf-8')
            this.$notify({
              title: '导出成功',
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
        },
        fail: function (err) {
          console.log(err)
        }
      }, this)
    },
    // 获取用户列表
    getList () {
      this.$store.dispatch('userList', {_this: this})
    },
    // 点击搜索
    search () {
      this.currPage = 1
      // this.createTimeStartStr = tool.dateFormat(this.registrationTime[0])
      // this.createTimeEndStr = tool.dateFormat(this.registrationTime[1])
      this.ageStart = this.AgeValue1
      this.ageEnd = this.AgeValue2
      this.realName = this.name
      this.label = this.tag
      this.$store.dispatch('userList', {
        _this: this,
        // createTimeStartStr: this.createTimeStartStr,
        // createTimeEndStr: this.createTimeEndStr,
        ageStart: this.ageStart,
        ageEnd: this.ageEnd,
        realName: this.realName,
        label: this.label
      })
    },
    // 点击清除
    clear () {
      this.name = ''
      // this.registrationTime = ''
      this.AgeValue1 = ''
      this.AgeValue2 = ''
      this.tag = ''
    },
    // 页面条数更改
    sizeChange (val) {
      this.bars = val
      this.$store.dispatch('userList', {_this: this,
        page: this.currPage,
        pageSize: val,
        // createTimeStartStr: this.createTimeStartStr,
        // createTimeEndStr: this.createTimeEndStr,
        ageStart: this.ageStart,
        ageEnd: this.ageEnd,
        realName: this.realName,
        label: this.label
      })
    },
    // 页面更改
    currentChange (val) {
      this.currPage = val
      this.$store.dispatch('userList', {_this: this,
        page: val,
        pageSize: this.bars,
        // createTimeStartStr: this.createTimeStartStr,
        // createTimeEndStr: this.createTimeEndStr,
        ageStart: this.ageStart,
        ageEnd: this.ageEnd,
        realName: this.realName,
        label: this.label
      })
    },
    // 查看
    chakan (userId, names) {
      this.names = names
      this.userId = userId
      this.typeValue = '0'
      this.isTrue = false
    },
    // 产前
    antenatal (userId, names) {
      this.names = names
      this.userId = userId
      this.typeValue = '1'
      this.isTrue = false
    },
    // 唐氏
    tangshi (userId, names) {
      this.names = names
      this.userId = userId
      this.typeValue = '2'
      this.isTrue = false
    },
    // B超
    Bultrasonic (userId, names) {
      this.names = names
      this.userId = userId
      this.typeValue = '3'
      this.isTrue = false
    },
    // 糖耐量
    sugarTolerance (userId, names) {
      this.names = names
      this.userId = userId
      this.typeValue = '4'
      this.isTrue = false
    },
    // 产后
    postpartum (userId, names) {
      this.names = names
      this.userId = userId
      this.typeValue = '5'
      this.isTrue = false
    },
    // 孕校
    school (userId, names) {
      this.names = names
      this.userId = userId
      this.typeValue = '6'
      this.isTrue = false
    },
    accept (lll) {
      this.currPage = lll
      this.isTrue = true
    }
  },
  mounted () {
    this.getList()
    this.auth = tool.localStorage.get('authTags')
  }
}
</script>

<style scoped lang="less">
  .search {
    width:100%;
    box-sizing: border-box;
    height:310px;
    padding-top:15px;
    background:rgba(255,255,255,1);
    text-align: center;
    .search_content{
      width:100%;
      box-sizing: border-box;
      height:180px;
      margin: 0 auto;
      margin-bottom: 20px;
      padding-top:20px;
      display: flex;
      justify-content: space-between;
      .el-form {
        width:95%;
        margin-right: 30px;
      }
    }
    .suresearch {
      background:rgba(78,164,255,1);
      margin-right:30px;
    }
    .clear {
      border: #69d7c6 !important;
      background:rgba(105,215,198,1);
    }
  }
  .el-date-editor {
    width:100% !important;
  }
  .list {
    width:100%;
    box-sizing: border-box;
    height: 729px;
    background: rgba(255,255,255,1);
    margin-top: 20px;
    .listhead {
      height: 47px;
      padding-top: 14px;
      button {
        float:right;
        margin-right:10px;
        background:rgba(78,164,255,1);
      }
    }
  }
  .footers {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #000;
    margin-top: 20px;
    color: #7f7f7f;
    time {
      input {
        display: inline-block;
        width: 70px;
        background: #eee;
        outline: none;
      }
    }
  }
  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-size: 14px;
    background: none;
    font-family:MicrosoftYaHei;
  }
</style>
