<!--幸运28页面-->
<template>
    <div class="lucky">
        <!--头部-->
        <div class="lucky-head clearfix clear">
            <span>幸运28</span>
            <span class="example" @click="Gameplay()">玩法</span>
        </div>
        
        <div class="lucky-cont">
            <!--金币换蛋-->
            <div class="div-flex">
            <div class="line"></div>
            <div class="egg"> 
                <div class="jindan">金蛋&nbsp;&nbsp;<span>{{gold_ball}}</span><br>金库&nbsp;&nbsp;<span>{{vault}}</span></div>
                <!-- <div></div> -->
                <div class="conversion" @click="goExchangeEgg">金库换蛋</div>
            </div>
            <div class="line"></div>
            <!--导航菜单-->
            <div class="navigation">
                <div  @click="gomybet">
                    <img src="../assets/img/myBetting.png">
                    <span class="tab-link">我的投注</span>
                </div>
                <div  @click="GoAutomaticBet">
                    <img src="../assets/img/automatic.png">
                    <span class="tab-link">自动投注</span>
                </div>
                <div v-if="false">
                    <img src="../assets/img/relief.png">
                    <span class="tab-link">领取救济</span>
                </div>
                <div>
                    <img src="../assets/img/bettingType.png">
                    <span class="tab-link"><router-link :to="{ path: '/custombetList'}">投注模式</router-link></span>
                    
                </div>
                <div @click="goFierce_list()">
                    <img src="../assets/img/bd.png">
                    <span class="tab-link">牛人榜单</span>
                </div>
            </div>
            <div class="line"></div>
            </div>
            <!--投注-->
            <div class="betting">
                <div class="betting-item clearfix" v-for="(item,index) in data">
                    <div class="stage">{{item.num}}期</div>
                    <div class="date">{{getDate(item.time)}}</div>
                    <div class="deadline" v-if="item.res==1">
                        <span>距截止:<i>{{item.date}}</i>秒</span><br>
                        <span  style="margin-top:0.266666rem;display:inline-block">金蛋池:<i>{{item.count_money?item.count_money:''}}</i></span>
                    </div>
                     <div class="deadlines"  v-if="item.res==2">
                        <span class="empty-circle">{{getNum(index)?getNum(index)[0]:""}}</span>+
                        <span class="empty-circle">{{getNum(index)?getNum(index)[1]:""}}</span>+
                        <span class="empty-circle">{{getNum(index)?getNum(index)[2]:""}}</span>=
                        <span class="solid-circle">{{getNum(index)?getNum(index)[3]:""}}</span>
                    </div>
                    <div class="bet" :class="{'jz':0<item.date&&item.date<=60}" v-if="item.res==1">
                        <router-link :to="{ path: '/beton',query: {plan:item.num,date:item.date}}" v-if="item.is_bet==2&&item.date>60">投注</router-link>
                        <router-link :to="{ path: '/beton',query: {plan:item.num,date:item.date}}" v-if="item.is_bet==1&&item.date>60">已投注</router-link> 
                        <span v-if="0<item.date && item.date<=60">已截止</span>
                        <span v-if="item.date<=0 &&item.res==1">开奖中</span>
                    </div>
                    <div class="winning"  v-if="item.res==2">
                        <span>中奖人数:<i class="people">{{item.igkbet_num}}</i></span><br>
                        <span>盈亏:<i class="shares">{{item.loss?item.loss:0}}</i></span>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
