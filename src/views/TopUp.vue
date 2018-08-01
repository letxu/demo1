<template>

  <div class="topup">
    <div class="topup-head clearfix">
      <span class="iconfont icon-back" 	  @click="back"></span>
      <span>账户充值</span>
       <span  @click="goHistory">充值记录</span>
    </div>
    <div v-if="moneyArr.length>0" class="price-title">
          ￥{{moneyArr[selectMoneyIndex].money}}
    </div>
    <div class="price-list clearfix">
         <span :class="{'active':selectMoneyIndex==index}" @click="_selectMoney(index,item.money)"  v-for="(item,index) in moneyArr" :key="index">￥{{item.money}}</span>
          
    </div>
    <div  v-if="moneyArr.length>0"  class="topup-select clearfix">
        <span>支付方式</span> <div @click="_goSelect()">{{type=="1"?'微信支付':'支付宝'}}<i class="iconfont icon-goto"></i></div>
    </div>
       <button @click="_goTopUp()"  v-if="moneyArr.length>0">立即充值</button>
            <mt-popup
              v-model="popupVisible"
              position="bottom"
             popup-transition="popup-fade">
            <div class="pop-select">
               <span   @click="goPay(1)">微信支付</span>
                <span  @click="goPay(2)">支付宝</span>
                <span  @click="cancel()">取消</span>
           </div>
      </mt-popup>
  </div>
</template>
<script type="text/ecmascript-6">
  import api from '../fetch/api'
  export default {
    components: {},
    data() {
      return {
        username: '',
        password: '',
        popupVisible:false,
        type:"2",
        selectMoneyIndex:0,
        // selectMoney:0,
        moneyArr:[],
       }
    },
   created() {
      //注册
        api.recharge_num().then(res => {
            console.log(res)
          if (res.Code == "0") {
                //成功
               this.moneyArr=res.Data;
            } else {
                this.$toast(res.Msg);
            }
        }, err => {
            this.$toast("连接服务器失败");
        })
    },
        //金额
   
   
    methods: {
      goHistory(){

          this.$router.push('/topuphistory');
      },
     back(){
         this.$router.back(-1);
      },
    // _getMoney(){
    //       if(this.selectMoneyType=="1"){
    //             return "66.00"
    //       }else if(this.selectMoneyType=="2"){
    //            return "96.00"
    //       }else if(this.selectMoneyType=="3"){
    //            return "166.00"
    //       }else if(this.selectMoneyType=="4"){
    //            return "266.00"
    //       }else if(this.selectMoneyType=="5"){
    //            return "296.00"
    //       }else if(this.selectMoneyType=="6"){
    //            return "366.00"
    //       }
    // },
      _selectMoney(index,money){
         this.selectMoneyIndex=index;
          // this.selectMoney=money;
      },
      //弹出pop
      _goSelect(){
         this.popupVisible = true;
       },
       cancel(){
         this.popupVisible = false;
       },
       goPay(typeTemp){
         this.type = typeTemp;
         this.popupVisible = false;
       },
       //充值
      _goTopUp(){
        let _this=this;
        let TempMoney   =   this.moneyArr[this.selectMoneyIndex].money;  
        api.recharge({money:TempMoney,type:this.type}).then(res=>{
              console.log("res--------"+res)
        
           if(_this.type=="2"){//支付宝
            //  const div = document.createElement('div') // 创建div
            //  div.innerHTML = res // 将返回的form 放入div
            //  document.body.appendChild(div)
            //  document.forms[0].submit();
    
                if (res.Code == "0") {
                  var payInfo = res.Data.sign;
               // 第二步：调用支付插件            
                 cordova.plugins.alipay.payment(payInfo,function success(e){
                  //e.resultStatus  状态代码  e.result  本次操作返回的结果数据 e.memo 提示信息
                 //e.resultStatus  9000  订单支付成功 ;8000 正在处理中  调用function success
                  //e.resultStatus  4000  订单支付失败 ;6001  用户中途取消 ;6002 网络连接出错  调用function error
                   //当e.resultStatus为9000时，请去服务端验证支付结果
                      _this.$toast(e.memo);
                    },function error(e){
                      _this.$toast(e.memo);
                    });
                     //  this.$toast(cordova);
                      // cordova.plugins.crosspay.aliPay(
                      //     {wxc2ecaec5c27654cf
                      //       appId: "2017062707582203",
                      //       order: res.Data.sign
                      //     },
                      //     function() {
                      //       // 支付成功
                      //        _this.$toast("支付成功");
                      //     },
                      //     function(error) {
                      //       // 支付失败
                      //        _this.$toast(error.memo);
                             
                    
                      //     }
                      //   );
              
                } else {
                  this.$toast(res.Msg);
                }
         
           }else{

           }
        },err=>{
  
           console.log("err"+err)
        })
      }
    },
    computed: {
        
    
    }
  }
</script>

<style scoped>

   .topup {
   font-size: 15px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #FFFFFF;
  }
  .topup  .topup-head{
    height: 1.333333rem;
    line-height: 1.333333rem;
    width: 100%;
    border-bottom: 1px solid #E2E2E2;
    position:fixed;
    top: 0;
    left: 0;
  }
  .topup  .topup-head span:nth-child(1){
    position: absolute;
    display: inline-block;
    padding: 0 .4rem;
    left:0;
  }
  .topup  .topup-head span:nth-child(3){
    position: absolute;
    display: inline-block;
    padding: 0 .4rem;
    right:0;
  }
  /*头部结束*/
 .topup .price-title{
    width: 100%;  
    padding:1.666667rem 0;
   padding-top:2.666667rem;
   font-weight: 700;
   font-size: 21px;
 }
 .topup .price-list{
   width:8.853333rem;
   margin: 0 auto;

 }
 .topup .price-list span{
    width:2.866667rem;
    display: block;
    height: 1.866667rem;
    line-height: 1.866667rem;
    border: 1px solid #999999;
    float: left;
    margin-left: -1px;
    margin-top: -1px;
    z-index: 1;
    position: relative;   
 }
  .topup .price-list .active{
    border: 1px solid #2CAAF2;
    z-index: 4000;
 }
 /*选择支付方式*/
 .topup  .topup-select{
    height:2rem;
    line-height:2rem;
    text-align: left;
    padding: 0  .4rem;
 }
 .topup  .topup-select>span{
 }
 .topup  .topup-select>div{
    float: right;
    
 }
 .topup  button {
  width:80%;
  height: 1.266667rem;
  background: #36BCF1;
  border: 0;
  color: white;
  border-radius: .133333rem;
  outline: none;
  /*margin-top: 3.466667rem;*/
 margin: .833333rem auto;
 box-sizing: border-box;
 display: block;
}
/*pop*/
 .topup .pop-select span{
   display: block;
   height: 1.066667rem;
   line-height:  1.066667rem;
   font-size: 16px;

}
 .topup .pop-select span:nth-child(3){
   display: block;
   height: 1.066667rem;
   line-height:  1.066667rem;
   margin-top: .166667rem;
}
 .topup .pop-select{
  
  padding: .2rem 0;
}
 .topup .mint-popup-bottom {
    width: 95%;
    border-radius: .066667rem;
    bottom: .166667rem;
}
.model{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0
}
</style>
