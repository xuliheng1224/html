<template>
  <div>
    <div>
      <div class='search'>
        <div class='search_content'>
          <el-form :label-position="labelPosition" label-width="120px">
            <el-form-item label="用户ID:">
              <el-input v-model.trim="name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="订单ID:">
              <el-input v-model.trim="orderId" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="订单创建时间:">
              <el-date-picker
                style="width: 100%;"
                v-model="orderTime"
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
            <el-form-item label="手机号:">
              <el-input v-model.trim="tel" placeholder="请输入" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item label="订单状态:">
              <el-select v-model="tag" clearable placeholder="请选择" style="width:100%;">
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
      <div style="width:100%;padding-bottom: 20px;background: #fff;">
        <el-table
          :data="tableData"
          border
          style="width: 100%;">
          <el-table-column
            prop="orderId"
            label="订单编号"
            show-overflow-tooltip>
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
            prop="orderStatus"
            label="订单状态"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="orderType"
            label="订单类型"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="createTimeStr"
            label="订单创建时间"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="订单总额"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.totalMoney/100}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="source"
            label="订单来源"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="操作"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="chakan(scope.row.orderId,scope.row.orderType)">查看</el-button>
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
  </div>
</template>

<script>
import { fetch } from '../../common/fetch'
import { tool } from '../../common/util'
export default {
  data () {
    return {
      background: '#999999',
      orderId: '',
      orderTime: '',
      tel: '',
      labelPosition: 'left',
      tag: '',
      name: '',
      total: 0,
      bars: 10,
      currPage: 1,
      options: [{
        value: '已付款',
        label: '已付款'
      }, {
        value: '未支付(刚创建)',
        label: '未支付(刚创建)'
      }, {
        value: '支付超时',
        label: '支付超时'
      }, {
        value: '退款',
        label: '退款'
      }, {
        value: '待支付',
        label: '待支付'
      }, {
        value: '待接诊',
        label: '待接诊'
      }, {
        value: '问珍中',
        label: '问珍中'
      }, {
        value: '已取消',
        label: '已取消'
      }, {
        value: '已退诊',
        label: '已退诊'
      }, {
        value: '已完成',
        label: '已完成'
      }, {
        value: '取消',
        label: '取消'
      }, {
        value: '创建待支付',
        label: '创建待支付'
      }, {
        value: '支付成功',
        label: '支付成功'
      }, {
        value: '已退款',
        label: '已退款'
      }, {
        value: '服务失效',
        label: '服务失效'
      }, {
        value: '未付款',
        label: '未付款'
      }, {
        value: '已付款，未发货',
        label: '已付款，未发货'
      }, {
        value: '已付款，已发货',
        label: '已付款，已发货'
      }, {
        value: '已收货',
        label: '已收货'
      }, {
        value: '临时订单',
        label: '临时订单'
      }, {
        value: '付款超时取消订单',
        label: '付款超时取消订单'
      }, {
        value: '已删除订单',
        label: '已删除订单'
      }],
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
      tableData: []
    }
  },
  methods: {
    // 搜索
    search () {
      this.currPage = 1
      var op = {
        userId: this.name,
        orderId: this.orderId,
        mobile: this.tel,
        orderStatus: this.tag,
        startTime: this.orderTime ? tool.dateFormat(this.orderTime[0]) : '',
        endTime: this.orderTime ? tool.dateFormat(this.orderTime[1]) : ''
      }
      this.getList(op)
    },
    // 清除
    clear () {
      this.name = ''
      this.orderId = ''
      this.tel = ''
      this.tag = ''
      this.orderTime = ''
    },
    // 查看
    chakan (v, t) {
      switch (t) {
        case '云课堂':
          this.$router.push({path: '/cloudclass', query: {orderId: v}})
          break
        case '会员卡':
          this.$router.push({path: '/membershipcard', query: {orderId: v}})
          break
        default:
          this.$router.push({path: '/finddoctor', query: {orderId: v}})
          break
      }
    },
    // 页面条数更改
    sizeChange (val) {
      this.bars = val
      var op = {
        page: this.currPage,
        pageSize: val,
        userId: this.name,
        orderId: this.orderId,
        mobile: this.tel,
        orderStatus: this.tag,
        startTime: this.orderTime ? tool.dateFormat(this.orderTime[0]) : '',
        endTime: this.orderTime ? tool.dateFormat(this.orderTime[1]) : ''
      }
      this.getList(op)
    },
    // 页面更改
    currentChange (val) {
      this.currPage = val
      var op = {
        page: val,
        pageSize: this.bars,
        userId: this.name,
        orderId: this.orderId,
        mobile: this.tel,
        orderStatus: this.tag,
        startTime: this.orderTime ? tool.dateFormat(this.orderTime[0]) : '',
        endTime: this.orderTime ? tool.dateFormat(this.orderTime[1]) : ''
      }
      this.getList(op)
    },
    // 调用接口
    getList (op) {
      fetch({
        url: '/crm/order/list',
        method: 'get',
        params: op,
        success: (res) => {
          if (res.data.code === '0000') {
            this.tableData = res.data.data.list
            this.total = res.data.data.totalCount
            this.bars = res.data.data.pageSize
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
  }
}
</script>

<style scoped lang="less">
  .el-date-editor {
    width:100% !important;
  }
  .search {
    box-sizing: border-box;
    width:100%;
    height:310px;
    padding-top:15px;
    background:rgba(255,255,255,1);
    text-align: center;
    .search_content{
      box-sizing: border-box;
      width:100%;
      height:180px;
      margin: 0 auto;
      margin-bottom: 20px;
      padding-top:20px;
      display: flex;
      justify-content: space-between;
      .el-form {
        width:50%;
        margin:20px;
      }
    }
    .suresearch {
      background:rgba(78,164,255,1);
      margin-right:30px;
      margin-top: 30px;
    }
    .clear {
      background:rgba(105,215,198,1);
      border: #69d7c6 !important;
      margin-top: 30px;
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
</style>
