<!--
  牛人榜单
-->
<template>
  <div class="analusis">
    <div class="analusis-head clearfix clear">
         <span class="iconfont icon-back" @click="back"></span>
       牛人榜
    </div>
    <div class="analusis-cont">
        <div class="tab">
          <!--标题-->
          <ul class="tab-title">
            <li  :class="{'active':selectItem=='Today'}" @click="switchTab('Today')">今日</li>
            <li  :class="{'active':selectItem=='LastMonth'}" @click="switchTab('LastMonth')">上月</li>
            <li  :class="{'active':selectItem=='Year'}" @click="switchTab('Year')">年度</li>
          </ul>
        </div>
        <!--内容-->
         <div class="tab-cont">
           <ul v-for="(item,index) in data">
             <li>
               <i v-if="index==0"><img src="../assets/img/1.png"></i>
               <i v-if="index==1"><img src="../assets/img/2.png"></i>
               <i v-if="index==2"><img src="../assets/img/3.png"></i>
               <i v-if="index>2">{{index+1}}</i>
             </li>
             <li><img src="http://pcdd.ygwl.info/public/static/logo/logo.jpg"></li>
             <li>{{item.username}}</li>
             <li>
              累计获得金蛋<br>
              <i> {{item.loss}}</i>
             </li>
           </ul>
         </div>
        
    </div>
  </div>
</template>

<script>
import api from '../fetch/api'
  export default {
    data() {
      return {
        selectItem:'Today',
        data:[]
      }
    },
    created(){
      this.awardList({time_type:1,page_no:1});
    },
    methods: {
        back(){
          this.$router.back(-1);
        },
      //tab切换
      switchTab(item){
        this.selectItem=item;
        if(this.selectItem=='Today'){
          this.awardList({time_type:1,page_no:1});
        }else if(this.selectItem=='LastMonth'){
          this.awardList({time_type:2,page_no:1});
        }else if(this.selectItem=='Year'){
          this.awardList({time_type:3,page_no:1});
        }
      },
      awardList(par){
        api.awardListList(par).then(res=>{
          this.data=res.Data
        },err=>{

        })
      },
    },
    components: {
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
    font-size: 20px;
    height: 1.3333rem;
    line-height: 1.3333rem;
    color: #000;
    width: 10rem;
    text-align: center;
    position:fixed;
    top: 0;
    left: 0;
    background: #FFF;
    z-index: 1;
}
.analusis  .analusis-head span:nth-child(1) {
  position: absolute;
  display: inline-block;
  padding: 0 .4rem;
  left: 0;
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
  border: 1px solid #2CAAF2;
  /*margin: 0 0.8rem;*/
  margin: 0 auto;
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
.tab-cont{
    position: relative;
    top: 2.6667rem;
    width: 100%;
    padding-bottom: 1.3333rem;
}
.tab-cont ul{
 width: calc(100% - 1.6rem);
 margin: 0 0.8rem;
 height: 1.2rem;
 font-size: 14px;
 line-height: 0.8rem;
 clear: both;
}
.tab-cont ul li{
  float: left;
}
.tab-cont ul li:nth-of-type(1){
  width: 1.3333rem;
}
.tab-cont ul li:nth-of-type(1) img{
   width: 0.4667rem;
   height: 0.7333rem;
}
.tab-cont ul li:nth-of-type(2){
  width: 0.9333rem;
}
.tab-cont ul li:nth-of-type(2) img{
  width: 0.6667rem;
  height: 0.6667rem;
  border-radius: 50%;
  /* margin-top: 8px; */
}
.tab-cont ul li:nth-of-type(3){
  width: 2.8667rem;
  text-align: left;
  text-indent: 0.2667rem;
  white-space: nowrap;
}
.tab-cont ul li:nth-of-type(4){
  width: 3.1333rem;
  float:right;
  text-align: right;
  line-height: 0.4rem;
  color: #ccc;
}
.tab-cont ul li:nth-of-type(4) i{
  color: #de4a48;
}

</style>

