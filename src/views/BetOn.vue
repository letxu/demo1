<template>
  <div class="bet-on">
     <!--头部1-->
     <div class="bet-on-head clearfix">
      <span class="iconfont icon-back" 	  @click="back"></span>
      <span>第{{plan}}期</span>
      <span >距截止<i style="color:#36BCF1">{{date}}秒</i></span>
    
    </div>
    
     <!--头部2-->
     <div class="bet-on-head2 clearfix">
        <div class="hx">
      </div>
         <div class="money">
             <span>我的金蛋<i style="color:#36BCF1">{{gold_ball}}</i></span>
              <span>我的金库<i style="color:#36BCF1">{{vault}}</i></span>
         </div>
         <div class="operation">  <!--操作-->
             <i>投注总额<i style="color:#36BCF1">{{total}}</i></i>
             <span @click="awardDitto">同上期</span><span @click="sh">梭哈</span><span @click="clear">清除</span><span @click="reverseSelection">反选</span>
         </div>
         <div class="multiple"><!--倍-->
            <span  v-for="(item,index) in multipleArr" :key="index" @click="multiple(index)">{{item}}倍</span>
         </div>
            <div class="hx">
            </div>
      </div>
      <!--菜单-->
      <div class="btn-main">
          <div class="bet-menu clearfix" v-if="menuModel">
            <span  v-for="(item,index) in menuArr" :key="index" @click="selectItem(item,index)" :class="{'menuActive':selectIndex==index}">{{item}}</span>
            <img src="../assets/img/zdy.png" alt=""  @click="hidMenu()">
          </div>
          <!--Custom betting-->
          <div class="bet-menu clearfix" v-if="!menuModel">
            <span  v-for="(item,index) in customBettin" :key="index" @click="bet(item.id)">{{item.title}}</span>
            <img src="../assets/img/zdy.png" alt=""  @click="showMenu()">
          </div>
          <!--投注号码-->
          <div class="betnum-div clearfix">
            <div class="betnum-top">
                <span>号码</span>
                <span>投注金额</span>
                <span @click="awardOdds({now_num:plan})">赔率<i v-show="false"></i></span>
                <span>投注倍数</span>
            </div>
            <ul>
              <li  v-for="(item,index) in betNumArr"  :key="index">
                  <span><i :class="{'active':item.money}">{{item.numShow}}</i></span>
                  <input type="number" :readonly="item.isTrue" :class="{'bg':item.isTrue}"  @input="changMoney(index,$event.target.value)" v-model="item.money" >
                  <span>{{odds[index]}}<i></i></span>
                <div class="item-multiple"><span @click="setMultiple(index,0.5)">0.5倍</span><span @click="setMultiple(index,2)">2倍</span><span @click="setMultiple(index,10)">10倍</span></div>
              </li>
              
            </ul>
          </div>
      </div>  
      <!--提交-->
      <div  class="login-btn"><div @click="confirmBetting">确认投注</div></div>
      <!--更多投注-->
      <div class="moreBet" v-if="moreModel">
          <div class="moreBet-title">
            选择模式
            <i @click="hidMoreModel">x</i>
          </div>
          <div class="moreBet-cont clear">
            <span  v-for="(item,index) in moreMenuArr" :key="index" @click="selectMoreItem(index)" :class="{'active':moreSelectIndex==index}">{{item}}</span>
          </div>
          <div class="moreBet-foot">
              <button @click="choice">确认选择</button>
          </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import api from '../fetch/api'
