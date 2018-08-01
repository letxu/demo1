<template>
  <div class="automatic_bet" >
    <!--头部1-->
    <div class="automatic_bet-head clearfix">
      <span class="iconfont icon-back"  @click="back"></span><span>自动投注</span>
    </div>
    <div v-cloak  v-if="list.length<1" style="width:100%;padding-top:2rem;padding-bottom:2rem">请先设置投注模式</div>
    <div  class="clearfix" v-show="is_user==2" v-if="list.length>=1">
      <div class="automatic-left"> <!--左边-->
        <span>开始投注</span>
        <span>结束投注</span>
      </div>
      <div class="automatic-right "><!--右边-->
        <div class="start-bet"><!--开始投注-->
          <div class="began-num">
            <span>开始期号第</span>
            <input type="number" v-model="send_num">
            <span>期</span>
          </div>
          <div class="began-model clearfix">
            <span>开始模式</span>
            <div>
              <span>{{findItem(pattern_id)}}</span>
               <i  @click="selectModeBegin()">选择</i>
            </div>
          </div>
        </div>
        <div class="end-bet"><!--结束投注-->
              <div class="end-bet-title clearfix">
                <i></i>结束投注<i></i>
              </div>
              <div class="bet-num">
                <span>投注期</span>
                <input type="number" v-model="BettingPer">
                <span>期</span>
              </div>
              <div class="bet-num">
                <span>金蛋>=</span>
                 <input type="number" v-model="eggsBig">
              </div>
              <div class="bet-num">
                <span>金蛋<=</span>
                 <input type="number"v-model="eggsSmall">
              </div>
        </div>
        <!--结束投注-->
      </div>
    </div>
     <!--2-->
    <div class="clearfix" v-show="is_user==1" v-if="list.length>=1">
      <div class="automatic-left2"> <!--左边-->
        <span>开始投注</span>
        <span>结束投注</span>
      </div>
      <div class="automatic-right2"><!--右边-->
        <div class="start-bet2"><!--开始投注-->
          <div class="began-num">
            <span>开始期号</span>
            <span>第{{send_num}}期</span>
          </div>
          <div class="began-model clearfix">
             <span>投注模式</span>
             <span style="color:#36BCF1;margin-left: .266667rem">{{findItem(pattern_id)}}</span>
          </div>
           <div class="began-model clearfix">
             <span>投注金蛋</span>
             <span style="color:#36BCF1;margin-left: .266667rem">3</span>
          </div>
           <div class="began-model clearfix">
             <span>赢了使用“<i style="color:#36BCF1;">{{findItem(findWin(pattern_id))}}</i>”投注模式</span>
          </div>
         <div class="began-model clearfix">
             <span>输了使用“<i style="color:#36BCF1;">{{findItem( findLose(pattern_id))}}</i>”投注模式</span>
          </div>
        </div>
        <div class="end-bet2"><!--结束投注-->
              <div class="end-bet-title clearfix">
                <i></i>以下达到任意一项结束投注<i></i>
              </div>
              <div class="bet-num">
                <span>投注期数达到{{BettingPer}}(已投2期，剩余998期)</span>
              </div>
              <div class="bet-num">
                <span>金蛋>={{eggsBig}} 金蛋<={{eggsSmall}} 金蛋不够投注</span>
              </div>
        </div>
        <!--结束投注-->
      </div>
    </div>
    <!--模式编辑-->
    <div class="model-rules clearfix">
          <span>规则设置</span>
          <span @click="goEdit">模式编辑</span>
    </div>
    <div class="model-rules-head clearfix">
          <span>模式</span>
          <span>赢了使用</span>
          <span>输了使用</span>
    </div>
    <ul>
        <li  v-for="(item,index) in list" :key="index">
          <span>{{item.title}}</span>
          <span  @click="selectModeWin(index)">{{findItem(item.win)}}<i v-show="is_user==2"  class="iconfont icon-select"></i></span>
          <span  @click="selectModeLose(index)">{{findItem(item.lose)}}<i v-show="is_user==2" class="iconfont icon-select"></i></span>
        </li>
    </ul>
    <div class="bottom-div">
      <span>我金蛋{{gold_ball}}</span>
      <button @click="_goAuto()">{{is_user==2?'开始':'停止'}}自动投注</button>
    </div>
    <mt-popup  v-model="popupVisible">
         <ul  class="pop-ul">
            <li @click="selectModeItem(item)" v-for="(item,index) in list" :key="index">{{item.title}}</li>
         </ul>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import api from '../fetch/api'
