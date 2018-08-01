<template>
  <div class="addbet-on">
     <!--头部1-->
     <div class="addbet-on-head clearfix">
      <span class="iconfont icon-back"  @click="back"> </span>
      <span><i v-if="!id"> 新建</i><i v-if="id">编辑</i>投注模式</span>
    </div>
     <!--头部2-->
     <div class="addbet-on-head2 clearfix">
        <div class="hx">
      </div>
         <div class="money">
             <span>模式名称</span>
             <input type="text" v-model="title">
         </div>
         <div class="operation clearfix">  <!--操作-->
             <i>投注总额<i style="color:#36BCF1">{{total}}</i></i>
             <span @click="clear">清除</span>
         </div>
         <div class="multiple"><!--总倍-->
            <span  v-for="(item,index) in multipleArr" :key="index"  @click="multiple(index)">{{item}}倍</span>
         </div>
            <div class="hx">
            </div>
      </div>
      <div class="btn-main">
            <!--总倍数量菜单-->
            <div class="bet-menu clearfix" >
              <span  v-for="(item,index) in menuArr" :key="index" @touchstart="selectItem1(item,index)" :class="{'menuActive':index==selectIndex}">{{item}}</span>
            </div>
            <!--投注号码-->
            <div class="betnum-div clearfix">
              <div class="betnum-top">
                  <span>号码</span>
                  <span>投注金额</span>
                  <span>投注倍数</span>
              </div>
              <ul>
                <li  v-for="(item,index) in betNumArr"  :key="index">
                    <span><i :class="{'active':item.money}">{{item.numShow}}</i></span>
                    <input type="number"  v-model="item.money"  @input="changMoney(index,$event.target.value)">
                  <div class="item-multiple"><span @touchstart="setMultiple(index,0.5)">0.5倍</span><span @touchstart="setMultiple(index,2)">2倍</span><span @touchstart="setMultiple(index,10)">10倍</span></div>
                </li>
                
              </ul>
            </div>
        </div>    
      <!--提交-->
      <div  class="login-btn"><div @click="awardCustom">保存模式</div></div>
         <!--更多投注-->
      <div class="moreBet" v-if="moreModel">
          <div class="moreBet-title">
            选择模式
            <i @click="hidMoreModel">x</i>
          </div>
          <div class="moreBet-cont clearfix">
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
  components: {},
  created(){
    if(this.$route.query.id){
      this.awardGetCustom(this.$route.query.id)
      this.id=this.$route.query.id
    }
  },
  computed:{
    total:function(){
      let tol=0
      this.betNumArr.forEach((v)=>{
        if(v.money){
          tol+= parseFloat(v.money)
        }
      })
      return tol
    }
  },
  data() {
    return {
      title:'',
      id:null,
      moreModel:false,
      moreSelectIndex:-1,
      selectIndex:-1,
      gold_ball:0,//金蛋
      vault:0,//金库

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
     ],
     bl:["0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00",],
    }
  },
  methods: {
       back(){
         this.$router.back(-1);
      },
    // 新增投注模式
    awardCustom() {
      let arr=[]
      let obj={}
      this.betNumArr.forEach((v)=>{
        if(v.money){
          let o={}
          o.num=v.num;
          o.money=v.money
          arr.push(o)
        }
      })
      obj.title =this.title;
      obj.arr =arr;
      obj.id=this.id;
      if(!this.title){
        this.$toast("请填写模式名称");
        return;
      }
       if(arr.length<1){
        this.$toast("请投注号码");
        return;
      }
      api.awardCustom(obj).then((res)=>{
        this.$toast(res.Msg);
        // this.$router.push({path:'/custombetList'})
        this.back();
      },(err)=>{

      })
    },
    awardGetCustom(id){
      //获取单个投注模式
      api.awardGetCustom({id:id}).then((res)=>{
        this.title=res.Data.title
        res.Data.arr.forEach((v)=>{
          this.betNumArr[v.num].money=v.money
        })
      },(err)=>{

      })
    },
    //总菜单全包，
   selectItem1(str,index){
      console.log("111");
      let _this=this;
      switch(str){
        case '全包' :
         console.log("全包");
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
    allInclusive(){   //全包
      this.betNumArr.forEach((v)=>{
          v.money=v.default
      })
    },
    random(){  //随机
    
      this.clear();
     let numArr=Math.floor(Math.random()*26+1) 
     for(let i=0;i<=numArr;i++){
       let num=Math.floor(Math.random()*26+1) ;
       this.betNumArr[num].money=this.betNumArr[num].default;
     }
    },
   more(){
      //更多
      this.moreModel=true
    },
    clear(){
      //清除
      this.betNumArr.forEach((v)=>{
        v.money=''
      })
    },
    //总倍数
    multiple(index){
      // alert(index);
      this.betNumArr.forEach((v)=>{
        if(v.money){
          v.money=Math.floor(v.money*this.multipleArr[index])
        }
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
    single(){
      //单
      this.betNumArr.forEach((v)=>{
          if(v.num%2!=0){
            v.money=v.default
          }
      })
    },
    double(){
      //双
      this.betNumArr.forEach((v)=>{
          if(v.num%2==0){
            v.money=v.default
          }
      })
    },
    big(){
      //大
      this.betNumArr.forEach((v)=>{
          if(v.num>=14){
            v.money=v.default
          }
      })
    },
    small(){
      //S小
      this.betNumArr.forEach((v)=>{
          if(v.num<=14){
            v.money=v.default
          }
      })
    },
    middle(){
      //中
      this.betNumArr.forEach((v)=>{
          if(v.num>=10&&v.num<=17){
            v.money=v.default
          }
      })
    },
    selectMoreItem(index){
      //选择更多里面的投注
      this.moreSelectIndex=index
    },
    edge(){
      //边
      this.betNumArr.forEach((v)=>{
          if(v.num<10||v.num>17){
            v.money=v.default
          }
      })
    },
    bigSingle(){
      //大单
      this.betNumArr.forEach((v)=>{
          if(v.num>=14&&v.num%2!=0){
            v.money=v.default
          }
      })
    },
    smallSingle(){
      //小单
      this.betNumArr.forEach((v)=>{
          if(v.num<14&&v.num%2!=0){
            v.money=v.default
          }
      })
    },
    bigDouble(){
      //大双
      this.betNumArr.forEach((v)=>{
          if(v.num>=14&&v.num%2==0){
            v.money=v.default
          }
      })
    },
    smallDouble(){
      //小双
      this.betNumArr.forEach((v)=>{
          if(v.num<14&&v.num%2==0){
            v.money=v.default
          }
      })
    },
    bigEdge(){
      //大边
      this.betNumArr.forEach((v)=>{
          if((v.num<10||v.num>17)&&v.num>=14){
            v.money=v.default
          }
      })
    },
    smallEdge(){
      //小边
      this.betNumArr.forEach((v)=>{
          if(v.num<14&&(v.num<10||v.num>17)){
            v.money=v.default
          }
      })
    },
    singleEdge(){
      //单边
      this.betNumArr.forEach((v)=>{
          if(v.num%2!=0&&(v.num<10||v.num>17)){
            v.money=v.default
          }
      })
    },
     doubleEdge(){
      //双边
      this.betNumArr.forEach((v)=>{
          if(v.num%2==0&&(v.num<10||v.num>17)){
            v.money=v.default
          }
      })
    },
    mantissa(num){
      //尾数
      if(num=="大"){
        this.betNumArr.forEach((v)=>{
            if(v.num.length==1){
              if(v.num>=5){
                v.money=v.default
              }
            }else{
              if(v.num.ubstring(1,2)>=5){
                 v.money=v.default
              }
            }
        })
      }else if(num=="小"){
         this.betNumArr.forEach((v)=>{
            if(v.num.length==1){
              if(v.num<5){
                v.money=v.default
              }
            }else{
              if(v.num.ubstring(1,2)<5){
                 v.money=v.default
              }
            }
        })
      }else{
        this.betNumArr.forEach((v)=>{
            if(v.num.length==1){
              if(v.num==num){
                v.money=v.default
              }
            }else{
              if(v.num.ubstring(1,2)==num){
                 v.money=v.default
              }
            }
        })
      }

      
    },
    remainder(num,rem){
      //余数
      this.betNumArr.forEach((v)=>{
          if(v.num%num==rem){
            v.money=v.default
          }
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
     hidMoreModel(){
      this.moreModel=false
    },
      choice(){
      //确认选择
      if(this.moreSelectIndex!=-1){
        this.selectItem1(this.moreMenuArr[this.moreSelectIndex])
      }
      this.moreSelectIndex=-1
      this.moreModel=false
    },
    //0.5 2 10
     setMultiple(index,num){
      if(this.betNumArr[index].money){
        this.betNumArr[index].money=Math.floor(this.betNumArr[index].money*num)
      }
      
    },
  }
}
</script>
<style scoped>

.addbet-on {
  font-size: 15px;
  width: 100%;
  height: auto;
  overflow: hidden;
  background-color: #FFFFFFFF;

  /*padding-top:5.093333rem;
  padding-bottom: 1.6rem;*/
}
/*头部start*/
.addbet-on .addbet-on-head {
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
.addbet-on .addbet-on-head span:nth-child(1) {
  position: absolute;
  display: inline-block;
  padding: 0 .4rem;
  left: 0;
}
 
/*头部结束*/
/*倍数头部2*/

.addbet-on .addbet-on-head2 {
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
.addbet-on .addbet-on-head2 .money {
     padding:.333333rem 0 .233333rem  .493333rem;
     white-space: nowrap;
}
.addbet-on .addbet-on-head2 .money input{
  margin-left: .133333rem;
  height: .8rem;
   width: 7rem;
   display: inline-block;
    box-sizing: border-box;
    border: 1px solid #B5B5B5;
   outline:none;
   border-radius: .08rem;
}
 
/*操作 清除*/
.addbet-on .addbet-on-head2 .operation {
  padding: 0 0 0 .493333rem;
    height: .773333rem;
    line-height: .773333rem;
   white-space: nowrap;
}
/*#36BCF1;*/
.addbet-on .addbet-on-head2 .operation span,
.addbet-on .addbet-on-head2 .multiple span{
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
.addbet-on .addbet-on-head2 .operation span{
  float: right;
  margin-right: .266667rem
}
.addbet-on .addbet-on-head2 .operation i i{
  margin: 0 .293333rem 0 .133333rem; 
}
/*倍*/
.addbet-on .addbet-on-head2 .multiple {
  padding: .293333rem 0 .133333rem .423333rem;
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
.addbet-on  .btn-main {
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
  padding:.1rem .103333rem .4rem .493333rem;
  position: relative;
  box-sizing: border-box;
  z-index: 1;
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
.betnum-div .betnum-top span:nth-child(1){/*号码标题*/
   height: 1.093333rem;
   width: 1.6rem ;
  display: inline-block;
}
.betnum-div .betnum-top span:nth-child(2){
   height: 1.093333rem;
   width: 2.48rem ;
   display: inline-block;
}

.betnum-div .betnum-top span:nth-child(3){
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
.betnum-div ul li span:nth-of-type(1) i{ /*号码圆球*/
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
    
   width: 2.0rem ;
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
  margin-right: .18rem;
  box-sizing: border-box;
    font-size: 13px;
}
/*号码投注结束*/

 /*底部投注*/
.addbet-on .login-btn {
   
    background-color: #ffffff;
    width: 100%;
    height: 1.566667rem;
      position: fixed;
      bottom: 0;
      left: 0;
      right:0
  }
  .addbet-on .login-btn div{
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
.menuActive{
  background: #36BCF1;
  color: #fff !important;
}
</style>
