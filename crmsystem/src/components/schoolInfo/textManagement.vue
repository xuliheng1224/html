<template>
  <div class="content">
    <div class="ment_top">
      <div class="search_input">
          <div class="input_box">
            <div class="title">素材标题</div>
            <div>
              <el-input class="title_box" v-model.trim="title" placeholder="请输入素材标题"></el-input>
            </div>
          </div>
          <div class="input_box">
            <div class="title">状态</div>
            <div>
              <el-select class="title_box" v-model="stateValue" placeholder="请选择状态">
                <el-option v-for="item in stateOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </div>
          <div class="input_box">
            <div class="title">类型</div>
            <div>
              <el-select class="title_box" v-model="typeValue" placeholder="请选择类型">
                <el-option v-for="item in typeOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </div>
      </div>
      <div class="input_btn">
        <div>
          <el-button class="confirm_btn" @click="confirm">确认</el-button>
          <el-button class="eliminate_btn" @click="reset">清除</el-button>
        </div>
      </div>
    </div>
    <div class="search_table">
      <div class="search_add" v-if="authTagsArr.indexOf('ware_add') > -1" @click="addText">
        <i class="el-icon-circle-plus"></i>
        <span>添加</span>
      </div>
      <el-table :data="tableData" stripe style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column prop="wareId" label="素材编号" width="400"></el-table-column>
        <el-table-column prop="wareName" label="素材标题" width="300"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" :formatter="timeFormatter"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="authTagsArr.indexOf('ware_detail') > -1" @click="seeText(scope.row.wareId)" type="text" size="small">详情</el-button>
            <el-button type="text" size="small" v-if="authTagsArr.indexOf('ware_edit') > -1" @click="editText(scope.row.wareId)">编辑</el-button>
            <el-button type="text" size="small" @click="updateStatus(scope.row.wareId,'NORMAL')" v-if="authTagsArr.indexOf('ware_detail') > -1 && scope.row.status == 'DISABLE'">启用</el-button>
            <el-button type="text" size="small" @click="updateStatus(scope.row.wareId,'DISABLE')" v-if="authTagsArr.indexOf('ware_detail') > -1 && scope.row.status == 'NORMAL'">停用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      style="margin-top: 20px;text-align: center;"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count">
    </el-pagination>
    <el-dialog :title="dialogTitle" :visible.sync="centerDialogVisible" width="50%" center>
  <div class="dialog"><span class="left_title">*素材标题</span><span class="right_input"><el-input :disabled="inputdisabled"  v-model.trim="wareDetail.wareName" placeholder="请输入内容"></el-input></span></div>
  <div class="dialog"><span class="left_title">*类型</span><span class="right_input"><el-select :disabled="inputdisabled" @change="selectChange"  v-model="wareDetail.type" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select></span></div>
  <div class="dialog"><span class="left_title">*添加素材</span><span class="right_input">
    <el-upload class="upload-demo"
  action="http://upload.qiniu.com/"  ref='upload'
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-upload="beforeAvatarUpload"
  :before-remove="beforeRemove"
  multiple
  :limit="1"
  :on-exceed="handleExceed"
  :on-success="handleSuccess"
  :on-error="handleError"
  :data="postData"
  :file-list="fileList" :on-change="handchange" :disabled="inputdisabled">
  <el-button size="small" :disabled="inputdisabled" type="primary">点击上传</el-button>
  <span slot="tip" class="el-upload__tip">只能上传所选课件类型的文件，且不超过 500MB</span>
</el-upload>
</span></div>
  <span slot="footer" style="margin-top:20px" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="save">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>
