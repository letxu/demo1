<template>

  <div class="ToPromote">
    <div class="ToPromote-head clearfix">
      <span class="iconfont icon-back"  @click="back"></span>
      <span>推广</span>
    </div>
    <div class="content">
 
          <!--<img :src="pic">
          <span @click="goPromote"></span>-->

          <div class="swiper">  
              <swiper :options="swiperOption">  
                <swiper-slide v-for="(item, index) in pics" :key="index"><img :src="`http://pcdd.ygwl.info/`+item.url"></swiper-slide>  
              </swiper>
          </div> 
    </div>
  <span class="feixiang" @click="goPromote">一键邀请好友</span>
       <mt-popup
              v-model="popupVisible"
              position="bottom"
               popup-transition="popup-fade">
            <div class="pop-select">
                   <img src="../assets/img/fx.png" alt="">
                 <div class="wx_pyq">
                       <div @click="goweixin"><i></i><span>微信</span></div>
                       <div @click="goPyq"><i></i><span>朋友圈</span></div>
                 </div>
           </div>
      </mt-popup>
  </div>
</template>
<script type="text/ecmascript-6">
  import api from '../fetch/api'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    components: {},
    data() {
      return {
        username: '',
        password: '',
       popupVisible:false,
        pics:[],
       currIndex:0,
       swiperOption: {  
           // 所有配置均为可选（同Swiper配置）  
          notNextTick: true,
          //  loop:true,
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger  
          // debugger: true,    
          // autoplay : {
          //   delay:4000,
          // },
          autoHeight: true,
          slidesPerView: "auto",//设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。  
          centeredSlides: true,// ont-size:13px;">设定为true时，活动块会居中，而不是默认状态下的居左。</span>  
 
      //    onSlideChangeEnd: swiper => {
      //        console.log(swiper+"11")
      //       // this.page = swiper.realIndex + 1
      //       //  this.index = swiper.realIndex
      //  }
    
         on: {
          
              slideChangeTransitionEnd: function(){
                // this.currIndex=this.activeIndex
              //  alert( this.currIndex);//切换结束时，告诉我现在是第几个slide
                //  alert(this.activeIndex);
                localStorage.setItem("currIndex",this.activeIndex);
            },
        },
          //  pagination: {
          //  el: '.swiper-pagination'
          //  },
          //  paginationClickable: true,
          //  mousewheelControl : true,
          //  observeParents:true,
        } ,
    }
  },
  created () {
      localStorage.setItem("currIndex",0);
       api.gene_list().then(res => {
          console.log(res)
          if (res.Code == "0") {
            //  this.$router.push('/lucky/index');
            //成功
            this.pics=res.Data;
          } else {
            this.$toast(res.Msg);
          }
        }, err => {
          console.log(err);
          this.$toast("连接服务器发生错误!");
        })
  },
    methods: {
    goPromote(){
        // alert( localStorage.getItem("currIndex"));
       this.popupVisible=true;
  
    },
    goweixin(){
      let _this=this;
              Wechat.share({
                    message: {
                        title:"PC蛋蛋",
                        description: "PC蛋蛋分享",
                        thumb:"http://pcdd.ygwl.info/"+_this.pics[localStorage.getItem("currIndex")].url,
                        media: {
                             type: window.Wechat.Type.IMAGE,
                             image:"http://pcdd.ygwl.info/"+_this.pics[localStorage.getItem("currIndex")].url
                          }
                    },
                    scene: Wechat.Scene.SESSION // share to Timeline
                 }, function () {
                     _this.$toast("分享成功");
                     _this.popupVisible=false;
                 }, function (reason) {
                           _this.$toast(reason);
                  });

    },
      goPyq(){
          let _this=this;
              //  mediaTagName: "TEST-TAG-001",
              //messageExt: "这是第三方带的测试字段",
              // messageAction: "dotalist",
              Wechat.share({
                    message: {
                        title:"PC蛋蛋",
                        description: "PC蛋蛋分享",
                        thumb:"http://pcdd.ygwl.info/"+_this.pics[localStorage.getItem("currIndex")].url,
                        media: {
                            type: window.Wechat.Type.IMAGE,
                            image:"http://pcdd.ygwl.info/"+_this.pics[localStorage.getItem("currIndex")].url
                          }
                    },
                    scene: Wechat.Scene.TIMELINE // share to Timeline
                 }, function () {
                    _this.$toast("分享成功");
                    _this.popupVisible=false;
                 }, function (reason) {
                         _this.$toast(reason);
                  });

    },
     back(){
         this.$router.back(-1);
      },
    }
  }
