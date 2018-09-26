<template>
    <div class="basic_content" v-if="user.UserSchoolBaseInfo">
      <div class="tab" >
        <span>姓名</span><time>{{user.UserSchoolBaseInfo.realName}}</time>
      </div>
      <div class="tab">
        <span>性别</span><time>{{user.UserSchoolBaseInfo.gender === 2 ? '女' : '男'}}</time>
      </div>
      <div class="tab">
        <span>手机号</span><time>{{user.UserSchoolBaseInfo.mobile}}</time>
      </div>
      <div class="tab">
        <span>注册时间</span><time>{{user.UserSchoolBaseInfo.registerTimeCH}}</time>
      </div>
      <div class="tab">
        <span>注册渠道</span><time>{{user.UserSchoolBaseInfo.registerSource}}</time>
      </div>
      <div class="tab">
        <span>最后签到时间</span><time>{{user.UserSchoolBaseInfo.lastSignTimeCH}}</time>
      </div>
      <div class="tab">
        <span>最后登录时间</span><time>{{user.UserSchoolBaseInfo.lastLoginTimeCH}}</time>
      </div>
      <div class="tab">
        <span>高危因素</span><time>{{user.UserSchoolBaseInfo.highRiskMsg}}</time>
      </div>
      <div class="tab">
        <span style="float:left;">添加高危信息</span> <textarea v-model="textare" style="outline: none;"/>
      </div>
      <div class="tab">
        <span></span><button @click="addRisk" v-if="auth.indexOf('user_risk_save') > -1">保存</button>
      </div>
    </div>
</template>

<script>
import { tool } from '../../../common/util'
export default {
  data () {
    return {
      data: '',
      textare: '',
      auth: []
    }
  },
  props: ['user'],
  methods: {
    // 添加高危信息
    addRisk () {
      this.$store.dispatch('highRisk', {_this: this,
        userId: this.user.userId,
        highRisk: this.textare})
    }
  },
  mounted () {
    this.auth = tool.localStorage.get('authTags')
  }
}
</script>

<style scoped lang="less">
  .basic_content {
    margin-left: 50px;
    .tab {
      margin-top:20px;
      span {
        display: inline-block;
        width:200px;
        font-size:14px;
      }
      time {
        display: inline-block;
        font-size:14px;
        color: #777777;
      }
      textarea {
        width:305px;
        height:137px;
        background:rgba(245,247,249,1);
        border-radius:2px;
        border:1px solid rgba(237,237,237,1);
      }
      button {
        width:87px;
        height:35px;
        background:rgba(78,164,255,1);
        border-radius:2px;
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:rgba(255,255,255,1);
        outline: none;
        cursor:pointer
      }
    }
  }
</style>