export default {
  data() {
    return {
      plan:null,//期号
      date:null,//
      odds:[],
      menuModel:true,
      moreModel:false,
      moreSelectIndex:-1,
      selectIndex:-1,
      gold_ball:0,//金蛋
      vault:0,//金库
      customBettin:[],//自定义投注列表
      multipleArr:['0.5', '0.8', '1.2', '1.5', '2', '5', '10'],
      menuArr:['全包', '大', '小', '单', '双', '中', '边',
       '大单', '小单', '大双', '小双', '大边', '小边', '随机', '更多'],
      moreMenuArr:['全包', '大', '小', '单', '双', '中', '边',
       '大单', '小单', '大双', '小双', '大边', '小边','单边','双边', 
       '大尾','小尾','0尾','1尾','2尾','3尾','4尾','5尾','6尾','7尾','8尾','9尾',
       '3余0', '3余1', '3余2', '4余0', '4余1', '4余2', '4余3', '5余0', '5余1', '5余2',
       '5余3', '5余4','随机'],
     betNumArr:[
         {num:"0", money:"",numShow:"00",default:1},
         {num:"1",money:"",numShow:"01",default:3},
         {num:"2",money:"",numShow:"02",default:6},
         {num:"3",money:"",numShow:"03",default:10},
         {num:"4",money:"",numShow:"04",default:15},
         {num:"5",money:"",numShow:"05",default:21},
         {num:"6",money:"",numShow:"06",default:28},
         {num:"7",money:"",numShow:"07",default:36},
         {num:"8",money:"",numShow:"08",default:45},
         {num:"9",money:"",numShow:"09",default:55},
         {num:"10",money:"",numShow:"10",default:63},
         {num:"11",money:"",numShow:"11",default:68},
         {num:"12",money:"",numShow:"12",default:73},
         {num:"13",money:"",numShow:"13",default:75},
         {num:"14",money:"",numShow:"14",default:75},
         {num:"15",money:"",numShow:"15",default:73},
         {num:"16",money:"",numShow:"16",default:69},
         {num:"17",money:"",numShow:"17",default:63},
         {num:"18",money:"",numShow:"18",default:55},
         {num:"19",money:"",numShow:"19",default:45},
         {num:"20",money:"",numShow:"20",default:36},
         {num:"21",money:"",numShow:"21",default:28},
         {num:"22",money:"",numShow:"22",default:21},
         {num:"23",money:"",numShow:"23",default:15},
         {num:"24",money:"",numShow:"24",default:10},
         {num:"25",money:"",numShow:"25",default:6},
         {num:"26",money:"",numShow:"26",default:3},
         {num:"27",money:"",numShow:"27",default:1},
     ]
    }
  },
  components: {},
  computed:{
    total:function(){
      let tol=0
      this.betNumArr.forEach((v)=>{
        if(v.money && !v.isTrue){
          tol+= parseFloat(v.money)
        }
      })
      return tol
    }
  },
  created(){
    console.log()
    this.plan = this.$route.query.plan;
    this.date = this.$route.query.date;
    let  interval = window.setInterval(()=>{
        this.date=this.date-1
        if(this.date<=0){
          clearInterval(interval);
        }
    },1000)
    //自定义投注模式
    this.awardCustomList({page_no:1})
    //获取赔率
    this.awardOdds({now_num:this.$route.query.plan})
    //获取金蛋和金库
    this.awardGetWater()
    //获取这期是否投注
    this.awardGetBetNum()
  },
  methods: {
    back(){
         this.$router.back(-1);
      },
      awardGetBetNum(){
        //获取这期投注情况
        let _this=this
        api.awardGetBetNum({num:_this.plan}).then(res=>{
            res.Data.number.forEach(v=>{
              _this.betNumArr[v.num].money=v.money
              _this.betNumArr[v.num].isTrue=true
            })
            
        },err=>{

        })
      },
    awardDitto(){
      //获取上期
      api.awardDitto().then((res)=>{
        if(res.Data.num){
          res.Data.num.forEach((v)=>{
              if(!this.betNumArr[v.num].isTrue)
              this.betNumArr[v.num].money=v.money
          })
        }
      },(err)=>{

      })
    },
    awardGetWater(){
      //金蛋和金库
      api.awardGetWater().then((res)=>{
        this.gold_ball=res.Data.gold_ball
        this.vault=res.Data.vault
      },(err)=>{

      })
    },
     //更多
    selectMoreItem(index){
      //选择更多里面的投注
      this.moreSelectIndex=index
    },
    bet(id){
      //自定义下注
      if(id){
        api.awardGetCustom({id:id}).then((res)=>{
          res.Data.arr.forEach((v)=>{
            if(!this.betNumArr[v.num].isTrue){
              this.betNumArr[v.num].money=v.money
            }
            
          })
        },(err)=>{

        })
      }else{
        let url="/custombetList";
        this.$router.push({path:url})  
      }
    },
    showMenu(){
      console.log("显示")
      this.menuModel=true
    },
    hidMenu(){
      this.menuModel=false
    },
    hidMoreModel(){
      this.moreModel=false
    },
    selectItem(str,index){
      // alert(str+index);
      console.log("111")
      let _this=this
      switch(str){
        case '全包' :
           this.selectIndex=index
          _this.allInclusive();
          break;
        case '随机' :
          _this.random();
          break;
        case '更多' :
          _this.more();
          break;
        default :
          _this.option(str,index);
          break;
        
      }
    },
    random(){
      //随机
      this.clear();
     let numArr=Math.floor(Math.random()*26+1) 
     for(let i=0;i<=numArr;i++){
       let num=Math.floor(Math.random()*26+1) ;
       this.betNumArr[num].money=this.betNumArr[num].default;
     }

    },
    //更多 确定
    choice(){
      //确认选择
      if(this.moreSelectIndex!=-1){
        this.selectMoreItemchoice(this.moreMenuArr[this.moreSelectIndex])
      }
      this.moreSelectIndex=-1 //默认不选择
      this.moreModel=false //隐藏
    },


    more(){
      //更多
      this.moreModel=true
    },
    clear(){
      //清除
      this.betNumArr.forEach((v)=>{
        if(!v.isTrue){
           v.money=''
        }
       
      })
    },
    awardCustomList(par){
      api.awardCustomList(par).then((res)=>{
          res.Data.push({title:'编辑',id:null})
          this.customBettin=res.Data
      })
    },
    option(str,index){
      //选项
      let _this=this;
      this.clear()
      if(this.selectIndex==index){
        this.selectIndex=-1
        return false
      }
      this.selectIndex=index

         switch(str){
           case '大' :
            _this.big();
            break;
          case '小' :
            _this.small();
            break;
          case '单' :
            _this.single();
            break;
          case '双' :
            _this.double();
            break;
          case '中' :
            _this.middle();
            break;
          case '边' :
            _this.edge();
            break;
          case '大单' :
            _this.bigSingle();
            break;
          case '小单' :
            _this.smallSingle();
            break;
          case '大双' :
            _this.bigDouble();
            break;
          case '小双' :
            _this.smallDouble();
            break;
          case '大边' :
            _this.bigEdge();
            break;
          case '小边' :
            _this.smallEdge();
            break;
          case '单边' :
            _this.singleEdge();
            break;
          case '双边' :
            _this.doubleEdge();
            break;
          case '大尾' :
            _this.mantissa('大');
            break;
          case '小尾' :
            _this.mantissa('小');
            break;
          case '0尾' :
            _this.mantissa(0);
            break;
          case '1尾' :
            _this.mantissa(1);
            break;
          case '2尾' :
            _this.mantissa(2);
            break;
          case '3尾' :
            _this.mantissa(3);
            break;
          case '4尾' :
            _this.mantissa(4);
            break;
          case '5尾' :
            _this.mantissa(5);
            break;
          case '6尾' :
            _this.mantissa(6);
            break;
          case '7尾' :
            _this.mantissa(7);
            break;
          case '8尾' :
            _this.mantissa(8);
            break;
          case '9尾' :
            _this.mantissa(9);
            break;
          case '3余0' :
            _this.remainder(3,0);
            break;
          case '3余1' :
            _this.remainder(3,1);
            break;
          case '3余2' :
            _this.remainder(3,2);
            break;
          case '4余1' :
            _this.remainder(4,1);
            break;
          case '4余2' :
            _this.remainder(4,2);
            break;
          case '4余3' :
            _this.remainder(4,3);
            break;
          case '5余1' :
            _this.remainder(5,1);
            break;
          case '5余2' :
            _this.remainder(5,2);
            break;
          case '5余3' :
            _this.remainder(5,3);
            break;
          case '5余4' :
            _this.remainder(5,4);
            break;
          default :
            console.log("错误");
            break;
          
        }
    },
    //更多的item
    selectMoreItemchoice(str){
     //选项
      let _this=this;
      _this.clear();
    switch(str){
        case '全包' :
          _this.allInclusive();
          break;
        case '随机' :
          _this.random();
          break;
           case '大' :
            _this.big();
            break;
          case '小' :
            _this.small();
            break;
          case '单' :
            _this.single();
            break;
          case '双' :
            _this.double();
            break;
          case '中' :
            _this.middle();
            break;
          case '边' :
            _this.edge();
            break;
          case '大单' :
            _this.bigSingle();
            break;
          case '小单' :
            _this.smallSingle();
            break;
          case '大双' :
            _this.bigDouble();
            break;
          case '小双' :
            _this.smallDouble();
            break;
          case '大边' :
            _this.bigEdge();
            break;
          case '小边' :
            _this.smallEdge();
            break;
          case '单边' :
            _this.singleEdge();
            break;
          case '双边' :
            _this.doubleEdge();
            break;
          case '大尾' :
            _this.mantissa('大');
            break;
          case '小尾' :
            _this.mantissa('小');
            break;
          case '0尾' :
            _this.mantissa(0);
            break;
          case '1尾' :
            _this.mantissa(1);
            break;
          case '2尾' :
            _this.mantissa(2);
            break;
          case '3尾' :
            _this.mantissa(3);
            break;
          case '4尾' :
            _this.mantissa(4);
            break;
          case '5尾' :
            _this.mantissa(5);
            break;
          case '6尾' :
            _this.mantissa(6);
            break;
          case '7尾' :
            _this.mantissa(7);
            break;
          case '8尾' :
            _this.mantissa(8);
            break;
          case '9尾' :
            _this.mantissa(9);
            break;
          case '3余0' :
            _this.remainder(3,0);
            break;
          case '3余1' :
            _this.remainder(3,1);
            break;
          case '3余2' :
            _this.remainder(3,2);
            break;
          case '4余1' :
            _this.remainder(4,1);
            break;
          case '4余2' :
            _this.remainder(4,2);
            break;
          case '4余3' :
            _this.remainder(4,3);
            break;
           case '5余0' :
            _this.remainder(5,0);
            break;
          case '5余1' :
            _this.remainder(5,1);
            break;
          case '5余2' :
            _this.remainder(5,2);
            break;
          case '5余3' :
            _this.remainder(5,3);
            break;
          case '5余4' :
            _this.remainder(5,4);
            break;
          default :
            console.log("错误");
            break;
          
        }
    },

    single(){
      //单
      this.betNumArr.forEach((v)=>{
          if(v.num%2!=0&&(!v.isTrue)){
            v.money=v.default
          }
      })
    },
    double(){
      //双
      this.betNumArr.forEach((v)=>{
          if(v.num%2==0&&(!v.isTrue)){
            v.money=v.default
          }
      })
    },
    big(){
      //大
      this.betNumArr.forEach((v)=>{
          if(v.num>=14&&(!v.isTrue)){
            v.money=v.default
          }
      })
    },
    small(){
      //S小
      this.betNumArr.forEach((v)=>{
          if(v.num<=14&&(!v.isTrue)){
            v.money=v.default
          }
      })
    },
    middle(){
      //中
      this.betNumArr.forEach((v)=>{
          if(v.num>=10&&v.num<=17&&(!v.isTrue)){
            v.money=v.default
          }
      })
    },
    edge(){
      //边
      this.betNumArr.forEach((v)=>{
          if(v.num<10||v.num>17&&(!v.isTrue)){
            v.money=v.default
          }
      })
    },
    bigSingle(){
      //大单
      this.betNumArr.forEach((v)=>{
          if(v.num>=14&&v.num%2!=0&&(!v.isTrue)){
            v.money=v.default
          }
      })
    },
    smallSingle(){
      //小单
      this.betNumArr.forEach((v)=>{
          if(v.num<14&&v.num%2!=0&&(!v.isTrue)){
            v.money=v.default
          }
      })
    },
    bigDouble(){
      //大双
      this.betNumArr.forEach((v)=>{
          if(v.num>=14&&v.num%2==0&&(!v.isTrue)){
            v.money=v.default
          }
      })
    },
    smallDouble(){
      //小双
      this.betNumArr.forEach((v)=>{
          if(v.num<14&&v.num%2==0&&(!v.isTrue)){
            v.money=v.default
          }
      })
    },
    bigEdge(){
      //大边
      this.betNumArr.forEach((v)=>{
          if((v.num<10||v.num>17)&&v.num>=14&&(!v.isTrue)){
            v.money=v.default
          }
      })
    },
    smallEdge(){
      //小边
      this.betNumArr.forEach((v)=>{
          if(v.num<14&&(v.num<10||v.num>17)&&(!v.isTrue)){
            v.money=v.default
          }
      })
    },
    sh(){
      let monrySun=0;
        //梭哈
      this.betNumArr.forEach((v)=>{
          if(v.money&&v.money!=0 && !v.isTrue){
             monrySun+=parseInt(v.money); 
          }
      }) 
      if(monrySun!=0){
          if(this.gold_ball<monrySun){
             this.$toast("投注金额不能大于总金蛋数");
             return;
          }
          let bei= parseInt(this.gold_ball)/parseInt(monrySun);
          var yusu= parseInt(this.gold_ball)%parseInt(monrySun);
      
          this.betNumArr.forEach((v)=>{
              if(v.money&&v.money!=0 && !v.isTrue){
                 v.money=parseInt(v.money)* parseInt(bei);
              
              }
          }) 

          for(let j=0;j<this.betNumArr.length;j++){
              if(this.betNumArr[j].money && this.betNumArr[j].money!=0 && !this.betNumArr[j].isTrue){

                 this.betNumArr[j].money=parseInt(this.betNumArr[j].money)+parseInt(yusu);
                return;
              }
           }
         
      }else{
          this.$toast("请您先投注!");
      } 
    
    },
    singleEdge(){
      //单边
      this.betNumArr.forEach((v)=>{
          if(v.num%2!=0&&(v.num<10||v.num>17)&&(!v.isTrue)){
            v.money=v.default
          }
      })
    },
     doubleEdge(){
      //双边
      this.betNumArr.forEach((v)=>{
          if(v.num%2==0&&(v.num<10||v.num>17)&&(!v.isTrue)){
            v.money=v.default
          }
      })
    },
    mantissa(num){
      //尾数
      if(num=="大"){
        this.betNumArr.forEach((v)=>{
            if(v.num.length==1){
              if((v.num>=5)&&(!v.isTrue)){
                v.money=v.default
              }
            }else{
              if((v.num.substring(1,2)>=5)&&(!v.isTrue)){
                 v.money=v.default
              }
            }
        })
      }else if(num=="小"){
         this.betNumArr.forEach((v)=>{
            if(v.num.length==1){
              if((v.num<5)&&(!v.isTrue)){
                v.money=v.default
              }
            }else{
              if((v.num.substring(1,2)<5)&&(!v.isTrue)){
                 v.money=v.default
              }
            }
        })
      }else{
        this.betNumArr.forEach((v)=>{
            if(v.num.length==1){
              if((v.num==num)&&(!v.isTrue)){
                v.money=v.default
              }
            }else{
              if((v.num.substring(1,2)==num)&&(!v.isTrue)){
                 v.money=v.default
              }
            }
        })
      }

      
    },
    remainder(num,rem){
      //余数
      this.betNumArr.forEach((v)=>{
          if((v.num%num==rem)&&(!v.isTrue)){
            v.money=v.default
          }
      })
    },
    reverseSelection(){
      //反选
      this.betNumArr.forEach((v)=>{
        if(v.isTrue){
             return;
         }
        if(v.money){
            v.money=''
        }else{
          
          v.money=v.default
        }
      })
    },
    allInclusive(){
      //全包
      this.betNumArr.forEach((v)=>{
        
        if(!v.isTrue)
          v.money=v.default
      })
    },
    changMoney(index,val){
      //修改金额
      let st= /[1-9]*[1-9][0-9]*/
      if(st.test(val)){
        let value=val.match(st)[0]
        this.betNumArr[index].money=value
      }else{
        this.betNumArr[index].money=''
      }   
    },
    setMultiple(index,num){
      if(this.betNumArr[index].money&&(!this.betNumArr[index].isTrue)){
        this.betNumArr[index].money=Math.floor(this.betNumArr[index].money*num)
      }
      
    },
    multiple(index){
      //倍数
      this.betNumArr.forEach((v)=>{
        if(v.money&&(!v.isTrue)){
          v.money=Math.floor(v.money*this.multipleArr[index])
        }
      })
    },
    awardOdds(par){
      //获取 赔率
      let _this=this;
      api.awardOdds(par).then((res)=>{
        this.odds=res.Data
      },(err)=>{

      })
    },
    //确认投注
    confirmBetting(){
      let _this=this
      let data=[];
      this.betNumArr.forEach((v)=>{
        if(v.money&&(!v.isTrue)&&(v.money!=0)){
          let obj={}
          obj.num=v.num;
          obj.money=v.money
          data.push(obj)
        }
      })
      if(data.length<1){
        this.$toast("请选择号码投注！");
        return;
      }
      console.log(JSON.stringify(data)+_this.plan);
      api.awardBetOn({num:data,now_num:_this.plan}).then((res)=>{
          this.$toast(res.Msg);
          if (res.Code == "0") {
                this.$router.back(-1);
                //this.awardGetWater()
            //成功
          } else {
          }
      },(err)=>{
           this.$toast(err);
      })
    }
  }
}
</script>
<style scoped>
  