</script>

<style scoped>

   .ToPromote {
   font-size: 13px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #FFFFFF;
  }
 /*轮播图*/
   .ToPromote .swiper{  
     width:100% ; 
    /*width:9.866667rem ; */
    /*height: 3.4rem;  */
    /*overflow: hidden ;*/
    z-index: -1;
    text-align: center;
     margin: 10px auto ;
    font-size: 13px;
  }
 .ToPromote  .swiper-slide  {
   width:90% ; 
  }
  .ToPromote  .swiper img{  
       width:95% ; 
       height: 9.4rem; 
       display: block;  
      margin: 0 auto ; 
       vertical-align: middle;  
       -webkit-transition: all 1s ease 0s;  
      -moz-transition: all 1s ease 0s;  
      -ms-transition: all 1s ease 0s;  
      -o-transition: all 1s ease 0s;  
      transition: all 1s ease 0s;  
      -webkit-touch-callout:default;

  }

  .ToPromote  .swiper-slide-active  img{
    /*width:100%!important; */
 
       width:100%!important; 
  
  }
   /*轮播图end*/
  .ToPromote  .ToPromote-head{
    height: 1.333333rem;
    line-height: 1.333333rem;
    width: 100%;
    border-bottom: 1px solid #E2E2E2;
    position:fixed;
    top: 0;
    left: 0;
    background: white;
        z-index: 2;
  }
  .ToPromote  .ToPromote-head span:nth-child(1){
    position: absolute;
    display: inline-block;
    padding: 0 .4rem;
    left:0;
    z-index: 2;
  }
 .ToPromote .content{
    width: 100%;  
    /*height: 15.72rem;*/
    padding-top: 1.333333rem;
    position: relative;
 }
/*.ToPromote .content img{
    width: 100%;  
    /*height: 15.72rem;
 
 }*/
 .ToPromote .content span{
       position: absolute;
    width: 6.8rem;  
    height: .986667rem;
    background: url("../assets/img/tgbtn.png") no-repeat center;
    background-size: cover;
    display: inline-block;
      bottom: .866667rem;
      left: 50%;
      margin-left: -3.4rem;
 }
  .ToPromote .mint-popup-bottom {
    width: 100%;
    
}
  .ToPromote .pop-select{
     height: 5.666667rem;
  }
  .ToPromote .pop-select img{
    width: 5.6rem;
    height: 1.04rem;
    margin: .533333rem 0;

  }
   .ToPromote .pop-select .wx_pyq{
     display: flex;
   }
  .ToPromote .pop-select .wx_pyq div{
         flex: 1;
         text-align: center;
         margin-top: .433333rem;
   }
   .ToPromote .pop-select .wx_pyq div:nth-of-type(1) i{
    width: 1.706667rem; 
    height: 1.706667rem; 
    background: url("../assets/img/wx.png") no-repeat center;
    background-size: cover;
    display: inline-block;
   }
   .ToPromote .pop-select .wx_pyq div:nth-of-type(2) i{
         width: 1.706667rem; 
    height: 1.706667rem;
    background: url("../assets/img/pyq.png") no-repeat center;
    background-size: cover;
    display: inline-block;
   }
  .ToPromote .pop-select .wx_pyq div  span{
        margin-top: .133333rem;
        display: block;
        font-size: 13px;
      }

      /*分享*/
    .ToPromote  .feixiang{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1.333333rem;
    line-height: 1.333333rem;
    background: #2CAAF2;
    color:white;
    }
</style>
