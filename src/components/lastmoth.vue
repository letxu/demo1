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
      <ul class="statistics-cont">
        <li>885423期</li>
        <li class="winning"><span>16</span></li>
        <li class="big"><span>大</span></li>
        <li class="double"><span>双</span></li>
        <li class="centre"><span>中</span></li>
      </ul>
      <ul class="statistics-cont">
        <li>8885423</li>
        <li class="winning"><span>16</span></li>
        <li class="small"><span>小</span></li>
        <li class="single"><span>单</span></li>
        <li class="edge"><span>边</span></li>
      </ul>
  </div>
</template>
<script>
export default {
    data() {
      return {
       
      }
    },
    methods: {

    }
  }
</script>
<style scoped>
  .statistics{
    margin-top: 10px;
    width: 100%;
  }
  .statistics-title{
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #eee;
  }
  .statistics-title li{
    width: 20%;
    float: left;
    font-size: 24px;
    color: #ccc;
  }
  .statistics-cont{
    width: 100%;
    height: 80px;
    line-height: 80px;
  }
  .statistics-cont li{
    width: 20%;
    height: 80px;
    line-height: 80px;
    float: left;
     font-size: 24px;
  }
  .winning span{
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    display: inline-block;
    margin: 0 auto;
    background: red;
    text-align: center;
    color: #fff;
    margin-top: 10px;
  }
  /*大*/
  .big span{
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    display: inline-block;
    background: red;
    text-align: center;
    color: #fff;
    margin-top: 10px;
    float: left;
    margin-left: 40px;
  }
  /*小*/
  .small span{
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    display: inline-block;
    background: green;
    text-align: center;
    color: #fff;
    margin-top: 10px;
    float: right;
    margin-right: 40px;
  }
  /*单*/
  .single span{
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    display: inline-block;
    background: red;
    text-align: center;
    color: #fff;
    margin-top: 10px;
    float: left;
    margin-left: 40px;
  }
  /*双*/
  .double span{
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    display: inline-block;
    background: green;
    text-align: center;
    color: #fff;
    margin-top: 10px;
    float: right;
    margin-right: 40px;
  }
  /*中*/
  .centre span{
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    display: inline-block;
    background: red;
    text-align: center;
    color: #fff;
    margin-top: 10px;
    float: left;
    margin-left: 40px;
  }
  /*边*/
  .edge span{
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    display: inline-block;
    background: green;
    text-align: center;
    color: #fff;
    margin-top: 10px;
    float: right;
    margin-right: 40px;
  }
</style>


