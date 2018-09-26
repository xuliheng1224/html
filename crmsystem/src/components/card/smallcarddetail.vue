<template>
  <div>
    <div style="position:relative;background:#fff;margin-bottom:30px;">
        <h2>预约建小卡详情</h2>
        <el-button type="primary" @click="back">返回</el-button>
    </div>
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
            <span>出身日期:</span>
            <time>{{too(contact.birth)}}</time>
          </div>
        </div>
        <div class='rowss'>
          <div>
            <span>户籍:</span>
            <time>{{smallCardDto.householdRegisterType}}</time>
          </div>
          <div>
            <span>文化:</span>
            <time>{{smallCardDto.education}}</time>
          </div>
        </div>
        <div class='rowss'>
          <div>
            <span>职业:</span>
            <time>{{smallCardDto.career}}</time>
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
          <span>当前住址:</span>
          <time>{{antenatalArchives.address}}</time>
        </div>
      </div>
      <div class='rowss'>
        <div style="width:50%;">
          <span>产后休养地址:</span>
          <time>{{smallCardDto.postpartumAddress}}</time>
        </div>
        <div>
          <span>固定电话:</span>
          <time>{{smallCardDto.fixedTelephone}}</time>
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
            <span>末次月经:</span>
            <time>{{too(antenatalArchives.lastMenstruationDate)}}</time>
          </div>
          <div>
            <span>预产期:</span>
            <time>{{too(contact.userEdc)}}</time>
          </div>
        </div>
        <div class='rowss'>
          <div>
            <span>胎次:</span>
            <time>{{antenatalArchives.pregnantNum}}</time>
          </div>
          <div>
            <span>产次:</span>
            <time>{{antenatalArchives.childbirthTimes}}</time>
          </div>
        </div>
        <div class='rowss'>
          <div>
            <span>异常生育史:</span>
            <time>{{smallCardDto.abnormalBirthHistory}}</time>
          </div>
          <div>
            <span>身高(cm):</span>
            <time>{{antenatalArchives.height}}</time>
          </div>
        </div>
        <div class='rowss'>
          <div>
            <span>孕前体重(kg):</span>
            <time>{{antenatalArchives.pregnancyWeight}}</time>
          </div>
          <div>
            <span>血红素:</span>
            <time>{{smallCardDto.heme}}</time>
          </div>
        </div>
        <div class='rowss'>
          <div>
            <span>血压:</span>
            <time>{{smallCardDto.bloodPressure}}</time>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class='box-card'>
      <div slot="header">
        <span>其他信息</span>
      </div>
      <div class='rowss'>
        <div style="width:50%;">
          <span>建册日期:</span>
          <time>{{too(smallCardDto.createDate)}}</time>
        </div>
        <div>
          <span>建册孕周:</span>
          <time>{{smallCardDto.buildPregnancyWeeks}}</time>
        </div>
      </div>
      <div class='rowss'>
        <div style="width:50%;">
          <span>建册单位:</span>
          <time>{{smallCardDto.buildUnits}}</time>
        </div>
        <div>
          <span>医院联系电话:</span>
          <time>{{hos.tel}}</time>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { fetch } from '../../common/fetch'
import { tool } from '../../common/util'
export default {
  data () {
    return {
      antenatalArchives: '',
      contact: '',
      hos: '',
      smallCardDto: ''
    }
  },
  mounted () {
    fetch({
      url: '/crm/smallCard/detail',
      method: 'get',
      params: {
        userId: this.$route.query.userId
      },
      success: (res) => {
        this.antenatalArchives = res.data.data.antenatalArchives
        this.contact = res.data.data.contact
        this.smallCardDto = res.data.data.smallCardDto
        this.hos = res.data.data.hos
        switch (this.smallCardDto.householdRegisterType) {
          case 1:
            this.smallCardDto.householdRegisterType = '本市(非农业户籍)'
            break
          case 2:
            this.smallCardDto.householdRegisterType = '本市(农业户籍)'
            break
          case 3:
            this.smallCardDto.householdRegisterType = '非本市(非农业户籍)'
            break
          case 4:
            this.smallCardDto.householdRegisterType = '非本市(农业户籍)'
            break
          default:
            this.smallCardDto.householdRegisterType = '未知'
        }
        switch (this.smallCardDto.education) {
          case 1:
            this.smallCardDto.education = '小学及以下'
            break
          case 2:
            this.smallCardDto.education = '初中'
            break
          case 3:
            this.smallCardDto.education = '高中或中专'
            break
          case 4:
            this.smallCardDto.education = '大专'
            break
          case 5:
            this.smallCardDto.education = '大学及以上'
            break
          default:
            this.smallCardDto.education = '未知'
        }
        switch (this.smallCardDto.career) {
          case 1:
            this.smallCardDto.career = '工人'
            break
          case 2:
            this.smallCardDto.career = '职员'
            break
          case 3:
            this.smallCardDto.career = '弄明'
            break
          case 4:
            this.smallCardDto.career = '医教研'
            break
          case 5:
            this.smallCardDto.career = '行政'
            break
          case 6:
            this.smallCardDto.career = '个体'
            break
          case 7:
            this.smallCardDto.career = '无业'
            break
          case 8:
            this.smallCardDto.career = '其他'
            break
          default:
            this.smallCardDto.career = '未知'
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
      this.$router.push({path: '/card', query: {smallcarddetail: 1}})
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
</style>
