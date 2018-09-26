<template>
    <div class="page">
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="学校二维码" name="schoolCode">
                <SchoolCode></SchoolCode>
            </el-tab-pane>
            <el-tab-pane label="课文素材管理" name="textManagement">
                <TextManagement></TextManagement>
            </el-tab-pane>
            <el-tab-pane label="课文库" name="textLibrary">
                <TextLibrary></TextLibrary>
            </el-tab-pane>
            <el-tab-pane label="课程表" name="timeTable">
                <TimeTable></TimeTable>
            </el-tab-pane>
            <el-tab-pane label="测试问卷" name="testQuestionnaire">
                <TestQuestionnaire></TestQuestionnaire>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import SchoolCode from './schoolCode'
import TextManagement from './textManagement'
import TextLibrary from './textLibrary'
import TimeTable from './timeTable'
import TestQuestionnaire from './testQuestionnaire'
export default {
  data () {
    return {
      activeName: 'schoolCode'
    }
  },
  components: {
    SchoolCode,
    TextManagement,
    TextLibrary,
    TimeTable,
    TestQuestionnaire
  },
  mounted () {
    if (this.$route.params.name === 'schoolCode') {
      this.activeName = 'schoolCode'
    } else if (this.$route.params.name === 'textManagement') {
      this.activeName = 'textManagement'
    } else if (this.$route.params.name === 'textLibrary') {
      this.activeName = 'textLibrary'
    } else if (this.$route.params.name === 'timeTable') {
      this.activeName = 'timeTable'
    } else if (this.$route.params.name === 'testQuestionnaire') {
      this.activeName = 'testQuestionnaire'
    }
  },
  methods: {
    handleClick (tab, event) {
      this.$router.push({name: 'schoolInfo', params: {name: tab.name}})
    }
  }
}
</script>
