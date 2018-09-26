<template>
  <div >
    <div style="position:relative;background:#fff;margin-bottom:30px;">
        <h2>预约建大卡详情</h2>
        <el-button type="success" class='open' @click='open' v-if="auth.indexOf('bigCard_print') > -1">打印</el-button>
        <el-button type="primary" @click="back">返回</el-button>
    </div>
    <div id='bigcard'>
      <el-card>
        <div slot="header">
          <span>基本信息</span>
        </div>
        <div>
          <div class='rowss'>
            <div>
              <span>姓名:</span>
              <time>{{contact.realName}}</time>
            </div>
            <div>
              <span>手机号:</span>
              <time>{{contact.mobile}}</time>
            </div>
          </div>
          <div class='rowss'>
            <div>
              <span>身份证:</span>
              <time>{{contact.idCard}}</time>
            </div>
            <div>
              <span>出身年月:</span>
              <time>{{too(contact.birth)}}</time>
            </div>
          </div>
          <div class='rowss'>
            <div>
              <span>预产期:</span>
              <time>{{too(contact.userEdc)}}</time>
            </div>
            <div>
              <span>末次月经:</span>
              <time>{{too(antenatalArchives.lastMenstruationDate)}}</time>
            </div>
          </div>
          <div class='rowss'>
            <div>
              <span>身高(cm):</span>
              <time>{{antenatalArchives.height}}</time>
            </div>
            <div>
              <span>孕前体重(kg):</span>
              <time>{{antenatalArchives.pregnancyWeight}}</time>
            </div>
          </div>
          <div class='rowss'>
            <div>
              <span>当前体重(kg):</span>
              <time>{{antenatalArchives.nowWeight}}</time>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class='box-card'>
        <div slot="header">
          <span>家庭信息与工作信息</span>
        </div>
        <div class='rowss'>
          <div style="width:50%;">
            <span>户籍所在地:</span>
            <time>{{antenatalArchives.householdRegisterAddress}}</time>
          </div>
          <div>
            <span>紧急联系人姓名:</span>
            <time>{{antenatalArchives.emergencyContact}}</time>
          </div>
        </div>
        <div class='rowss'>
          <div style="width:50%;">
            <span>紧急联系人电话:</span>
            <time>{{antenatalArchives.emergencyMobile}}</time>
          </div>
          <div>
            <span>当前住址:</span>
            <time>{{antenatalArchives.address}}</time>
          </div>
        </div>
        <div class='rowss'>
          <div style="width:50%;">
            <span>单位地址:</span>
            <time>{{antenatalArchives.companyAddress}}</time>
          </div>
          <div style="width:50%;">
            <span>年收入情况:</span>
            <time>{{antenatalArchives.familyAnnualIncome}}</time>
          </div>
        </div>
      </el-card>
      <el-card class='box-card'>
        <div slot="header">
          <span>孕产信息</span>
        </div>
        <div>
          <div class='rowss'>
            <div>
              <span>胎数:</span>
              <time>{{antenatalArchives.fetusNum}}</time>
            </div>
            <div>
              <span>将是第几次分娩:</span>
              <time>{{antenatalArchives.childbirthTimes}}</time>
            </div>
          </div>
          <div class='rowss'>
            <div>
              <span>自然流产次数:</span>
              <time>{{antenatalArchives.naturalAbortionNum}}</time>
            </div>
            <div>
              <span>胎停育次数:</span>
              <time>{{antenatalArchives.stopChildNum}}</time>
            </div>
          </div>
          <div class='rowss'>
            <div>
              <span>是否有早产史:</span>
              <time>{{antenatalArchives.hasPrematureBirth === 1 ? '否' : '是'}}</time>
            </div>
            <div>
              <span>是否有中期引产:</span>
              <time>{{antenatalArchives.hasOdinopoeia === 1 ? '否' : '是'}}</time>
            </div>
          </div>
          <div class='rowss'>
            <div>
              <span>是否有足月分娩史:</span>
              <time>{{antenatalArchives.hasTermBirth === 1 ? '否' : '是'}}</time>
            </div>
            <div>
              <span>是否生育过畸形胎儿:</span>
              <time>{{antenatalArchives.hasAbnormalFetus === 1 ? '否' : '是'}}</time>
            </div>
          </div>
          <div class='rowss'>
            <div>
              <span>是否剖宫产历史:</span>
              <time>{{antenatalArchives.hasCesareanSection === 1 ? '否' : '是'}}</time>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class='box-card'>
        <div slot="header">
          <span>健康信息</span>
        </div>
        <div class='rowss'>
          <div style="width:50%;">
            <span>是否吸烟:</span>
            <time>{{antenatalArchives.hasSmoke === 1 ? '否' : '是'}}</time>
          </div>
          <div>
            <span>是否酗酒:</span>
            <time>{{antenatalArchives.hasDrink === 1 ? '否' : '是'}}</time>
          </div>
        </div>
        <div class='rowss'>
          <div style="width:50%;">
            <span>妊娠病史:</span>
            <time>{{gestationHistory}}</time>
          </div>
        </div>
      </el-card>
      <el-card class='box-card'>
        <div slot="header">
          <span>既往病史</span>
        </div>
        <div class='rowss'>
          <div v-if='allMedialHistoryList.length > 0'>
            <el-table
              :data="allMedialHistoryList"
              border
              style="width: 220px">
              <el-table-column
                prop="medicalName"
                label="既往病史"
                width="80">
              </el-table-column>
              <el-table-column
                prop="medicalTime"
                label="病史年限(年)"
                width="140">
              </el-table-column>
            </el-table>
          </div>
          <span v-else>
            无
          </span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { fetch } from '../../common/fetch'
