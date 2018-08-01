<template>
    <div class="container">
        <div class="header"> 
            <div>
                <span>PC蛋蛋</span>

                <div class="header-right">   
                         <span>游戏赚钱APP</span><br><span>www.pceggs.com</span>
                </div>
           
            </div>
        </div>
        <div class="banner" @mouseover="stopPlay()"  @mouseout="play()" >  
            <!--<swiper :options="swiperOption"  ref="mySwiper">  -->
                <!-- 这部分放你要渲染的那些内容 -->  
                <swiper-slide  v-for="(item,index) in banners" :key="index">  
                   <img :src="`http://pcdd.ygwl.info/`+item.url">
                   
                </swiper-slide>  
                <!-- 这是轮播的小圆点 -->  
                <!--<div class="swiper-pagination" slot="pagination"></div>  
            </swiper>  -->
        </div>  
        <!--tab-->
        <div class="tab">
                <div class="tab-item"  @click="showSign">
                    <img class="tab-icon" src="../assets/img/qiandao.png">
                    <span class="tab-link">每日签到</span>
                </div>
                <div class="tab-item" @click="MyPromote()">
                    <img class="tab-icon" src="../assets/img/tuiguang.png">
                    <span class="tab-link">我的推广</span>
                </div>
                <div class="tab-item" @click="Exchange()">
                    <img class="tab-icon" src="../assets/img/duijiang.png">
                    <span class="tab-link">兑奖中心</span>
                </div>
                <div class="tab-item" @click="Gameplay()">
                    <img class="tab-icon" src="../assets/img/gonglvu.png">
                    <span class="tab-link">玩法攻略</span>
                </div>
        </div>
        <!--line-->
        <div class="line"></div>
        <!--推广-->
        <div class="promote" @click='goToPromote'>
            <img class="promote-img" :src="pic">
            <div class="promote-content">
                <p class="fri">推出好友一起赚提出 <span class="tu">去推广</span></p>
                <p class="moy">任务提成30%躺着赚钱无上限</p>
            </div>
        </div>
        <!--line-->
        <div class="line"></div>
        <!--动态-->
        <div class="information">
            <div class="sq-title">
             最新兑奖动态
           </div>
           <div class="tip">
               <ul class="hous">
                   <li v-for="(item,index) in items" :key="index" ref="rollul" :class="{anim:animate==true}">
                       <span class="type">
                           <img :src="`http://pcdd.ygwl.info/`+item.logo">
                       </span>
                       <span class="heading">{{item.recipients}}</span>
                       <span class="title">兑换了　{{item.goods_name}}</span>
                       <span class="time">{{item.order_time}}</span>
                   </li>
               </ul>
           </div>
        </div>
        <!--弹框-->
        <div class="signModel" v-if="isSign">
             <div class="mask"></div>
            <div class="signModel-cont">
                <img src="../assets/img/signed.png">
                 <span style="font-size:15px">恭喜您签到成功</span><br>
                 <span class="integral" style="display:block; font-size:20px;margin-top:0.266667rem;color:#EC0000">+{{integral}}<i></i></span><br>
                 <div style="margin-top:.166667rem" class="btn" @click="hidIsSign">好的</div>
                <i  @click="hidIsSign"></i>
            </div>
        </div>
    </div>
