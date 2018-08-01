<template>

  <div class="ExchangeCenter">
    <div class="ExchangeCenter-head clearfix">
      <span class="iconfont icon-back" 	  @click="back"></span>
      <span>兑换中心</span>
    </div>
  <div class="swiper">  
    <swiper :options="swiperOption">  
      <swiper-slide v-for="(item, index) in slides" :key="index"><img :src="`http://pcdd.ygwl.info/`+item.url"></swiper-slide>  
    </swiper>
   <!--<div style="width:100%;height:1.333333rem" class="swiper-pagination"></div> -->
  </div>  
   <div class="exchang-message" v-show="dynamics.length>0">
     
      <div class="swiper2">  
          <swiper :options="swiperOption2">  
            <swiper-slide v-for="(item, index) in dynamics" :key="index" class="swiper2-item">
                 <span><i>兑换</i><br><i>状态</i></span>
                 <img :src="`http://pcdd.ygwl.info/`+item.logo">
                 <span>{{item.recipients}}</span>
                 <span>兑换了 <i style="color:red">{{item.goods_name}}</i></span>
              </swiper-slide>  
          </swiper>
    
      </div>

   </div>
   <div class="exchang-message2">
           <span>我的金蛋<i style="color:red">{{gold_ball}}</i></span>
           <button @click="goDuhuan" >我能兑换什么</button>
   </div>
   <div class="exchang-product1 clearfix">
        <ul>
            <li  v-for="(item,index) in goods" :key="index">  
              <router-link :to="{path:'/exchangedetail',query:{ id:item.id }}" class="around">
                 <div class="reImg">
                   <img :src="`http://pcdd.ygwl.info${item.logo}`">
               </div>
               <div class="reinfo">
                   <div class="reTitle">{{item.goods_name}}</div>
                     <div class="reChage">
                       <div class="rec">
                         <span class="time">{{toFormatData(item.price)}}<img src="../assets/img/jd.png"></span>
                        </div>
                       <span class="title" @click="goExchange(item.id)">兑奖</span>
                     </div>
            
               </div>
              </router-link>
            

            </li>
          
        </ul>
   
   </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { swiper, swiperSlide } from "vue-awesome-swiper";

import api from "../fetch/api";
import { formatDate } from "../util/filter";
export default {
  components: {},
  data() {
    return {
      username: "",
      password: "",

      slides: [],
      goods: [],
      dynamics: [],
      gold_ball: "",
      //轮播config
      swiperOption: {
        // 所有配置均为可选（同Swiper配置）
        notNextTick: true,
        // loop:true,
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        // debugger: true,
        // autoplay : {
        //   delay:4000,
        // },
        autoHeight: true,
        slidesPerView: "auto", //设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
        centeredSlides: true, // ont-size:13px;">设定为true时，活动块会居中，而不是默认状态下的居左。</span>

        pagination: {
          el: ".swiper-pagination"
        },
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true
      },
      swiperOption2: {
        // 所有配置均为可选（同Swiper配置）
        notNextTick: true,
        // loop:true,
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        // debugger: true,
        autoplay: {
          delay: 3000
        },
        autoHeight: true,
        slidesPerView: "auto", //设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
        centeredSlides: true, // ont-size:13px;">设定为true时，活动块会居中，而不是默认状态下的居左。</span>
        pagination: {
          el: ".swiper-pagination"
        },
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        direction: "vertical"
      }
    };
  },

  methods: {

    goExchange(id) {
      api.exchange(id).then(
        res => {
          console.log(res);
          if (res.Code == "0") {
            this.$toast(res.Msg);
            //成功
            this.awardGetWater();
          } else {
            this.$toast(res.Msg);
          }
        },
        err => {
          this.$toast("连接服务器发生错误!");
        }
      );
    },
    goDuhuan() {
      this.$router.push("/Exchange");
    },
    toFormatData(num) {
      if (num == "" || num == undefined) {
        return "-";
      }
      var data = parseFloat(num.toString().replace(/\,/g, ""));
      if (!isNaN(data)) {
        var temp = data
          // .toFixed(2)
          .toString()
          .split(".");
        temp[0] = temp[0].replace(
          new RegExp("(\\d)(?=(\\d{3})+$)", "ig"),
          "$1,"
        );
        return temp.join(".");
      } else {
        return "-";
      }
    },
    back() {
      this.$router.back(-1);
    },
    dynamic() {
      //动态
      let _this = this;
      api.dynamic().then(
        res => {
          if (res.Code == "0") {
            // res.Data.forEach(v => {
            //     v.order_time=formatDate(v.order_time*1000);
            // });
            _this.dynamics = res.Data;
          } else if (res.Code == "36") {
            this.$toast("登录失效，请您" + res.Msg);
            this.$router.push("/login");
          } else {
            this.$toast(res.Msg);
          }
        },
        err => {}
      );
    },
    //金蛋和金库
    awardGetWater() {
      api.awardGetWater().then(
        res => {
          this.gold_ball = parseInt(res.Data.gold_ball);
          // this.vault=res.Data.vault
        },
        err => {
          this.$toast("获取金蛋失败!");
        }
      );
    }
  },
  created() {

    api.user_list().then(
      res => {
        console.log(res);
        if (res.Code == "0") {
          //  this.$router.push('/lucky/index');
          this.slides = res.Data;
          //成功
        } else {
          this.$toast(res.Msg);
        }
      },
      err => {
        console.log(err);
        this.$toast("连接服务器发生错误!");
      }
    );

    api.my_change().then(
      res => {
        console.log(res);
        if (res.Code == "0") {
          //  this.$router.push('/lucky/index');
          this.goods = res.Data;
          //成功
        } else {
          this.$toast(res.Msg);
        }
      },
      err => {
        console.log(err);
        this.$toast("连接服务器发生错误!");
      }
    );
    this.dynamic();
    this.awardGetWater();
  }
};

