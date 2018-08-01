<template>
    <div class="my-promote">
        <div class="promote-head">
            <i  class="iconfont icon-back"  @click="back"></i>
            <span>等级说明</span>
        </div>

         <div class="cont">
           <div class="cont-title">个人等级是什么？</div>
           <div class="cont-con">
             <p>在幸运28中,你可以通过玩游戏、签到、邀请、充值等获得金蛋、累积充值金额会提升您的等级,具体等级划分如下:</p>
             <ul>
               <li>
                 <span class="cor">段位</span>
                 <span class="cor">累计充值</span>
               </li>
               <li>
                 <span>青铜</span>
                 <span>10</span>
               </li>
               <li>
                 <span>白银</span>
                 <span>100</span>
               </li>
               <li>
                 <span>黄金</span>
                 <span>1000</span>
               </li>
               <li>
                 <span>铂金</span>
                 <span>5000</span>
               </li>
               <li>
                 <span>砖石</span>
                 <span>11000</span>
               </li>
               <li>
                 <span>星耀</span>
                 <span>25000</span>
               </li>
               <li>
                 <span>王者</span>
                 <span>50000</span>
               </li>
             </ul>
           </div>
         </div>
    </div>
</template>
<script>
    import a from '../assets/img/q.jpg';
    import b from '../assets/img/w.jpg';
    import kk from '../assets/img/kk.png';
    import bb from '../assets/img/bb.png';
    import news from '../assets/img/new.png';
    import cc from '../assets/img/cc.png';
   import api from '../fetch/api'
    export default {
        name: 'carrousel',
        mounted() {
          
        },
        data(){
            return {
          }
        },
        created(){
             
        },
        computed:{
            
        },
        methods:{
          back(){
              this.$router.back(-1);
          },
        },
        // props:{

        components:{
           
        }
    }
</script>
<style scoped>
.promote-head
{   width: 100%;
    height: 1.3333rem;
    text-align: center;
    font-size: 20px;
    line-height: 1.3333rem;
    background: white;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
    border-bottom: 1px solid #E2E2E2;
}
.promote-head i
{
    display: inline-block;
    padding: 0 .4rem;
    position: absolute;
    left: 0;
}

/*user-promote*/
.user-promote{
    width: 100%;
    display: flex;
    overflow: hidden;
    padding: 0.2rem 0;
    margin-top: 1.3333rem;
}
.user-promote .tab-item{
    flex: 1;
    text-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
}
.tab-link
{
    height: 0.6667rem;
    line-height: 0.6667rem;
    color: #C7C7C7;
}
.user-promote .tab-icon
{
    font-size: 20px;
    font-weight: bold;
}
.user-promote .tab-item:nth-of-type(2) .tab-icon
{
    color: #B0E2FF
}
.user-promote .tab-item:nth-of-type(3) .tab-icon
{
    color: #B0E2FF
}
.line
{
    background: #eaeaea;
    height: 0.2667rem;
}
/*promote-rule*/
.promote-rule{
    overflow: hidden;
    padding: 0.5333rem;
}
.Reward-rules
{
    position: relative;
    width: 6.6667rem;
    height: 0.9333rem;
    line-height: 0.9333rem;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin: 0 auto;
}
.Reward-rules:after
{
    content: "";
    position: absolute;
    z-index: 1;
    pointer-events: none;
    background-color: #e5e5e5;
    height: 0.1067rem;
    display: block;
    width: 2.6667rem;
    left:50%;
    margin-left:-1.3333rem;
}
.cont{
  margin-top: 1.3333rem
}
.cont-title{
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  font-size: 16px;
  color: #3f96e0
}
.cont-con{
  width: 80%;
  margin: 0 auto;
  font-size: 14px;
}
.cont-con p{
 text-align: left;
 padding-bottom: .8rem;
 line-height: .5rem;
}
.cont-con ul{
  background: #C7C7C7;
  width: 90%;
  margin: 0 auto;
  border-radius: 5px;
}
.cont-con ul li{
  line-height: .8rem;
  width: 100%;
  height: .8rem;
  font-size: 14px;
}
.cont-con ul li span:nth-last-of-type(1){
  width:30%;
  margin-right: 6%;
  float: right;
  display: inline-block;
  text-align: left;
}
.cont-con ul li span:nth-last-of-type(2){
  width:30%;
  margin-left: 6%;
  float: left;
  display: inline-block;
  text-align: left;
}
.cor{
  color: #3f96e0
}
</style>