.bet-on {
  font-size: 15px;
  width: 100%;
  height: auto;
  overflow: hidden;
  background-color: #FFFFFFFF;


}
/*头部start*/
.bet-on .bet-on-head {
  height: 1.333333rem;
  line-height: 1.333333rem;
  width: 100%;
  border-bottom: 1px solid #E2E2E2;
  /*no*/
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  z-index: 9
}
.bet-on .bet-on-head span:nth-child(1) {
  position: absolute;
  display: inline-block;
  padding: 0 .4rem;
  left: 0;
}
.bet-on .bet-on-head span:nth-child(3) {
  position: absolute;
  display: inline-block;
  padding: 0 .4rem;
  right: 0;
}

/*头部结束*/

/*倍数头部2*/
.bet-on .bet-on-head2 {
  /*height: 1.333333rem;*/
  /*line-height: 1.333333rem;*/
  width: 100%;
  border-bottom: 1px solid #E2E2E2;
  /*no*/
  position: fixed;
  top: 1.36rem;
  left: 0;
  background:white;
  text-align: left;
  z-index: 9;
}
.bet-on .bet-on-head2 .money {
     padding:.333333rem 0 .533333rem  .493333rem;
         white-space: nowrap;
}
.bet-on .bet-on-head2 .money i{
  margin-left: .133333rem
}
.bet-on .bet-on-head2 .money span:nth-child(2) {
  margin-left:0.503333rem

}
/*操作*/
.bet-on .bet-on-head2 .operation {
  padding: 0 0 0 .493333rem;
   white-space: nowrap;
}
/*#36BCF1;*/
.bet-on .bet-on-head2 .operation span,
.bet-on .bet-on-head2 .multiple span{
  border: 1px solid #F0F0F0;
  display:inline-block;
  width: 1.213333rem;
  height: .773333rem;
  line-height:.773333rem; 
  text-align: center;
  border-radius: .066667rem;
  margin-right: .16rem;
  box-sizing: border-box;
  font-size: 13px;
}
.bet-on .bet-on-head2 .operation span{
    border: 1px solid #b4b4b4;
}
.bet-on .bet-on-head2 .operation i i{
  margin: 0 .293333rem 0 .133333rem; 
}
/*倍*/
.bet-on .bet-on-head2 .multiple {
  padding: .293333rem 0 .133333rem .493333rem;
  overflow: auto;
  width: 100%;
  box-sizing: border-box;
  white-space: nowrap
}
.hx{
  width: 100%;
  height:.133333rem;
  background: #EBEBEB;
}
/*倍数头部2结束*/

