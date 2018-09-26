<template>
  <div class="login">
    <div class="content">
      <div style="text-align: center;">
        <img src="../../assets/image/name.png" alt="">
      </div>
      <div class="iput">
        <h3>欢迎登录管理系统</h3>
        <el-input type="text" v-model="user" auto-complete="off" placeholder="请输入医院账号"></el-input>
        <el-input type="password" v-model="password" auto-complete="off" placeholder="请输入密码"></el-input>
        <div style="text-align: center;">
          <el-button type="primary" round @click="getlogin">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      user: '',
      password: ''
    }
  },
  computed: mapState({
    login: state => state.loginStore
  }),
  methods: {
    getlogin () {
      if (this.user) {
        if (this.password) {
          this.$store.dispatch('getLogin', { _this: this, user: this.user, password: this.password })
        } else {
          this.$message.error('密码不能为空')
        }
      } else {
        this.$message.error('用户名不能为空')
      }
    }
  }
}
</script>

<style scoped lang="less">
  h3{
    margin:0;
  }
  .login{
    width: 100%;
    height: 100%;
    background: url("../../assets/image/bg.jpg") no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .content{
      height:468px;
      margin:auto;
      .iput{
        flex-direction: column;
        box-sizing: border-box;
        padding: 0 78px;
        padding-top: 55px;
        width: 486px;
        height: 327px;
        background: #fff;
        margin: 0 auto;
        transform: translate(10px,0);
      }
    }
  }
  .el-input{
    margin-top:30px !important;
  }
  .el-button{
    margin-top:30px;
    width:200px !important;
  }
</style>
