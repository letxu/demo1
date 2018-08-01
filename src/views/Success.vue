<template>

  <div class="Success">
    <div class="Success-head clearfix">
      <span class="iconfont icon-back" 	  @click="back"></span>
      <span>手机绑定</span>
    </div>
    <img src="../assets/img/puone.png" alt="">
     <span>恭喜你！已完成手机绑定</span><br>
     <span style="margin-top:.4rem;display: block;">你绑定的手机号码为<i style="color: #2CAAF2;">{{srart}}****{{end}}</i></span>
     <div class="reset-btn" @click="_submit()">确认选择</div>
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
         phone: '',
        srart: '',
          end: '',
    }
    },
    methods: {

     back(){
        //  this.$router.back(-1);
          this.$router.go(-2);
      },
      _submit(){
           this.$router.go(-2);
      }
    },
    created () {
       this.phone= this.$route.params.phone;
       this.srart=this.phone.substring(0,3);
       this.end=this.phone.substring(7);
    }
  }
</script>

<style scoped>

  .Success {
   font-size: 15px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #FFFFFF;
        padding-top:  1.433333rem;
  }
  .Success  .Success-head{
    height: 1.333333rem;
    line-height: 1.333333rem;
    width: 100%;
    border-bottom: 1px solid #E2E2E2;
    position:fixed;
    top: 0;
    left: 0;
  }
  .Success  .Success-head span:nth-child(1){
    position: absolute;
    display: inline-block;
    padding: 0 .4rem;
    left:0;
  }
 .Success img{
    width: 100%;  

 }

  .Success .reset-btn {
    margin: 2rem .8rem;
    background-color: #2CAAF2;
    color: #fff;
    text-align: center;
    line-height: 1.333333rem;
    border-radius:  .133333rem;
  }

</style>