</template>
<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import '../assets/css/swiper-3.4.2.min.css';
    import news from '../assets/img/new.png';
    import cc from '../assets/img/cc.png';
    import api from '../fetch/api'
   import {formatDate} from '../util/filter'
    export default {
        name: 'carrousel',
        mounted() {
           this.swiperInit()
        },
        data(){
            return {
                   animate:true,
                integral:'',
                isSign:false,//签到弹框
                pic:cc,
                items: [],//最新动态
                hhide:false,
                banners:[],//banner
                swiperOption:{//轮播参数
                    
                },
            }
        },
        created(){
            this.dynamic()
            this.getBanner()
          setInterval(this.scroll,2000) 
        },
         //定义这个swiper对象
        computed:{
            // swiper() {
            //     return this.$refs.mySwiper.swiper
            // }
        },
        methods:{
              scroll(){
                    let con1 = this.$refs.rollul;
                      con1[0].style.marginTop='0px';
                    this.animate=!this.animate;
                    var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
                    setTimeout(function(){
                        that.items.push(that.items[0]);
                        that.items.shift();
                        con1[0].style.marginTop='-1.2667rem';
                        that.animate=!that.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
                    },0)
             },

            swiperInit(){
               this.swiperOption={//轮播参数
                    // notNextTick: true,
                    // speed: 600,
                    // autoplay: {
                    //     disableOnInteraction: false,
                    //     delay:1500
                    // },
                    // direction:'horizontal',
                    // // loop:true,
                    // slidesPerView: 'auto',
                    // centeredSlides: true,
                    // mousewheelControl: true,
                    // pagination :{
                    //     el: '.swiper-pagination',
                    //     clickable :true,
                    // },
                    // paginationClickable :true,
                    // mousewheelControl : true,
                    // observeParents:true,

                    // onTransitionStart(swiper){
                    // },
                }
            },
           stopPlay(){
               this.swiper.autoplay.stop()
           },
           play(){
               this.swiper.autoplay.start()
           },
           fmtDate(obj){
               //时间戳转时间
                var date =  new Date(obj);
                var y = 1900+date.getYear();
                var m = "0"+(date.getMonth()+1);
                var d = "0"+date.getDate();
                return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
            },
            getBanner(){
                api.getBanner().then(res=>{
                    if(res.Code==0){
                        this.banners=res.Data
                    }
                },err=>{

                })
            },
            dynamic(){
                //动态
                let _this = this;
                api.dynamic().then(res=>{
                    if (res.Code == "0") {
                        res.Data.forEach(v => {
                            v.order_time=formatDate(v.order_time*1000);
                        });
                        _this.items=res.Data
                    }else if(res.Code=="36"){
                         this.$toast("登录失效，请您"+res.Msg);
                          this.$router.push('/login');
                    }else {
                         this.$toast(res.Msg);
                    }
                },err=>{

                })
            },
            goToPromote(){
                    this.$router.push('/topromote');
            },
            MyPromote() {
                this.$router.push('/my-promote');
            },
            Exchange() {
                // this.$router.push('/Exchange')
               this.$router.push('/exchangecenter')
                
            },
            Gameplay() {
                this.$router.push('/Gameplay');
            },
            showSign(val){
                //签到
                let _this = this;
                api.everySign().then(res=>{
                    if (res.Code == "0") {
                        _this.isSign=true
                        this.integral=res.Data.integral;
 
                    } else {
                        _this.$toast(res.Msg);
                    }
                },err=>{

                })
                
            },
            hidIsSign(){
                this.isSign=false
            }
        },
        components:{
            swiper,  
            swiperSlide
        }
    }
</script>
<style scoped>
.header
{
    width: 100%;
    height: 1.3333rem;
    text-align: center;
    color: #3f96e0;
    font-size: 20px;
    /*line-height: 1.3333rem;*/
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
}
.header > div{
     font-size: 13px;
    margin:  0 auto;
    width: 5.966667rem;
    height: 100%;
    text-align: left;
    white-space:nowrap
}
.header > div > span{
     float: left;
     height: 1.3333rem;
     line-height: 1.3333rem;
      font-size: 16px;
    margin-left: 1.133333rem;
       /*font-weight:700;*/
}
.header  div  .header-right{
 
    float: left;
     margin-top: .3rem;
     margin-left: .133333rem;
     color: #ABABAB;
}
.header  div  .header-right span:nth-of-type(1){
     /*font-weight:700;*/
     font-size: 10px;
}
.header  div  .header-right span:nth-of-type(2){
     /*font-weight:700;*/
     font-size: 10px;
}
.banner{
    margin-top:1.3333rem;
   height:2.8rem;
}
/*轮播图*/
.swiper-container
{
        width: 100%;
      
        text-align: center
}
.swiper-pagination-bullet
{
    width:0.2667rem;
    height: 0.2667rem;
}
.swiper-slide img{width: 100%;max-height: 2.666667rem}

