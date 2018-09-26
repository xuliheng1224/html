<template>
  <div style="height:106px; line-height: 106px;" class="header-comm">
    <div class="logo-cont">
      <img src="../../assets/image/Group@2x.png" class="logo" alt="" srcset="">
    </div>
    <div class="hospital-title">医院管理系统</div>
    <div class="login-out">
      <div class="select-hospital">
        <el-select v-model="shoolName" placeholder="请选择" :disabled="isDisable" @change="selectSchool">
          <el-option v-for="item in hospitalItem" :key="item.id" :label="item.schoolName" :dt="item" :value="item.schoolName">
          </el-option>
        </el-select>
      </div>
      <div class="user-contain">
        <div class="tx-cont">
          <img src="../../assets/image/tx.png" class="tx" />
        </div>
        <span class="user-name">{{userName}}</span>
      </div>
      <div class="out-main" @click="loginOut">
        <img src="../../assets/image/out.png" class="out-icon" alt="" srcset="">
        <div class="txt">退出</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import cookies from 'js-cookie'
export default {
  computed: mapState({
    hosDesc: state => state.loginStore
  }),
  data () {
    return {
      shoolName: '',
      hospitalItem: {},
      isDisable: false,
      userName: ''
    }
  },
  mounted () {
    this.hospitalItem = JSON.parse(localStorage.getItem('schoolInfos'))
    if (this.hospitalItem.length === 1) {
      this.isDisable = true
    } else {
      this.isDisable = false
    }
    // var schoolInfos = {}
    // this.hospitalItem.forEach((v, k) => {
    //   if (v.isDefault === 1) {
    //     schoolInfos = v
    //     return schoolInfos
    //   }
    // })
    // if (Object.keys(schoolInfos).length === 0) {
    //   schoolInfos = this.hospitalItem[0]
    // }
    this.shoolName = JSON.parse(cookies.get('schoolInfos')).schoolName
    this.userName = JSON.parse(cookies.get('adminInfo')).adminName
  },
  methods: {
    loginOut () {
      this.$confirm('确认退出，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('logout', { _this: this })
      }).catch(() => {
      })
    },
    selectSchool (event) {
      console.log(event)
      let obj = {}
      obj = this.hospitalItem.find((item) => {
        return item.schoolName === event
      })
      this.schoolName = obj.schoolName
      cookies.remove('schoolInfos')
      cookies.set('schoolInfos', JSON.stringify(obj), { expires: 30 })
      window.location.reload()
    }
  }
}
</script>
<style>
.clear-both {
  clear: both;
}
.header-comm {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.06);
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  text-align: center;
}
.logo-cont {
  width: 210px;
  height:106px;
  position: relative;
  float: left;
}
.logo {
  width: 170px;
  height: 48px;
  margin-left: 20px;
  position: absolute;
  left:50%;
  top: 50%;
  margin-left: -85px;
  margin-top: -24px;
}
.hospital-title {
  font-size: 24px;
  font-family: MicrosoftYaHei;
  color: rgba(85, 85, 85, 1);
  margin-left: 77px;
  float: left;
}
.login-out {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 100px;
  float: right;
}
.user-contain {
  display: flex;
  align-items: center;
  float: left;
  position: relative;
}
.tx-cont {
  width: 170px;
  height: 106px;
  position: relative;
  float: right;
}
.tx {
  width: 39px;
  height: 39px;
  position: absolute;
  left:50%;
  top: 50%;
  margin-left: -20px;
  margin-top: -20px;
}
.user-name {
  font-size: 20px;
  font-family: MicrosoftYaHei;
  color: rgba(85, 85, 85, 1);
  float: right;
  /* display: block;
  position: absolute; */
  left: 116px;
  /* width: 200px; */
  text-align: left;
}
.out-main {
  margin-left: 50px;
  cursor: pointer;
  float: right;
  position: relative;
}
.out-icon {
  width: 26px;
  height: 26px;
}
.txt {
  font-size: 12px;
  font-family: MicrosoftYaHei;
  color: rgba(85, 85, 85, 1);
  position: absolute;
  top: 19px;
}
.select-hospital {
  float: left;
}
</style>
