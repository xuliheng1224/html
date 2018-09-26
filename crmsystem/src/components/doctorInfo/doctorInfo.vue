<template>
  <div class="page" >
    <div class="search">
      <div class="search_box">
        <div>讲师姓名</div>
        <div class="search_input">
          <el-input
            v-model="keyword"
            placeholder="请输入内容"
            clearable></el-input>
        </div>
        <div>
          <el-button type="primary" @click="searchDoctorData">搜索</el-button>
        </div>
      </div>
      <div class="search_table">
        <div class="search_add" v-if="authTagsArr.indexOf('lecture_add') > -1" @click="addDoctor">
          <i class="el-icon-circle-plus"></i>
          <span>添加</span>
        </div>
        <el-table
          :data="doctordata.data"
          stripe
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column
            prop="lecturerId"
            label="编号"
            width="400">
          </el-table-column>
          <el-table-column
            prop="lecturerName"
            label="姓名"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="lecturerLevel"
            label="职称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="200"
            :formatter="formatterCreate">
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="更新时间"
            width="200"
            :formatter="formatterUpdate">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <!-- <el-button
                         type="text"
                         size="small">查看
              </el-button> -->
              <el-button v-if="authTagsArr.indexOf('lecture_edit') > -1" @click="editClick(scope.row.lecturerId)"
                type="text"
                size="small">编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="paging" >
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :page-size="doctordata.pageSize" :page-sizes="[10, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="doctordata.totalCount">
    </el-pagination></div>
      </div>
    </div>
    <el-dialog title="添加讲师" :visible.sync="centerDialogVisible" width="30%" center><div><span style="padding-right:20px">讲师姓名</span><span><el-select v-model="doctorVal" filterable placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.text"
      :value="item.value">
    </el-option>
  </el-select></span></div> <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveDoctor">确 定</el-button>
  </span>
</el-dialog>
<el-dialog title="编辑信息" :visible.sync="editDialogVisible" width="50%" center>
  <div class="dialog"><span class="left_title">讲师姓名</span><span class="right_input"><el-input v-model.trim="lecturer.lecturerName" placeholder="请输入内容"></el-input></span></div>
  <div class="dialog"><span class="left_title">讲师头像</span><span class="right_input">
    <el-upload
  class="avatar-uploader"
  action="/msg/upload"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  name='img'>
  <el-button type="primary" >上传头像</el-button>
  <img v-if="lecturer.photo" :src="lecturer.photo" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
    </span></div>
  <div class="dialog"><span class="left_title">讲师职称</span><span class="right_input"><el-select v-model="lecturer.titleName" @change="selectChange" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.titleId"
      :label="item.name"
      :value="item.titleId">
    </el-option>
  </el-select></span></div>
  <div class="dialog"><span class="left_title">讲师简介</span><span class="right_input">
    <el-input type="textarea" :rows="4" maxlength='150' placeholder="请输入内容" v-model="lecturer.lecturerIntro">
