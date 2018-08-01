<template>

  <div class="phonebind">
    <div class="phonebind-head clearfix">
      <span class="iconfont icon-back" 	  @click="back"></span>
      <span>修改绑定手机</span>
    </div>
    <div class="message-div">
        您正在修改绑定手机，请先验证原手机
    </div>
    <div class="common-div">
      <input type="tel" name="phone" maxlength="11" v-model="phone" placeholder="请输入手机号" :disabled="disabled"/>
    </div>
    <div class="common-div">
      <input type="tel" name="verificationCode" maxlength="11" v-model="verificationCode" placeholder="请输入验证码"/>
      <button  v-show="!sendCode" @click="getVerifiCode()" class="verification-code">获取验证码</button>
      <button v-show="sendCode" class="verification-code readonly">{{timeOut}}秒重新获取</button>
    </div>
    <div class="reset-btn" @click="_submit()">下一步</div>

  </div>
</template>

<script type="text/ecmascript-6">
    import  api from '../fetch/api'
  export default {
    components: {},
    data() {
      return {
        phone: '',
        verificationCode: '',
        disabled:false,
        sendCode: false,
        timeOut: 60
      }
    },
    methods: {
      back(){
         this.$router.back(-1);
      },
      getVerifiCode () {
          if (!this.phone) {
                    this.$toast('请输入手机号')
                    return;
                }
         // 发送
                api.sendTemplateSMS(this.phone).then(res => {
                    console.log(res)
                    if (res.Code == "0") {
                        //成功
                        this.sendCode = true
                        this.setTimeOut();//计时
                    } else {
                        this.$toast(res.Msg);
                    }
                }, err => {
                      this.$toast(console.log(err));
                    this.$toast(err);
                })
      },
      setTimeOut () {
        let timer = setTimeout(() => {
          this.setTimeOut()
          if(this.timeOut > 0) {
            this.timeOut--
          }
        }, 1000)
        if(this.timeOut <= 0) {
          this.sendCode = false
          this.timeOut = 60
          clearTimeout(timer)
        }
      },
      _submit(){
           if(!this.phone){
                    this.$toast("请输入手机号！");
                    return;
                }
                if(!this.verificationCode){
                    this.$toast("请输入验证码！");
                    return;
                }
                //验证手机
                api.hit_phone(this.phone,this.verificationCode).then(res => {
                    console.log(res)
                    if (res.Code == "0") {
                        //  this.$toast(res.Msg);
                        //成功
                        this.$router.push('/phonebind2');
                    } else {
                        this.$toast(res.Msg);
                    }
                }, err => {
                    this.$toast("连接服务器失败");
                })
      }


    }
  }
</script>

<style scoped>
  .phonebind {
    font-size: 13px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #FFFFFF;
  }
  .phonebind  .phonebind-head{
    height: 1.333333rem;
    line-height: 1.333333rem;
    width: 100%;
    border-bottom: 1px solid #E2E2E2;/*no*/
    position:fixed;
    top: 0;
    left: 0;
        font-size: 15px;
  }
  .phonebind  .phonebind-head span:nth-child(1){
    position: absolute;
    display: inline-block;
    padding: 0 .4rem;
    left:0;
  }
  .phonebind  .message-div{
    background: #EBEBEB;
    height: 1.066667rem;
    line-height: 1.066667rem;
    margin-top: 1.333333rem;
    padding: 0 .266667rem;
    text-align: left;
  }
  /*基础模块*/
  .phonebind .common-div{

    height: 1.333333rem;
    line-height: 1.333333rem;
    border-bottom: 1px solid #E2E2E2;
    text-align: left;
    padding: 0 .8rem;
    box-sizing: border-box;
  }

  .phonebind input {
    height: 1.333333rem;
    background-color: transparent;
    border: none;
    outline: none;
    width: 4.533333rem;

  }
  .phonebind .verification-code{
    background-color: #2CAAF2;
    color: #fff;
    text-align: center;
    height: .933333rem;
    line-height: .933333rem;
    border-radius: .533333rem;

    border: none;
    width: 2.933333rem;
    outline:none;
  }
  .phonebind .readonly{
    background: #B1B1B1;
    color: white;
  }

  .phonebind .reset-btn {
    margin: 2rem .8rem;
    background-color: #2CAAF2;
    color: #fff;
    text-align: center;
    line-height: 1.333333rem;
    border-radius:  .533333rem;
  }



</style>