export default {
  components: {},
  data() {
    return {
      popupVisible:false,
      username: '13211111111',
      password: '111111',
      //slots:[{values: ['年假', '事假', '病假', '婚假', '其他']}]
      list:[],
      //持续
      BettingPer:1000,
      eggsBig:0,
      eggsSmall:0,
      // idAuto:false,
      is_user:"2",//1已开启 2已关闭
      //开启期数
      send_num:"",
      num:"",
     //投注模式id
      pattern_id:"",
      //金蛋
      gold_ball:"",

      //判断是点的哪个按钮
       clickType:-1,
       //列表索引
       indexTemp:-1,
    }
  },
  created () {
    this.num= this.$route.params.num;
//  alert(this.num)
    this.awardGetWater();
    let _this=this;
    api.awardMotion().then(res => {
          // awardGetWater();
          if (res.Code == "0") {
            //成功
            _this.list=res.Data.list;
            if(res.Data.res.length>0){//有选择的模式
               _this.send_num=res.Data.res[0].send_num;
               _this.is_user=res.Data.res[0].is_use;
               _this.BettingPer=res.Data.res[0].continuous;
              _this.eggsBig=res.Data.res[0].big;
               _this.eggsSmall=res.Data.res[0].small;
              _this.pattern_id=res.Data.res[0].pattern_id;
              console.log(_this.eggsSmall)
              if(!_this.send_num||_this.send_num==null){
                  _this.send_num= _this.num
              }

            }else {//没有选择过模式
              if(_this.list.length>0){
                 this.pattern_id= _this.list[0].id;
              }
              _this.send_num= _this.num
            }
          } else {
            this.$toast(res.Msg);
          }
        }, err => {
          this.$toast("连接服务器发生错误!");
       })
  },
  methods: {
    //开始模式
    selectModeBegin(){
       this.popupVisible=true;
       this.clickType=1;
    },
    //选择赢了模式
    selectModeWin(index){
       this.popupVisible=true;
       this.clickType=2;
       this.indexTemp=index;
       
    },
    //选择输了模式
    selectModeLose(index){
      this.popupVisible=true;
      this.clickType=3;
       this.indexTemp=index;
    },
    selectModeItem(item){
       this.popupVisible=false;
       if(this.clickType==1){//开始模式选择
          //  alert(item.id)
          //  alert(this.pattern_id)
          this.pattern_id=item.id;
       }else if(this.clickType==2){//选择赢了模式

               this.list[this.indexTemp].win=item.id;
 
       }
       else if(this.clickType==3){//选择输了了模式
  
           this.list[this.indexTemp].lose=item.id;
 
       }
    },
     //金蛋和金库
    awardGetWater(){
      api.awardGetWater().then((res)=>{
            this.gold_ball=res.Data.gold_ball
            // this.vault=res.Data.vault
         },(err)=>{
             this.$toast("获取金蛋失败!");
         })
    },
    goEdit(){
       this.$router.push('/custombetlist');
    },
    back(){
         this.$router.back(-1);
    },
    //根据id获取名称
    findItem(itemTempId){
       let   idExist= this.list.find((item)=>{
         return item.id==itemTempId;
      });
      if(idExist){
              return idExist.title;
      }
       return "";
    },
   //根据id获取 赢了的id
     findWin(itemTempId){
       let   idExist= this.list.find((item)=>{
         return item.id==itemTempId;
      });
       if(idExist){
           return idExist.win;
      }
       return "";
 
    },
     //根据id获取 输了的id
     findLose(itemTempId){
       let   idExist= this.list.find((item)=>{
         return item.id==itemTempId;
      });
        if(idExist){
              return idExist.lose;
      }
       return "";
    },
    //自动投注
    _goAuto() {
      if(this.is_user=="2"){ //关闭的状态
// send_num	是	string	投注期数
// pattern_id	是	string	投注模式id
// continuous	是	string	连续续投注次数
// big	是	string	最大金额
// small	是	string	最小金额
// win	是	string	赢了的投注模式
// lose	是	string	输了的投注模式
    if(!this.send_num){
        // 请填写投注期号
        this.$toast("请填写投注期号");
        return;
    }
   if(this.list.length<1){
        // 请填写投注期号
        this.$toast("请先设置投注模式");
        return;
    }
     let params={
          send_num :this.send_num,
          pattern_id:this.pattern_id,  //投注的模式
          continuous :this.BettingPer,
          big :this.eggsBig,
          small :this.eggsSmall,
          win :this.findWin(this.pattern_id), 
          lose :this.findLose(this.pattern_id), 
        };
        api.startMotion(params).then(res => {//开始自动
              console.log(res)
              if (res.Code == "0") {
                //成功
                 this.is_user="1";
              } else {
                this.$toast(res.Msg);
              }
            }, err => {
              this.$toast("连接服务器发生错误!");
           })
      }else {//打开的状态
          //关闭自动投注
         api.offMotion().then(res => {
              console.log(res)
              if (res.Code == "0") {
                //成功
                 this.is_user="2";
              } else {
                this.$toast(res.Msg);
              }
            }, err => {
              this.$toast("连接服务器发生错误!");
           })
      }
    }
  }
}
</script>
<style scoped>