/*tab*/
.tab{
    width: 100%;
    display: flex;
    overflow: hidden;
    padding: 0.2rem 0;
}
.tab .tab-item{
    flex: 1;
    text-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 2.2667rem;
    line-height: 2.2667rem;
}
.tab .tab-item img{
    display: inline-block;
    width: 1.546667rem;
    /*height: 60%;*/
    border-radius: 50%;
    margin: 0 0 0.2667rem 0;
}
.tab-link
{
    height: 0.4rem;
    line-height: 0.4rem;
    /*font-weight: 700;*/
    color: #4d4d4d;
    font-size: 13px;
}
.line
{
    background: #eaeaea;
    height: 0.1333rem;
}
/*ad*/
.promote{
    width: 100%;
    display: flex;
    overflow: hidden;
    height: 2.3067rem;
}
.promote .promote-img
{
    margin-left: 0.2667rem;
    margin-top:0.2267rem;
    display: block;
    width: 2.3067rem;
    height: 1.9467rem;
}
.promote .promote-content{
    flex: 1;
    text-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-top: 0.6667rem;
}
.promote .promote-content p
{
    height: 0.6667rem;
    line-height: 0.6667rem;
}
.promote .promote-content .fri
{
    color: #5d5d5d;
    font-weight: 700;
    font-size: 12px;
    /*font-family: '微软雅黑'*/
}
.promote .promote-content .tu
{
    color: #47b1f2;
    font-size: 13px;
    text-align:center;
    border:1px solid #47b1f2;
padding: .066667rem .333333rem;
    border-radius:.333333rem;
    -moz-border-radius:.333333rem; /* 老的 Firefox */
    /*font-family: '微软雅黑';*/
    /*height: 0.2667rem;
    line-height: 0.2667rem;*/
   
}
.promote .promote-content .moy
{
    color: #c7c7c7;
    font-size: 12px;
    /*font-family: '微软雅黑'*/
}
/*动态*/
.sq-title {
    padding: 0.2667rem 0.2667rem;
    font-size: 16px;
    height: 0.8rem;
    line-height: 0.8rem;
    color: #686868;
    text-align: left;
}
.tip 
{
    border-top: 1px solid #f8f8f8;
    border-bottom: 1px solid #f8f8f8;
        transition: all 0.5s;
           overflow: hidden;
}
.information .tip ul
{
    overflow: hidden;
    padding:0 0.2667rem 1.6rem 0.2667rem;
  
}
.information ul li
{
    display: flex;
    height: 1.2667rem;
    line-height: 1.2667rem;
    white-space: nowrap;
}
.information ul li a 
{
    width: 100%;
    display: block;
}
.information img, .information span
{
    display: inline-block;
}
.information .type img
{
    width: 0.9533rem;
    height: 0.9533rem;
    border-radius: 50%;
    flex-grow:1;
    vertical-align: middle;
}
.information .heading
{
    /*flex-grow:2;*/
    text-align: left;
    text-indent: 5px;
    width: 2.333333rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.information .title
{
    flex-grow:5;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
}
.information .time
{
    flex-grow:1;
    color: #c7c7c7
}
.signModel{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.signModel .mask {
    position: fixed;
    width: 100%;
    margin: 0 auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1001;
    background: rgba(0,0,0,.5);
}
.signModel-cont{
    /*width: 8.08rem;
    height: 10.3333rem;*/
    width: 7.313333rem;
    height: 8.386667rem;
    position: relative;
    background: white;
    text-align: center;
    border-radius: .266667rem;
    /*overflow: hidden;*/
   z-index: 1002;
}

.signModel-cont img{
    width:100%;
      border-radius: .266667rem;
    /*height: 2.986667rem;*/
    /*position: absolute;
    top: 0px;
    left: 0px;*/
}   
.signModel-cont .btn{
    /*position: absolute;*/
    width:4.6333rem;
    /*left: 0.3667rem;
    bottom: 0.6667rem;
    height: 1.0667rem;*/
    /*text-align:center;*/
    color: #fff;
    border-radius: .166667rem;
    background: #47b1f2;
    line-height: 1.0667rem;
    font-size: 15px;
    display: inline-block;
}   
.signModel-cont .integral i{
        display: inline-block;
      background: url("../assets/img/jd.png") no-repeat  center;
      background-size: cover;
      width: .426667rem;
      height:.573333rem;
       background-size: cover;
       /*top: -.266667rem;
    right: -.266667rem;
    position: absolute;*/
    margin-left: .133333rem;
}
.signModel-cont >i{
    display: inline-block;
      background: url("../assets/img/close.png") no-repeat  center;
      background-size: cover;
      width: .666667rem;
      height: .666667rem;
       background-size: cover;
       top: -.266667rem;
    right: -.266667rem;
    position: absolute;
}
.anim{
  transition: all 0.5s;

}
</style>