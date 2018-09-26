<template>
  <div>
    <div class='search'>
      <div class='search_content'>
        <el-form :label-position="labelPosition" label-width="80px">
          <el-form-item label="姓名:">
            <el-input v-model.trim="name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="身份证:">
            <el-input v-model.trim="idcard" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="预产期:" >
            <el-date-picker
              style="width: 100%;"
              v-model="expectedTime"
              type="datetimerange"
              :picker-options="pickerOptions2"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <el-form :label-position="labelPosition" label-width="100px">
          <el-form-item label="电话:">
            <el-input v-model.trim="tel" placeholder="请输入" style="width:100%;"></el-input>
          </el-form-item>
          <el-form-item label="出生日期:" >
            <el-date-picker
              style="width: 100%;"
              v-model="birthTime"
              type="datetimerange"
              :picker-options="pickerOptions2"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="预约到院日期:" >
            <el-date-picker
              style="width: 100%;"
              v-model="arriveTime"
              type="datetimerange"
              :picker-options="pickerOptions2"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <el-button type="primary" class="suresearch" @click="search">搜索</el-button>
      <el-button type="primary" class="clear" @click="clear">清除</el-button>
    </div>
    <div style="height:30px;background:#F6F5F9;width: 100%;"></div>
    <div class="list_content">
      <div style="cursor: pointer;margin-bottom: 10px;height:40px;">
        <el-button type="primary" @click="daochu" style="float: right;margin-right: 100px;" v-if="auth.indexOf('smallCard_export') > -1">导出列表</el-button>
      </div>
    </div>
    <div>
      <el-table
        :data="smallData"
        border
        style="width: 100%;">
        <el-table-column
          type="index"
          label="序号"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="realName"
          label="姓名"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="手机"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="idCard"
          label="身份证号"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="出生日期"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{too(scope.row.birth)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="预产期"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{too(scope.row.userEdc)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="预约到院日期"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{too(scope.row.orderTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{too(scope.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="最后操作时间"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{too(scope.row.updateTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="operationName"
          label="最后操作者"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="chakan(scope.row.userId)" v-if="auth.indexOf('smallCard_detail') > -1">查看</el-button>
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
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { tool } from '../../common/util'
import { fetch } from '../../common/fetch'
export default {
  data () {
    return {
      labelPosition: 'right',
      name: '',
      idcard: '',
      tel: '',
      total: 0,
      expectedTime: '',
      birthTime: '',
      arriveTime: '',
      smallData: [],
      smallcards: {},
      bars: 10,
      currPage: 1,
      auth: [],
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
      }
    }
  },
  methods: {
    getList (op) {
      fetch({
        url: '/crm/smallCard/list',
        method: 'get',
        params: op,
        success: (res) => {
          if (res.data.code === '0000') {
            this.smallData = res.data.data.list
            this.total = res.data.data.totalCount
          } else {
            this.$message.error(res.data.msg)
          }
        },
        fail: function (err) {
          console.log(err)
        }
      }, this)
    },
    too (time) {
      if (time > 0) {
        return tool.dateFormat(new Date(time))
      } else {
        return ''
      }
    },
    // 搜索
    search () {
      this.currPage = 1
      var op = {
        userEdcStartStr: this.expectedTime ? tool.dateFormat(this.expectedTime[0]) : '',
        userEdcEndStr: this.expectedTime ? tool.dateFormat(this.expectedTime[1]) : '',
        birthdayStartStr: this.birthTime ? tool.dateFormat(this.birthTime[0]) : '',
        birthdayEndStr: this.birthTime ? tool.dateFormat(this.birthTime[1]) : '',
        orderTimeStartStr: this.arriveTime ? tool.dateFormat(this.arriveTime[0]) : '',
        orderTimeEndStr: this.arriveTime ? tool.dateFormat(this.arriveTime[1]) : '',
        idCard: this.idcard,
        realName: this.name,
        mobile: this.tel
      }
      this.getList(op)
    },
    // 清除
    clear () {
      this.name = ''
      this.idcard = ''
      this.tel = ''
      this.expectedTime = ''
      this.birthTime = ''
      this.arriveTime = ''
    },
    // 查看
    chakan (userId) {
      this.$router.push({path: '/smallcarddetail', query: {userId: userId}})
    },
    sizeChange (val) {
      this.bars = val
      var op = {
        pageNo: this.currPage,
        pageSize: val,
        userEdcStartStr: this.expectedTime ? tool.dateFormat(this.expectedTime[0]) : '',
        userEdcEndStr: this.expectedTime ? tool.dateFormat(this.expectedTime[1]) : '',
        birthdayStartStr: this.birthTime ? tool.dateFormat(this.birthTime[0]) : '',
        birthdayEndStr: this.birthTime ? tool.dateFormat(this.birthTime[1]) : '',
        orderTimeStartStr: this.arriveTime ? tool.dateFormat(this.arriveTime[0]) : '',
        orderTimeEndStr: this.arriveTime ? tool.dateFormat(this.arriveTime[1]) : '',
        idCard: this.idcard,
        realName: this.name,
        mobile: this.tel
      }
      this.getList(op)
    },
    currentChange (val) {
      this.currPage = val
      var op = {
        pageNo: val,
        pageSize: this.bars,
        userEdcStartStr: this.expectedTime ? tool.dateFormat(this.expectedTime[0]) : '',
        userEdcEndStr: this.expectedTime ? tool.dateFormat(this.expectedTime[1]) : '',
        birthdayStartStr: this.birthTime ? tool.dateFormat(this.birthTime[0]) : '',
        birthdayEndStr: this.birthTime ? tool.dateFormat(this.birthTime[1]) : '',
        orderTimeStartStr: this.arriveTime ? tool.dateFormat(this.arriveTime[0]) : '',
        orderTimeEndStr: this.arriveTime ? tool.dateFormat(this.arriveTime[1]) : '',
        idCard: this.idcard,
        realName: this.name,
        mobile: this.tel
      }
      this.getList(op)
    },
    // 导出列表
    daochu () {
      fetch({
        url: '/crm/smallCard/export',
        method: 'get',
        responseType: 'blob',
        success: (res) => {
          if (res.status === 200) {
            tool.download(res.data, '建档-小卡.xls', 'application/vnd.ms-excel;charset=utf-8')
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
      margin-bottom: 20px;
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
      margin-bottom: 20px;
    }
    .clear {
      border: #69d7c6 !important;
      background:rgba(105,215,198,1);
    }
  }
  .list_content {
    margin-top: 20px;
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
</style>
