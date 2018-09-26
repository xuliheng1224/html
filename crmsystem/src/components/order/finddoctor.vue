<template>
  <div style="background:#fff;padding:20px;overflow:hidden;">
      <div style="position:relative;">
        <h2>问诊单详情</h2>
        <el-button type="primary" @click="back" class="back">返回</el-button>
      </div>
      <div class='rowss'>
          <div style='width:50%;'>
              <span>就诊人:</span>
              <time>{{resdata.userName}}--{{resdata.age}}-{{resdata.userStatus}}</time>
          </div>
          <div>
              <span>下单时间:</span>
              <time>{{resdata.createTimeFormat}}</time>
          </div>
      </div>
      <div class='rowss'>
          <div style='width:50%;'>
              <span>用户姓名:</span>
              <time>{{resdata.userName}}({{resdata.userId}})</time>
          </div>
          <div>
              <span>问诊来源:</span>
              <time>{{resdata.sourceCh}}({{resdata.sourceId}})</time>
          </div>
      </div>
      <div class='rowss'>
          <div style='width:50%;'>
              <span>症状描述:</span>
              <time>{{resdata.symptom}}</time>
          </div>
          <div>
              <span>问诊编号:</span>
              <time>{{resdata.code}}</time>
          </div>
      </div>
      <div class='rowss'>
          <div style='width:50%;'>
              <span>接诊医生:</span>
              <time>{{resdata.doctorName}}({{resdata.providerId}})-{{resdata.hosName}}-{{resdata.deptName}}-{{resdata.doctorMobile}}</time>
          </div>
          <div>
              <span>支付金额:</span>
              <time>{{resdata.actureMoneyStr}}<span v-if='resdata.orderNo'>({{resdata.orderNo}})</span></time>
          </div>
      </div>
      <div class='rowss'>
          <div style='width:50%;'>
              <span>会话单号:</span>
              <time>{{resdata.sessionId}}</time>
          </div>
          <div>
              <span>问诊状态:</span>
              <time>{{resdata.statusCh}},{{resdata.statusBackCnName}}</time>
          </div>
      </div>
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
      url: '/crm/order/detail/inquiry',
      method: 'get',
      params: {
        orderId: this.$route.query.orderId
      },
      success: (res) => {
        this.resdata = res.data.data
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
h2 {
  margin: 0;
  color: #444444;
  font-weight: 100;
  padding: 20px 0;
  border-bottom: 2px solid #606266;
}
.rowss {
  display: flex;
  font-size: 14px;
  margin: 20px 0;
  span {
      color: #606266;
      margin-right: 15px;
  }
  time {
      color: #606266;
  }
}
button {
    position: absolute;
    top: 0;
    right: 0;
}
</style>
