<template>
    <div class="alert">
        <div class="alert-wrap">
            <div class="text">
                {{alertMsg}}
                <!--确定报名？-->
             </div>
            <div class="btn-wrap">
                <div class="btn" @click="confirm">好的</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        alertMsg: String,
        //linkUrl: String
    },
    data () {
        return {

        }
    },
    methods: {
        confirm () {
            this.$emit('confirm')
        },
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
    padding:  60px ;
    width:  500px ;
    height:  250px ;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius:  15px ;
    background: #fff;
    z-index: 1002;
    box-shadow: 0 19px 80px rgba(0,0,0,.298039), 0 15px 20px rgba(0,0,0,.219608);

}
.alert .alert-wrap .text {
    font-size: 30px;
    line-height:  50px ;
    color: #555;
}
.alert .alert-wrap  .btn-wrap {
    display: flex;
    position: absolute;
    right:  40px ;
    bottom:  40px ;

}
.alert .alert-wrap  .btn-wrap  .btn {
    padding:  10px   25px;
    font-size: 30px;

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
