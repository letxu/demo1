<!--分析页面:走势图-->
<template>
  <div class="tread">
        <ul class="tread-title">
          <li>统计数据</li>
          <li>总期数:<i>{{num}}</i></li>
          <li>
            <span>近<input v-model="num">期</span>
            <span><button @click="awardTrend">搜索</button></span>
          </li>
        </ul>
        <div class="tread-head">
          <ul>
            <li>标准间隔</li>
            <li v-for="(i,index) in head.length">{{head[index]?head[index].z_time:''}}</li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <ul>
            <li>当前间隔</li>
            <li v-for="(i,index) in head.length">{{head[index]?head[index].time:''}}</li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <ul>
            <li>标准次数</li>
            <li v-for="(i,index) in head.length">{{head[index]?head[index].z_num:''}}</li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <ul>
            <li>实际次数</li>
            <li v-for="(i,index) in head.length">{{head[index]?head[index].now_num:''}}</li>
            <li class="mantissa">尾数</li>
            <li class="remainder">余数</li>
            
          </ul>
          <ul class="No">
            <li>期号</li>
            <li v-for="(i,index) in 28">{{index}}</li>
            <li>单</li>
            <li>双</li>
            <li>中</li>
            <li>边</li>
            <li>大</li>
            <li>小</li>
            <li>小</li>
            <li>大</li>
            <li>/3</li>
            <li>/4</li>
            <li>/5</li>
          </ul>
          <ul v-for="(item,indexs) in data">
            <li class="bay2">{{item.num}}</li>
            <li v-for="(i,index) in 28" :class="{'bay':(index<10)||(index>=18&&index<=28),'blue':((item.igkbet==index)&&((index<10)||(index>=18&&index<=28))),'red':((item.igkbet==index)&&!((index<10)||(index>=18&&index<=28)))}">
                <i v-if="(item.igkbet==index)">{{item.igkbet}}</i>
            </li>
            <li :class="{'single':item.edge==2}"><i v-if="item.edge==2">单</i></li>
            <li :class="{'double':item.edge==1}"><i v-if="item.edge==1">双</i></li>
            <li :class="{'centre':item.even==1}"><i v-if="item.even==1">中</i></li>
            <li :class="{'edge':item.even==2}"><i v-if="item.even==2">边</i></li>
            <li :class="{'big':item.size==2}"><i v-if="item.size==2">大</i></li>
            <li :class="{'small':item.size==1}"><i v-if="item.size==1">小</i></li>
            <li :class="{'s_small':(item.igkbet.length==1?item.igkbet:item.igkbet.substring(1,2))<5}"><i v-if="(item.igkbet.length==1?item.igkbet:item.igkbet.substring(1,2))<5">{{item.igkbet.length==1?item.igkbet:item.igkbet.substring(1,2)}}</i></li>
            <li :class="{'s_big':(item.igkbet.length==1?item.igkbet:item.igkbet.substring(1,2))>=5}"><i v-if="(item.igkbet.length==1?item.igkbet:item.igkbet.substring(1,2))>=5">{{item.igkbet.length==1?item.igkbet:item.igkbet.substring(1,2)}}</i></li>
            <li>{{item.igkbet%3}}</li>
            <li>{{item.igkbet%4}}</li>
            <li>{{item.igkbet%5}}</li>
          </ul>
        </div>
  </div>
</template>
<script>
import api from '../fetch/api'
export default {
    data() {
      return {
       data:[],
       head:[],
       num:100,
       forNum:29
      }
    },
    created(){
     this.awardTrend()
    },
    methods: {
      awardTrend(){
        api.awardTrend({num:this.num}).then(res=>{
           if (res.Code == "0") {
                this.data=res.Data.data
                this.num=res.Data.count_num
                this.head=res.Data.head
            } else {
                this.$toast(res.Msg);
            }
        },err=>{

        })
      }
    }
}
</script>
<style scoped>
  .tread{
    margin-top: 2.6667rem;
    margin-bottom:1.6667rem;
    width: 100%;
    color: #000;
    /*padding: 0 60px;*/
    overflow: auto;
  }
  .tread-title{
    height: 0.6667rem;
    width: 34rem;
    border: 1px solid #e6bf5c;
    border-bottom: transparent;
    font-size: 14px;
    line-height: 0.6667rem;
  }
  .tread-title li{
    float: left;
    height: 0.6667rem;
   box-sizing: border-box;
  }
  .tread-title li:nth-of-type(1){
    width: 2rem;
    border-right: 1px solid #e6bf5c;
  }
  .tread-title li:nth-of-type(2){
    width: 4.8rem;
    border-right: 1px solid #e6bf5c;
  }
  .tread-title li:nth-of-type(2) i{
    color: tomato
  }
  .tread-title li:nth-of-type(3){
    float: right;
    margin-right: 0.0667rem;
  }
  .tread-title li:nth-of-type(3) input{
    width: 1.3333rem;
    border: 1px solid #d1d1d1;
    margin:0px 0.1333rem;
  }
  .tread-head{
     border: 1px solid #e6bf5c;
     border-bottom: transparent;
     width: 34rem;
  }
  .tread-head ul{
    width: 34rem;
    height: 0.6667rem;
    line-height: 0.6667rem;
    border-bottom: 1px solid #e6bf5c;
  }
  .tread-head ul li{
    float: left;
    width: 0.8rem;
    height: 0.6667rem;
    font-size: 14px;
    border-left: 1px solid #e6bf5c;/*no*/
      box-sizing: border-box;
  }
 .tread-head ul li:nth-of-type(1){
    width: 2rem;
     border-left: transparent;
  }
  .bay{
    background: #fffac8;
  }
  .bay2{
    background: #fedf9c;
  }
  .No{
    background: -webkit-linear-gradient(#fbcd5d, #fddd90); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#fbcd5d, #fddd90); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#fbcd5d, #fddd90); /* Firefox 3.6 - 15 */
    background: linear-gradient(#fbcd5d, #fddd90); /* 标准的语法（必须放在最后） */
  }
  .blue{
    background: #3930f9 !important;
    color: #fff;
  }
  .red{
    background: #f80303 !important;
    color: #fff;
  }
  /*大*/
  .big {
    background: #ff8040;
    color: #fff;
  }
  /*小*/
  .small {
    background: #ff00ff;
    color: #fff;
  }
  /*单*/
  .single{
    background: #ea2341;
    color: #fff;
  }
  /*双*/
  .double{
    background: #5726a5;
    color: #fff;
  }
  /*中*/
  .centre{
   background: #ff0000;
   color: #fff;
  }
  /*边*/
  .edge{
    background: #3333ff;
    color: #fff;
  }
  /*xiao*/
  .s_small{
    background: #ea2640;
    color: #fff;
  }
  /*xiao*/
  .s_big{
    background: #6655aa;
    color: #fff;
  }
  .mantissa{
    width: 1.6rem !important;
  }
  .remainder{
    width: 2.4rem!important;
  }
</style>
