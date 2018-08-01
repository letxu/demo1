<template>

  <div class="message">
    <div class="message-head clearfix">
      <span class="iconfont icon-back" 	  @click="back"></span>
      <span>消息中心</span>
    </div>
    <div class="content">
       暂无消息
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
    }
    },
    methods: {

     back(){
         this.$router.back(-1);
      },
    }
  }
</script>

<style scoped>

   .message {
   font-size: 15px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #FFFFFF;
  }
  .message  .message-head{
    height: 1.333333rem;
    line-height: 1.333333rem;
    width: 100%;
    border-bottom: 1px solid #E2E2E2;
    position:fixed;
    top: 0;
    left: 0;
  }
  .message  .message-head span:nth-child(1){
    position: absolute;
    display: inline-block;
    padding: 0 .4rem;
    left:0;
  }
 .message .content{
    width: 100%;  
    padding-top: 6rem;
 }

</style>
