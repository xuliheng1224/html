<template>
  <div class="tongji">
    <div class="middle-tab">
      <div v-bind:class="[{ active: (tabObj.type === 'cq' && tabObj.isActive)}, 'tab-comm']"  @click="tabClient('cq')">产前档案统计</div>
      <div v-bind:class="[{ active: (tabObj.type === 'ts' && tabObj.isActive)}, 'tab-comm']" @click="tabClient('ts')">唐氏筛查统计</div>
      <div v-bind:class="[{ active: (tabObj.type === 'pj' && tabObj.isActive)}, 'tab-comm']" @click="tabClient('pj')">排畸B超统计</div>
      <div v-bind:class="[{ active: (tabObj.type === 'tn' && tabObj.isActive)}, 'tab-comm']" @click="tabClient('tn')">糖耐量筛查统计</div>
      <div v-bind:class="[{ active: (tabObj.type === 'ch' && tabObj.isActive)}, 'tab-comm']" @click="tabClient('ch')">产后档案统计</div>
      <!-- <div v-bind:class="[{ active: (tabObj.type === 'sk' && tabObj.isActive)}, 'tab-comm']" @click="tabClient('sk')">上课统计</div> -->
    </div>
    <div style="clear: both"></div>
    <div class="dangan-main">
      <div class="dangan" v-if="tabObj.type === 'cq'">
        <div class="dangan-tile">
          产前档案统计
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'nl')}, 'dangan-li']" @click="childClick('nl', '年龄', '5')">
          <div class="number">1</div>
          <span class="text">年龄</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'jd')}, 'dangan-li']" @click="childClick('jd', '所处阶段' ,'6')">
          <div class="number">2</div>
          <span class="text">所处阶段</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'hc')}, 'dangan-li']" @click="childClick('hc', '怀孕次数', '7')">
          <div class="number">3</div>
          <span class="text">怀孕次数</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'lc')}, 'dangan-li']" @click="childClick('lc', '流产次数', '8')">
          <div class="number">4</div>
          <span class="text">流产次数</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'td')}, 'dangan-li']" @click="childClick('td', '胎停孕次数', '9')">
          <div class="number">5</div>
          <span class="text">胎停孕次数</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'fm')}, 'dangan-li']" @click="childClick('fm', '分娩次数', '10')">
          <div class="number">6</div>
          <span class="text">将分娩次数</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'hj')}, 'dangan-li']" @click="childClick('hj', '户籍所在地', '12')">
          <div class="number">7</div>
          <span class="text">户籍所在地</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'zc')}, 'dangan-li']" @click="childClick('zc', '早产', '13')">
          <div class="number">8</div>
          <span class="text">早产</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'zy')}, 'dangan-li']" @click="childClick('zy', '足月分娩', '14')">
          <div class="number">9</div>
          <span class="text">足月分娩</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'de')}, 'dangan-li']" @click="childClick('de', '巨大儿', '15')">
          <div class="number">10</div>
          <span class="text">巨大儿</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'jx')}, 'dangan-li']" @click="childClick('jx', '畸形儿', '16')">
          <div class="number">11</div>
          <span class="text">畸形儿</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'pg')}, 'dangan-li']" @click="childClick('pg', '剖宫产', '17')">
          <div class="number">12</div>
          <span class="text">剖宫产</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'tb')}, 'dangan-li']" @click="childClick('tb', '糖尿病', '18')">
          <div class="number">13</div>
          <span class="text">糖尿病</span>
        </div>
      </div>
      <div class="dangan" v-if="tabObj.type === 'ts'">
        <div class="dangan-tile">
          唐氏筛查统计
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'jc')}, 'dangan-li']" @click="childClick('jc', '检查结果', '21')">
          <div class="number">1</div>
          <span class="text">检查结果</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'st')}, 'dangan-li']" @click="childClick('st', '21三体综合征', '22')">
          <div class="number">2</div>
          <span class="text">21三体综合征</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === '18st')}, 'dangan-li']" @click="childClick('18st', '18三体综合征', '23')">
          <div class="number">3</div>
          <span class="text">18三体综合征</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'kf')}, 'dangan-li']" @click="childClick('kf', '开放性神经', '24')">
          <div class="number">4</div>
          <span class="text">开放性神经</span>
        </div>
      </div>
      <div class="dangan" v-if="tabObj.type === 'pj'">
         <div class="dangan-tile">
          排畸B超
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'pb')}, 'dangan-li']" @click="childClick('pb', '检查结果', '25')">
          <div class="number">1</div>
          <span class="text">检查结果</span>
        </div>
      </div>
      <div class="dangan" v-if="tabObj.type === 'tn'">
         <div class="dangan-tile">
          糖耐量筛查统计
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'kx')}, 'dangan-li']" @click="childClick('kx', '空腹血糖', '26')">
          <div class="number">1</div>
          <span class="text">空腹血糖</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'ch')}, 'dangan-li']" @click="childClick('ch', '餐后1小时血糖', '27')">
          <div class="number">2</div>
          <span class="text">餐后1小时血糖</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'c2x')}, 'dangan-li']" @click="childClick('c2x', '餐后2小时血糖', '28')">
          <div class="number">3</div>
          <span class="text">餐后2小时血糖</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'thx')}, 'dangan-li']" @click="childClick('thx', '糖化血红蛋白', '29')">
          <div class="number">4</div>
          <span class="text">糖化血红蛋白</span>
        </div>
      </div>
      <div class="dangan" v-if="tabObj.type === 'ch'">
        <div class="dangan-tile">
          产后档案统计
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'yz')}, 'dangan-li']" @click="childClick('yz', '分娩孕周', '30')">
          <div class="number">1</div>
          <span class="text">分娩孕周</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'fs')}, 'dangan-li']" @click="childClick('fs', '分娩方式', '31')">
          <div class="number">2</div>
          <span class="text">分娩方式</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'fq')}, 'dangan-li']" @click="childClick('fq', '分娩侧切', '32')">
          <div class="number">3</div>
          <span class="text">分娩侧切</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'fy')}, 'dangan-li']" @click="childClick('fy', '分娩异常', '33')">
          <div class="number">4</div>
          <span class="text">分娩异常</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'wy')}, 'dangan-li']" @click="childClick('wy', '喂养方式', '34')">
          <div class="number">5</div>
          <span class="text">喂养方式</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'sg')}, 'dangan-li']" @click="childClick('sg', '宝宝出生身高', '35')">
          <div class="number">6</div>
          <span class="text">宝宝出生身高</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'tz')}, 'dangan-li']" @click="childClick('tz', '宝宝出生体重', '36')">
          <div class="number">7</div>
          <span class="text">宝宝出生体重</span>
        </div>
        <div v-bind:class="[{ act: (childTab.type === 'yc')}, 'dangan-li']" @click="childClick('yc', '宝宝异常', '37')">
          <div class="number">8</div>
          <span class="text">宝宝异常</span>
        </div>
      </div>
      <!-- <div class="dangan" v-if="tabObj.type === 'sk'">
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
      </div> -->
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

