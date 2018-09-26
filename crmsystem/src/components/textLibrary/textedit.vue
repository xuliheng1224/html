<template>
  <div style="background:#fff;padding:20px;overflow:hidden;">
    <h2>课文编辑</h2>
    <div>
      <el-form :label-position="labelPosition" label-width="100px" style="width:500px;float:left;">
        <el-form-item label="课文名称">
          <el-input v-model.trim="name"></el-input>
        </el-form-item>
        <el-form-item label="适用阶段">
          <el-radio v-model="radio" label="ANTENATAL" @change='changeradio'>孕期</el-radio>
          <el-radio v-model="radio" label="POSTPARTUM" @change='changeradio'>产后</el-radio>
        </el-form-item>
        <el-form-item label="孕周">
          <el-select v-model="starttime" placeholder="请选择" style='float:left;width:48%;' @change='changeClick'>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          -
          <el-select v-model="endtime" placeholder="请选择" style='float:right;width:49%;'>
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择课件">
          <el-select v-model="wareName" placeholder="请选择" style='width:100%;' clearable @change='changeke'>
            <el-option
              v-for="item in wareList"
              :key="item.wareId"
              :label="item.wareName"
              :value="item.wareId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="随堂测试">
          <el-select v-model="que" placeholder="请选择" style='width:100%;' clearable @change='changece'>
            <el-option
              v-for="item in examList"
              :key="item.queId"
              :label="item.que"
              :value="item.queId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课文简介">
          <el-input type="textarea" v-model="intro" :rows='8'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click='cancel'>取消</el-button>
        </el-form-item>
      </el-form>
      <el-form :label-position="labelPosition" label-width="100px" style="width:500px;float:left;margin-left:50px;">
        <el-form-item label="课文封面:">
          <div class='divimg'>
            <img :src="upimg" alt="">
          </div>
          <div>
            <el-upload
              action="/msg/upload"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :on-success="handleSuccess"
              name='img'>
              <el-button type="primary" style='margin-right:20px;'>上传文件</el-button>
              </el-upload>
              <div>
                <p>上传的封面将显示为课程课件</p>
                <p>建议尺寸60*60</p>
                <p>支持扩展名：jpg，png</p>
              </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { fetch } from '../../common/fetch'
