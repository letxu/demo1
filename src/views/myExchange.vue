<!--
  我的兑换
-->
<template>
  <div class="analusis">
    <div class="analusis-head clearfix clear">
         <span class="iconfont icon-back"  @click="back"></span>
      我的兑换
    </div>
    <div class="analusis-cont">
        <div class="tab">
          <!--标题-->
          <ul class="tab-title">
            <li  :class="{'active':static==1}" @click="switchTab(1)">已发货</li>
            <li  :class="{'active':static==2}" @click="switchTab(2)">未发货</li>
          </ul>
        </div>
          <!--内容-->
        <div class="cont">
            <div class="cont-item" v-for="item in data">
                <div class="icon"><img :src="`http://pcdd.ygwl.info/`+item.logo"></div>
                <div class="text">
                    <div class="name">{{item.goods_name}}</div>
                    <div class="address">{{item.address}}</div>
                </div>
                <div class="price"><i>{{item.order_price}}</i>金蛋</div>
            </div>
        </div>
        
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
        static:1,//已发货
        data:[]
      }
    },
    created(){
        this.awardMyDh()
    },
    methods: {
             back(){
                 this.$router.back(-1);
            },
      //tab切换
      switchTab(item){
        this.static=item;
        this.awardMyDh()
      },
      awardMyDh(){
          api.awardMyDh({page_no:1,static:this.static}).then(res=>{
             
                console.log(res)
                if (res.Code == "0") {
                        this.data=res.Data;
                    //成功
                } else {
                    this.$toast(res.Msg);
                      this.data=[];
                }
          },err=>{
                this.$toast("连接服务器发生错误!");
          })
         
       
      }
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
    color: #000;
    width: 10rem;
    text-align: center;
    position:fixed;
    top: 0;
    left: 0;
    background: #FFF;
    z-index: 1;
    font-size: 18px;
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
  width: 6rem;
  display: inline-block;
  border: 1px solid #2CAAF2;/*no*/
  margin: 0 auto;
  z-index: 8;
  left: 0;
  top: 1.3333rem;
}
.analusis-cont .tab li{
  width: calc(100% / 2);
  height: 100%;
  line-height: 0.8rem;
  float: left;
  color:#2CAAF2;
  border-left: 1px solid #2CAAF2;/*no*/
  box-sizing: border-box;
}
.analusis-cont .tab li.active{
  background:#2CAAF2;
  color: #fff;
}
.analusis-cont .tab li:nth-of-type(1){
  border-left: none/*no*/
  }
 .cont{
   position: relative;
   margin-top: 2.6rem
 }
.cont-item{
  display: flex;
  padding:0 .5rem .2rem .5rem ;
  text-align: left;
  height: 1.52rem;
  font-size: 14px;
}
.icon {
  width:1.3rem;
  height: 1.3rem;
  padding-right:.3rem;
}
.icon img{
  width:100%;
  height: 100%;
}
.text{
  display:flex;
  flex:1;
  flex-direction:column;
  line-height:25rpx;
  overflow:hidden;
  font-size:14px;
  line-height: 0.4rem;
}
.name{
  height: .6rem;
}
.address{
  height: 1.2rem;
  line-height: 0.5rem;
  word-wrap: break-word;
  overflow: hidden;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;

}
.price{
  /*width: 2rem;*/
  line-height:1.52rem;
  text-align: right;
}
.price i{
  color: #e46c6c
}
</style>
