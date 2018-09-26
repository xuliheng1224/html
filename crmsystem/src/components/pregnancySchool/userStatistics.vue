<template>
<div class="content" v-if="userstatistics">
          <div class="ment_top">
            <!-- <div class="export" style="height:50px;widht:100%;float:right;margin-top:50px;"><el-button type="primary">主要按钮</el-button></div> -->
            <div class="user_box">
              <div class="user_left">
                <div class="user_img">
                  <img src="../../../static/img/ren.png" />
                </div>
                <div>
                  <span class="number">{{userstatistics.totalCount}}</span>
                  <br />
                  <span class="explain">用户数量</span>
                </div>
              </div>
              <div class="user_right">
                <div class="right_box">
                  <div>
                    <span class="number">{{userstatistics.newCount}}</span>
                    <br />
                    <span class="explain">新用户(人)</span>
                  </div>
                </div>
                <div class="right_box">
                  <div>
                    <span class="number">{{userstatistics.remindCount}}</span>
                    <br />
                    <span class="explain">预约人次(人次)</span>
                  </div>
                </div>
                <div class="right_box">
                  <div>
                    <span class="number">{{userstatistics.signCount}}</span>
                    <br />
                    <span class="explain">签到人次(人次)</span>
                  </div>
                </div>
                <div class="right_box">
                  <div>
                    <span class="number">{{userstatistics.testCount}}</span>
                    <br />
                    <span class="explain">测试人次(人次)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="cul-data">
              <div style="padding-top:20px;padding-bottom:20px"><span style="padding-right:20px">用户行为趋势</span><el-date-picker v-model="ytimes" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"  value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
              <el-button type="primary" @click="getTimeuser">筛选</el-button></div>
              <div id="cul-data-container" style="widht=1000px"></div>
            </div>
          </div>
          <div>
            <div class="dangan" >
        <div class="dangan-tile">
          上课统计
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'yy')}, 'dangan-li']" @click="childClick('yy', '预约次数', '1')">
          <div class="number">1</div>
          <span class="text">预约次数</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'qd')}, 'dangan-li']" @click="childClick('qd', '签到次数', '2')">
          <div class="number">2</div>
          <span class="text">签到次数</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'cs')}, 'dangan-li']" @click="childClick('cs', '测试次数', '3')">
          <div class="number">3</div>
          <span class="text">测试次数</span>
        </div>
      </div>
      <div class="tongjidata">
        <div class="fenbu-main">
        <div class="age-qingk">{{describe}}分布情况</div>
        <div class="date-time">
          <div class="begin-time">
                    <div class="block">
                        <el-date-picker
                        v-model="tjTime"
                        type="datetimerange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['12:00:00']">
                        </el-date-picker>
                    </div>
                </div>
        </div>
        <div class="time-sai">
            <el-button type="primary" @click="saixuan">筛选</el-button>
        </div>
      </div>
        <div id="tongji-container"></div>
      </div>
          </div>
        </div>
