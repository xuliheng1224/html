<template>
  <div class="test_type_title">
    <div class="title_text">新增测试</div>
    <div class="test_type_main">
      <div class="test_type_opt">
        <span>请选择测试的类型</span>
        <span style="color: #e0e0e0;">（完成创建后，测试类型无法修改）</span>
      </div>
      <div class="box_main">
        <el-card class="box-card">
          <img class="box_img"  src="http://192.168.0.104:8081/fuer-hospital-admin/static/xinzengcreate/images/1.png" alt="">
          <div class="box_text">
            <div style="font-size: 16px;margin-bottom:10px">基本对错题</div>
            <div>对照设置的答案，根据用户回答，反馈给用户答对或答错几题</div>
          </div>
          <a href="/basic">
            <el-button type="primary" class="box_btn">创建</el-button>
          </a>
        </el-card>
        <el-card class="box-card">
          <img class="box_img"  src="http://192.168.0.104:8081/fuer-hospital-admin/static/xinzengcreate/images/2.png" alt="">
          <div class="box_text">
            <div style="font-size: 16px;margin-bottom:10px">选项得分匹配题</div>
            <div>每个选项可配置分数，将用户回答的选项分数累加后进行匹配，反馈测试结果</div>
          </div>
          <a href="/match">
            <el-button type="primary" class="box_btn">创建</el-button>
          </a>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    addOpt1 () {
      this.$router.push({path: '/basic'})
    },
    addOpt2 () {
      this.$router.push({path: '/match'})
    }
  }
}
</script>
<style scoped lang="less">
.test_type_title {
  padding: 20px;
  background-color: #ffffff;
  .title_text {
    font-size: 20px;
    color: #409EFF;
  }
  .test_type_main {
    min-width: 720px;
    margin: 0 auto;
    padding: 20px 60px 40px;
    .test_type_opt {
      font-size: 16px;
    }
    .box_main {
      display: flex;
      justify-content: space-between;
      margin-top: 60px;
    }
    .box-card {
      width: 210px;
      height: 420px;
      padding: 0 40px;
      text-align: center;
      .box_img {
        width: 160px;
        height: 160px;
      }
      .box_text {
        margin-top: 40px;
        color: #4E546C;
        font-size: 12px;
      }
      .box_btn {
        margin-top: 40px;
      }
    }
  }
}
</style>
