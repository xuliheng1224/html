<template>
  <div>
    <div style="position:relative;background:#fff;margin-bottom:30px;">
        <h2>会员卡订单详情</h2>
        <el-button type="primary" @click="back" class='back'>返回</el-button>
    </div>
    <el-card>
      <div slot="header">
        <span>基本信息</span>
      </div>
      <div>
        <div class='rowss'>
          <div>
            <span>订单号:</span>
            <time>{{resdata.orderCode}}</time>
          </div>
          <div>
            <span>购买人:</span>
            <time>{{resdata.userName}}(ID:{{resdata.userId}})/{{resdata.userPhone}}</time>
          </div>
        </div>
        <div class='rowss'>
          <div>
            <span>来源:</span>
            <time>{{resdata.source}}</time>
          </div>
          <div>
            <span>下单时间:</span>
            <time>{{resdata.createTimeFormat}}</time>
          </div>
        </div>
        <div class='rowss'>
          <div>
            <span>付款单号:</span>
            <time>{{resdata.paymentNo}}</time>
          </div>
          <div>
            <span>服务包价格:</span>
            <time>{{resdata.originalYuanAmount}}</time>
          </div>
        </div>
        <div class='rowss'>
          <div>
            <span>服务包状态:</span>
            <time>{{resdata.status}}</time>
          </div>
          <div>
            <span>失效时间:</span>
            <time>{{resdata.expireTimeFormat}}</time>
          </div>
        </div>
        <div class='rowss'>
          <div>
            <span>分成渠道:</span>
            <time>{{resdata.hosName}}-{{resdata.cardChannel}}</time>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header">
        <span>服务包信息</span>
      </div>
      <div style="padding:20px;font-size:14px;">
        <p>
          <span>服务包名称:</span>
          <time>{{resdata.packName}}</time>
        </p>
        <p>
          <span>服务包余量:</span>
          <el-button type="primary" size="small" @click='open'>查看</el-button>
        </p>
        <p>
          <span>服务包使用情况:</span>
          <ul>
            <li v-for='(item, index) in useList' :key='index'>
              <span>问诊单: {{item}}</span>
            </li>
          </ul>
        </p>
      </div>
    </el-card>
    <package :dialogVisible='isShow' @prarentShow='parent' :couponList='couponList' :serviceInfoList='serviceInfoList' :servicePackOrderItemList='servicePackOrderItemList' :twServiceIno='twServiceIno' :status='status'></package>
  </div>
</template>

<script>
import { fetch } from '../../common/fetch'
import Package from './viewservicepackage'
export default {
  components: {
    Package
  },
  data () {
    return {
      resdata: '',
      isShow: false,
      useList: [],
      couponList: [],
      serviceInfoList: [],
      servicePackOrderItemList: [],
      twServiceIno: '',
      status: ''
    }
  },
  mounted () {
    fetch({
      url: '/crm/order/detail/package',
      method: 'get',
      params: {
        orderId: this.$route.query.orderId
      },
      success: (res) => {
        this.servicePackOrderItemList = res.data.data.servicePackOrderItemList
        this.twServiceIno = res.data.data.twServiceIno
        this.serviceInfoList = res.data.data.serviceInfoList
        this.couponList = res.data.data.couponList
        this.useList = res.data.data.useHistoryList
        this.resdata = res.data.data.servicePackOrderCmsInfo
        this.status = this.resdata.status
        if (this.resdata.source === 1) {
          this.resdata.source = '扫描二维码'
        } else if (this.resdata.source === 2) {
          this.resdata.source = '分享页'
        } else if (this.resdata.source === 3) {
          this.resdata.source = '医生主页'
        } else {
          this.resdata.source = '医院主页'
        }
        if (this.resdata.status === 1) {
          this.resdata.status = '待付款'
        } else if (this.resdata.status === 2) {
          this.resdata.status = '有效'
        } else if (this.resdata.status === 3) {
          this.resdata.status = '已退款'
        } else if (this.resdata.status === 4) {
          this.resdata.status = '无效'
        } else {
          this.resdata.status = '已取消'
        }
      },
      fail: function (err) {
        console.log(err)
      }
    }, this)
  },
  methods: {
    back () {
      history.back(-1)
    },
    // 查看
    open () {
      this.isShow = !this.isShow
    },
    parent () {
      this.isShow = false
    }
  }
}
</script>
<style scoped lang='less'>
.box-card {
  margin-top: 30px;
}
ul {
  list-style: none;
  font-size: 12px;
}
h2 {
  margin: 0;
  color: #444444;
  font-weight: 100;
  padding: 20px;
  font-size: 20px;
  border-bottom: 2px solid #606266;
}
.rowss {
  display: flex;
  font-size: 14px;
  margin: 20px 0;
  padding: 0 30px;
  div {
    width: 50%;
  }
}
span {
  color: #606266;
  margin-right: 10px;
}
time {
  color: #606266;
}
.back {
    position: absolute;
    top: 20px;
    right: 20px;
}
</style>
