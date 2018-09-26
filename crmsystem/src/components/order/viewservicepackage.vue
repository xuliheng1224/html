<template>
  <div class="pa-mian">
    <el-dialog title="查看服务" :visible.sync="dialogVisible" width="70%" :show-close="false" :close-on-click-modal="false">
      <div class='content'>
        <div>
          <ul>
            <li>类型</li>
            <li>服务</li>
            <li>有效期</li>
            <li>内容</li>
            <li>备注</li>
          </ul>
        </div>
        <div class='content_label' v-if='twServiceIno'>
          <div class='label'>
            在线问诊
          </div>
          <div style="flex-grow:1;">
            <div class='ffff'>
              <p>{{twServiceIno.serviceName}}</p>
              <p>{{twServiceIno.expireTimeFormat}}</p>
              <p>{{twServiceIno.content}}</p>
              <p></p>
            </div>
          </div>
        </div>
        <div class='content_label' v-if='serviceInfoList.length>0'>
          <div class='label'>
            线下核销
          </div>
          <div style="flex-grow:1;width:80%;">
            <div class='ffff' v-for='(item, index) in serviceInfoList' :key='index'>
              <p>{{item.serviceName}}</p>
              <p>{{item.expireTimeFormat}}</p>
              <p>{{item.content}}</p>
              <p>{{item.note}}</p>
            </div>
          </div>
        </div>
        <div class='content_label' v-if='servicePackOrderItemList.length>0'>
          <div class='label'>
            云课堂
          </div>
          <div style="flex-grow:1;width:80%;">
            <div class='ffff' v-for='(item, index) in servicePackOrderItemList' :key='index'>
              <p>{{item.linkName}}(ID:{{item.accoutNo}})</p>
              <p></p>
              <p></p>
              <p>{{comstatus}}</p>
            </div>
          </div>
        </div>
        <div class='content_label' v-if='couponList.length>0'>
          <div class='label'>
            优惠券
          </div>
          <div style="flex-grow:1;width:80%;">
            <div class='ffff' v-for='(item, index) in couponList' :key='index'>
              <p>优惠券</p>
              <p></p>
              <p>{{item.couponName}}(ID:{{item.couponNo}})</p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel" size='small'>关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['dialogVisible', 'twServiceIno', 'serviceInfoList', 'servicePackOrderItemList', 'couponList', 'status'],
  computed: {
    comstatus () {
      var stass = ''
      if (this.status === 1) {
        stass = '待付款'
      } else if (this.status === 2) {
        stass = '长期有效'
      } else if (this.status === 3) {
        stass = '已退款'
      } else if (this.status === 4) {
        stass = '长期有效'
      } else {
        stass = '无效'
      }
      return stass
    }
  },
  data () {
    return {
    }
  },
  methods: {
    cancel () {
      this.$emit('prarentShow')
    }
  }
}
</script>
<style scoped lang="less">
p {
  margin:0;
  padding:0;
}
ul {
  list-style: none;
  margin: 0;
  overflow: hidden;
  padding: 0;
  display: flex;
  li {
    flex: 1;
    padding:10px;
    background: #b9d9f7;
    text-align: center;
    border-right:1px solid #ccc;
  }
}
.el-dialog__body {
  padding: 0 !important;
}
.content_label {
  overflow: hidden;
  display: flex;
  width: 100%;
}
.label {
  width:20%;
  box-sizing: border-box;
  padding:5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right:1px solid #ccc;
  border-left:1px solid #ccc;
  border-bottom:1px solid #ccc;
}
.ffff {
  display: flex;
  width:100%;
  p {
    width:20%;
    box-sizing: border-box;
    flex:1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-right:1px solid #ccc;
    border-bottom:1px solid #ccc;
    padding: 10px 0;
  }
}
</style>