/*内容区域*/
.bet-on .btn-main {
/* main绝对定位，进行内部滚动 */
  position: absolute;
  top: 5.093333rem;
  bottom: 1.6rem;;
  /* 使之可以滚动 */
  overflow-y: scroll;
    /* 增加该属性，可以增加弹性，是滑动更加顺畅 */
  -webkit-overflow-scrolling: touch;   
  /*padding-top:
  padding-bottom: 1.6rem;*/
}

/*菜单*/
.bet-menu{
  width: 100%;
  padding:.1rem 0.2rem .4rem .493333rem;
  position: relative;
  box-sizing: border-box;
  z-index: 1;
  height: 3.52rem;
}
.bet-menu img{
 
  position: absolute;
   width: .786667rem;
   height: 3.406667rem;
    right: 0;
    top: 0;
    z-index: 9
}
.bet-menu span{
  border: 1px solid #36BCF1;
  display:inline-block;
  width: 1.50rem;
  height: .72rem;
  line-height:.72rem;
  text-align: center;
  border-radius: .066667rem;
  margin-right: .16rem;
  box-sizing: border-box;
  float: left;
  margin-top: .266667rem;
  color: #36BCF1;

  overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
font-size: 13px;
}
/*菜单结束*/
/*号码投注*/
.betnum-div{
   width: 100% ;
}
.betnum-div .betnum-top{
      height: 1.093333rem;
      line-height: 1.093333rem;
      width: 100% ;
      background: #EBEBEB;
      display:flex;
}
.betnum-div .betnum-top span:nth-child(1){
   height: 1.093333rem;
   width: 1.6rem ;
  display: inline-block;
}
.betnum-div .betnum-top span:nth-child(2){
   height: 1.093333rem;
   width: 2.48rem ;
   display: inline-block;
}
.betnum-div .betnum-top span:nth-child(3){ /*赔率*/
   height: 1.093333rem;
   width: 2.3rem ;
   display: inline-block;
}
.betnum-div .betnum-top span:nth-child(3) i{
    background: url("../assets/img/sx.png") no-repeat  center;
       background-size: cover;
    width: .426667rem;
    height:.413333rem;
    display: inline-block;
    margin-left: .04rem;
}
.betnum-div .betnum-top span:nth-child(4){
   height: 1.093333rem;
     display: inline-block;
     flex:1;
}
.betnum-div ul{
    width: 100% ;
    text-align: left ;
}
.betnum-div ul li {
    display: flex;
    height: 1.093333rem;
    line-height: 1.093333rem;
}
.betnum-div ul li span:nth-of-type(1){ /*号码*/
     /*height: 1.093333rem;*/
   width: 1.6rem ;
   display: inline-block;
   text-align: center ;
   margin: 0;

}
.betnum-div ul li span:nth-of-type(1) i{
  width: .64rem;
  height: .64rem;
  line-height: .64rem;
  border: 1px solid #D04249;
  border-radius: 50%;
  color: #D04249;
  text-align: center;
  display: inline-block;
  font-size: 13px;
}
.betnum-div ul li span:nth-of-type(1) i.active{
  background: #D04249;
  color: #fff;
}
.betnum-div ul li input{
     /*height: 1.093333rem;*/
    width: 2.48rem ;
    height: .8rem;
    display: inline-block;
    box-sizing: border-box;
    border: 1px solid #B5B5B5;
    margin: 0;
    padding: 0;
     outline:none;
     vertical-align:middle;
     margin-top: .127667rem;
}
.betnum-div ul li span:nth-of-type(2){/*倍率*/
     /*height: 1.093333rem;*/
    
   width: 1.9rem ;
    display: inline-block;
     text-align: center ;
}
.betnum-div ul li .item-multiple{/*倍数大div*/
     /*height: 1.093333rem;*/
     flex: 1;
     display: inline-block;
     text-align: center ;
     white-space: nowrap;
}
.betnum-div ul li .item-multiple span{/*倍数*/
     /*height: 1.093333rem;*/
   border: 1px solid #B4B4B4;
  display:inline-block;
  width: 1.050333rem;
  height: .72rem;
  line-height:.72rem;
  text-align: center;
  border-radius: .066667rem;
  margin-right: .19rem;
  box-sizing: border-box;
  font-size: 13px;
}
/*号码投注结束*/

 /*底部投注*/
