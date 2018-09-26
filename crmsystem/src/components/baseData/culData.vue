<template>
  <div class="cul-main">
    <div class="up-module">
      <div class="radio-cont">
        <el-radio v-model="number" label="19" @change="saixuan">既往病史</el-radio>
        <el-radio v-model="number" label="20" @change="saixuan">妊娠并发症</el-radio>
      </div>
      <div class="date-time">
        <div class="begin-time">
          <div class="block">
            <el-date-picker v-model="bsTime" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="time-sai">
        <el-button type="primary" @click="saixuan">筛选</el-button>
      </div>
    </div>
    <div class="cul-data">
      <div id="cul-data-container"></div>
    </div>
  </div>
</template>
<style lang="less" scoped src="../../../src/assets/less/culData.less"></style>
<script>
import Echarts from 'echarts'
import { tool } from '../../common/util'
export default {
  data () {
    return {
      number: '19',
      bsTime: null
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    initChart (xData, yData) {
      var option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '10%',
          bottom: '40%'
        },
        xAxis: [
          {
            type: 'category',
            data: xData,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              formatter: function (value) {
                var ret = ''
                var maxLength = 6
                var valLength = value.length
                var rowN = Math.ceil(valLength / maxLength)
                if (rowN > 1) {
                  for (var i = 0; i < rowN; i++) {
                    var temp = ''
                    var start = i * maxLength
                    var end = start + maxLength
                    temp = value.substring(start, end) + '\n'
                    ret += temp
                  }
                  return ret
                } else {
                  return value
                }
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '20%',
            data: yData
          }
        ]
      }
      Echarts.init(document.getElementById('cul-data-container')).setOption(option, true)
    },
    async getData () {
      var res = await this.$store.dispatch('getUserData', { type: this.number, startDt: this.bsTime !== null ? tool.dateFormat(this.bsTime[0]) : '', endDt: this.bsTime !== null ? tool.dateFormat(this.bsTime[1]) : '' })
      var xData = []
      var yData = []
      Object.keys(res.data.data.data).forEach(function (key) {
        xData.push(res.data.data.data[key]['name'])
        yData.push(res.data.data.data[key]['value'])
      })
      this.initChart(xData, yData)
    },
    saixuan () {
      this.getData()
    }
  }
}
</script>