<style lang="less" scoped src="../../../src/assets/less/tongji.less"></style>
<script>
import Echarts from 'echarts'
import { tool } from '../../common/util'
export default {
  data () {
    return {
      tjTime: null,
      chartData: '',
      tabObj: {
        type: 'cq',
        isActive: true
      },
      childTab: {
        type: 'nl'
      },
      describe: '年龄',
      number: '5'
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    initChart (dt) {
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
    tabClient (type) {
      var _this = this
      this.tabObj['type'] = type
      switch (type) {
        case 'cq':
          _this.childClick('nl', '年龄', '5')
          break
        case 'ts':
          _this.childClick('jc', '检查结果', '21')
          break
        case 'pj':
          _this.childClick('pb', '检查结果', '25')
          break
        case 'tn':
          _this.childClick('kx', '空腹血糖', '26')
          break
        case 'ch':
          _this.childClick('yz', '分娩孕周', '30')
          break
        case 'sk':
          _this.childClick('yy', '预约次数', '1')
          break
        default :
      }
    },
    childClick (type, des, number) {
      this.childTab['type'] = type
      this.describe = des
      this.number = number
      this.getData()
    },
    async getData () {
      var res = await this.$store.dispatch('getUserData', {type: this.number, startDt: this.tjTime !== null ? tool.dateFormat(this.tjTime[0]) : '', endDt: this.tjTime !== null ? tool.dateFormat(this.tjTime[1]) : ''})
      this.initChart(res.data.data)
    },
    saixuan () {
      this.getData()
    }
  }
}
</script>
