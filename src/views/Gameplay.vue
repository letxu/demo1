<!--玩法攻略页面-->
<template>
    <div class="Gameplay">
        <div class="Gameplay-head">
            <i class="iconfont icon-back"  @click="back"></i>
            <span>玩法</span>
        </div>
        
        <div class="game">
               <img class="game-img" :src="pic"> 
        </div> 
        
        <!--幸运28竞猜-->
        <div class="luck28">
            <div class="luck28-wh1"><i class="type-num">01</i>幸运28竞猜是什么？</div>
            <div class="luck28-content">
                <p>幸运28竞猜是PC蛋蛋首创的竞猜游戏，系统随机产生三个0~9之间的数字,三个数字相加范围0~27,共28个号码,押中即可获得奖励。</p>
                <ul>
                   <li>01</li>
                   <li>+</li>
                   <li>08</li>
                   <li>+</li>
                   <li>09</li>
                   <li>=</li>
                   <li>18</li>
                </ul>
            </div>
            <p class="luck28-ho"><i class="type-num">02</i>幸运28竞猜怎么玩？</p>
            <div class="bet">
               <p><i></i>首先,点击投注进入幸运28投注页面</p>
               <div class="bet-tip bet-z">
                   <ul class="Ranking">
                       <li v-for="(item,index) in items">
                           {{ item.message}}
                           <span class="issue">{{item.issue}}</span>
                           <span class="tim">
                               {{item.time}}
                           </span>
                           <div class="mil">
                               <i></i>
                               <div class="mil-cont">
                                   <span class="title">{{item.path}}</span>
                                   <span class="time">{{item.jin}}</span>
                               </div>
                           </div>
                           <span class="bett">
                               {{item.bet}}
                           </span>
                       </li>
                   </ul>
               </div>
            </div>
            <!--then-->
            <div class="bet">
               <p class="then"><i></i>然后,选择投注模式进行投注</p>
               <div class="bet-z">
               <div class="bet-tip">
                   <ul class="Ranking modle">
                       <li>
                           <div class="eggs">我的金蛋<span>5,000</span></div>
                           <div class="gold">我的小金库<span>0</span></div>
                       </li>
                       <li>
                           <div class="eggs">投资总额<span>5000</span></div>
                           <div class="gold">
                               <ul>
                                   <li v-for="(item,index) in tou"><a>{{item.title}}</a></li>
                               </ul>
                           </div>
                       </li>
                        <li>
                           <div class="gold">
                               <ul>
                                   <li v-for="(item,index) in amount"><a>{{item.title}}</a></li>
                               </ul>
                           </div>
                       </li>
                   </ul>

                   <ul class="defined">
                       <li clearfix>
                           <div class="all clearfix">
                              <ul class="">
                                  <li v-for="(item,index) in defined"><a>{{item.title}}</a></li>
                              </ul>
                           </div>
                           <div class="Cus-Mol">
                              <span></span>自定义模式
                           </div>
                       </li>
                   </ul>

               </div>
               <ul class="num-title">
                    <li style="text-align:center">号码</li>
                    <li>投注金额</li>
                    <li>赔率</li>
                    <li>投注倍数</li>
                </ul>
                <ul class="num-content">
                    <li>
                      <div class="eggs">投资总额<span>5000</span></div>
                         <div class="gold kfc">
                           <ul>
                               <li v-for="(item,index) in tou"><a>{{item.title}}</a></li>
                           </ul>
                       </div>
                    </li>
                </ul>
                <div class="sure"><a>确认投注</a></div>
             </div>
             <div class="bet">
               <p class="last"><i></i>最后,在主页等待倒计时刷新页面查看盈亏</p>
               <div class="bet-tip bet-z">
                   <ul class="Ranking">
                       <li v-for="(item,index) in items">
                           {{ item.message}}
                           <span class="issue">{{item.issue}}</span>
                           <span class="tim">
                               {{item.time}}
                           </span>
                           <div class="mil">
                               <i></i>
                               <div class="mil-cont">
                                   <span class="title">{{item.path}}</span>
                                   <span class="time">{{item.jin}}</span>
                               </div>
                           </div>
                           <span class="bett">
                               {{item.bet}}
                           </span>
                       </li>
                   </ul>
               </div>
            </div>
            </div>

        </div>
        <!--玩法规则-->
        <div class="num-rule">
            <div style="padding:15px">
                <div class="rule-bg">
                   <p class="luck28-wh"><i class="type-num">03</i>幸运28竞猜规则</p>
                </div>
                 <p class="rule-time">游戏时间：从早上9:05至23:44,每分钟一期</p>
                 <p class="cot">答案:我觉得就两种方法吧: 一、把文字做成图片,然后将图片作为背景。当然这样的话文字是没办法动态生成的。 二、把文字层作为底层,上层放内容。 举个例子: ...答案:我觉得就两种方法吧: 一、把文字做成图片,然后将图片作为背景。当然这样的话文字是没办法动态生成的。 二、把文字层作为底层,上层放内容。 举个例子: ...</p>

                 <div class="rule-bg">
                   <p class="luck28-wh"><i class="type-num">04</i>幸运28竞猜规则</p>
                </div>
                 <p class="rule-time">游戏时间：从早上9:05至23:44,每分钟一期</p>
                 <p class="cot">答案:我觉得就两种方法吧: 一、把文字做成图片,然后将图片作为背景。当然这样的话文字是没办法动态生成的。 二、把文字层作为底层,上层放内容。 举个例子: ...答案:我觉得就两种方法吧: 一、把文字做成图片,然后将图片作为背景。当然这样的话文字是没办法动态生成的。 二、把文字层作为底层,上层放内容。 举个例子: ...</p>
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
    import game from '../assets/img/game.png';

    export default {
        name: 'carrousel',
        mounted() {
          
        },
        data(){
            return {
              pic:game,
                menus:[
                    {
                        title:"徒弟首次签到成功",path:'+1万',money:"金库"
                    },
                    {
                        title:"徒弟首次签到成功",path:'+30%',money:"金库"
                    }
                ],
                items: [
                    {
                        issue:'6512561期',time:'11:25',path:'截止到:23秒',jin:'金蛋池:7878,505',bet:'投注'
                    },
                    {
                        issue:'6512561期',time:'11:25',path:'截止到:23秒',jin:'金蛋池:7878,505',bet:'投注'
                    },
                    {
                        issue:'6512561期',time:'11:25',path:'截止到:23秒',jin:'金蛋池:7878,505',bet:'投注'
                    },
                    {
                        issue:'6512561期',time:'11:25',path:'截止到:23秒',jin:'金蛋池:7878,505',bet:'投注'
                    }
                ],
                tou: [
                    {
                        title:"同上期",
                    },
                    {
                        title:"清除",
                    },
                    {
                        title:"梭哈",
                    },
                    {
                        title:"反选",
                    }
                ],
                amount: [
                    {
                        title:"0.5倍",
                    },
                    {
                        title:"0.8倍",
                    },
                    {
                        title:"1.2倍",
                    },
                    {
                        title:"1.5倍",
                    },
                    {
                        title:"2倍",
                    },
                    {
                        title:"5倍",
                    },
                    {
                        title:"10倍",
                    }
                ],
                defined: [
                    {
                        title: "全部",
                    },
                    {
                        title: "大",
                    },
                    {
                        title: "小",
                    },
                    {
                        title: "单",
                    },
                    {
                        title: "双",
                    },
                    {
                        title: "中",
                    },
                    {
                        title: "边",
                    },
                    {
                        title: "大单",
                    },
                    {
                        title: "小单",
                    },
                    {
                        title: "大双",
                    },
                    {
                        title: "小双",
                    },
                    {
                        title: "大边",
                    },
                    {
                        title: "大边",
                    },
                    
                    {
                        title: "随机",
                    },
                    {
                        title: "更多",
                    }
                ],
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
.Gameplay-head
{
    width: 100%;
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
.Gameplay-head i
{
   display: inline-block;
  
    height: 100%;
  position: absolute;
   padding: 0 .4rem;
   left: 0;
 
}
i, cite, em, var, address, dfn {
    font-style: normal;
}
.game{
    margin-top:1.3333rem;
}
/*game*/
.game .game-img{
    width: 100%;
    overflow: hidden;
}
/*luck28*/
.luck28
{
    padding: 0.2667rem;
}
.luck28-wh
{
    /*text-align: center;*/
    background: #87CEFA;
    color: #fff;
    font-size: 35px;
    padding: 0.2667rem 0.4rem 0.2667rem 0.8rem;
    border-radius: 0.4rem;
    margin: 0 auto;
    width: 4.8667rem;
    position: relative;
    overflow: hidden;
        font-size: 16px;
}
.luck28-wh1
{
    /*text-align: center;*/
    background: #87CEFA;
    color: #fff;
    font-size: 35px;
    padding: 0.2667rem 0.4rem 0.2667rem 0.8rem;
    border-radius: 0.4rem;
    margin: 0 auto;
    width: 4.8667rem;
    position: relative;
    overflow: hidden;
    font-size: 16px;
}
.luck28-ho
{
    text-align: center;
    background: #87CEFA;
    color: #fff;
    font-size: 16px;
    padding: 0.2667rem 0.4rem 0.2667rem 0.8rem;
    border-radius: 30px;
    margin: 0 auto;
    width: 4.8667rem;
  
    position: relative;
    overflow: hidden;
    margin-top: 0.8rem
}
.luck28-content p
{
    color: #737373;
    font-size: 18px;
    /*font-family: "微软雅黑";*/
    line-height: 0.8rem;
    margin: 0.2667rem 0;
    text-align: left;
    text-indent: 0.8rem;
}

.luck28-content ul
{
    display: flex;
    padding: 0.1333rem 1.0667rem;
}
.luck28-content ul li:nth-child(2n)
{
    flex:0 0 0.6667rem;
    text-align:center;
    font-size: 18px;
    height: 1.3333rem;
    line-height: 1.3333rem;
}
.luck28-content ul li:nth-child(2n+1)
{   
    flex:1;
    text-align:center;
    border:1px solid #a1a1a1;
    background:#fff;
    border-radius:1.3333rem;
    -moz-border-radius:1.3333rem; /* 老的 Firefox */
    font-size: 18px;
    height: 1.3333rem;
    line-height: 1.3333rem;
}
.luck28-content ul li:last-child
{
    border:1px solid #f00;
    background:#f00;
    color: #fff;
}
.bet p 
{
    padding: 0.9333rem 0.8rem 0.5333rem 0rem;
    position: relative;
    overflow: hidden;
    height: 0.6667rem;
    line-height: 0.6667rem;
    font-size: 18px;
    font-weight: bold;
    color: #757575
}
.bet .then
{
    padding: 0.9333rem 2.1333rem 0.5333rem 0rem;
}
.bet .last
{
    padding: 0.9333rem 0rem 0.5333rem 0rem;
}
.bet p i
{
    display: block;
    width: 0.6667rem;
    height: 0.6667rem;
    position: absolute;
    top: 50%;
    margin-top: -0.1333rem;
    /*left: 30px;*/
}
.bet p i:after
{
    color: #5fb7a6;
    content: ">>";
    display: block;
    width: 0.6667rem;
    height: 0.6667rem;
    line-height: 0.6667rem;
    text-align: center;
    font-style: normal;
    font-size: 14px;
    font-weight: 800;
}
.bet-z
{
    border: 1px solid #A3A3A3;
    border-radius: 5px;
}
.bet-tip ul
{
    padding: 0.2667rem 0.1333rem;
}
.bet-tip ul li
{
    display: flex;
    /*height: 100px;*/
    line-height: 1.3333rem;
    white-space: nowrap;
}
.type-num {
    display: block;
    width: 0.8667rem;
    height: 0.8667rem;
    line-height: 0.8667rem;
    position: absolute;
    top: 50%;
    font-size: 18px;
    margin-top: -0.44rem;
    left: 0.04rem;
    background: #B0E2FF;
    border-radius: 50%;
    font-weight: bold;
}

/*排行*/
.Ranking
{
    padding: 0.4rem 0 0 0;
}
.modle
{
    border-bottom: 2px solid #BABABA;
}
.Ranking .tip ul
{
    overflow: hidden;
    padding:0 0.1333rem 1.6rem 0.1333rem;
}
.Ranking ul li
{
    display: flex;
    height: 1.3333rem;
    line-height: 1.3333rem;
    white-space: nowrap;
}
.Ranking ul li a 
{
    width: 100%;
    display: block;
}
.Ranking img,span
{
    display: inline-block;
}
.type img
{
    flex-grow:2;
    vertical-align: middle;
}
.issue
{
    flex-grow:1;
    background: #87CEFA;
    color: #fff;
    border-radius: 20px;
    display: block;
    height: 0.8rem;
    line-height: 0.8rem;
    margin: 0.2667rem 0
}
.tim
{
    flex-grow: 1;
}
.mil
{
    flex-grow: 1;
    text-align: left;
    position: relative;
}
.mil-cont
{
    padding: 0 0 0 0.6667rem;
}
.mil i{
    display: block;
    width: 0.5333rem;
    height: 0.5333rem;
    position: absolute;
    top: 50%;
    margin-top: -0.5rem;
}
.mil i:after {
    color: #5fb7a6;
    background: url(../assets/img/time.png) no-repeat;
    content: "";
    display: block;
    width: 0.5333rem;
    height: 0.5333rem;
    line-height: 0.1333rem;
    text-align: center;
    font-style: normal;
    background-size:cover;
}
.bett
{
    flex-grow:1;
    background: #87CEFA;
    color: #fff;
    border-radius: 5px;
    display: block;
    height: 0.8rem;
    line-height: 0.8rem;
    margin: 0.2667rem 0
}
.title
{
    display: block;
    height: 0.6667rem;
    line-height: 0.6667rem;
    color: #f00;
}
.time
{
    display: block;
    height: 0.6667rem;
    line-height: 0.267rem;
    color: #c7c7c7
}
.eggs
{
    flex-grow:1;
}
.gold
{
    flex-grow:5;
}
.gold ul
{
    display: flex
}
.gold ul li
{
    flex: 1;
    border: 1px solid #BDBDBD;
    border-radius: 2px;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    margin-right: 0.2667rem;
}
.gold ul li:last-child
{
    margin-right: 0
}
.defined
{
    padding: 0.2667rem 0px !important;
}
.defined li
{
    display: flex;
}
.defined .Cus-Mol
{
    flex-grow:1;
    position: relative;
}
.Cus-Mol
{
    color: #fff;
    writing-mode:vertical-lr;
    background: url(../assets/img/define.png) no-repeat;
    background-size: 100% 100%;
}
.Cus-Mol span
{
    display: block;
    width: 0.4rem;
    height: 0.4rem;
    position: absolute;
    top: 50%;
    margin-top: -0.133333rem;
    left:-0.0667rem;
}
.Cus-Mol span:after {
    color: #fff;
    content: "^";
    display: block;
    width: 0.4rem;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center;
    font-style: normal;
    font-size: 0.4rem;
    font-weight: 800;
}
.defined .all
{
    flex-grow:5;
}
.defined .all ul
{
    /*display: flex;*/
    width: 100%;
    overflow:hidden;
    white-space:nowrap;
}
.defined .all ul li
{
    /*flex: 1;*/
    width: 10%;
    float: left;
    display:inline-block;
    border: 1px solid #BDBDBD;
    border-radius: 10px;
    height: 0.5333rem;
    line-height: 0.5333rem;
    text-align: center;
    margin:0 0.2667rem 0.1333rem 0;
    padding: 0.1333rem 0.2rem;
}
.defined .all ul li:nth-of-type(1){
  background:#2CAAF2;
  border: 1px solid #2CAAF2
}
.defined .all ul li:nth-of-type(1) a{
  color: #fff;
}

.clearfix:after
{
　　　content:"";
　　　height:0;
　　　line-height:0;
　　　display:block;
　　　visibility:hidden;
　　　clear:both
}
.clearfix{
　　　zoom:1;
}

/*投注倍数*/
.num-title
{
    display: flex;
    background: #eee;
    border-top: 2px solid #87CEFA
}
.num-title li
{
    flex: 1;
    height: 0.8rem;
    line-height: 0.8rem;
}
.num-content
{
    border-bottom: 1px solid #ccc/*no*/
}
.num-content li
{
    display: flex;
    height: 1.3333rem;
    line-height: 1.3333rem;
}
.num-content ul li a 
{
    width: 100%;
    display: block;
}
.kfc
{
    padding: 0.2667rem 0.1333rem;
}

.sure a
{
    display: block;
    padding: 0.2667rem 1.3333rem;
    color: #fff;
    width: 4rem;
    background: #87CEFA;
    margin: 0.2667rem auto 0.2667rem auto;
    font-size: 14px;
    border-radius: 0.2667rem;
}
/*竞猜规则*/
.num-rule
{
    background: #f7f7f7;
    margin-top: 0.6667rem
}
.rule-bg
{
    /*background: #eff9ff;*/
    padding: 0.2rem 0.2667rem;
    width: 6.6667rem;
    margin: 0 auto
}

.num-rule .cot,.rule-time{
    color: #737373;
    font-size: 0.41rem;
    font-family: "\5FAE\8F6F\96C5\9ED1";
    line-height: 0.8rem;
    margin: 0.266667rem 0;
    text-align: left;
    text-indent: 0.8rem;
}
</style>