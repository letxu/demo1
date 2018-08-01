<template>


  <div class="history">
    <div class="history-head clearfix">
      <span class="iconfont icon-back" 	  @click="back"></span>
      <span>充值记录</span>
    </div>
    <ul>
       <li v-for="(item,index) in dataArr">
           <span>充值{{item.recharge_money}}元</span><br>
           <span>{{getTime(item)}}</span>
           <span style="color:red">+￥{{item.recharge_money}}</span>
       </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import api from '../fetch/api'
  import {formatDate} from '../util/date';
  export default {
    components: {},
        data() {
          return {
            username: '',
            password: '',
            dataArr:[],
          }
      },
   created () {
        api.recharge_record().then(res => {
          console.log(res)
          if (res.Code == "0") {
                 this.dataArr=res.Data;
          } else {
            this.$toast(res.Msg);
          }
        }, err => {
          console.log(err);
          this.$toast("连接服务器发生错误!");
        })
   },
  
    methods: {
     getTime(item){
       return  formatDate(new Date(item.time * 1000), 'yyyy-MM-dd hh:mm')
      },
     back(){
         this.$router.back(-1);
      },
    }
  }
</script>

<style scoped>

   .history {
   font-size: 15px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #FFFFFF;
  }
  .history  .history-head{
    height: 1.333333rem;
    line-height: 1.333333rem;
    width: 100%;
    border-bottom: 1px solid #E2E2E2;
    position:fixed;
    top: 0;
    left: 0;
  }
  .history  .history-head span:nth-child(1){
    position: absolute;
    display: inline-block;
    padding: 0 .4rem;
    left:0;
  }
 .history ul{
    width: 100%;  
    padding-top: 1.333333rem;
 }
 .history ul li{
    width: 100%;  
    /*height: 2rem;*/
    position: relative;
    text-align: left;
    padding: 0.366667rem .4rem;
    box-sizing: border-box;
    border-bottom: 1px solid #f3f3f3;
 }
   .history ul li span:nth-child(3){
    margin-top: .4rem;;
    display: inline-block;
 }
  .history ul li span:nth-child(4){
    position: absolute;
     right: .4rem;
     top: .733333rem;
 }
</style>
