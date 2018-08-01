<template>

  <div class="message">
    <div class="message-head clearfix">
      <span class="iconfont icon-back" 	  @click="back"></span>
      <span>帮助中心</span>
    </div>
    <div class="content" v-for="(item,index) in list">
       <ul>
          <!--@click="goqa(item)"-->
         <li>
           <div  @click="select(index,item.seletFlag)"><span>{{item.title}}</span> <i v-show="item.seletFlag" class="iconfont icon-select"></i><i v-show="!item.seletFlag" class="iconfont icon-goto"></i></div>
           <div  v-show="item.seletFlag"><span>{{item.qa}}</span></div>
         </li>	
       </ul>
    </div>
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
        list:[],
      }
    },
    methods: {

     back(){
         this.$router.back(-1);
      },
      goqa(item){
        // this.$router.push('/lucky/index');
         this.$router.push({name:'cjwtdetail',params:{qa:item.qa,title:item.title}})
      },
      select(index,seletFlag){
      
         this.list[index].seletFlag=!seletFlag;
          // alert(  this.list[index].seletFlag)
         this.$set(this.list,index,this.list[index])
          //  this.list.forEach((v)=>{
          //         v.seletFlag=true;
          //   })
      }
    },
    created () {
      
         api.qa().then(res => {
          console.log(res)
          if (res.Code == "0") {
            //  this.$router.push('/lucky/index');
             this.list=res.Data;
              this.list.forEach((v)=>{
                 v.seletFlag=false;
            })
            //成功
          } else {
            this.$toast(res.Msg);
          }
        }, err => {
          console.log(err);
          this.$toast("连接服务器发生错误!");
        })
    }
  }
</script>

<style scoped>

   .message {
   font-size: 14px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #FFFFFF;
    padding-top: 1.333333rem;
  }
  .message  .message-head{
    height: 1.333333rem;
    line-height: 1.333333rem;
    width: 100%;
    border-bottom: 1px solid #E2E2E2;
    position:fixed;
    top: 0;
    left: 0;
    z-index: 1111;
    background: white;
  }
  .message  .message-head span:nth-child(1){
    position: absolute;
    display: inline-block;
    padding: 0 .4rem;
    left:0;
  }
 .message .content{
    width: 100%;  
    
 }
 .message .content li{

   /*height: 1.333333rem;
   line-height: 1.333333rem;*/
   text-align: left;
   border-bottom: 1px solid #f1f1f1;
  

 }
   .message .content li div:nth-child(1){
    padding: .4rem 0;
    /*background: #f1f1f1*/
  
  }
 .message .content li div:nth-child(1) span{
     margin-left: .2rem;
  }
  .message .content li div:nth-child(1)  i{
    float: right;
     margin-right: .4rem;
  }

    .message .content li div:nth-child(2){
   
       padding: .001rem .4rem .4rem .4rem;
  }
</style>