<style scoped src="../../../static/css/schoolInfo.css"></style>
<script>
import fomateDate from '../../common/fomateDate.js'
import { fetch } from '../../../src/common/fetch'
import { tool } from '../../common/util'
export default {
  data () {
    return {
      title: '',
      stateValue: '',
      typeValue: '',
      page: 1,
      pageSize: 10,
      stateOpt: [{value: 'PPT', label: 'PPT'}, {value: 'PDF', label: 'PDF'}, {value: 'MP4', label: 'MP4'}],
      typeOpt: [{value: 'NORMAL', label: '启用'}, {value: 'DISABLE', label: '停用'}],
      tableData: [],
      count: 0,
      isTrue: false,
      centerDialogVisible: false,
      options: [
        {
          value: 'PPT',
          label: 'PPT'
        }, {
          value: 'PDF',
          label: 'PDF'
        }, {
          value: 'MP4',
          label: 'MP4'
        }
      ],
      dialogTitle: '',
      fileList: [],
      wareDetail: {},
      inputdisabled: false, // 标签配置
      retrunFile: '',
      uploader: '',
      wareUrl: '', // 上传后拼接路径
      wareId: '',
      upload: false,
      postData: {},
      authTagsArr: []
    }
  },
  mounted () {
    this.authTagsArr = tool.localStorage.get('authTags')
    this.fileList = []
    this.init()
  },
  methods: {
    timeFormatter (row, column) {
      return fomateDate(row.createTime)
    },
    init () {
      this.$store.dispatch('getWareList', {pageNo: this.page, pageSize: this.pageSize, vue: this})
    },
    confirm () {
      this.isTrue = true
      this.page = 1
      this.$store.dispatch('getWareList', {pageNo: this.page, pageSize: this.pageSize, keyword: this.title, status: this.typeValue, type: this.stateValue, state: 1, vue: this})
    },
    pageConfirm () {
      this.$store.dispatch('getWareList', {pageNo: this.page, pageSize: this.pageSize, keyword: this.title, status: this.typeValue, type: this.stateValue, state: 1, vue: this})
    },
    reset () {
      this.title = ''
      this.stateValue = ''
      this.typeValue = ''
    },
    // 分页相关
    handleSizeChange (val) {
      this.pageSize = val
      if (this.isTrue) {
        this.pageConfirm()
      } else {
        this.init()
      }
    },
    // 分页相关
    handleCurrentChange (val) {
      this.page = val
      if (this.isTrue) {
        this.pageConfirm()
      } else {
        this.init()
      }
    },
    // 上传移除文件
    handleRemove (file, fileList) {
      this.fileList = []
      this.wareUrl = ''
    },
    // 点击预览文件
    handlePreview (file) {
      // console.log(file)
      window.open(file.url)
    },
    // 文件超出个数限制时的钩子
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    // 删除文件之前的钩子
    beforeRemove (file, fileList) {
      if (file !== undefined) {
        return this.$confirm(`确定移除${file.name} ？`)
      }
    },
    // 上传文件之前的钩子
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 500
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 500MB!')
        this.$refs.upload.clearFiles()
        return false
      }
      if (this.wareDetail.type === undefined) {
        this.$message.warning(`请选择上传文件类型`)
        this.$refs.upload.clearFiles()
        return false
      }
      var wareType = ''
      if (this.wareDetail.type === 'PPT') {
        wareType = 'application/vnd.ms-powerpoint'
      } else if (this.wareDetail.type === 'PDF') {
        wareType = 'application/pdf'
      } else {
        wareType = 'video/mp4'
      }
      if (wareType !== file.type) {
        this.$message.warning(`请上传所选择类型的文件`)
        this.$refs.upload.clearFiles()
        return false
      }
      var key = ''
      // 获取年月日时分秒
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hour = date.getHours()
      var minute = date.getMinutes()
      var second = date.getSeconds()
      key += year + '_' + month + '_' + day + '_' + hour + minute + second + '_'
      key += file.name
      this.postData.key = key
    },
    handchange (file, fileList) {
      console.log(fileList)
    },
    // 文件上传成功时的钩子
    handleSuccess (response, file, fileList) {
      this.wareUrl = 'http://image.bblink.cn/' + response.key
    },
    // 上传错误信息
    handleError (res) {
      console.log(res)
    },
    // 添加
    addText () {
      this.dialogTitle = '添加'
      this.wareDetail = {}
      this.inputdisabled = false
      this.fileList = []
      this.centerDialogVisible = true
      this.getKey()
    },
    // 编辑
    editText (wareId) {
      this.dialogTitle = '编辑'
      this.wareId = wareId
      this.fileList = this.fileList
      this.inputdisabled = false
      fetch({
        url: '/crm/course/wareDetail',
        method: 'get',
        params: {
          wareId: wareId
        },
        success: (res) => {
          if (res.data.code === '0000') {
            this.fileList = []
            this.wareDetail = res.data.data
            this.fileList[0] = {name: res.data.data.wareUrl, url: res.data.data.wareUrl}
            this.wareUrl = res.data.data.wareUrl
            this.centerDialogVisible = true
          } else {
            this.$message.error(res.data.msg)
          }
        },
        fail: function (err) {
          console.log(err)
        }
      })
      this.getKey()
    },
    // 详情
    seeText (wareId) {
      this.dialogTitle = '详情'
      fetch({
        url: '/crm/course/wareDetail',
        method: 'get',
        params: {
          wareId: wareId
        },
        success: (res) => {
          if (res.data.code === '0000') {
            this.fileList = []
            this.wareDetail = res.data.data
            this.fileList[0] = {name: res.data.data.wareUrl, url: res.data.data.wareUrl}
            this.inputdisabled = true
            this.centerDialogVisible = true
          } else {
            this.$message.error(res.data.msg)
          }
        },
        fail: function (err) {
          console.log(err)
        }
      })
      // this.$store.dispatch('getWareDetail', {wareId: wareId, vue: this})
    },
    // 获取上传token
    getKey () {
      fetch({
        url: '/crm/upload/getUpToken',
        method: 'get',
        success: (res) => {
          this.postData = {token: res.data}
        },
        fail: function (err) {
          console.log(err)
        }
      })
    },
    // 提交数据
    save () {
      if (this.dialogTitle === '详情') {
        this.centerDialogVisible = false
        return
      }
      if (!this.wareDetail.wareName) {
        this.$message.error('请输入素材标题')
        return false
      }
      if (!this.wareDetail.type) {
        this.$message.error('请选择素材类型')
        return false
      }
      if (!this.wareUrl) {
        this.$message.error('请上传素材文件')
        return false
      }
      if (this.dialogTitle === '添加') {
        fetch({
          url: '/crm/course/wareSave',
          method: 'post',
          data: {
            wareName: this.wareDetail.wareName,
            type: this.wareDetail.type,
            wareUrl: this.wareUrl
          },
          success: (res) => {
            if (res.data.code === '0000') {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.centerDialogVisible = false
              this.init()
            }
          },
          fail: function (err) {
            console.log(err)
          }
        })
      } else {
        fetch({
          url: '/crm/course/wareSave',
          method: 'post',
          data: {
            wareName: this.wareDetail.wareName,
            type: this.wareDetail.type,
            wareUrl: this.wareUrl,
            wareId: this.wareId
          },
          success: (res) => {
            if (res.data.code === '0000') {
              this.$message({
                message: '编辑成功',
                type: 'success'
              })
              this.centerDialogVisible = false
              this.init()
            }
          },
          fail: function (err) {
            console.log(err)
          }
        })
      }
    },
    // 更新状态
    updateStatus (wareId, status) {
      fetch({
        url: '/crm/course/updateStatus',
        method: 'get',
        params: {
          wareId: wareId,
          status: status
        },
        success: (res) => {
          this.init()
        },
        fail: function (err) {
          console.log(err)
        }
      })
    },
    selectChange () {
      this.fileList = []
      this.wareUrl = ''
    }
  }
}
</script>
<style lang="less" scoped>
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
</style>
