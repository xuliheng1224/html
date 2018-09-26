<template>
    <div class="menu-main">
    <el-menu :default-active="$route.path" :default-openeds="defultOpen" router>
      <div v-for="(item, index) in mumuItem" v-bind:key="index">
        <el-submenu :index="gernerateIndex(index)">
        <template slot="title">
          <img src="../../assets/image/data-icon.png" alt="" srcset="" class="menu-icon" v-if="index === 0">
          <img src="../../assets/image/hos-icon.png" alt="" srcset="" class="menu-icon" v-if="index === 1">
          <img src="../../assets/image/order-icon.png" alt="" srcset="" class="menu-icon" v-if="index === 2">
           <img src="../../assets/image/yun-icon.png" alt="" srcset="" class="menu-icon" v-if="index === 3">
          {{item.name}}
        </template>
        <el-menu-item-group v-if="item.subMenuItems.length > 0" v-for="subItem in item.subMenuItems" v-bind:key='subItem.authId'>
          <el-menu-item :index="subItem.url">{{subItem.name}}</el-menu-item>
        </el-menu-item-group>
        </el-submenu>
      </div>
      <!-- <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>基础数据</template>
        <el-menu-item-group>
          <el-menu-item index="/baseData">用户数据统计</el-menu-item>
          <el-menu-item index="/consumer">用户基础信息列表</el-menu-item>
          <el-menu-item index="/schoolStatistics">孕育学校信息列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
      <!-- <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>医院管理</template>
        <el-menu-item-group>
          <el-menu-item index="/hostpital">医院信息</el-menu-item>
          <el-menu-item index="/doctorInfo">医生信息</el-menu-item>
          <el-menu-item index="/schoolInfo">孕校信息</el-menu-item>
          <el-menu-item index="/card">建档预约</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>订单管理</template>
        <el-menu-item-group>
          <el-menu-item index="/order">订单列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-setting"></i>运营工具</template>
        <el-menu-item-group>
          <el-menu-item index="/cancellation">核销管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
    </el-menu>
    </div>
</template>
<script>
import { tool } from '../../common/util'
export default {
  name: 'Menu',
  data () {
    return {
      mumuItem: {},
      defultOpen: []
    }
  },
  mounted () {
    var _this = this
    _this.mumuItem = JSON.parse(tool.localStorage.get('menuItems'))
    Object.keys(this.mumuItem).forEach(function (key) {
      _this.defultOpen.push(key)
    })
  },
  methods: {
    gernerateIndex (index) {
      return index.toString()
    }
  }
}
</script>
<style>
.el-menu-item.is-active {
  border-left: 5px solid #409EFF;
  background:rgba(243,246,255,1);
}
.el-dropdown {
  margin-left: 76px;
}
.menu-icon {
  width: 15px;
  margin-top: -4px;
}
</style>
