<template>
  <div class="details">
    <el-tabs type="border-card" v-model="detailsName" @tab-click="handleClick">
      <el-tab-pane label="测试详情" name="testDetail">
        <testDetail></testDetail>
      </el-tab-pane>
      <el-tab-pane label="独立用户统计" name="aloneUser">
        <aloneUser></aloneUser>
      </el-tab-pane>
      <el-tab-pane label="随堂用户统计" name="scheduleTestUser">
        <scheduleTestUser></scheduleTestUser>
      </el-tab-pane>
      <el-tab-pane label="随堂测试统计" name="scheduleTest">
        <scheduleTest></scheduleTest>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import testDetail from './testDetail'
import aloneUser from './aloneUser'
import scheduleTestUser from './scheduleTestUser'
import scheduleTest from './scheduleTest'
export default {
  data () {
    return {
      detailsName: ''
    }
  },
  components: {
    testDetail,
    aloneUser,
    scheduleTestUser,
    scheduleTest
  },
  mounted () {
    if (this.$route.params.name === 'testDetail') {
      this.detailsName = 'testDetail'
    } else if (this.$route.params.name === 'aloneUser') {
      this.detailsName = 'aloneUser'
    } else if (this.$route.params.name === 'scheduleTestUser') {
      this.detailsName = 'scheduleTestUser'
    } else if (this.$route.params.name === 'scheduleTest') {
      this.detailsName = 'scheduleTest'
    }
  },
  methods: {
    handleClick (tab, event) {
      this.$router.push({name: 'details', params: {name: tab.name}})
    }
  }
}
</script>
<style scoped lang="less">
</style>