</template>
<style scoped src="../../../static/css/schoolStatistics.css"></style>
<style lang="less" scoped src="../../../src/assets/less/tongji.less"></style>
<script>
import Echarts from 'echarts'
import { mapState } from 'vuex'
import { tool } from '../../common/util'
export default {
  computed: mapState({
    userstatistics: state => state.schoolStatistics.userstatistics
  }),
  data () {
    return {
      tjTime: null,
      ytimes: null,
      childTab: {
        type: 'yy'
      },
      describe: '年龄',
      number: '5'
    }
  },
  mounted () {
    this.getuser()
    this.getData()
    this.getTimeuser()
  //  this.initChart()
  },
  methods: {
    formatter (row, column) {
      return row.address
    },
    // 柱状图统计
    initChart (xData, yData, yData1, yData2) {
      var option = {
        tooltip: {},
        legend: {
          show: true,
          type: 'plain',
          orient: 'horizontal',
          left: 'left',
          data: ['新用户', '预约人数', '签到人数']
        },
        color: ['#2DB7F5', '#7DC856', '#808BC6'],
        xAxis: {
          type: 'category',
          data: xData,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0,
            formatter: function (value) {
              return value
            }
          }
        },
        yAxis: {
          minInterval: 1
        },
        series: [
          {type: 'bar',
            name: '新用户',
            barMaxWidth: '30',
            data: yData
          },
          {type: 'bar',
            name: '预约人数',
            barMaxWidth: '40',
            data: yData1
          },
          {type: 'bar',
            name: '签到人数',
            barMaxWidth: '50',
            data: yData2
          }
        ]
      }
      Echarts.init(document.getElementById('cul-data-container')).setOption(option, true)
    },
    getuser () {
      this.$store.dispatch('getDataTop', {_this: this})
    },
    async getTimeuser () {
      var res = await this.$store.dispatch('getUserBarData', {_this: this, timeBegin: this.ytimes !== null ? tool.dateFormat(this.ytimes[0]).substr(0, 10) : '', timeEnd: this.ytimes !== null ? tool.dateFormat(this.ytimes[1]).substr(0, 10) : ''})
      var xData = []
      var yData = []
      var yData1 = []
      var yData2 = []
      Object.keys(res.data.data).forEach(function (key) {
        xData.push(res.data.data[key]['lable'])
        yData.push(res.data.data[key]['newCount'])
        yData1.push(res.data.data[key]['remindCount'])
        yData2.push(res.data.data[key]['signCount'])
      })
      this.initChart(xData, yData, yData1, yData2)
    },
    childClick (type, des, number) {
      this.childTab['type'] = type
      this.describe = des
      this.number = number
      this.getData()
    },
    // 圆形统计
    initCharty (dt) {
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        title: {
          text: dt.total,
          subtext: '注册总人数(人)',
          x: 'center',
          y: 'center'
        },
        legend: {
          orient: 'vertical',
          left: 700,
          width: 150,
          top: 50,
          data: dt.data
        },
        color: ['#00B9D3', '#B2E5FA', '#92D56F', '#78BEEC', '#69D7C6', '#49C2F9', '#CDCAFF', '#FF8B5C', '#808BC6', '#FFD824'],
        series: [
          {
            name: '访问来源',
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
                show: true
              }
            },
            data: dt.data
          }
        ]
      }
      Echarts.init(document.getElementById('tongji-container')).setOption(option, true)
    },
    async getData () {
      var res = await this.$store.dispatch('getUserData', {type: this.number, startDt: this.tjTime !== null ? tool.dateFormat(this.tjTime[0]) : '', endDt: this.tjTime !== null ? tool.dateFormat(this.tjTime[1]) : ''})
      this.initCharty(res.data.data)
    },
    saixuan () {
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped>
#cul-data-container{
  width: 1000px
}
.dangan-main {
    display: flex;
  }
  .dangan {
    display: inline-block;
    float: left;
    width: 238px;
    height: 355px;
    overflow: scroll;
    .dangan-tile {
      border-bottom: 1px solid rgba(237,237,237,1);
      height: 50px;
      display: flex;
      align-items: center;
      padding-left: 10px;
    }
    .act {
      background: #f3f3f3;
    }
    .dangan-li {
      display: flex;
      align-items: center;
      height: 35px;
      padding-left: 25px;
      cursor: pointer;
      .number {
        width: 15px;
        height: 15px;
        border-radius: 15px;
        background: gray;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
      }
      .text {
        display: block;
        font-size: 12px;
        margin-left: 5px;
        color: #9a9b9c;
      }
    }
  }
  .tongjidata {
    display: inline-block;
    flex: 1;
  }
  .fenbu-main {
    display: flex;
    align-items: center;
    // justify-content: center;
    margin-top: 30px;
    margin-left: 100px;
    .age-qingk {
      margin-right: 30px;
    }
    .date-time {
      margin-right: 20px;
    }
  }
  #tongji-container {
    width: 1000px;
    height: 300px;
    overflow: unset;
  }
</style>
