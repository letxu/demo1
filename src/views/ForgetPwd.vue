<template>

    <div class="forget">
        <div class="forget-head clearfix">
            <span class="iconfont icon-back" @click="back()"></span>
            <span>忘记密码</span>
        </div>
        <div class="common">
            <div class="common-div">
                <i class="iconfont icon-phone-reg"></i>
                <input type="tel" pattern="[0-9]*"  maxlength="11" v-model="phone" placeholder="请输入手机号"/>
            </div>
            <div class="common-div">
                <i class="iconfont icon-yanzhengma2"></i>
                <input type="tel" name="phone" maxlength="8" v-model="sms" placeholder="请输入验证码"/>
                <button v-show="!sendCode" class="verification-code" @click="getVerifiCode()">获取验证码</button>
                <button v-show="sendCode" class="verification-code readonly">{{timeOut}}秒重新获取</button>
            </div>
            <div class="common-div">
                <i class="iconfont icon-pwd"></i>
                <input type="password" v-model="pwd"  maxlength="15"   placeholder="请输入密码"/>
            </div>
            <div class="common-div">
                <i class="iconfont icon-pwd"></i>
                <input type="password"  v-model="pwd_again"   maxlength="15"   placeholder="请再次输入密码"/>
            </div>
        </div>
        <div class="reset-btn"  :style="{background:isHasValue?'#2CAAF2':'#b1b1b1'}" @click="_regist">重置密码</div>

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
        methods: {
            back(){
                 this.$router.back(-1);
            },
            getVerifiCode () {
                if (!this.phone) {
                    this.$toast('请输入手机号')
                //     Wechat.isInstalled(function (installed) {
                //       alert("Wechat installed: " + (installed ? "Yes" : "No"));
                // }, function (reason) {
                //     alert("Failed: " + reason);
                // });
                    return;
                }
         // 发送
                api.sendTemplateSMS(this.phone).then(res => {
                    console.log(res)
                    if (res.Code == "0") {
                        //成功
                          this.$toast(res.Msg);
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
                    if (this.timeOut > 0) {
                        this.timeOut--
                    }
                }, 1000)
                if (this.timeOut <= 0) {
                    this.sendCode = false
                    this.timeOut = 60
                    clearTimeout(timer)
                }
            },
            // 用户登录
            _regist() {
                if(!this.isHasValue){
                    return;
                }
                if(!this.phone){
                    this.$toast("请输入手机号！");
                    return;
                }
                if(!this.sms){
                    this.$toast("请输入验证码！");
                    return;
                }
                if(!this.pwd){
                    this.$toast("请输入密码！");
                    return;
                }
                if(!this.pwd_again){
                    this.$toast("请输入再次密码！");
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
                api.forget_pwd(data).then(res => {
                    console.log(res)
                    if (res.Code == "0") {
                        //成功
                        this.$toast(res.Msg);
                        this.back();
                    } else {
                        this.$toast(res.Msg);
                    }
                }, err => {
                    this.$toast("连接服务器失败");
                })


            },

        },
        computed: {
            isHasValue(){
                if(this.pwd.trim() && this.pwd_again.trim()&& this.phone.trim()&& this.sms.trim()){
                    return true;
                }
                return false;
            }
        }

    }
</script>

<style scoped>
    .forget {
        font-size: 15px;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #FFFFFF;
    }

    .forget .forget-head {
        height: 1.333333rem;
        line-height: 1.333333rem;
        width: 100%;
        border-bottom: 1px solid #E2E2E2;/*no*/
        position: fixed;
        top: 0;
        left: 0;

    }

    .forget .forget-head span:nth-child(1) {
        position: absolute;
        display: inline-block;
        padding: 0 .4rem;
        left: 0;
    }

    /*基础模块*/
    .common {
        margin-top: 1.333333rem;
    }

    .forget .common-div {

        height: 1.546667rem;
        line-height: 1.546667rem;
        border-bottom: 1px solid #F3F3F3;/*no*/
        text-align: left;
        margin: 0 .32rem;
        box-sizing: border-box;

    }

    .forget input {
        background-color: transparent;
        border: none;
        outline: none;
        width: 4.533333rem;
        height: 100%;
    }

    .forget .verification-code {
        background-color: #2CAAF2;
        color: #fff;
        text-align: center;

        border-radius: .533333rem;
        height: .986667rem;
        line-height: .986667rem;
        border: none;
        width: 3.146667rem;
        outline: none;
    }

    .forget .readonly {
        background: #B1B1B1;
        color: white;
    }
    .forget .reset-btn {
        margin: .666667rem .546667rem;

        background : #2CAAF2;
        color: #fff;
        text-align: center;
        line-height: 1.333333rem;
        border-radius: .706667rem;
    }

    .iconfont {
      font-size: 20px;
    }
</style>