.automatic_bet {
  font-size: 14px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #FFFFFF;
  padding-top: 1.333333rem;
  padding-bottom: 2.533333rem;
}
/*头部start*/
.automatic_bet .automatic_bet-head {
  height: 1.333333rem;
  line-height: 1.333333rem;
  width: 100%;
  border-bottom: 1px solid #E2E2E2;
  /*no*/
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  z-index: 1;
}

.automatic_bet .automatic_bet-head span:nth-child(1) {
  position: absolute;
  display: inline-block;
  padding: 0 .4rem;
  left: 0;
}
.automatic_bet .automatic_bet-head span:nth-child(3) {
  position: absolute;
  display: inline-block;
  padding: 0 .4rem;
  right: 0;
}
/*头部结束*/
/*开始投注*/
.automatic-left {

  width: 25%;
  border-right: 1px solid #36BCF1;
  box-sizing: border-box;
  float: left;
  background: #EFF8FD;
}

.automatic-left span:nth-child(1) {
  /*开始投注*/
  display: block;
  height: 3.866667rem;
  color: #36BCF1;
  padding-top: .266667rem;
  position: relative;
}

.automatic-left span:nth-child(1)::after {
  position: absolute;
  content: '';
  width: .266667rem;
  height: .266667rem;
  display: inline-block;
  background: #36BCF1;
  border-radius: 50%;
  right: -.133333rem;
  top: .266667rem;

}

.automatic-left span:nth-child(2) {
  /*结束投注*/
  display: block;
  height: 5.28rem;
  color: #36BCF1;
  position: relative;
}

.automatic-left span:nth-child(2)::after {
  position: absolute;
  content: '';
  width: .266667rem;
  height: .266667rem;
  display: inline-block;
  background: #36BCF1;
  border-radius: 50%;
  right: -.133333rem;
  top: 0;
}


/*右边*/
.automatic-right {
  width: 75%;
  float: right;
  height: 6.666667rem;
}

.start-bet .began-num,
.start-bet .began-model {
  /*期号*/
  /*模式*/
  text-align: left;
  height: 1.3rem;
  line-height: 1.3rem;
  padding-left:.266667rem;
}
.start-bet .began-num input:nth-child(2) {
  width: 2.666667rem;
  display: inline-block;
  height: .666667rem;
  line-height: .666667rem;
  border: 1px solid #D9D9D9
}
.start-bet .began-model div {
  /*模式*/
  height: .666667rem;
  width: 3.666667rem;
  line-height: .666667rem;
  display: inline-block;
  border: 1px solid #D9D9D9
}
.start-bet .began-model div i {
  /*选择模式*/
  float: right;
  display: inline-block;
  border-left: 1px solid #E5E5E5;
  padding: 0 .133333rem;
}

/*结束投注*/
.end-bet .end-bet-title {
  height: .8rem;
  line-height: .8rem;
  margin-top: 1.3rem
}
.end-bet input{
    height: .8rem;
    border: 1px solid #D9D9D9;
   line-height: .8rem;
   width: 2.666667rem;
}
.end-bet .end-bet-title i {
  width: 2.333333rem;
  line-height: 0px;
  height: 0px;
  border-bottom: 1px dotted #E5E5E5;
  display: inline-block;
  margin-top: .406667rem;
}

.end-bet .end-bet-title i:nth-of-type(1) {
  float: left;
}

.end-bet .end-bet-title i:nth-of-type(2) {
  float: right;
}
/*投资期*/
.end-bet .bet-num {
  /*开始期号*/
  text-align: left;
  height: 1.3rem;
  line-height: 1.3rem;
    padding-left:.266667rem;
}
.end-bet .bet-num span:nth-child(2) {
  width: 2.666667rem;
  display: inline-block;
  height: .666667rem;
  line-height: .666667rem;
  border: 1px solid #D9D9D9
}
/*右边结束*/
/*2*/
/*开始投注*/
.automatic-left2 {
  width: 25%;
  border-right: 1px solid #36BCF1;
  box-sizing: border-box;
  float: left;
  background: #EFF8FD;
}
.automatic-left2 span:nth-child(1) {
  /*开始投注*/
  display: block;
  height: 4.866667rem;
  color: #36BCF1;
  padding-top: .266667rem;
  position: relative;
}
.automatic-left2 span:nth-child(1)::after {
  position: absolute;
  content: '';
  width: .266667rem;
  height: .266667rem;
  display: inline-block;
  background: #36BCF1;
  border-radius: 50%;
  right: -.133333rem;
  top: .266667rem;
}

