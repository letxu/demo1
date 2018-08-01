<template>
    <div class="my-promote">
        <div class="promote-head">
            <i  class="iconfont icon-back"  @click="back"></i>
            <span>我的推广战绩</span>
        </div>

         <div class="user-promote">
                <div class="tab-item">
                    <span class="tab-icon">{{pupil}}</span>
                    <span class="tab-link">已邀徒弟（个）</span>
                </div>
                <div class="tab-item" >
                    <span class="tab-icon">{{gold_ball}}</span>
                    <span class="tab-link">累计提成金蛋</span>
                </div>
                <div class="tab-item">
                    <span class="tab-icon">{{today_total}}</span>
                    <span class="tab-link">今日邀请提成</span>
                </div>
        </div> 
        <!--line-->
        <div class="line"></div>       
        <!--推广-->
        <div class="promote-rule">
            <p class="Reward-rules">推广奖励规则</p>
            <div class="promote-content">
                <p class="moy">朋友通过你的邀请成功下载幸运28即成为你的徒弟，你将获得该徒弟充值的的提成</p>
            </div>
            
               <ul class="rules-tip">
                   <li v-for="(item,index) in menus">
                       <span class="num">{{index+1}}</span>
                       <div class="nature">
                           <span class="tipp">{{item.title}}</span>
                           <span class="yuan">{{item.path}}</span>
                           <span class="money">{{item.money}}</span>
                       </div>
                   </li>
               </ul>
        </div>
        <!--line-->
        <div class="line"></div> 
        <!--排行-->
        <div class="Ranking information">
            <p class="Reward-rules">邀请大咖收入排行</p>
           <div class="tip">
               <ul class="hous">
                   <li v-for="(item,index) in arrData">
                       <span class="numIndex" v-show="index>=3">{{index+1}}</span>
                        <img class="img-first" v-show="index==0" src="../assets/img/one.png">
                       <img  class="img-first" v-show="index==1" src="../assets/img/two.png">
                       <img class="img-first" v-show="index==2" src="../assets/img/three.png">
                       <img class="img-two" :src="hasimg(item,index)">
                       <span class="heading">{{item.username}}</span>
                       <div class="mil">
                           <span class="title">{{item.total}}</span>
                           <span class="time">累积获得提成</span>
                       </div>
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
                pic:cc,
                menus:[
                    {
                        title:"徒弟首次签到成功",path:'+1万',money:"金蛋"
                    },
                    {
                        title:"徒弟首次签到成功",path:'+30万',money:"金蛋"
                    }
                ],
            pupil: 0,
		    gold_ball: 0,
	     	today_total : 0,
            arrData:[],
    
         }
        },
        created(){
             api.myGeneralize().then(res => {
                console.log(res)
                if (res.Code == "0") {//成功
                  this.pupil=res.Data.pupil;
                 this.gold_ball=res.Data.gold_ball;
                  this.today_total=res.Data.today_total;
                  this.arrData=res.Data.arr_data;
                } else {
                    this.$toast(res.Msg);
                }
            }, err => {
                this.$toast("连接服务器发生错误!");
            })
        },
        computed:{
            
        },
        methods:{
                hasimg(item,index){
                
                      return "http://pcdd.ygwl.info/"+item.logo;
                
                },

              back(){
                 this.$router.back(-1);
             },
        },
        // props:{
        //    banners:{
        //     type:Array
        //    },
        //    swiperOption:{

        //    }
        // },
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
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
}
.promote-head i
{
    position: absolute;
    display: inline-block;
    left: 0;
    padding: 0 .4rem;
  
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
.promote-rule .promote-content{
    text-align: center;
    align-items: center;
    height: 2.2667rem;
    line-height: 2.2667rem;
    margin-top: 0.5333rem;
}
.promote-rule .promote-content p
{
    height: 0.6667rem;
    line-height: 0.6667rem;
    text-align: left;
}

.promote-rule .promote-content .moy
{
    font-size: 14px;
    /*font-family: '微软雅黑'*/
}
.rules-tip li 
{
 
    padding: 0.2667rem;
    /*height: 60px;
    line-height: 60px;*/
    text-align: left;
    display: flex;
}
.rules-tip .num
{
    /*flex:0 0 0.6667rem;*/
    vertical-align: middle;
    background: #C4C4C4;
    text-align: center;
    color: white;
    border-radius: 50%;
    height: 0.4667rem;
    line-height: 0.4667rem;
    width:  0.4667rem;
    display: inline-block;
}
.rules-tip .nature
{
    flex: 1;
    display: inline-block;
    padding-left: .266667rem;
}
.rules-tip .tipp
{
    width: 5.3333rem;
    text-align: left;
    color: #000;
    font-size: 14px;
    font-weight: bold;
    /*overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; */
}

.rules-tip .money
{
    color: #C4C4C4;
}
/*排行*/
.Ranking
{
    padding: 0.4rem 0 0 0;
}

.Ranking .tip ul
{
    padding:0 0.1333rem 1.6rem 0.1333rem;
    width: 100%;
        box-sizing: border-box
}
.Ranking ul li
{
   width: 100%;
    /*height: 2.3333rem;*/
    /*line-height: 2.3333rem;*/
    white-space: nowrap;
    text-align: left;
    padding: .4rem 0;
    font-size: 15px;
    box-sizing: border-box
}
.Ranking ul li span:nth-of-type(1){
    margin-left: .8rem;
    padding: 0 .266667rem;
    color: #BFBFBF;
    font-size: 18px;
}
.Ranking ul li span:nth-of-type(2){
   vertical-align: middle;
}
 .Ranking ul li .img-first{
    margin-left: .8rem;
    width: .826667rem;
    height: .866667rem;
    vertical-align: middle;
}
 .Ranking ul li .img-two{
    /*margin-left: .8rem;*/
   width: .826667rem;
    height: .866667rem;
    vertical-align: middle;
}
.Ranking ul li .mil{
  float: right;
  margin-right: .4rem;
}
.Ranking ul li .mil .title{
   display: block;
   color: #F85420;
}

</style>