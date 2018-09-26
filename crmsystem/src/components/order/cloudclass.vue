<template>
  <div>
    <div style="position:relative;background:#fff;margin-bottom:30px;">
        <h2>云课堂订单详情</h2>
        <el-button type="primary" @click="back">返回</el-button>
    </div>
    <el-card>
      <div slot="header">
        <span>基本信息</span>
      </div>
      <div>
        <div class='rowss'>
          <div>
            <span>订单号:</span>
            <time>{{resdata.orderNo}}</time>
          </div>
          <div>
            <span>订单状态:</span>
            <time>{{resdata.orderStatus}}</time>
          </div>
        </div>
        <div class='rowss'>
          <div>
            <span>订单来源:</span>
            <time>{{resdata.courseType}}</time>
          </div>
          <div>
            <span>下单时间:</span>
            <time>{{resdata.createTimeFormat}}</time>
          </div>
        </div>
        <div class='rowss'>
          <div>
            <span>购买人:</span>
            <time>{{resdata.nickName}}(ID:{{resdata.userId}})/{{resdata.mobile}}</time>
          </div>
          <div>
            <span>支付方式:</span>
            <time>{{resdata.payment}}</time>
          </div>
        </div>
        <div class='rowss'>
          <div>
            <span>付款时间:</span>
            <time>{{resdata.payTimeFormat}}</time>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header">
        <span>商品信息</span>
      </div>
      <div class='rowss'>
          <div style="width:50%;">
            <span>商品名称:</span>
            <time>{{resdata.name}}(课程编号:{{resdata.accountNo}})</time>
          </div>
          <div>
            <span>订单总额:</span>
            <time>{{resdata.voAmount}}</time>
          </div>
        </div>
    </el-card>
  </div>
</template>

<script>
import { fetch } from '../../common/fetch'
export default {
  data () {
    return {
      resdata: ''
    }
  },
  mounted () {
    fetch({
      url: '/crm/order/detail/course',
      method: 'get',
      params: {
        orderId: this.$route.query.orderId
      },
      success: (res) => {
        this.resdata = res.data.data
        if (this.resdata.orderStatus === 0) {
          this.resdata.orderStatus = '已付款'
        } else if (this.resdata.orderStatus === 1) {
          this.resdata.orderStatus = '未支付'
        } else {
          this.resdata.orderStatus = '支付超时'
        }
        if (this.resdata.courseType === 0) {
          this.resdata.courseType = '未知'
        } else if (this.resdata.courseType === 1) {
          this.resdata.courseType = '专家来了'
        } else {
          this.resdata.courseType = '妈咪学院'
        }
        if (this.resdata.payment === 0) {
          this.resdata.payment = '未知'
        } else if (this.resdata.payment === 1) {
          this.resdata.payment = '支付宝'
        } else {
          this.resdata.payment = '微信'
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
    }
  }
}
</script>
<style scoped lang='less'>
.box-card {
  margin-top: 30px;
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
    span {
      color: #606266;
      margin-right: 10px;
    }
    time {
      color: #606266;
    }
  }
}
button {
    position: absolute;
    top: 20px;
    right: 20px;
}
</style>
