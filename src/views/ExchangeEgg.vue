<template>

  <div class="exchangeegg">
    <div class="exchangeegg-head clearfix">
      <span class="iconfont icon-back" 	  @click="back"></span>
      <span>金库换蛋</span>
    </div>
    <div class="content1">
      <span>当前金库</span><span>{{vault}}</span>
    </div>
    <div class="content1">
       <span>兑换金蛋数</span>
       <input type="number" v-model="gold_ball" placeholder="请输入兑换金蛋数量">
     </div>
      <button @click="_go()">兑换金蛋</button>
      <div class="bottom-msg" style="margin-top:.4rem">
        金库和金蛋的比例：1金库=1金蛋
      </div>
  </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import api from '../fetch/api'
  export default {
    components: {},
    data() {
      return {
        username: '',
        password: '',
        vault:'',
        gold_ball:'',

    }
  },
  created () {
    this.awardGetWater();
   },
    methods: {

     back(){
         this.$router.back(-1);
      },
      _go(){
          if(!this.gold_ball){
            
           this.$toast("请输入兑换数量");
            return;
          }
       api.exchange_egg(this.gold_ball).then(res => {
          console.log(res)
          if (res.Code == "0") {
               this.$toast(res.Msg);
               this.back();
            //成功
          } else {
            this.$toast(res.Msg);
          }
        }, err => {
          console.log(err);
          this.$toast("连接服务器发生错误!");
        })
      },
          //金蛋和金库
      awardGetWater(){
        api.awardGetWater().then((res)=>{
              // this.gold_ball=res.Data.gold_ball
              this.vault=res.Data.vault
          },(err)=>{
              this.$toast("获取金蛋失败!");
          })
      },
    }
  }
</script>

<style scoped>

   .exchangeegg {
     font-size: 15px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #FFFFFF;
    padding-top: 1.333333rem;
  }
  .exchangeegg  .exchangeegg-head{
    height: 1.333333rem;
    line-height: 1.333333rem;
    width: 100%;
    border-bottom: 1px solid #E2E2E2;
    position:fixed;
    top: 0;
    left: 0;
  }
  .exchangeegg  .exchangeegg-head span:nth-child(1){
    position: absolute;
    display: inline-block;
    padding: 0 .4rem;
    left:0;
  }
 .exchangeegg .content1{
    width: 100%;  
    height: 1.333333rem;
    line-height:  1.333333rem;
    border-bottom: 1px solid #F3F3F3;
    text-align: left;
    padding: 0  .4rem;
 }
  .exchangeegg .content1 span:nth-child(2){
    width: 100%;  
    margin-left: .7rem;
    color: red;
 }
  .exchangeegg .content1 input{
    height: 1.333333rem;
      margin-left: .2rem;
 }
 .exchangeegg  button {
  width: 80%;
  height: 1.266667rem;
  background: #36BCF1;
  border: 0;
  color: white;
  border-radius: .133333rem;
  outline: none;
  margin-top: 1.066667rem;
}
</style>