</el-input>
</span></div>
  <span slot="footer" style="padding-top:20px" class="dialog-footer">
    <div style="height:20px"></div>
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" v-if="authTagsArr.indexOf('lecture_edit_submit') > -1"  @click="saveDoctorInfo">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { fetch } from '../../../src/common/fetch'
import { tool } from '../../common/util'
export default {
  computed: mapState({
    doctordata: state => state.doctorInfo.doctorinfo
  }),
  data () {
    return {
      keyword: '',
      pageSize: 10,
      page: '',
      centerDialogVisible: false,
      editDialogVisible: false,
      options: [],
      doctorVal: '',
      imageUrl: '',
      lecturer: {}, // 讲师信息
      authTagsArr: []
    }
  },
  mounted () {
    this.authTagsArr = tool.localStorage.get('authTags')
    console.log(this.authTagsArr.indexOf('lecture_edit_submit'))
    this.getDoctorData()
  },
  methods: {
    // 格式化时间戳
    formatterCreate (row, column) {
      var createTime = new Date(row.createTime)
      return createTime.toLocaleString()
    },
    formatterUpdate (row, column) {
      var updateTime = new Date(row.updateTime)
      return updateTime.toLocaleString()
    },
    // 请求数据列表
    getDoctorData () {
      this.$store.dispatch('getLecturerList', {_this: this, pageSize: this.pageSize, page: 1})
    },
    // 分页
    handleCurrentChange (val) {
      this.page = val
      this.$store.dispatch('getLecturerList', {_this: this, pageSize: this.pageSize, page: this.page})
    },
    handleSizeChange (val) {
      this.$store.dispatch('getLecturerList', {_this: this, pageSize: val, page: 1})
    },
    // 搜索
    searchDoctorData () {
      this.$store.dispatch('getLecturerList', {_this: this, keyword: this.keyword, pageSize: this.page, page: 1})
    },
    // 获取医生信息
    addDoctor () {
      this.centerDialogVisible = true
      fetch({
        url: '/crm/lecturer/doctor/list',
        method: 'get',
        params: {
          pageSize: 200
        },
        success: (res) => {
          this.options = res.data.data
        },
        fail: function (err) {
          console.log(err)
        }
      })
    },
    // 添加医生
    saveDoctor () {
      fetch({
        url: '/crm/lecturer/insert/' + this.doctorVal,
        method: 'post',
        success: (res) => {
          if (res.data.code === '0000') {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.centerDialogVisible = false
            this.getDoctorData()
          } else {
            this.$message.error(res.data.msg)
          }
        },
        fail: function (err) {
          console.log(err)
        }
      })
    },
    // 编辑医生信息
    editClick (lecturerId) {
      fetch({
        url: '/crm/lecturer/edit',
        method: 'get',
        params: {
          lecturerId: lecturerId
        },
        success: (res) => {
          if (res.data.code === '0000') {
            this.editDialogVisible = true
            this.options = res.data.data.titleList
            this.lecturer = res.data.data.lecturer
          } else {
            this.$message.error(res.data.msg)
          }
        },
        fail: function (err) {
          console.log(err)
        }
      })
    },
    // 选择医生职称
    selectChange (titleId) {
      let obj = {}
      obj = this.options.find((item) => {
        return item.titleId === titleId
      })
      this.lecturer.titleId = obj.titleId
      this.lecturer.titleName = obj.name
    },
    // 更换医生头像
    handleAvatarSuccess (res) {
      this.lecturer.photo = res.imagePath
    },
    beforeAvatarUpload (file) {
      if (file.type.indexOf('image/jpeg') > -1 || file.type.indexOf('image/png') > -1) {
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
          return false
        }
      } else {
        this.$message.error('  JPG 或 PNG 格式!')
        return false
      }
    },
    saveDoctorInfo () {
      if (this.lecturer.lecturerName && this.lecturer.photo && this.lecturer.titleName && this.lecturer.lecturerIntro) {
        var saveData = {
          doctorId: this.lecturer.doctorId,
          lecturerId: this.lecturer.lecturerId,
          lecturerIntro: this.lecturer.lecturerIntro,
          lecturerName: this.lecturer.lecturerName,
          photo: this.lecturer.photo,
          titleId: this.lecturer.titleId,
          titleName: this.lecturer.titleName
        }
        fetch({
          url: '/crm/lecturer/save',
          method: 'post',
          data: saveData,
          success: (res) => {
            if (res.data.code === '0000') {
              this.editDialogVisible = false
              this.handleCurrentChange(this.page)
            } else {
              this.$message.error(res.data.msg)
            }
          },
          fail: function (err) {
            console.log(err)
          }
        }, this)
      } else {
        this.$message.error('请完善信息')
      }
    }
  }
}
</script>

<style scoped>
  .page {
    padding: 20px;
    background-color: #fff;
  }

  .search_box {
    padding: 20px;
  }

  .search_box div {
    display: inline-block;
  }

  .search_input {
    width: 400px;
  }

  .search_table {
    padding-top: 40px;
  }

  .search_add {
    width: 100px;
    padding-bottom: 10px;
    vertical-align: middle;
    align-content: center;
    float: right;
    font-size: 18px;
  }

  .el-table {
    border-top: 1px solid #d8dee5;
  }

  .el-icon-circle-plus:before {
    color: #7eafff;
  }
  .paging {
    text-align: center;
    padding-top: 20px;
  }
  .search_add {
    cursor: pointer;
  }
  .dialog div{
  line-height: 60px
}
.left_title{
  width: 20%;
  float: left;
  line-height: 60px
}
.right_input{
  width: 80%;
  float: left;
}
.right_input div{
  width: 100%;
}
.el-upload__tip{
  padding-left: 10px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