.bet-on .login-btn {
   
    background-color: #ffffff;
    width: 100%;
    height: 1.566667rem;
      position: fixed;
      bottom: 0;
      left: 0;
      right:0
  }
  .bet-on .login-btn div{
   background-color: #2CAAF2;
    color: #fff;
    text-align: center;
    line-height: 1.066667rem;
    height: 1.066667rem;
    border-radius:.706667rem;
    position: absolute;
      bottom: .266667rem;
      left: .533333rem;
      right:.533333rem
  }
.moreBet{
  width: 100%;
  height: 11rem;
  position: fixed;
  bottom: 0px;
  background: #fff;
  z-index: 10;
}
.moreBet-title{
  position: relative;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  color: #000;
  background: #c1c1c1;
}
.moreBet-title i{
  position: absolute;
  width: .6rem;
  height: 0.8rem;
  line-height: 0.5rem;
  text-align: center;
  color: #000;
  right: 0;
  top: 0.2rem;
}
.moreBet-cont{
  padding: .1rem .5rem;
  width: 100%;
}
.moreBet-cont span{
    border: 1px solid #36BCF1;
    display: inline-block;
    width: 1.58rem;
    height: .72rem;
    line-height: .72rem;
    text-align: center;
    border-radius: .066667rem;
    margin-right: .16rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    float: left;
    margin-top: .266667rem;
    color: #36BCF1;
}
.moreBet-cont span.active{
  background: #36BCF1;
  color: #fff;
}
.moreBet-foot {
  margin-top:.5rem;
}
.moreBet-foot button{
  width: calc(100% - 1.16rem);
  height: 1rem;
  line-height: 1rem;
  background: #36BCF1;
  color: #fff;
  float: left;
  margin-left: 0.5rem;
  border: transparent
}
.bg{
  background: #c1c1c1;
}
.menuActive{
  background: #36BCF1;
  color: #fff !important;
}
</style>
