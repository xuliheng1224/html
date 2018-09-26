<template>
    <div class="hostpital_content">
      <div class="hostpital_header">
        <div>医院信息管理</div>
      </div>
      <div>
        <el-form ref="form" label-width="80px">
        <el-form-item label="医院名称:">
          <el-input v-model.trim="hosdetail.hosName" style="width: 550px;"></el-input>
        </el-form-item>
        <el-form-item label="医院等级:">
          <el-select v-model="hosdetail.level" style="width: 550px;">
            <el-option label="一级甲等" value="一级甲等"></el-option>
            <el-option label="一级乙等" value="一级乙等"></el-option>
            <el-option label="一级丙等" value="一级丙等"></el-option>
            <el-option label="二级甲等" value="二级甲等"></el-option>
            <el-option label="二级乙等" value="二级乙等"></el-option>
            <el-option label="二级丙等" value="二级丙等"></el-option>
            <el-option label="三级甲等" value="三级甲等"></el-option>
            <el-option label="三级乙等" value="三级乙等"></el-option>
            <el-option label="三级丙等" value="三级丙等"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院地址:">
          <el-select
            style="width:180px;"
            v-model="hosdetail.provinceName"
            @change="choseProvince"
            placeholder="省级地区">
          <el-option
            v-for="item in distDtoList"
            :key="item.pid"
            :label="item.name"
            :value="item.code+','+item.name">
          </el-option>
          </el-select>
          <el-select
            style="width:180px;"
            v-model="hosdetail.cityName"
            @change="choseCity"
            placeholder="市级地区">
            <el-option
              v-for="item in shi1"
              :key="item.pid"
              :label="item.name"
              :value="item.code+','+item.name">
            </el-option>
          </el-select>
          <el-select
            style="width:180px;"
            v-model="hosdetail.countyName"
            placeholder="区级地区">
            <el-option
              v-for="item in qu1"
              :key="item.pid"
              :label="item.name"
              :value="item.code + ',' + item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院封面:">
          <img :src="hosdetail.photo" alt="" style="width:300px;">
          <div style="width:300px;display: flex;justify-content: center;">
            <el-upload
              action="/msg/upload"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess"
              name='img'>
              <el-button type="primary" style='margin-right:20px;'>更换</el-button>
              </el-upload>
            <el-button type="primary" @click='delimg'>删除</el-button>
          </div>
        </el-form-item>
        <el-form-item label="医院相册:">
          <el-upload
            action="/msg/upload"
            list-type="picture-card"
            :before-upload="beforeAvatarUpload"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            name='img'
            :file-list='hosimg'
            :limit=5
           >
            <i class="el-icon-plus"></i>
            <div slot="tip" style="margin-bottom: 20px;">
              <p>上传的图片将显示在学校列表页和学校详情页</p>
              <p>图片1—5张，建议像素：xx*xx</p>
              <p>支持扩展名：.jpg，.png</p>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="医院简介:">
          <el-input type="textarea" :rows="10" v-model="hosdetail.intro" style="width: 550px;" placeholder="请输入医院简介"></el-input>
        </el-form-item>
        <el-form-item label="联系电话:">
          <el-input v-model="hosdetail.tel" style="width: 550px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" v-if="auth.indexOf('hos_edit_submit') > -1">保存</el-button>
          <el-button @click='reload'>取消</el-button>
        </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
