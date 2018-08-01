<!--分析页面:统计模式-->
<template>
  <div class="today">
       <ul class="hous">
           <li v-for="(item,index) in items">
               {{ item.message}}
               <div class="list-nnum">
                   {{index}}  
               </div>
               <div class="type">
                   <img :src="item.src">
               </div>
               <div class="heading">{{item.heading}}</div>
               <div class="mil">
                   <span class="time">{{item.time}}</span>
                   <span class="title">{{item.content}}</span>
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
export default {
    data() {
      return {
       items: [
                    {
                        src:news,src:news,path:'/',heading:"大吉大利累计",time:"累计获得金蛋",content:"1,1111,111"
                    },
                    {
                        src:news,src:news,path:'/',heading:"牛气冲天...",time:"累计获得金蛋",content:"1,1111,111"
                    },
                    {
                        src:news,src:news,path:'/',heading:"牛气冲天...",time:"累计获得金蛋",content:"1,1111,111"
                    },
                    {
                        src:news,src:news,path:'/',heading:"牛气冲天",time:"累计获得金蛋",content:"1,1111,111"
                    }
                ], 
      }
    },
    methods: {

    }
  }
</script>
<style scoped>
.today{
  margin-top: 10px;
}
/*today*/
.today
{
    padding: 30px 0 0 0;
}
.today .tip ul
{
    overflow: hidden;
}
.today ul li
{
    display: flex;
    height: 100px;
    line-height: 100px;
    white-space: nowrap;
    overflow:hidden;
    width: 100%
}
.today ul li a 
{
    width: 100%;
    display: block;
}
.today img,span
{
    display: inline-block;
}
.today .list-nnum
{
  flex: 0 0 50px;
  border-radius: 100%;
  border: 2px solid transparent;
  padding: 0 10px;
  height: 70px;
  line-height: 70px;
}
.today .type
{
  flex: 0 0 100px;
  text-align: center;
}
.today .heading
{
    flex-grow:4;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.today .type img
{
    vertical-align: middle;
}
.today .mil
{
    flex-grow:2;
}
.today .title
{
    display: block;
    height: 50px;
    line-height: 50px;
    color: #f00;
}
.today .time
{
    display: block;
    height: 50px;
    line-height: 50px;
    color: #c7c7c7
}
/*前三名加背景*/
.hous li:nth-of-type(1) .list-nnum{
  background: #f00;
  border: 2px solid #f00;
  color: #fff;
  margin-top: 15px;
}
.hous li:nth-of-type(2) .list-nnum{
  background: #333;
  border: 2px solid #333;
  color: #fff;
  margin-top: 15px;
}
.hous li:nth-of-type(3) .list-nnum{
  background: #f00;
  border: 2px solid #f00;
  color: #fff;
  margin-top: 15px;
}
</style>


