<template>
    <div>
      <el-tabs type="border-card" v-model='Value'>
        <el-tab-pane label="预约建大卡"><Bigcard></Bigcard></el-tab-pane>
        <el-tab-pane label="预约建小卡"><Smallcard></Smallcard></el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import Bigcard from './bigcard'
import Smallcard from './smallcard'
export default {
  components: {
    Bigcard,
    Smallcard
  },
  data () {
    return {
      Value: '0'
    }
  },
  mounted () {
    if (this.$route.query.smallcarddetail) {
      this.$router.push('/card')
      this.Value = '1'
    }
  }
}
</script>

<style scoped>

</style>