</script>

<style scoped>
.swiper {
  width: 100%;
  height: 3.4rem;
  overflow: hidden;
  z-index: -1;
}

.swiper img {
  width: 100%;
  height: 3.4rem;
}
.swiper-slide {
  /*width:  8.533333333333333rem;  
    height: 6.4rem;  */
}
.ExchangeCenter {
  font-size: 15px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #ffffff;
  padding-top: 1.333333rem;
  padding-bottom: 0.666667rem;
}
.ExchangeCenter .ExchangeCenter-head {
  height: 1.333333rem;
  line-height: 1.333333rem;
  width: 100%;
  border-bottom: 1px solid #e2e2e2;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background: white;
}
.ExchangeCenter .ExchangeCenter-head span:nth-child(1) {
  position: absolute;
  display: inline-block;
  padding: 0 0.4rem;
  left: 0;
}
/*.ExchangeCenter .content{
    width: 100%;  
    padding-top: 6rem;
 }*/

/*上下轮播*/
.ExchangeCenter .exchang-message {
  width: 100%;
  height: 1.366667rem;
  /*margin-top: .633333rem;*/
}
.ExchangeCenter .exchang-message .swiper2 {
  width: 100%;
  height: 1.366667rem;
  line-height: 1.366667rem;
  overflow: hidden;
  z-index: -1;
}
.ExchangeCenter .exchang-message .swiper2 .swiper2-item {
  text-align: left;
}
.ExchangeCenter .exchang-message .swiper2 .swiper2-item span:nth-of-type(1) {
  display: inline-block;
  color: #e75665;
  margin-left: 0.266667rem;
  line-height: 1;
  margin-top: 0.276667rem;
}
.ExchangeCenter .exchang-message .swiper2 .swiper2-item img:nth-of-type(1) {
  border-radius: 50%;
  margin-left: 0.1rem;
}
.ExchangeCenter .exchang-message .swiper2 .swiper2-item img {
  width: 0.8rem;
  height: 0.8rem;
  vertical-align: middle;
}
/*上下轮播结束*/
/*惊胆和按钮*/
.ExchangeCenter .exchang-message2 {
  width: 100%;
  height: 1.366667rem;
  line-height: 1.366667rem;
  text-align: left;
  border-bottom: 1px solid #eee; /*no*/
  border-top: 1px solid #eee; /*no*/
}
.ExchangeCenter .exchang-message2 button {
  display: inline-block;
  padding: 0.266667rem 0.4rem;
  border: 1px solid #2caaf2;
  color: #2caaf2;
  padding: 0.1rem 0.2rem;
  border-radius: 0.133333rem;
  margin-top: 0.3rem;
  background: white;
  float: right;
  margin-right: 0.266667rem;
  font-size: 12px;
}
.ExchangeCenter .exchang-message2 span {
  margin-left: 0.266667rem;
}
.exchang-product1 li {
  width: 49.8%;
  float: left;
  background: #fff;
  zoom: 1;
  border-bottom: 1px solid #eee; /*no*/
}
.exchang-product1 li:nth-of-type(2n-1) {
  border-right: 1px solid #eee; /*no*/
}
.exchang-product1 li:nth-of-type(2n) {
  margin-right: 0;
}
.exchang-product1 ul li a {
  width: 100%;
  display: block;
}
.exchang-product1 img,
span {
  display: inline-block;
}
.exchang-product1 .reImg {
  padding: 0.16rem;
  height: 2.9333rem;
}
.exchang-product1 .reImg img {
  width: 2.6667rem;
  height: 2.6667rem;
  vertical-align: middle;
  display: inline-block;
}
.reinfo {
  padding: 0px 0.2667rem 0.16rem 0.2133rem;
  word-wrap: break-word;
  word-break: break-all;
}
.reTitle {
  font-size: 12px;
  height: 0.8rem;
  line-height: 0.8rem;
  overflow: hidden;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  font-weight: bold;
  color: #333;
  text-align: left;
}
.reChage {
  display: flex;
}
.reChage img {
  width: 0.426667rem;
  /*height:.573333rem;*/
  /*width: .4rem;
    height: .6rem;*/
  /*position: relative;*/
  /*top: .2rem;
    left:.2rem;*/
  vertical-align: middle;
  margin-left: 0.166667rem;
}
.rec {
  padding: 0 0.5333rem 0 0;
  position: relative;
  height: 0.8rem;
  line-height: 0.8rem;
  flex: 3;
  color: #e75665;
}
.rec span {
  display: inline-block;
  width: 100%;
  height: 100%;
  text-align: left;
}
.reChage .title {
  height: 0.4rem;
  line-height: 0.4rem;
  border: 1px solid #2caaf2;
  color: #2caaf2;
  padding: 0.1rem 0.1rem;
  border-radius: 0.116667rem;
  /*margin-top: .3rem;*/
  font-size: 12px;
}
</style>
