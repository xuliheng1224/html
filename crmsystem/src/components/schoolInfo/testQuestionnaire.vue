<template>
    <div class="content">
        <div class="ment_top">
            <div class="search_input">
                <div class="input_box">
                    <div class="title">测试名称</div>
                    <div>
                        <el-input class="title_box" v-model.trim="input" placeholder="请输入测试名称"></el-input>
                    </div>
                </div>
                <div class="input_box">
                    <div class="title">测试类型</div>
                    <div>
                        <el-select class="title_box" v-model="typeValue" placeholder="请选择测试类型">
                            <el-option v-for="item in typeOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
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
                    <div class="title">有效期</div>
                    <div>
                        <div class="block">
                            <!-- <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker> -->
                            <el-date-picker v-model="time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                        </div>
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
            <div class="search_add" @click="addData" v-if="menuBtn.indexOf('test_add')>-1">
                <i class="el-icon-circle-plus"></i>
                <span>添加</span>
            </div>
            <el-table :data="tableData" stripe style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                <el-table-column prop="queId" label="编号" width="200"></el-table-column>
                <el-table-column prop="que" label="名称" width="200"></el-table-column>
                <el-table-column prop="type" label="测试类型" :formatter="typeFormatter"></el-table-column>
                <el-table-column prop="address" label="适应阶段" :formatter="formatter"></el-table-column>
                <el-table-column prop="alwaysEffective" label="有限期" :formatter="alwaysEffective"></el-table-column>
                <el-table-column prop="address" label="状态" :formatter="stateFormatter"></el-table-column>
                <el-table-column prop="examCount" label="提交人数"></el-table-column>
                <el-table-column prop="createUser" label="最后操作人"></el-table-column>
                <el-table-column prop="updateTime" label="最后操作时间" :formatter="timeFormatter" width="160"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button @click="details(scope.row.queId)" v-if="menuBtn.indexOf('test_detail')>-1" type="text" size="small">详情</el-button>
                        <a style="margin: 0px 4px;" :href="'/basic?id='+scope.row.queId"  v-if="scope.row.status!='PUBLISH' && scope.row.type == 'TEST' && menuBtn.indexOf('test_edit')>-1">
                          <el-button type="text" size="small">编辑</el-button>
                        </a>
                        <a style="margin: 0px 4px;" :href="'/match?id='+scope.row.queId"  v-if="scope.row.status!='PUBLISH' && scope.row.type == 'SURVEY' && menuBtn.indexOf('test_edit')>-1">
                          <el-button type="text" size="small">编辑</el-button>
                        </a>
                        <el-button type="text" size="small" v-if="menuBtn.indexOf('test_delete')>-1" @click="delQuestion(scope.row.queId)">删除</el-button>
                        <el-button type="text" size="small" v-if="menuBtn.indexOf('test_qrcode')>-1" @click="codeQuestion(scope.row.qrCode)">二维码</el-button>
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
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="count">
        </el-pagination>
        <div id="code_box">
          <el-dialog
            title="二维码:"
            :visible.sync="dialogVisible"
            width="30%">
            <img :src="codeImg" alt="">
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>
    </div>
</template>
<style scoped src="../../../static/css/schoolInfo.css"></style>
<script>
import { tool } from '../../common/util'
export default {
  data () {
    return {
      page: 1,
      pageSize: 10,
      count: 0,
      currentPage: 1,
      typeValue: '',
      stateValue: '',
      input: '',
      time: [],
      typeOpt: [{value: 'SURVEY', label: '选项得分匹配题'}, {value: 'TEST', label: '基本对错题'}],
      stateOpt: [{value: '0', label: '未发布'}, {value: '1', label: '已发布'}, {value: '2', label: '进行中'}, {value: '3', label: '已结束'}],
      tableData: [],
      isTrue: false,
      dialogVisible: false,
      codeImg: '',
      menuBtn: []
    }
  },
  mounted () {
    this.menuBtn = JSON.parse(tool.localStorage.get('authTags'))
    this.init()
  },
  methods: {
    init () {
      this.$store.dispatch('getQList', {pageNo: this.page, pageSize: this.pageSize, vue: this})
    },
    confirm () {
      this.isTrue = true
      this.page = 1
      this.$store.dispatch('getQList', {pageNo: this.page, pageSize: this.pageSize, que: this.input, type: this.typeValue, statusFlag: this.stateValue, startDateStr: this.time[0] ? tool.dateFormat(this.time[0]) : '', endDateStr: this.time[0] ? tool.dateFormat(this.time[1]) : '', vue: this})
    },
    pageConfirm () {
      this.$store.dispatch('getQList', {pageNo: this.page, pageSize: this.pageSize, que: this.input, type: this.typeValue, statusFlag: this.stateValue, startDateStr: this.time[0] ? tool.dateFormat(this.time[0]) : '', endDateStr: this.time[0] ? tool.dateFormat(this.time[1]) : '', vue: this})
    },
    reset () {
      this.typeValue = ''
      this.stateValue = ''
      this.input = ''
      this.time = ''
    },
    details (val) {
      this.$router.push({path: '/details/testDetail/' + val})
    },
    editQuestion (row) {
      if (row.type === 'TEST') {
        this.$router.push({path: '/basic', query: {id: row.queId}})
      } else {
        this.$router.push({path: '/match', query: {id: row.queId}})
      }
    },
    delQuestion (val) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('deleteQlist', {queId: val, vue: this})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    codeQuestion (val) {
      this.codeImg = val
      this.dialogVisible = true
    },
    formatter (row, column) {
      if (row.gestationalType === 'ANTENATAL') {
        return `孕期${row.gestationalRangeStart} - ${row.gestationalRangeEnd}周`
      } else {
        return `${row.gestationalStart} - ${row.gestationalEnd}`
      }
    },
    typeFormatter (row, column) {
      if (row.type === 'TEST') {
        return '基本对错题'
      } else {
        return '选项得分匹配题'
      }
    },
    alwaysEffective (row, column) {
      if (Number(row.alwaysEffective) === 0) {
        return `${tool.dateFormat(row.startTime)}~${tool.dateFormat(row.endTime)}`
      } else {
        return '永久有效'
      }
    },
    stateFormatter (row, column) {
      if (row.status === 'PUBLISH') {
        if (Number(row.alwaysEffective) === 1) {
          return '进行中'
        } else {
          if (new Date().getTime() - Number(row.endTime) > 0) {
            return '已结束'
          } else if (new Date().getTime() - Number(row.startTime) < 0) {
            return '已发布'
          } else if (new Date().getTime() - Number(row.startTime) >= 0 && new Date().getTime() - Number(row.endTime) <= 0) {
            return '进行中'
          }
        }
      } else {
        return '未发布'
      }
    },
    timeFormatter (row, column) {
      return tool.dateFormat(row.updateTime)
    },
    addData () {
      this.$router.push({path: '/testType'})
    },
    handleSizeChange (val) {
      this.page = 1
      this.pageSize = val
      if (this.isTrue) {
        this.pageConfirm()
      } else {
        this.init()
      }
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.page = val
      if (this.isTrue) {
        this.pageConfirm()
      } else {
        this.init()
      }
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style>
#code_box .el-dialog__body {
  text-align: center;
}
</style>