export default {
  data () {
    return {
      name: '',
      radio: 'ANTENATAL',
      labelPosition: 'right',
      intro: '',
      examList: [],
      wareList: [],
      que: '',
      wareName: '',
      wareId: '',
      queId: '',
      starttime: '',
      endtime: '',
      options: [],
      option: [{
        value: '1',
        label: '1'
      }, {
        value: '2',
        label: '2'
      }, {
        value: '3',
        label: '3'
      }, {
        value: '4',
        label: '4'
      }, {
        value: '5',
        label: '5'
      }, {
        value: '6',
        label: '6'
      }, {
        value: '7',
        label: '7'
      }, {
        value: '8',
        label: '8'
      }, {
        value: '9',
        label: '9'
      }, {
        value: '10',
        label: '10'
      }, {
        value: '11',
        label: '11'
      }, {
        value: '12',
        label: '12'
      }, {
        value: '13',
        label: '13'
      }, {
        value: '14',
        label: '14'
      }, {
        value: '15',
        label: '15'
      }, {
        value: '16',
        label: '16'
      }, {
        value: '17',
        label: '17'
      }, {
        value: '18',
        label: '18'
      }, {
        value: '19',
        label: '19'
      }, {
        value: '20',
        label: '20'
      }, {
        value: '21',
        label: '21'
      }, {
        value: '22',
        label: '22'
      }, {
        value: '23',
        label: '23'
      }, {
        value: '24',
        label: '24'
      }, {
        value: '25',
        label: '25'
      }, {
        value: '26',
        label: '26'
      }, {
        value: '27',
        label: '27'
      }, {
        value: '28',
        label: '28'
      }, {
        value: '29',
        label: '29'
      }, {
        value: '30',
        label: '30'
      }, {
        value: '31',
        label: '31'
      }, {
        value: '32',
        label: '32'
      }, {
        value: '33',
        label: '33'
      }, {
        value: '34',
        label: '34'
      }, {
        value: '35',
        label: '35'
      }, {
        value: '36',
        label: '36'
      }, {
        value: '37',
        label: '37'
      }, {
        value: '38',
        label: '38'
      }, {
        value: '39',
        label: '39'
      }, {
        value: '40',
        label: '40'
      }],
      upimg: '',
      options2: [],
      index1: 0,
      index2: 0
    }
  },
  methods: {
    // 切换按钮
    changeradio (val) {
      this.options2 = []
      if (val === 'POSTPARTUM') {
        this.starttime = ''
        this.endtime = ''
        this.options = [{
          label: '产后0天',
          value: '0'
        }, {
          label: '产后42天',
          value: '42'
        }, {
          label: '产后6个月',
          value: '180'
        }, {
          label: '产后1年',
          value: '365'
        }, {
          label: '产后2年',
          value: '720'
        }, {
          label: '产后3年',
          value: '1095'
        }]
      } else {
        this.starttime = ''
        this.endtime = ''
        this.options = this.option
      }
    },
    // 上传之前
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
    // 孕周
    changeClick (val) {
      this.options.forEach((v, k) => {
        if (v.value === val) {
          this.options2 = this.options.slice(k)
        }
      })
    },
    // 课件
    changeke (val) {
      this.index1 = 1
    },
    // 测试
    changece () {
      this.index2 = 1
    },
    // 上传成功
    handleSuccess (res, file) {
      this.upimg = res.imagePath
      // console.log(res.imagePath)
    },
    // 检查是否有中文
    isChinese (str) {
      var reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
      if (reg.test(str)) {
        return true
      } else {
        return false
      }
    },
    // 判断孕周
    startss () {
      if (this.radio === 'POSTPARTUM') {
        if (this.starttime.replace(/[^0-9]/ig, '') === '6') {
          return '180'
        } else if (this.starttime.replace(/[^0-9]/ig, '') === '1') {
          return '365'
        } else if (this.starttime.replace(/[^0-9]/ig, '') === '2') {
          return '720'
        } else if (this.starttime.replace(/[^0-9]/ig, '') === '3') {
          return '1095'
        } else {
          return this.starttime.replace(/[^0-9]/ig, '')
        }
      } else {
        return this.starttime
      }
    },
    endss () {
      if (this.radio === 'POSTPARTUM') {
        if (this.endtime.replace(/[^0-9]/ig, '') === '6') {
          return '180'
        } else if (this.endtime.replace(/[^0-9]/ig, '') === '1') {
          return '365'
        } else if (this.endtime.replace(/[^0-9]/ig, '') === '2') {
          return '720'
        } else if (this.endtime.replace(/[^0-9]/ig, '') === '3') {
          return '1095'
        } else {
          return this.endtime.replace(/[^0-9]/ig, '')
        }
      } else {
        return this.endtime
      }
    },
    // 保存
    onSubmit () {
      var op = {
        courseName: this.name,
        gestationalType: this.radio,
        weekMin: this.isChinese(this.starttime) ? this.startss() : this.starttime,
        weekMax: this.isChinese(this.endtime) ? this.endss() : this.endtime,
        wareId: this.index1 === 0 ? this.wareId : this.wareName,
        queId: this.index2 === 0 ? this.queId : this.que,
        courseIntro: this.intro,
        photo: this.upimg,
        courseId: this.$route.query.courseId
      }
      // if (!op.photo) {
      //   delete op.photo
      // }
      // if (!op.wareId) {
      //   delete op.wareId
      // }
      // if (!op.queId) {
      //   delete op.queId
      // }
      var btn = false
      if (op.courseName) {
        if (op.gestationalType) {
          if (op.weekMin) {
            if (op.weekMax) {
              if (op.courseIntro) {
                btn = true
              } else {
                this.$message.error('请填写课文简介')
              }
            } else {
              this.$message.error('请选择结束时间')
            }
          } else {
            this.$message.error('请选择开始时间')
          }
        } else {
          this.$message.error('请选择使用阶段')
        }
      } else {
        this.$message.error('请填写课程名称')
      }
      if (btn === true) {
        fetch({
          url: '/crm/course/courseSave',
          method: 'post',
          data: op,
          success: (res) => {
            if (res.data.code === '0000') {
              this.$notify({
                title: '保存成功',
                type: 'success'
              })
              setTimeout(() => {
                this.$router.push('/schoolInfo/textLibrary')
              }, 500)
            } else {
              this.$message.error(res.data.msg)
            }
          },
          fail: (err) => {
            console.log(err)
          }
        })
      }
    },
    // 取消
    cancel () {
      this.$router.push('/schoolInfo/textLibrary')
    }
  },
  mounted () {
    this.options = this.option
    // 获取课件和随堂测试
    fetch({
      url: '/crm/course/courseDetail',
      method: 'get',
      params: {
        courseId: this.$route.query.courseId
      },
      success: (res) => {
        if (res.data.code === '0000') {
          let course = res.data.data.course
          this.examList = res.data.data.examList
          this.wareList = res.data.data.wareList
          let examList = res.data.data.examList
          let wareList = res.data.data.wareList
          this.name = course.courseName
          this.courseIntro = course.courseExt.courseIntro
          this.upimg = course.courseExt.photo
          this.intro = course.courseExt.courseIntro
          this.radio = course.courseExt.gestationalType
          if (course.courseExt.gestationalType === 'POSTPARTUM') {
            this.starttime = course.courseExt.weekMinStr
            this.endtime = course.courseExt.weekMaxStr
            this.options = [{
              label: '产后0天',
              value: '0'
            }, {
              label: '产后42天',
              value: '42'
            }, {
              label: '产后6个月',
              value: '180'
            }, {
              label: '产后1年',
              value: '365'
            }, {
              label: '产后2年',
              value: '720'
            }, {
              label: '产后3年',
              value: '1095'
            }]
          } else {
            this.starttime = course.courseExt.weekMin
            this.endtime = course.courseExt.weekMax
            this.options = this.option
          }
          examList.forEach((v, i) => {
            if (v.queId === course.queId) {
              this.que = v.que
              this.queId = v.queId
            }
          })
          wareList.forEach((v, i) => {
            if (v.wareId === course.wareId) {
              this.wareName = v.wareName
              this.wareId = v.wareId
            }
          })
        } else {
          this.$messge.error(res.data.msg)
        }
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }
}
</script>
<style scoped lang="less">
h2 {
  color:#35a9f9;
  font-weight: 100;
}
.divimg {
  width: 350px;
  height: 200px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
  }
}
p {
  color: #606266;
  margin: 0;
  line-height: 20px;
  &:nth-child(1) {
    margin-top: 20px;
  }
}
</style>
