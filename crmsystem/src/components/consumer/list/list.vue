<template>
  <div>
    <div class='search'>
      <div class='search_content'>
        <el-form :label-position="labelPosition" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="预产期">
            <el-date-picker
              v-model="childbirthValue"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="注册时间">
            <el-date-picker
              v-model="registrationTime"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <el-form :label-position="labelPosition" label-width="80px">
          <el-form-item label="年龄">
            <el-select v-model="AgeValue1" placeholder="请选择" style="width:49%;">
              <el-option
                v-for="item in Age"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="AgeValue2" placeholder="请选择" style="width:49%;">
              <el-option
                v-for="item in Age"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签">
            <el-select v-model="tag" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <button class='suresearch' @click="search">搜索</button>
      <button class='clear' @click="clear">清除</button>
    </div>
    <div class='list'>
      <div class="listhead">
          <button>下载pdf档案</button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="tel"
          label="手机号"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="channel"
          label="注册渠道"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="sourcehos"
          label="来源医院"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="doctor"
          label="绑定医生"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="用户详情"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span @click="chakan(scope.row.name,scope.row.tel)" style="cursor: pointer;">查看</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="antenatal"
          label="产前档案"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span @click="antenatal(scope.row.name,scope.row.tel)" style="cursor: pointer;">{{scope.row.antenatal}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="tangshi"
          label="唐氏筛查"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span @click="tangshi(scope.row.name,scope.row.tel)" style="cursor: pointer;">{{scope.row.tangshi}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="Bultrasonic"
          label="排畸B超"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span @click="Bultrasonic(scope.row.name,scope.row.tel)" style="cursor: pointer;">{{scope.row.Bultrasonic}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sugarTolerance"
          label="糖耐量筛查"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span @click="sugarTolerance(scope.row.name,scope.row.tel)" style="cursor: pointer;">{{scope.row.sugarTolerance}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="postpartum"
          label="产后档案"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span @click="postpartum(scope.row.name,scope.row.tel)" style="cursor: pointer;">{{scope.row.postpartum}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="school"
          label="孕校"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span @click="school(scope.row.name,scope.row.tel)" style="cursor: pointer;">{{scope.row.school}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="footers">
        <span>总共条记录  {{total}}  每页  {{bars}}  条记录</span>
        <el-pagination
          background="background"
          layout="prev, pager, next"
          :total="total"
          @size-change="sizeChange"
          @current-change="currentChange"
        >
        </el-pagination>
        <time>显示 <input type="text" v-model="bars">条</time>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bars: 10,
      total: 100,
      background: '#999999',
      name: '',
      childbirthValue: '',
      registrationTime: '',
      AgeValue1: '',
      AgeValue2: '',
      tag: '',
      Age: [{
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
      labelPosition: 'right',
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      options: [{
        value: '黄金糕',
        label: '黄金糕'
      }, {
        value: '双皮奶',
        label: '双皮奶'
      }, {
        value: '蚵仔煎',
        label: '蚵仔煎'
      }, {
        value: '龙须面',
        label: '龙须面'
      }, {
        value: '北京烤鸭',
        label: '北京烤鸭'
      }],
      tableData: [{
        tel: '15755357211',
        name: '王小虎',
        age: '18',
        channel: '地方官方',
        sourcehos: '还记得和翻江倒海',
        doctor: '将获得积分地方',
        detail: '查看',
        antenatal: '发大发大发',
        tangshi: '就几个',
        Bultrasonic: '苟富贵',
        sugarTolerance: '过分过分',
        postpartum: '发大发',
        school: '是',
        id: 1
      }, {
        tel: '15755357211',
        name: '王小虎',
        age: '18',
        channel: '地方官方',
        sourcehos: '还记得和翻江倒海',
        doctor: '将获得积分地方',
        detail: '查看',
        antenatal: '发大发大发',
        tangshi: '就几个',
        Bultrasonic: '苟富贵',
        sugarTolerance: '过分过分',
        postpartum: '发大发',
        school: '是',
        id: 2
      }, {
        tel: '15755357211',
        name: '王小虎',
        age: '18',
        channel: '地方官方',
        sourcehos: '还记得和翻江倒海',
        doctor: '将获得积分地方',
        detail: '查看',
        antenatal: '发大发大发',
        tangshi: '就几个',
        Bultrasonic: '苟富贵',
        sugarTolerance: '过分过分',
        postpartum: '发大发',
        school: '是',
        id: 3
      }, {
        tel: '15755357211',
        name: '王小虎',
        age: '18',
        channel: '地方官方',
        sourcehos: '还记得和翻江倒海',
        doctor: '将获得积分地方',
        detail: '查看',
        antenatal: '发大发大发',
        tangshi: '就几个',
        Bultrasonic: '苟富贵',
        sugarTolerance: '过分过分',
        postpartum: '发大发',
        school: '是',
        id: 4
      }, {
        tel: '15755357211',
        name: '王小虎',
        age: '18',
        channel: '地方官方',
        sourcehos: '还记得和翻江倒海',
        doctor: '将获得积分地方',
        detail: '查看',
        antenatal: '发大发大发',
        tangshi: '就几个',
        Bultrasonic: '苟富贵',
        sugarTolerance: '过分过分',
        postpartum: '发大发',
        school: '是',
        id: 5
      }, {
        tel: '15755357211',
        name: '王小虎',
        age: '18',
        channel: '地方官方',
        sourcehos: '还记得和翻江倒海',
        doctor: '将获得积分地方',
        detail: '查看',
        antenatal: '发大发大发',
        tangshi: '就几个',
        Bultrasonic: '苟富贵',
        sugarTolerance: '过分过分',
        postpartum: '发大发',
        school: '是',
        id: 6
      }, {
        tel: '15755357211',
        name: '王小虎',
        age: '18',
        channel: '地方官方',
        sourcehos: '还记得和翻江倒海',
        doctor: '将获得积分地方',
        detail: '查看',
        antenatal: '发大发大发',
        tangshi: '就几个',
        Bultrasonic: '苟富贵',
        sugarTolerance: '过分过分',
        postpartum: '发大发',
        school: '是',
        id: 7
      }, {
        tel: '15755357211',
        name: '王小虎',
        age: '18',
        channel: '地方官方',
        sourcehos: '还记得和翻江倒海',
        doctor: '将获得积分地方',
        detail: '查看',
        antenatal: '发大发大发',
        tangshi: '就几个',
        Bultrasonic: '苟富贵',
        sugarTolerance: '过分过分',
        postpartum: '发大发',
        school: '是',
        id: 8
      }, {
        tel: '15755357211',
        name: '王小虎',
        age: '18',
        channel: '地方官方',
        sourcehos: '还记得和翻江倒海',
        doctor: '将获得积分地方',
        detail: '查看',
        antenatal: '发大发大发',
        tangshi: '就几个',
        Bultrasonic: '苟富贵',
        sugarTolerance: '过分过分',
        postpartum: '发大发',
        school: '是',
        id: 9
      }, {
        tel: '15755357211',
        name: '王小虎',
        age: '18',
        channel: '地方官方',
        sourcehos: '还记得和翻江倒海',
        doctor: '将获得积分地方',
        detail: '查看',
        antenatal: '发大发大发',
        tangshi: '就几个',
        Bultrasonic: '苟富贵',
        sugarTolerance: '过分过分',
        postpartum: '发大发',
        school: '是',
        id: 10
      }]
    }
  },
  methods: {
    // 点击搜索
    search () {
      console.log(this.name)
      console.log(this.childbirthValue)
      console.log(this.registrationTime)
      console.log(this.AgeValue1)
      console.log(this.AgeValue2)
      console.log(this.tag)
    },
    // 点击清除
    clear () {
      this.name = ''
      this.childbirthValue = ''
      this.registrationTime = ''
      this.AgeValue1 = ''
      this.AgeValue2 = ''
      this.tag = ''
    },
    // 页面条数更改
    sizeChange (val) {
      console.log(val)
    },
    // 页面更改
    currentChange (val) {
      console.log(val)
    },
    // 查看
    chakan (name, tel) {
      console.log(name, tel)
    },
    // 产前
    antenatal (name, tel) {
      console.log(name, tel)
    },
    // 唐氏
    tangshi (name, tel) {
      console.log(name, tel)
    },
    // B超
    Bultrasonic (name, tel) {
      console.log(name, tel)
    },
    // 糖耐量
    sugarTolerance (name, tel) {
      console.log(name, tel)
    },
    // 产后
    postpartum (name, tel) {
      console.log(name, tel)
    },
    // 孕校
    school (name, tel) {
      console.log(name, tel)
    }
  }
}
</script>

<style scoped lang="less">
  .search {
    width:1584px;
    height:310px;
    padding-top:15px;
    background:rgba(255,255,255,1);
    text-align: center;
    .search_content{
      width:1570px;
      height:180px;
      margin: 0 auto;
      margin-bottom: 20px;
      padding-top:20px;
      display: flex;
      justify-content: space-between;
      .el-form {
        width:650px;
      }
    }
    .suresearch {
      width:120px;
      height:44px;
      background:rgba(78,164,255,1);
      border-radius:2px;
      font-size:16px;
      font-family:MicrosoftYaHei;
      color:rgba(255,255,255,1);
      outline: none;
      margin-right:30px;
    }
    .clear {
      width:120px;
      height:44px;
      background:rgba(105,215,198,1);
      border-radius:2px;
      font-size:16px;
      font-family:MicrosoftYaHei;
      color:rgba(255,255,255,1);
      outline: none;
    }
  }
  .el-date-editor {
    width:100% !important;
  }
  .list {
    width: 1584px;
    height: 729px;
    background: rgba(255,255,255,1);
    margin-top: 20px;
    .listhead {
      height: 47px;
      padding-top: 14px;
      button {
        width:88px;
        height:35px;
        background:rgba(126,175,255,1);
        border-radius:2px;
        color:#fff;
        float:right;
        margin-right:40px;
        outline: none;
      }
    }
  }
  .footers {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #000;
    margin-top: 20px;
    color: #7f7f7f;
    time {
      input {
        display: inline-block;
        width: 70px;
        background: #eee;
        outline: none;
      }
    }
  }
  button {
    cursor:pointer;
  }
</style>