.automatic-left2 span:nth-child(2) {
  /*结束投注*/
  display: block;
  height: 5.28rem;
  color: #36BCF1;
  position: relative;
}

.automatic-left2 span:nth-child(2)::after {
  position: absolute;
  content: '';
  width: .266667rem;
  height: .266667rem;
  display: inline-block;
  background: #36BCF1;
  border-radius: 50%;
  right: -.133333rem;
  top: .173333rem;
}
/*右边*/
.automatic-right2 {
  width: 75%;
  float: right;
  height: 6.666667rem;
}
.start-bet2 .began-num,
.start-bet2 .began-model {
  /*期号*/
  /*模式*/
  text-align: left;
  height: 1.0rem;
  line-height: 1.0rem;
  margin-left: .266667rem;
}
.start-bet2 .began-num span:nth-child(2) {
  width: 2.666667rem;
  display: inline-block;
  height: .666667rem;
  line-height: .666667rem;
    margin-left: .266667rem;
  /*border: 1px solid #D9D9D9*/
}
.start-bet2 .began-model div {
  /*模式*/
  height: .666667rem;
  width: 3.666667rem;
  line-height: .666667rem;
  display: inline-block;
  /*border: 1px solid #D9D9D9*/

}
/*结束投注*/
.end-bet2 .end-bet-title {
  height: .8rem;
  line-height: .8rem;
  margin-top: 0.1rem;
    color:#36BCF1;
}
 
.end-bet2 .end-bet-title i {
  width: 1.033333rem;
  line-height: 0px;
  height: 0px;
  border-bottom: 1px dotted #E5E5E5;
  display: inline-block;
  margin-top: .406667rem;

}
.end-bet2 .end-bet-title i:nth-of-type(1) {
  float: left;
}
.end-bet2 .end-bet-title i:nth-of-type(2) {
  float: right;
}
/*投资期*/
.end-bet2 .bet-num {
  /*开始期号*/
  text-align: left;
  height: 1.0rem;
  /*line-height: 1.3rem;*/
  font-size: 13px;
  padding-left: .2rem;
  margin-top: .133333rem;
}
/*右边结束*/

/*规则设置*/

.model-rules {
  width: 100%;
  display: block;
  text-align: left;
  height: .966667rem;
  padding-top: .266667rem
}

.model-rules span:nth-of-type(1) {
  display: inline-block;
  border-left: 2px solid #36BCF1;
  margin-left: .266667rem;
  padding: .066667rem .133333rem;
}

.model-rules span:nth-of-type(2) {
  display: inline-block;
  border: 1px solid #D3D3D3;
  border-radius: .133333rem;
  padding: .066667rem .133333rem;
  float: right;
  margin-right: .4rem;
}

.model-rules-head {
  /*text-align: left;*/
  white-space: nowrap;
  background: #F8F8F8;
  padding: .3rem 0;
}

.model-rules-head span:nth-of-type(1) {
  display: inline-block;
  width: 33%;
}

.model-rules-head span:nth-of-type(2) {
  display: inline-block;
  width: 33%;
}

.model-rules-head span:nth-of-type(3) {
  display: inline-block;
  width: 34%;
}

.automatic_bet ul {
  width: 100%;
}

.automatic_bet ul li {
  width: 100%;
  white-space: nowrap;
  padding: .3rem 0;
}

.automatic_bet ul li span:nth-of-type(1) {
  display: inline-block;
  width: 33%;
}

.automatic_bet ul li span:nth-of-type(2) {
  display: inline-block;
  width: 33%;
}

.automatic_bet ul li span:nth-of-type(3) {
  display: inline-block;
  width: 34%;
}
/*底部*/
.bottom-div {
  width: 100%;
  height: 2.166667rem;
  /*line-height:  1.866667rem;*/
  background: white;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  padding-top: .266667rem
}

.bottom-div span {
  display: block;
  text-align: left;
  margin-left: .466667rem;
}

.bottom-div button {
  width: 80%;
  height: 1.266667rem;
  background: #36BCF1;
  border: 0;
  color: white;
  border-radius: .133333rem;
  outline: none;
  margin-top: .266667rem;
}
.automatic_bet .mint-popup{
  width:2.333333rem;
  border-radius: .133333rem;
  max-height: 6.333333rem;
  overflow: auto;
}
.automatic_bet .pop-ul{
}
.automatic_bet .pop-ul li{
   border-bottom: 1px solid #999999
}
</style>
 