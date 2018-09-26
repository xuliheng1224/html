<template>
    <div class="an_content" v-if="ante.antenatalArchives">
      <div>
          <ul>
            <li>
              <span>姓名:</span><time>{{ante.antenatalArchives.realName}}</time>
            </li>
            <li>
              <span>预产期:</span><time>{{ante.antenatalArchives.userEdcCH}}</time>
            </li>
            <li>
              <span>年龄:</span><time>{{ante.antenatalArchives.age}}</time>
            </li>
            <li>
              <span>建党医院:</span><time>{{ante.antenatalArchives.archivesHosName}}</time>
            </li>
            <li>
              <span>户籍:</span><time>{{ante.antenatalArchives.householdRegisterAddress}}</time>
            </li>
            <li>
              <span>胎数:</span><time>{{ante.antenatalArchives.fetusNumV}}</time>
            </li>
            <li>
              <span>住址:</span><time>{{ante.antenatalArchives.address}}</time>
            </li>
          </ul>
      </div>
      <p class="fenge"></p>
      <div class="card">
        <ul>
          <li>
            <span>孕前体重:</span><time>{{ante.antenatalArchives.pregnancyWeight}}kg</time>
          </li>
          <li>
            <span>身高:</span><time>{{ante.antenatalArchives.height}}cm</time>
          </li>
          <li>
            <span>当前体重:</span><time>{{ante.antenatalArchives.nowWeight}}kg</time>
          </li>
        </ul>
      </div>
      <p class="fenge"></p>
      <div>
        <ul>
          <li>
            <span>怀孕次数:</span><time>{{ante.antenatalArchives.pregnantNum}}次</time>
          </li>
          <li>
            <span>将分娩:</span><time>{{ante.antenatalArchives.childbirthTimes}}次</time>
          </li>
          <li>
            <span>自然流产:</span><time>{{ante.antenatalArchives.naturalAbortionNum}}次</time>
          </li>
          <li>
            <span>早产:</span><time>{{ante.antenatalArchives.hasPrematureBirthV}}</time>
          </li>
          <li>
            <span>胎停育:</span><time>{{ante.antenatalArchives.stopChildNum}}</time>
          </li>
          <li>
            <span>足月分娩:</span><time>{{ante.antenatalArchives.hasTermBirthV}}</time>
          </li>
          <li>
            <span>中期引产:</span><time>{{ante.antenatalArchives.hasOdinopoeiaV}}</time>
          </li>
          <li>
            <span>巨大儿:</span><time>{{ante.antenatalArchives.hasGiantBabyV}}</time>
          </li>
          <li>
            <span>畸形胎儿:</span><time>{{ante.antenatalArchives.hasAbnormalFetusV}}</time>
          </li>
          <li>
            <span>刨宫产:</span><time>{{ante.antenatalArchives.hasCesareanSectionV}}</time>
          </li>
        </ul>
      </div>
      <p class="fenge"></p>
      <div>
        <ul>
          <li>
            <span>糖尿病史:</span><time>{{ante.antenatalArchives.hasFamilialDiabetesV}}</time>
          </li>
          <li>
            <span>既往病史:</span><time>{{ante.antenatalArchives.normalMedicalHistory}}</time>
          </li>
          <li>
            <span>妊娠并发症:</span><time>{{ante.antenatalArchives.gestationMedicalHistory}}</time>
          </li>
        </ul>
      </div>
      <p class="fenge"></p>
      <div>
        <ul>
          <li>
            <span>紧急联系人:</span><time>{{ante.antenatalArchives.emergencyContact}}</time>
          </li>
          <li>
            <span>联系电话:</span><time>{{ante.antenatalArchives.emergencyMobile}}</time>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      data: {}
    }
  },
  props: ['ante'],
  mounted () {
  }
}
</script>

<style scoped lang="less">
  .an_content {
    padding-top:20px;
  }
  .fenge {
    width:1065px;
    height:3px;
    background:rgba(237,237,237,1);
    margin:30px 0;
  }
  ul{
    margin:0;
    list-style: none;
    width:1200px;
    li{
      display: inline-block;
      width: 33%;
      font-size: 14px;
      margin-top: 15px;
      span{
        display: inline-block;
        width: 100px;
        color: #444444;
      }
      time{
        color: #777777;
      }
    }
  }
</style>
