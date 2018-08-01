<!--兑换中心页面:统计模式-->
<template>
  <div class="recent">
       <ul class="recent-first">
           <li v-for="(item,index) in data">
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
           </li>
       </ul>
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
    props:["data"],
    data() {
      return {}
    },
    methods: {
        goExchange(id){
                api.exchange(id).then(res => {
                console.log(res)
                if (res.Code == "0") {
                      this.$toast(res.Msg);
                    //成功
                } else {
                    this.$toast(res.Msg);
                }
                }, err => {
                   this.$toast("连接服务器发生错误!");
                })
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
                return '-';
            }
        }
    }
  }
</script>
<style scoped>
/*recent*/
.recent
{
    background: #eee;
}
.recent .recent-first
{
    overflow: hidden;
    width: 100%;
    background: #fff;
    border-top: 3px solid #eee
}
.recent .recent-first li
{
    width: 49.8%;
    float: left;
    background: #fff;
    zoom: 1;
    border-bottom: 1px solid #eee;/*no*/
}
.recent .recent-first li:nth-of-type(2n-1)
{
    border-right: 1px solid #eee;/*no*/

}
.recent .recent-first li:nth-of-type(2n)
{
    margin-right: 0;
}
.recent ul li a 
{
    width: 100%;
    display: block;
}
.recent img,span
{
    display: inline-block;
}
.recent .reImg
{
  padding: 0.16rem;
  height: 2.9333rem;
}
.recent .reImg img
{
  width: 2.6667rem;
  height: 2.6667rem;
  vertical-align: middle;
  display: inline-block;
}
.reinfo
{
  padding:0px 0.2667rem 0.16rem 0.2133rem;
  word-wrap: break-word;
  word-break: break-all;
}
.reTitle
{
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
.reChage
{
  display: flex;
}
.reChage img
{
    /*width: .4rem;
    height: .6rem;
    position: relative;
    top: .2rem;
    left:.2rem;*/
           width: .426667rem;
      /*height:.573333rem;*/
    /*width: .4rem;
    height: .6rem;*/
    /*position: relative;*/
    /*top: .2rem;
    left:.2rem;*/
        vertical-align: middle;
        margin-left: .166667rem;
} 
/* .reChage i
{
    display: block;
    width: 20px;
    height: 25px;
    position: absolute;
    top: 75%;
    right: 70px;
    margin-top: -0.4rem;
} */
/* .reChage i:after {
    color: #5fb7a6;
    background: url(../assets/img/bi.jpg) no-repeat;
    content: "";
    display: block;
    width: 20px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    font-style: normal;
    background-size: cover;
} */
.rec
{
  padding: 0 0.5333rem 0 0;
  position: relative;
  height: 0.8rem;
  line-height: 0.8rem;
  flex: 3;
  color: #e75665;
}
.rec span
{
display: inline-block;
width: 100%;
height: 100%;
text-align: left;
}
.reChage .title
{
    height: .4rem;
    line-height: .4rem;
    border: 1px solid #2CAAF2;
    color: #2CAAF2;
    padding: 0.1rem 0.1rem;
    border-radius: .116667rem;
    /*margin-top: .3rem;*/
    font-size: 12px;
}
</style>


