<template>
    <div class="detail_content">
      <el-tabs type="border-card" v-model='Value' style="height:100%;padding-bottom:100px;" @tab-click="handleClick">
        <el-tab-pane label="基础信息" name="0"><Basic :user="userInfos"></Basic></el-tab-pane>
        <el-tab-pane label="产前档案统计" name="1"><Antenatal :ante="antes"></Antenatal></el-tab-pane>
        <el-tab-pane label="唐氏筛查统计" name="2"><Tangshi :tang="tangs"></Tangshi></el-tab-pane>
        <el-tab-pane label="排畸B超统计" name="3"><Bultrasonic :bc="bcs"></Bultrasonic></el-tab-pane>
        <el-tab-pane label="糖耐量筛查统计" name="4"><SugarTolerance :sugar="sugars"></SugarTolerance></el-tab-pane>
        <el-tab-pane label="产后档案统计" name="5"><Postpartum :partum="partums"></Postpartum></el-tab-pane>
        <el-tab-pane label="上课信息" name="6"><School :school="schools"></School></el-tab-pane>
      </el-tabs>
      <el-button type="primary" @click="back" class="back">返回</el-button>
      <el-button type="primary" class="addpdf" @click="addpdf" v-if="auth.indexOf('user_detail_pdf_down') > -1">下载pdf文档</el-button>
    </div>
</template>

<script>
import Basic from '../basic/basic'
import Antenatal from '../antenatal/antenatal'
import Tangshi from '../tangshi/tangshi'
import Bultrasonic from '../Bultrasonic/Bultrasonic'
import SugarTolerance from '../sugarTolerance/sugarTolerance'
import Postpartum from '../postpartum/postpartum'
import School from '../school/school'
import { mapState } from 'vuex'
import { fetch } from '../../../common/fetch'
import { tool } from '../../../common/util'
export default {
  computed: mapState({
    userInfos: state => state.consumer.userInfos,
    antes: state => state.consumer.antens,
    schools: state => state.consumer.schools,
    tangs: state => state.consumer.tangs,
    bcs: state => state.consumer.bcs,
    sugars: state => state.consumer.sugars,
    partums: state => state.consumer.partums
  }),
  components: {
    Basic,
    Antenatal,
    Tangshi,
    Bultrasonic,
    SugarTolerance,
    Postpartum,
    School
  },
  props: ['typeValue', 'userId', 'currentPage', 'names'],
  data () {
    return {
      Value: this.typeValue ? this.typeValue : 0,
      auth: []
    }
  },
  methods: {
    // 下载pdf文档
    addpdf () {
      var downname = tool.dateFormat(new Date()).substr(0, 10) + '-' + this.names + '.pdf'
      fetch({
        url: '/crm/user/downData',
        method: 'get',
        responseType: 'blob',
        params: {
          type: 1,
          userIds: this.userId
        },
        success: (res) => {
          if (res.status === 200) {
            tool.download(res.data, downname, 'application/pdf;charset=utf-8')
            this.$notify({
              title: '导出成功',
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
    handleClick () {
      switch (this.Value) {
        case '0':
          this.$store.dispatch('userInfos', { _this: this,
            type: 1,
            userId: this.userId
          })
          break
        case '1':
          this.$store.dispatch('userInfos', { _this: this,
            type: 3,
            userId: this.userId
          })
          break
        case '2':
          this.$store.dispatch('userInfos', { _this: this,
            type: 4,
            userId: this.userId
          })
          break
        case '3':
          this.$store.dispatch('userInfos', { _this: this,
            type: 5,
            userId: this.userId
          })
          break
        case '4':
          this.$store.dispatch('userInfos', { _this: this,
            type: 6,
            userId: this.userId
          })
          break
        case '5':
          this.$store.dispatch('userInfos', { _this: this,
            type: 7,
            userId: this.userId
          })
          break
        case '6':
          this.$store.dispatch('userInfos', { _this: this,
            type: 2,
            userId: this.userId
          })
          break
      }
    },
    back () {
      this.$emit('toParent', this.currentPage)
    }
  },
  created () {
  },
  mounted () {
    this.handleClick()
    this.auth = tool.localStorage.get('authTags')
  }
}
</script>

<style scoped lang="less">
  .detail_content {
    width:100%;
    box-sizing: border-box;
    background:rgba(255,255,255,1);
    position:relative;
    .addpdf {
      position: absolute;
      top: 0;
      right: 4px;
      z-index: 1000;
    }
  }
  .back {
    position:absolute;
    top:0px;
    right:150px;
    z-index: 303;
  }
</style>
