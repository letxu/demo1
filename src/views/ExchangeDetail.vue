<template>

  <div class="ExchangeDetail">
       <div class="ExchangeDetail-head clearfix">
            <span class="iconfont icon-back" 	  @click="back"></span>
            <span>商品详情</span>
        </div>
        <div class="big-img">
            <img :src="`http://pcdd.ygwl.info${goods.logo}`">
        </div>
         <div class="reinfo">
                <div class="reTitle">{{goods.goods_name}}</div>
                     <div class="reChage">
                       <div class="rec">
                         <span class="time">{{toFormatData(goods.price)}}<img src="../assets/img/jd.png"></span>
                         
                        </div>
                        <div class="way">
                            <span><img src="../assets/img/qs.png"> 正品保证</span>
                            <span><img src="../assets/img/change.png"> 兑换包邮</span> 
                        </div>
                        <p class="detail-title">商品详情</p>
                          <div class="shop-detail">
                             {{goods.goods_no}}
                        </div>
                       <span class="title" @click="goExchange(item.id)">兑奖</span>
                </div>
              
        </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { fetchGet } from "../fetch/api";
import api from "../fetch/api";
// import { formatDate } from "../util/filter";
export default {
  data() {
    return {
      goods: []
    };
  },
  // 商品详情

   created(){
        this.test()
   },
  watch: {
    $route: "test"
  },
  
  methods: {
    test() {
    //   alert(this.$route.query.id);

      fetchGet("/index/shopDetails", { id: this.$route.query.id }).then(
        res => {
          if (res.Code == "1") {

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
    }
  }
};
</script>

<style scoped>
.ExchangeDetail {
  font-size: 15px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #ffffff;
  padding-top: 1.333333rem;
  padding-bottom: 0.666667rem;
}
.ExchangeDetail .ExchangeDetail-head {
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
.ExchangeDetail .ExchangeDetail-head span:nth-child(1) {
  position: absolute;
  display: inline-block;
  padding: 0 0.4rem;
  left: 0;
}
.big-img img {
  width: 100%;
}
.reinfo {
  width: 90%;
  margin: 1rem auto 0;
}
.reinfo .reTitle {
  text-align: left;
}
.reChage .rec {
  display: flex;
  height: 1rem;
  line-height: 1rem;
  margin-top: 0.5rem;
}
.reChage .time {
  flex: 3;
  text-align: left;
  color: #f20;
}
.reChage .time img {
  margin-left: 0.2rem;
  width: 0.426667rem;
}
.reChage .people {
  flex: 1;
}
.way {
  margin-top: 0.5rem;
  text-align: left;
}
.way span:first-child {
  margin-right: 0.2rem;
}
.way span img {
  width: 0.5rem;
  vertical-align: middle;
}
.reChage span.title {
  display: inline-block;
  width: 100%;
  height: 1.2rem;
  margin-top: 1rem;
  line-height: 1.2rem;
  background: #f20;
  color: #fff;
}
.detail-title {
  width: 100%;
  margin: 0.5rem 0;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  background: #eee;
}
.shop-detail img {
  width: 100%;
}
.shop-detail p {
  text-align: left;
  line-height: 0.5rem;
}
</style>