import { fetch } from '../../common/fetch'
import { tool } from '../../common/util'
export default {
  data () {
    return {
      hosdetail: {},
      distDtoList: [],
      shi1: [],
      qu1: [],
      dialogImageUrl: [],
      dialogImageUrlStr: '',
      hosimg: [],
      miglist: [],
      auth: []
    }
  },
  methods: {
    // 删除医院封面
    delimg () {
      this.hosdetail.photo = ''
    },
    // 跟换医院封面
    handleAvatarSuccess (res) {
      this.hosdetail.photo = res.imagePath
    },
    beforeAvatarUpload (file) {
      if (file.type.indexOf('image/jpeg') > -1 || file.type.indexOf('image/png') > -1) {
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
          return false
        }
      } else {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
        return false
      }
    },
    // 获取医院信息
    getHosDetail () {
      fetch({
        url: '/crm/school/detail',
        method: 'get',
        success: (res) => {
          if (res.data.code === '0000') {
            this.hosdetail = res.data.data.dto
            this.distDtoList = res.data.data.distDtoList
            this.getAreaByParentCode(0, this.hosdetail.provinceCode)
            this.getAreaByParentCode(1, this.hosdetail.cityCode)
            if (res.data.data.dto.img) {
              let a = res.data.data.dto.img.split(',')
              a.forEach((v, k) => {
                this.hosimg.push({name: '', url: v})
              })
            }
          } else {
            this.$message.error(res.data.msg)
          }
        },
        fail: function (err) {
          console.log(err)
        }
      }, this)
    },
    // 获取下级地区
    getAreaByParentCode (num, code) {
      fetch({
        url: '/crm/school/getAreaByParentCode',
        method: 'get',
        params: {
          type: num,
          parentCode: code
        },
        success: (res) => {
          if (res.data.code === '0000') {
            if (num === 0) {
              this.shi1 = res.data.data
            } else {
              this.qu1 = res.data.data
            }
          } else {
            this.$message.error(res.data.msg)
          }
        },
        fail: function (err) {
          console.log(err)
        }
      }, this)
    },
    // 保存
    onSubmit () {
      this.dialogImageUrl = []
      this.hosimg.forEach((v, k) => {
        this.dialogImageUrl.push(v.url)
      })
      this.dialogImageUrlStr = this.dialogImageUrl.join(',')
      if (this.hosdetail.provinceName && this.hosdetail.cityName && this.hosdetail.countyName) {
        var op = {
          hosName: this.hosdetail.hosName,
          level: this.hosdetail.level,
          provinceCode: this.hosdetail.provinceName.indexOf(',') > -1 ? this.hosdetail.provinceName : this.hosdetail.provinceCode + ',' + this.hosdetail.provinceName,
          cityCode: this.hosdetail.cityName.indexOf(',') > -1 ? this.hosdetail.cityName : this.hosdetail.cityCode + ',' + this.hosdetail.provinceName,
          countyCode: this.hosdetail.countyName.indexOf(',') > -1 ? this.hosdetail.countyName : this.hosdetail.countyCode + ',' + this.hosdetail.countyName,
          photo: this.hosdetail.photo,
          img: this.dialogImageUrlStr,
          intro: this.hosdetail.intro,
          tel: this.hosdetail.tel
        }
        fetch({
          url: '/crm/school/edit',
          method: 'post',
          data: op,
          success: (res) => {
            if (res.data.code === '0000') {
              this.$notify({
                title: '保存成功',
                type: 'success'
              })
            } else {
              this.$message.error(res.data.msg)
            }
          },
          fail: function (err) {
            console.log(err)
          }
        }, this)
      } else {
        this.$message.error('请完善地址')
      }
    },
    // 取消
    reload () {
      location.reload()
    },
    // 上传成功
    handleSuccess (res, file) {
      this.hosimg.push({name: '', url: res.imagePath})
      // this.dialogImageUrl.push(res.imagePath)
      // this.dialogImageUrlStr = this.dialogImageUrl.join(',')
    },
    // 删除
    handleRemove (res) {
      this.hosimg.forEach((v, i) => {
        if (v.uid === res.uid) {
          this.hosimg.splice(i, 1)
        }
      })
    },
    // 选择省
    choseProvince (code) {
      this.hosdetail.cityName = ''
      this.hosdetail.countyName = ''
      this.getAreaByParentCode(0, code.split(',')[0])
    },
    // 选择市
    choseCity (code) {
      this.hosdetail.countyName = ''
      this.getAreaByParentCode(1, code.split(',')[0])
    }
  },
  mounted () {
    this.getHosDetail()
    this.auth = tool.localStorage.get('authTags')
  }
}
</script>

<style scoped lang="less">
  p {
    margin: 0;
    padding: 0;
    height: 18px;
    color:#ccc;
  }
  .hostpital_content {
    background: #fff;
    padding:30px;
    width:1584px;
    .hostpital_header {
      width:1450px;
      border-bottom:1px solid rgba(237,237,237,1);
      margin-bottom: 50px;
      div {
        width:114px;
        height:24px;
        font-size:18px;
        font-family:MicrosoftYaHei;
        padding-bottom: 10px;
        border-bottom:3px solid rgba(126,175,255,1);
      }
    }
  }
</style>