import api from '../fetch/api'
  export default {
    data() {
      return {
        data:[],
        gold_ball:0,//金蛋
        vault:0,//金库
        time:0,
       intervalid1:{},
      }
    },
    created(){
        this.awardBetList();
        this.awardGetWater()

        
    },
    methods: {
        goExchangeEgg(){
                this.$router.push('/exchangeegg');
        },
         Gameplay() {
                this.$router.push('/Gameplay');
            },
         gomybet(){
      this.$router.push('/mybet');
     },
     GoAutomaticBet(){
        //   this.$router.push('/automaticbet');
        if(this.data.length>1){
             this.$router.push({name:'AutomaticBet',params:{num:this.data[1].num}})
        }else {
             this.$router.push('/automaticbet');
        }
        
    
     },
     awardGetWater(){
      //金蛋和金库
      api.awardGetWater().then((res)=>{
            this.gold_ball=res.Data.gold_ball
            this.vault=res.Data.vault
         },(err)=>{

         })
        },
     goFierce_list(){
        this.$router.push('/fierce-list');
     },
      awardBetList(){
          let _this=this;
        api.awardBetList().then(res=>{
            this.time=res.Data.now_time
            res.Data.res.forEach((v)=>{
                v.date=(v.time-this.time)>0?Math.floor(v.time-this.time):0
            })
          this.data=res.Data.res;
          this.countDown();
           clearInterval(_this.intervalid1);
           this.lunxun(res);
        },err=>{

        })
 
      },
      lunxun(res){
             let _this=this;
             if( res.Data.res.length>=3 && res.Data.res[2].date=="0" ){//
                        _this.intervalid1 = window.setInterval(()=>{
                          
                           api.queryRes(res.Data.res[2].num).then(res=>{
                                 if (res.Code == "0") {
                                         if(res.Data == "2"){
                                              _this.awardBetList();
                                             clearInterval(_this.intervalid1);
                                        }
                                  } else {
                                       _this.$toast(res.Msg);
                                   }
                             },err=>{
                          })
                  
                
                  },5000)

           }
      },
      add0(m){
       return m<10?'0'+m:m 
      },
      countDown(){
        let _this=this;
        //    alert( this.date);
          this.data.forEach((v,k)=>{
            //    alert(v.date);
              if(v.date>0){
                //   alert(k);
                   let  interval = window.setInterval(()=>{
                      v.date=v.date-1
                      if(v.date<=0){
                          clearInterval(_this.intervalid1);
                        _this.awardBetList();
                        clearInterval(interval);
                      }
                  },1000)
              }else{
                //  if(v.res==1){//未开奖

                //  }

              }
            //   if(k==2&&v.date==0){
            //     this.awardBetList()
            //   }
          }) 
      }, 
     awardBetListTo0(){
          let _this=this;
        api.awardBetList().then(res=>{
            this.time=res.Data.now_time
            res.Data.res.forEach((v)=>{
                v.date=(v.time-this.time)>0?Math.floor(v.time-this.time):0
            })
          this.data=res.Data.res;
          this.countDown();
 
        },err=>{

        })
 
      },
      getDate(Time) {  
        //shijianchuo是整数，否则要parseInt转换  
        var time = new Date(Time*1000);  
        var y = time.getFullYear();  
        var m = time.getMonth()+1;  
        var d = time.getDate();  
        var h = time.getHours();  
        var mm = time.getMinutes();  
        var s = time.getSeconds(); 
        return this.add0(h)+':'+this.add0(mm);  
      },
      getNum(index) {  
        let rs=/\d+/g
        let arr=[]
        if(this.data[index].igkbet){
            return this.data[index].igkbet.match(rs)
        }else{
            return  arr
        }
        
      }
    },
    components: {
    },
    beforeDestroy () {
     
       clearInterval(this.intervalid1)
    },
  }
