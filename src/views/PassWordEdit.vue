<template>

  <div class="passwordedit">
    <div class="phonebind-head clearfix">
      <span class="iconfont icon-back" 	  @click="back"></span>
      <span>修改密码</span>
    </div>
    <div class="message-div">
        为了您的账户安全修改，密码手机短信验证
    </div>
    <div class="common-pwd">
      <span>设置新密码</span>
      <input type="password" name="phone" v-model="pwd" placeholder="请输入新密码"/>
    </div>
    <div class="common-confirmpwd">
      <span>确认新密码</span>
      <input type="password" name="phone" v-model="pwd_again" placeholder="请确认新密码" />
    </div>

    <div class="common-div">
      <input type="text"  readonly name="phone" v-model="phone" placeholder="请输入手机号" />
    </div>
    <div class="common-div">
      <input type="text" name="phone" v-model="sms" placeholder="请输入验证码"/>
      <button  v-show="!sendCode" @click="getVerifiCode()" class="verification-code">获取验证码</button>
      <button v-show="sendCode" class="verification-code readonly">{{timeOut}}秒重新获取</button>
    </div>
    <div class="submit-btn" @click="_submit()">提交</div>
   <div  class="edit-phone"  @click="_edit()"><span>修改绑定手机号</span></div>
  </div>
</template>
<script type="text/ecmascript-6">
 import  api from '../fetch/api'
  export default {
    components: {},
    data() {
      return {
        
       pwd: '',
      pwd_again: '',
       phone: '',
       sms: '',
        sendCode: false,
        timeOut: 60,
      }
    },
    created(){

      this.phone=localStorage.getItem("username");
    },
    methods: {
      back(){
         this.$router.back(-1);
      },
      _edit(){
         this.$router.push('/phonebind');
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
                if(!this.sms){
                    this.$toast("请输入验证码！");
                    return;
                }
                if(!this.pwd){
                    this.$toast("请输入新密码！");
                    return;
                }
                if(!this.pwd_again){
                    this.$toast("请确认新密码！");
                    return;
                }
                if(this.pwd_again!=this.pwd){
                    this.$toast("2次密码不一致！");
                    return;
                }
                let data = {
                    telephone: this.phone,
                    new_pwd: this.pwd,
                    again_pwd: this.pwd_again,
                    identifying: this.sms,
                }
                //确认修改
                api.edit_pwd(data).then(res => {
                    console.log(res)
                    if (res.Code == "0") {
                         this.$toast(res.Msg);
                        //成功
                        this.back();
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
  .passwordedit {
    font-size: 13px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #FFFFFF;
  }
  .passwordedit  .phonebind-head{
    height: 1.333333rem;
    line-height: 1.333333rem;
    width: 100%;
    border-bottom: 1px solid #E2E2E2;
    position:fixed;
    top: 0;
    left: 0;
       font-size: 15px;
  }
  .passwordedit  .phonebind-head span:nth-child(1){
    position: absolute;
    display: inline-block;
    padding: 0 .4rem;
    left:0;
  }
  .passwordedit  .message-div{
    background: #EBEBEB;
    padding: 0px 0.236666rem;
    height: 1.066667rem;
    line-height: 1.066667rem;
    margin-top: 1.333333rem;
    text-align: left;
  }
  /*密码和确认密码*/
  .passwordedit .common-pwd, .passwordedit .common-confirmpwd{
    height: 1.333333rem;
    line-height: 1.333333rem;
    border-bottom: 1px solid #E2E2E2;/*no*/
    text-align: left;
    padding-left: .8rem;
    font-weight: 700;
  }

  .passwordedit .common-pwd input, .passwordedit .common-confirmpwd input{
             margin-left: 10px;
  }
    /*基础模块*/
  .passwordedit .common-div{
    height: 1.333333rem;
    line-height: 1.333333rem;
    border-bottom: 1px solid #E2E2E2;/*no*/
    text-align: left;
    padding: 0 .8rem;
    box-sizing: border-box;
  }
  .passwordedit input {
    height: 1.333333rem;
    background-color: transparent;
    border: none;
    outline: none;
    width: 4.2rem;

  }
  .passwordedit .verification-code{
    background-color: #2CAAF2;
    color: #fff;
    text-align: center;
    height: .933333rem;
    line-height: .933333rem;
    border-radius: .533333rem;
    border: none;
    width: 2.633333rem;
    outline:none;
  }
  .passwordedit .readonly{
    background: #B1B1B1;
    color: white;
  }

  .passwordedit .submit-btn {
    margin: .4rem .8rem;
    background-color: #2CAAF2;
    color: #fff;
    text-align: center;
    line-height: 1.333333rem;
    border-radius:  .533333rem;
       font-size: 15px;
  }
  /*修改绑定手机*/
  .passwordedit .edit-phone{

    text-align: right;
  }
  .passwordedit .edit-phone span{
     padding: 20px 30px;
  }

</style>
