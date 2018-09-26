<template>
  <div>
    <div class='search'>
      <el-button type="primary" @click="back" class="back">返回</el-button>
      <div class='search_content'>
        <el-form :label-position="labelPosition" label-width="80px">
          <el-form-item label="核销用户">
            <el-input v-model.trim="name" placeholder="请输入用户名或手机号"></el-input>
          </el-form-item>
          <el-form-item label="核销时间">
            <el-date-picker
              style="width: 100%;"
              v-model="time"
              type="datetimerange"
              :picker-options="pickerOptions2"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <el-form :label-position="labelPosition" label-width="80px">
          <el-form-item label="选择服务">
            <el-select v-model="server" placeholder="请选择" style="width:97%;">
              <el-option
                v-for="item in option"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <el-button type="primary" class="suresearch" @click="search">搜索</el-button>
      <el-button type="primary" class="clear" @click="clear">清除</el-button>
    </div>
    <div style="width:100%;background:rgba(255,255,255,1);padding-bottom: 20px;box-sizing: border-box;">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%;">
        <el-table-column
          type="index"
          label="序号"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="serviceName"
          label="核销服务"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="realName"
          label="核销用户"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="packName"
          label="所属服务卡"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="核销时间"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{too(scope.row.checkTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="updateUserId"
          label="操作人"
          show-overflow-tooltip>
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
import { fetch } from '../../../common/fetch'
import { tool } from '../../../common/util'
export default {
  data () {
    return {
      name: '',
      server: '',
      time: '',
      total: 0,
      bars: 10,
      background: '#999999',
      labelPosition: 'left',
      tableData: [],
      currPage: 1,
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
  props: ['option'],
  methods: {
    too (time) {
      if (time > 0) {
        return tool.dateFormat(new Date(time))
      } else {
        return ''
      }
    },
    search () {
      this.currPage = 1
      var op = {
        keyWord: this.name,
        serviceCode: this.server,
        checkStartTime: this.time ? tool.dateFormat(this.time[0]) : '',
        checkEndTime: this.time ? tool.dateFormat(this.time[1]) : ''
      }
      this.getList(op)
    },
    clear () {
      this.name = ''
      this.server = ''
      this.time = ''
    },
    back () {
      this.$emit('toParent')
    },
    // 页面条数修改
    sizeChange (val) {
      this.bars = val
      var op = {
        pageNo: this.currPage,
        pageSize: val,
        keyWord: this.name,
        serviceCode: this.server,
        checkStartTime: this.time ? tool.dateFormat(this.time[0]) : '',
        checkEndTime: this.time ? tool.dateFormat(this.time[1]) : ''
      }
      this.getList(op)
    },
    // 页面修改
    currentChange (val) {
      this.currPage = val
      var op = {
        pageNo: val,
        pageSize: this.bars,
        keyWord: this.name,
        serviceCode: this.server,
        checkStartTime: this.time ? tool.dateFormat(this.time[0]) : '',
        checkEndTime: this.time ? tool.dateFormat(this.time[1]) : ''
      }
      this.getList(op)
    },
    getList (op) {
      var that = this
      fetch({
        url: '/crm/check/checkLog',
        method: 'get',
        params: op,
        success: (res) => {
          if (res.data.code === '0000') {
            that.tableData = res.data.data.list
            that.total = res.data.data.totalCount
          } else {
            that.$message.error(res.data.msg)
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
  }
}
</script>

<style scoped lang="less">
  .search {
    width:100%;
    box-sizing: border-box;
    height:350px;
    padding-top:15px;
    margin-bottom: 30px;
    background:rgba(255,255,255,1);
    text-align: center;
    .search_content{
      width:100%;
      box-sizing:border-box;
      height:180px;
      margin: 0 auto;
      margin-bottom: 20px;
      padding-top:20px;
      display: flex;
      justify-content: space-between;
      .el-form {
        width:95%;
        margin: 20px;
      }
    }
  }
  .suresearch {
    background:rgba(78,164,255,1);
    margin-right:30px;
  }
  .clear {
    background:rgba(105,215,198,1);
    border: #69d7c6 !important;
  }
  .back {
    float: right;
    margin-right: 50px;

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