</script>
<style scoped>
.line{
    background: #eaeaea;
    height: 0.1333rem;
}
.lucky {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-bottom: 2.1rem;
}
.lucky  .lucky-head{
    width: 100%;
    height: 1.3333rem;
    text-align: center;
    color: #3f96e0;
    font-size: 16px;
    line-height: 1.3333rem;
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
       
}
.lucky-head .example{
     position: absolute;
    font-size: 14px;
    color: #a7a7a7;
    padding: 0 .4rem;
    right: 0;
}
.lucky-cont{
  margin-top:6.1333rem;
}
.lucky-cont .div-flex{
     width: 100%;
    font-size: 13px;
    margin-top: 1.3333rem;
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
}
.egg{
    height: 1.8667rem;
    padding: 0rem 0.8rem;
    white-space: nowrap;
}
.egg div{
    float: left;
    width: calc(100% / 3 - 0.0267rem);
    line-height: 0.6667rem;
    text-align: left;
    font-size: 14px;
}
.egg span{
    color:#DE4A4A;
}
.egg .conversion{
    border: 1px solid #3f96e0;
    color: #3f96e0;
    text-align: center;
    height: 0.8rem;
    line-height: 0.8rem;
    margin-top: 0.5333rem;
    border-radius: 0.6667rem;
    width: 2rem;
    float: right;
}
.navigation{
     width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    overflow: hidden;
    padding: 0.2rem 0;
}
.navigation>div{
    flex: 1;
    text-align: center;
    align-items: center;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    height: 1.6rem;
    line-height: 1.6rem;
}
.navigation>div>img{
    display: inline-block;
    width: .4rem;
    /*height: .6rem;*/
    margin: 0.2667rem 0 0.4rem 0;
}
.tab-link
{
    height: 0.4rem;
    line-height: 0.4rem;
    color:#3f96e0;
}
.tab-link a
{
    color:#3f96e0;
}
.betting{
    padding: 0 .3rem;
}
.betting-item{
    margin: 0.4667rem 0rem;
    white-space:nowrap;
}
.betting-item div{
    float: left;
}
.betting-item .stage{
    background:#2CAAF2;
    height: 0.5333rem;
    line-height: 0.5333rem;
    margin-top: 0.2rem; 
    width: 1.6rem;
    border-radius: 1.3333rem;
    color: #fff;
    text-align: center;
}
.betting-item .date{
    color:#000;
    margin-left: 0.2667rem;
    margin-top: 0.2rem;
    line-height: 0.5333rem;
    height: 0.5333rem;
}
.betting-item .deadline{
    text-align: left;
    /*width: 4rem;*/
    padding-left: 0.4rem;
    margin-left: 0.9667rem;
    margin-top: 0.0667rem;
    background: url("../assets/img/time.png") no-repeat;
    background-size: 14px;
}
.betting-item .deadlines{
    width: 4rem;
    margin-left: 0.2667rem;
    margin-top: 0.1333rem;
    color: #DE4A4A;
}
.betting-item .deadline i{
    color:#DE4A4A;
}
.betting-item .bet{
    margin-top: 0.2rem;
    background:#2CAAF2;
    color: #fff;
    float: right;
    height: 0.5333rem;
    line-height: 0.5333rem;
    text-align: center;
    width: 1.3333rem;
    color: #fff;
    border-radius: .066667rem;
}
.betting-item  .jz{
    margin-top: 0.2rem;
    background:white;
    color: #2CAAF2;
    float: right;
    height: 0.5333rem;
    line-height: 0.5333rem;
    text-align: center;
    width: 1.3333rem;
    border: 1px solid #2CAAF2;
}
.betting-item  .jz a{
 color: #2CAAF2;
}
.betting-item .bet a{
  color: #fff;
}
   /*width: 2.1333rem;*/
.betting-item .winning{
   text-align: right;
   color: #a7a7a7;
   float: right;
}
.solid-circle{
    display: inline-block;
    width: 0.5333rem;
    height: 0.5333rem;
    border-radius: 50%;
    text-align: center;
    line-height: 0.5333rem;
    background: #DE4A4A;
    color: #fff
}
.empty-circle{
    display: inline-block;
    width: 0.5333rem;
    height: 0.5333rem;
    border-radius: 50%;
    text-align: center;
    line-height: 0.5333rem;
    border:1px solid #DE4A4A;
    color: #DE4A4A
}
.people{
    color: #000;
}
.shares{
    color:#3f96e0;
}
.jindan{
    margin-top: .4rem;
}
</style>


