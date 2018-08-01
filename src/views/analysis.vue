<!--
  分析总页面
-->
<template>
  <div class="analusis">
    <div class="analusis-head clearfix clear">
      开奖分析
    </div>
    <div class="analusis-cont">
        <div class="tab">
          <!--标题-->
          <ul class="tab-title">
            <li  :class="{'active':selectItem=='statistics'}" @click="switchTab('statistics')">统计模式</li>
            <li  :class="{'active':selectItem=='interval'}" @click="switchTab('interval')">开奖间隔</li>
            <li  :class="{'active':selectItem=='trend'}" @click="switchTab('trend')">走势图</li>
          </ul>
        </div>
          <!--内容-->
          <component :is="selectItem"></component>
        
    </div>
  </div>
</template>

<script>
import statistics from '@/components/statistics'
import interval from '@/components/interval'
import trend from '@/components/trend'
import api from '../fetch/api'
  export default {
    data() {
      return {
        selectItem:'statistics'
      }
    },
    methods: {
      //tab切换
      switchTab(item){
        this.selectItem=item;
      },
    },
    components: {
      statistics,
      interval,
      trend
    }
  }
</script>

<style scoped>
 .analusis {
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
  }
  .analusis  .analusis-head{
    height: 1.3333rem;
    line-height: 1.3333rem;
  color: #3f96e0;
    width: 10rem;
    text-align: center;
    position:fixed;
    top: 0;
    left: 0;
    background: #FFF;
    z-index: 1;
    font-size: 15px;

}
.analusis-cont .tab {
 position: fixed;
 height: 1.0667rem;
 width: 10rem;
 left: 0;
 top: 1.3333rem;
 background: #fff;
 z-index: 1;
}
.analusis-cont .tab ul{
  height: 0.8rem;
  width: 80%;
  /*display: inline-block;*/
  margin: 0 auto;
  border: 1px solid #2CAAF2;/*no*/
  /*margin: 0 0.8rem;*/
  /*width: calc(100% - 1.6rem);*/
  z-index: 8;
  left: 0;
  top: 1.3333rem;
}
.analusis-cont .tab li{
  width: calc(100% / 3);
  height: 100%;
  line-height: 0.8rem;
  float: left;
  color:#2CAAF2;
  border-left: 1px solid #2CAAF2;/*no*/
  box-sizing: border-box;

}
.analusis-cont .tab li:nth-of-type(1){
  border-left: transparent;
}
.analusis-cont .tab li.active{
  background:#2CAAF2;
  color: #fff;
}
.analusis-cont .tab li:nth-child(2){
  border-right: none;
}





</style>
