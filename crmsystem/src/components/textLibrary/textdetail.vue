<template>
  <div style="background:#fff;padding:20px;">
    <h2>课文详情</h2>
    <div class='itme'>
      <span>课文名称</span>
      <time>{{courseName}}</time>
    </div>
    <div class='itme'>
      <span>试用阶段</span>
      <time>{{gestational}}</time>
    </div>
    <div class='itme'>
      <span>选择课件</span>
      <time>{{wareName}}</time>
    </div>
    <div class='itme'>
      <span>随堂测试</span>
      <time>{{que}}</time>
    </div>
    <div class='itme'>
      <span>课文简介</span>
      <time>{{courseIntro}}</time>
    </div>
    <div class='lastitem'>
      <span>课文封面</span>
      <img :src="photo" alt="" style="height:100%;">
    </div>
    <div class='btn'>
      <el-button type="primary" style="margin-right:30px;" @click='editClick'>编辑</el-button>
      <el-button type="success" @click='back'>返回</el-button>
    </div>
  </div>
</template>

<script>
import { fetch } from '../../common/fetch'
export default {
  data () {
    return {
      courseName: '',
      gestational: '',
      wareName: '',
      que: '',
      courseIntro: '',
      photo: ''
    }
  },
  methods: {
    back () {
      history.back(-1)
    },
    editClick () {
      this.$router.push({path: '/textedit', query: {courseId: this.$route.query.courseId}})
    }
  },
  mounted () {
    fetch({
      url: '/crm/course/courseDetail',
      method: 'get',
      params: {
        courseId: this.$route.query.courseId
      },
      success: (res) => {
        if (res.data.code === '0000') {
          let course = res.data.data.course
          let examList = res.data.data.examList
          let wareList = res.data.data.wareList
          this.courseName = course.courseName
          this.courseIntro = course.courseExt.courseIntro
          this.photo = course.courseExt.photo
          if (course.courseExt.gestationalType === 'ANTENATAL') {
            this.gestational = '孕期' + course.courseExt.weekMin + '~' + course.courseExt.weekMax + '周'
          } else {
            this.gestational = course.courseExt.weekMinStr + '~' + course.courseExt.weekMaxStr
          }
          examList.forEach((v, i) => {
            if (v.queId === course.queId) {
              this.que = v.que
            }
          })
          wareList.forEach((v, i) => {
            if (v.wareId === course.wareId) {
              this.wareName = v.wareName
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
<style scoped lang='less'>
h2 {
  color:#35a9f9;
  font-weight: 100;
}
.itme {
  padding-left: 20px;
  margin: 20px 0;
  span {
    margin-right: 20px;
    color: #303133;
  }
  time {
    color: #999999;
  }
}
.lastitem {
  height: 200px;
  display: flex;
  justify-items: center;
  align-items: center;
  padding-left: 20px;
  span {
    margin-right: 20px;
  }
}
.btn {
  width: 300px;
  text-align: center;
  margin: 30px 0;
}
</style>
