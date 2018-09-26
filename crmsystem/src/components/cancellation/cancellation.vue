<template>
  <div>
    <div v-if="isRecord" class='cancellation_content'>
      <div>
        <div>
          <h3>核销管理</h3>
          <p style="margin-top:10px;">更新时间: <span>{{time}}</span></p>
        </div>
        <el-button class="see" @click="record" type="primary" v-if="auth.indexOf('check_record_list') > -1">查看审核记录</el-button>
      </div>
      <div class="bigbox">
        <el-card class="box-card">
          <p>总核销数</p>
          <h1>{{allCheckCount}}</h1>
        </el-card>
        <el-card class="box-card">
          <p>今日核销总数</p>
          <h1>{{todayCheckCount}}</h1>
        </el-card>
        <el-card class="box-card">
          <p>昨日核销总数</p>
          <h1>{{yesterdayCheckCount}}</h1>
        </el-card>
      </div>
      <div class="choose">
        <div class="choose_content">
          <span>选择服务</span>
          <el-select v-model="server" placeholder="请选择" style="width:362px;">
            <el-option
              v-for="item in options"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </div>
        <div class="choose_content">
          <span>手机</span>
          <el-input v-model.trim="tel" placeholder="请输入手机号" style="width:362px;"></el-input>
        </div>
        <div class="choose_content">
          <span>验证码</span>
          <el-input v-model.trim="check" placeholder="输入验证码" style="width:362px;"></el-input>
        </div>
        <div class="choose_content">
          <el-button type="primary" @click="del" v-if="auth.indexOf('check_submit') > -1">核销</el-button>
        </div>
      </div>
    </div>
    <Record v-if="!isRecord" @toParent="Parent" :option="options"></Record>
  </div>
</template>

<script>
import Record from './record/record'
import { tool } from '../../common/util'
import { fetch } from '../../common/fetch'
export default {
  components: {
    Record
  },
  data () {
    return {
      isRecord: true,
      allCheckCount: 0,
      todayCheckCount: 0,
      yesterdayCheckCount: 0,
      time: '',
      server: '',
      tel: '',
      check: '',
      options: [],
      auth: []
    }
  },
  methods: {
    // 核销
    del () {
      fetch({
        url: '/crm/check/check',
        method: 'post',
        data: {
          checkCode: this.check,
          serviceCode: this.server,
          mobile: this.tel
        },
        success: (res) => {
          if (res.data.code === '0000') {
            this.$notify({
              title: '核销成功',
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
    record () {
      this.isRecord = false
    },
    Parent () {
      this.isRecord = true
    }
  },
  mounted () {
    this.time = tool.dateFormat(new Date())
    this.auth = tool.localStorage.get('authTags')
    // 核销数目
    fetch({
      url: '/crm/check/checkManage',
      method: 'get',
      success: (res) => {
        if (res.data.code === '0000') {
          this.allCheckCount = res.data.data.allCheckCount
          this.todayCheckCount = res.data.data.todayCheckCount
          this.yesterdayCheckCount = res.data.data.yesterdayCheckCount
        } else {
          this.$message.error(res.data.msg)
        }
      },
      fail: function (err) {
        console.log(err)
      }
    }, this)
    // 获取所有服务
    fetch({
      url: '/crm/check/serviceNameList',
      method: 'get',
      success: (res) => {
        if (res.data.code === '0000') {
          this.options = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      },
      fail: function (err) {
        console.log(err)
      }
    }, this)
  }
}
</script>

<style scoped lang="less">
  .see {
    float: right;
    margin-top:-35px;
  }
  h3,p,h1{
    padding: 0;
    margin: 0;
  }
  h1{
    font-size:58px;
    font-family:MicrosoftYaHei-Bold;
    color:rgba(68,68,68,1);
    margin-top: 30px;
    margin-left: 10px;
  }
  h3{
    height:37px;
    font-size:28px;
    font-family:MicrosoftYaHei;
    color:rgba(51,51,51,1);
    line-height:37px;

  }
  p{
    height:24px;
    font-size:18px;
    font-family:MicrosoftYaHei;
    color:rgba(85,85,85,1);
  }
  .cancellation_content{
    padding:60px;
    width:100%;
    box-sizing: border-box;
    height:814px;
    background:rgba(255,255,255,1);
  }
  .bigbox {
    display: flex;
    justify-content: space-between;
    margin-top: 80px;
    width: 100%;
    .box-card {
      padding:20px;
      width:24% !important;
      height:180px;
    }
  }
  .choose {
    margin-top: 80px;
    text-align: center;
    .choose_content {
      margin-top: 20px;
      span {
        font-size:18px;
        text-align: right;
        font-family:MicrosoftYaHei;
        color:rgba(85,85,85,1);
        display: inline-block;
        margin-right:20px;
        width:80px;
      }
    }

  }

</style>
