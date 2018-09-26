<template>
  <div class="user-main">
    <div class="user-gaowei">
      <div class="user-gaowei-title">
        <div class="desc">
          高危用户情况
          <el-tooltip class="item hover-icon" effect="dark" content="高危用户占总用户的比例（高危用户：体检各值高于正常范围）" placement="bottom-start">
            <el-button><img src="../../assets/image/answer.png" class="answer-icon" alt="" srcset=""></el-button>
          </el-tooltip>
        </div>
        <div class="begin-time">
          <div class="block">
            <el-date-picker
              v-model="hightTime"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']">
            </el-date-picker>
          </div>
        </div>
        <div class="saixuan">
          <el-button type="primary" @click="checkTime">筛选</el-button>
        </div>
      </div>
      <div id="container"></div>
      <div class="user-tab" v-if="pipe.pieData">
        <div class="comm">
          <div class="people-num">{{pipe.total}}</div>
          <div class="desc">用户总人数</div>
        </div>
        <div class="comm">
          <div class="people-num">{{pipe.pieData[1].value}}</div>
          <div class="desc">高危户总人数</div>
        </div>
        <div class="comm">
          <div class="people-num">{{pipe.pieData[1].rate}}</div>
          <div class="desc">高危用户占比</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Echarts from 'echarts'
import { tool } from '../../../src/common/util'
import { mapState } from 'vuex'
export default {
  computed: mapState({
    pipe: state => state.baseData.data
  }),
  data () {
    return {
      hightTime: null
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const res1 = await this.$store.dispatch('getHightDieData', {timeBegin: this.hightTime !== null ? tool.dateFormat(this.hightTime[0]) : '', timeEnd: this.hightTime !== null ? tool.dateFormat(this.hightTime[1]) : ''})
      await this.initChart(res1.data.data.pieData)
    },
    initChart (dt) {
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: []
        },
        color: ['#a7a7a7', '#409EFF'],
        title: {
          text: dt[1].rate,
          subtext: '高危用户占比',
          x: 'center',
          y: 'center'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '16',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: dt
          }
        ]
      }
      Echarts.init(document.getElementById('container')).setOption(option, true)
    },
    checkTime () {
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped src='../../../src/assets/less/user.less'></style>
