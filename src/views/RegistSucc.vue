<template>

    <div class="regist-succ">
        <img src="../assets/img/regsucc.png"/>
        <span>注册成功</span>
        <div class="login-btn" @click="_login">立即登录</div>
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
            // 用户登录
            _login() {
              this.$router.replace('/login');
            }
        }
    }
</script>

<style scoped>

    .regist-succ {
        font-size: 15px;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #FFFFFF;
    }
    .regist-succ img{
        margin-top: 3.84rem;
        width: 3.173333rem;
        height: 3.173333rem;
    }
    .regist-succ span{
        font-size: 16px;
        color: #FF5D5D5D;
        display: block;
        margin-top: .88rem;
    }

    .regist-succ .login-btn {

        margin: 1.066667rem .546667rem .266667rem .546667rem;
        background-color: #2CAAF2;
        color: #fff;
        text-align: center;
        line-height: 1.413333rem;
        height: 1.413333rem;
        border-radius: .706667rem;
    }


</style>
