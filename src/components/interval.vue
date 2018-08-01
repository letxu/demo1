<!--分析页面:开奖间隔-->
<template>
  <div class="interval">
      <ul class="interval-title">
        <li>中奖号码</li>
        <li>标准间隔</li>
        <li>当前间隔</li>
      </ul>
      <div class="interval-item">
        <ul class="interval-cont" v-for="item in data">
          <li class="winning"><span>{{item.id}}</span></li>
          <li>{{item.z_time}}</li>
          <li>{{item.time}}</li>
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
      this.betInterval()
    },
    methods: {
      betInterval(){
        api.betInterval().then(res=>{
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
  .interval{
    margin-top: 0.1333rem;
    width: 100%;
    color: #000;
  }
  .interval-title{
     width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    background: #eee;
    position: fixed;
    top: 2.4rem;
    z-index: 1;
  }
  .interval-title li{
    width: calc(100%/3);
    float: left;
    font-size: 14px;
    color: #ccc;
  }
  .interval-cont{
    width: 100%;
    height: 1.0667rem;
    line-height: 1.0667rem;
  }
  .interval-cont li{
    width: calc(100%/3);
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
    font-size: 11px;
  }
.interval-item{
    position: relative;
    top: 3rem;
    width: 100%;
    padding-bottom: 1.3333rem;
  }
</style>
