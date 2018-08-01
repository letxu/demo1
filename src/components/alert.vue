<template>
    <div class="alert">
        <div class="mask"></div>
        <div class="alert-wrap">
            <div class="text">
                {{alertMsg}}
                <!--确定报名？-->
             </div>
            <div class="btn-wrap">
                <div class="btn" @click="cancal">取消</div>
                <div class="btn" @click="confirm">确定</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        alertMsg: String,
//        linkUrl: String
    },
    data () {
        return {

        }
    },
    methods: {
        confirm () {
            this.$emit('confirm')
        },
        cancal () {
            this.$emit('cancel')
        }
    }

}
</script>

<style scoped >
.alert {
    z-index: 100;
}
.alert .alert-wrap {
    position: fixed;
    box-sizing: border-box;
    padding:  .8rem ;
    width:  7.766667rem ;
    height:  3.833333rem ;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius:  .2rem ;
    background: #fff;
    z-index: 1002;
/**/
    /*box-shadow: 0 19px 80px rgba(0,0,0,.298039), 0 15px 20px rgba(0,0,0,.219608);*/
}
.alert .alert-wrap .text {
    font-size: 16px;
    line-height:  .666667rem ;
    color: #555;
}
.alert .alert-wrap  .btn-wrap {
    display: flex;
    position: absolute;
    right:  .533333rem ;
    bottom:  .533333rem ;

}
.alert .alert-wrap  .btn-wrap  .btn {
    padding:  .133333rem   .333333rem;
    font-size:16px;

}
/*确定*/
.alert .alert-wrap  .btn-wrap  .btn:last-child {
    color: #76D49B;
}
.alert .mask {
    position: fixed;
    width: 100%;
    margin: 0 auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1001;
    background: rgba(0,0,0,.5);
}
</style>