import { tool } from '../../common/util'
export default {
  data () {
    return {
      allMedialHistoryList: [],
      antenatalArchives: '',
      contact: '',
      gestationHistory: '',
      auth: []
    }
  },
  mounted () {
    this.auth = tool.localStorage.get('authTags')
    fetch({
      url: '/crm/hosCard/detail',
      method: 'get',
      params: {
        userId: this.$route.query.userId
      },
      success: (res) => {
        this.allMedialHistoryList = res.data.data.allMedialHistoryList
        this.antenatalArchives = res.data.data.antenatalArchives
        this.contact = res.data.data.contact
        this.gestationHistory = res.data.data.gestationHistory === 1 ? '否' : '是'
        if (this.antenatalArchives.familyAnnualIncome === '1') {
          this.antenatalArchives.familyAnnualIncome = '5万及以下'
        } else if (this.antenatalArchives.familyAnnualIncome === '2') {
          this.antenatalArchives.familyAnnualIncome = '5-10万'
        } else if (this.antenatalArchives.familyAnnualIncome === '3') {
          this.antenatalArchives.familyAnnualIncome = '10-20万'
        } else if (this.antenatalArchives.familyAnnualIncome === '4') {
          this.antenatalArchives.familyAnnualIncome = '20-30万'
        } else {
          this.antenatalArchives.familyAnnualIncome = '30万及以上'
        }
      },
      fail: function (err) {
        console.log(err)
      }
    }, this)
  },
  methods: {
    too (time) {
      if (time > 0) {
        return tool.dateFormat(new Date(time))
      } else {
        return ''
      }
    },
    back () {
      history.back(-1)
    },
    open () {
      var newstr = document.getElementById('bigcard').innerHTML
      // var oldstr = document.body.innerHTML
      document.body.innerHTML = newstr
      window.print()
      window.location.reload()
      // document.body.innerHTML = oldstr
      return false
    }
  }
}
</script>
<style scoped lang='less'>
.box-card {
  margin-top: 30px;
}
h2 {
  margin: 0;
  color: #444444;
  font-weight: 100;
  padding: 20px;
  font-size: 20px;
  border-bottom: 2px solid #606266;
}
.rowss {
  display: flex;
  font-size: 14px;
  margin: 20px 0;
  padding: 0 30px;
  div {
    width: 50%;
    span {
      color: #606266;
      margin-right: 10px;
    }
    time {
      color: #606266;
    }
  }
}
button {
    position: absolute;
    top: 20px;
    right: 20px;
}
.open {
  right: 120px;
}
</style>
