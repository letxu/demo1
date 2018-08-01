<!--分析页面:统计模式-->
<template>
  <div class="statistics">
      <ul class="statistics-title">
        <li>期号</li>
        <li>中奖号码</li>
        <li>大小</li>
        <li>单双</li>
        <li>中边</li>
      </ul>
      <div class="statistics-item">
        <ul class="statistics-cont" v-for="item in data">
          <li>{{item.periods}}期</li>
          <li class="winning"><span>{{item.num}}</span></li>
          <li :class="{'small':item.size==1,'big':item.size==2}">
            <span>
              <i v-if="item.size==1">小</i>
              <i v-if="item.size==2">大</i>
            </span>
          </li>
          <li :class="{'double':item.edge==1,'single':item.edge==2}">
            <span>
              <i v-if="item.edge==1">双</i>
              <i v-if="item.edge==2">单</i>
            </span>
          </li>
          <li :class="{'centre':item.even==1,'edge':item.even==2}">
            <span>
              <i v-if="item.even==1">中</i>
              <i v-if="item.even==2">边</i>
            </span>
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
import api from '../fetch/api'
export default {
    data() {
      return {
       data:[]
      }
    },
    created(){
      this.awardList()
    },
    methods: {
      awardList(){
        api.awardList().then(res=>{
           if (res.Code == "0") {
                this.data=res.Data
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
  .statistics{
    width: 100%;
  }
  .statistics-title{
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    background: #eee;
    position: fixed;
    top: 2.4rem;
    z-index: 1;
  }
  .statistics-title li{
    width: 20%;
    float: left;
    font-size: 14px;
    color: #ccc;
  }
  .statistics-cont{
    width: 100%;
    height: 1.0667rem;
    line-height: 1.0667rem;
  }
  .statistics-item{
    position:absolute;
    top: 3.3333rem;
    width: 100%;
    bottom:1.433333rem;
      /* 使之可以滚动 */
      overflow-y: scroll;
        /* 增加该属性，可以增加弹性，是滑动更加顺畅 */
      -webkit-overflow-scrolling: touch;

  }
  .statistics-cont li{
    width: 20%;
    height: 1.0667rem;
    line-height: 1.0667rem;
    float: left;
     font-size: 14px;
  }
  .winning span{
    width: 0.5833rem;
    height: 0.5833rem;
    line-height: 0.5833rem;
    border-radius: 50%;
    display: inline-block;
    margin: 0 auto;
    background: #de4a48;
    text-align: center;
    color: #fff;
    margin-top: 10px;
    font-size: 12px;
    box-sizing: border-box;
  }
  /*大*/
  .big span{
    width: 0.5333rem;
    height: 0.5333rem;
    line-height: 0.5333rem;
    border-radius: 5px;
    display: inline-block;
    background: #de4a48;
    text-align: center;
    color: #fff;
    margin-top: 0.2667rem;
    float: left;
    margin-left: 0.5333rem;

    font-size: 11px;
      box-sizing: border-box;
  }
  /*小*/
  .small span{
    width: 0.5333rem;
    height: 0.5333rem;
    line-height: 0.5333rem;
    border-radius: 5px;
    display: inline-block;
    background: #6fa62c;
    text-align: center;
    color: #fff;
    margin-top: 0.2667rem;
    float: right;
    margin-right: 0.5333rem;
       font-size: 11px;
      box-sizing: border-box;
  }
  /*单*/
  .single span{
    width: 0.5333rem;
    height: 0.5333rem;
    line-height: 0.5333rem;
    border-radius: 5px;
    display: inline-block;
    background: #fd8213;
    text-align: center;
    color: #fff;
    margin-top: 0.2667rem;
    float: left;
    margin-left: 0.5333rem;


       font-size: 11px;
      box-sizing: border-box;
  }
  /*双*/
  .double span{
    width: 0.5333rem;
    height: 0.5333rem;
    line-height: 0.5333rem;
    border-radius: 5px;
    display: inline-block;
    background: #7793d5;
    text-align: center;
    color: #fff;
    margin-top: 0.2667rem;
    float: right;
    margin-right: 0.5333rem;

       font-size: 11px;
      box-sizing: border-box;
  }
  /*中*/
  .centre span{
    width: 0.5333rem;
    height: 0.5333rem;
    line-height: 0.5333rem;
    border-radius: 5px;
    display: inline-block;
    background: #fdbd06;
    text-align: center;
    color: #fff;
    margin-top: 0.2667rem;
    float: left;
    margin-left: 0.5333rem;
       font-size: 11px;
      box-sizing: border-box;
  }
  /*边*/
  .edge span{
    width: 0.5333rem;
    height: 0.5333rem;
    line-height: 0.5333rem;
    border-radius: 5px;
    display: inline-block;
    background: #825ce3;
    text-align: center;
    color: #fff;
    margin-top: 0.2667rem;
    float: right;
    margin-right: 0.5333rem;

       font-size: 11px;
      box-sizing: border-box;
  }
</style>


