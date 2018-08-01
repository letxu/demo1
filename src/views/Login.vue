<template>

  <div class="login">
    <div class="title"></div>
    <div class="logo">
      <!--<img src="../assets/logo.png"/>-->
       幸运28
    </div>
    <div class="login-form">
      <form action="#">
        <div class="user-name">
          <i></i>
          <input type="tel" pattern="[0-9]*"  maxlength="11" name="username" v-model="username" placeholder="请输入幸运28帐号/手机号"/>
        </div>
        <div class="user-pwd">
          <i></i>
          <input type="password" name="password" v-model="password" placeholder="请输入密码"/>
        </div>
        <div class="login-btn" @click="_login">登录</div>
      </form>
    </div>
    <!--<mt-picker :slots="slots"  ></mt-picker>-->
    <div class="forget-regist">
      <router-link to="regist">快速注册</router-link>
      <router-link to="forgetpwd">忘记密码</router-link>
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
//   13370134936     123456slots:[{values: ['年假', '事假', '病假', '婚假', '其他']}
    }
    },
    methods: {

      // 用户登录
      _login() {
          let _this=this;
// this.$router.push('/lucky/index');
        if (!this.username) {
          this.$toast("请输入帐号");
  
          return
        }
        if ( !this.password) {
           this.$toast("请输入密码");
          //微信登录
          //  var scope = "snsapi_userinfo";
          // var  state = "_" + (new Date());
          //   Wechat.auth(scope, state, function (response) {
          //       // you may use response.code to get the access token.
          //       alert(JSON.stringify(response));
          //   }, function (reason) {
          //       alert("Failed: " + reason);
          //   });
          return
}
        let data = {
          telephone: this.username,
          password: this.password
        }
        api.Login(data).then(res => {
          console.log(res)
          if (res.Code == "0") {
            //  this.$router.push('/lucky/index');
             this.$router.replace('/lucky/index');
            //保存token
             localStorage.setItem("token",res.Data.token);
             localStorage.setItem("username",this.username);
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
  }
</script>

<style scoped>

  .login {
   font-size: 15px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #FFFFFF;
  }
  .login .logo{
    width: 1.92rem;
    height:  1.92rem;
    line-height:  1.52rem;
    margin: 0 auto;
    background: #2CAAF2;
    margin-top: 1.613333rem;
    border-radius: .266667rem;
    text-align: center;
    color: white;

    margin-bottom:1.333333rem;
  }
  .login .user-name, .login .user-pwd {

    height:1.0rem;
    line-height:1.0rem;
    border-bottom: 1px solid #F3F3F3;
    text-align: left;
    margin: 0 0.8rem;
    box-sizing: border-box;
  }
  .login .user-name i{

    background: url("../assets/img/user.png") no-repeat  center;
    background-size: cover;
    width: .466667rem ;
    height:.466667rem;
    display: inline-block;
    margin-top: 5px;
  }
  .login .user-pwd i{
    background: url("../assets/img/pdwlogin.png") no-repeat  center;
    background-size: cover;
    width: .48rem ;
    height:.533333rem;
    display: inline-block;
    margin-top: .066667rem;
  }
  .login input {
    height: .8rem;
    background-color: transparent;
    border: none;
    outline: none;
    width: 5.6rem;
    margin-left: 5px;
  }
  .login .login-btn {
    margin: 1.066667rem .546667rem  .266667rem .546667rem ;
    background-color: #2CAAF2;
    color: #fff;
    text-align: center;
    line-height:1.413333rem;
    height: 1.413333rem;
    border-radius:.706667rem;
  }
  .login .user-pwd {
    margin-top: .533333rem;
  }
  /*忘记密码和注册*/
  .login .forget-regist a {
    padding: .266667rem 0;
  }
  .login .forget-regist a:nth-child(2) {
    margin-left: 5.2rem;

  }

</style>
