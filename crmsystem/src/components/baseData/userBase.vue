<template>
  <div class="userBase">
    <div class="userbase-up-module">
      <div class="userbase-comm">
        <User></User>
      </div>
      <div class="userbase-comm userbase-right">
        <LabelPercent></LabelPercent>
      </div>
    </div>
    <div style="clear:both"></div>
    <div class="userbase-middle">
      <Tongji></Tongji>
    </div>
    <div style="clear:both"></div>
    <div class="cul-module">
      <CulData></CulData>
    </div>
  </div>
</template>
<script>
import User from '../../../src/components/baseData/user'
import LabelPercent from '../../../src/components/baseData/labelPercent'
import Tongji from '../../../src/components/baseData/tongji'
import CulData from '../../../src/components/baseData/culData'
import { mapState } from 'vuex'
export default {
  computed: mapState({
    login: state => state.loginStore
  }),
  components: {
    User,
    LabelPercent,
    Tongji,
    CulData
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.userbase-up-module {
  width: 1654px;
  margin: 0 auto;
  // background: white;
  // margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  .userbase-comm {
    flex: 1;
    // background-color: white;
    //margin-left: 30px;
    float: left;
    width: 800px;
  }
  .userbase-right {
    height: 455px;
    background: white;
    overflow: scroll;
    margin-left: 20px;
  }
  /* 设置滚动条的样式 */
  ::-webkit-scrollbar {
    width: 12px;
  }
  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
  }
  ::-webkit-scrollbar-thumb:window-inactive {
    // background: rgba(255, 0, 0, 0.4);
  }
}
.userbase-middle {
  // width: 1584px;
  margin: 0 auto;
  background: white;
  margin-top: 20px;
  /* 设置滚动条的样式 */
  ::-webkit-scrollbar {
    width: 12px;
  }
  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
  }
  ::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(255, 0, 0, 0.4);
  }
}
.cul-module {
  // width: 1584px;
  margin: 0 auto;
  background: white;
  margin-top: 20px;
}
</style>
