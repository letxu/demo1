<template>

    <div class="receivaddress">
        <div class="receivaddress-head">
            <span class="iconfont icon-back" @click="back"></span>
            <span>选择收货地址</span>
        </div>
        <div class="address">
            <div class="address-message clearfix"   v-for="(item,index) in addresslist">
                <span>{{item.recipients}}</span><span>{{item.telephone}}</span>
                <p><span style="color: red;" v-show="item.is_default==1">[默认地址]</span>{{item.address}}</p>
                <div class="edit-del">
                    <span @click="goEditAddresss(item.id)"><i class="iconfont icon-bianji"></i> 编辑</span>
                    <span @click="delAddresss(item.id)"><i class="iconfont icon-del"></i>删除</span>
                </div>
            </div>
        </div>
        <div class="addaddress-btn" @click="_addAddress()">添加收货地址</div>
        <v-alert v-show="alert" :alert-msg="alertMsg" @confirm="confirm" @cancel="cancel"></v-alert>
    </div>
</template>

<script type="text/ecmascript-6">
    import alert from '@/components/alert';
    import  api from '../fetch/api'
    export default {
        components: {
            'v-alert': alert,
        },
        data() {
            return {
                alertMsg: "确认删除吗？",
                alert: false,
                addresslist:[],

                //删除的地址id
                delId:''
            }
        },
        created() {
           this.loadAddress();
        },
        // beforeRouteLeave(to, from, next) {
        //     // 设置下一个路由的 meta
        //     console.log(to.name+"  "+from.name);
        //     to.meta.keepAlive = true;  // 让 A 缓存，即不刷新
        //     next();
        // },
        beforeRouteEnter(to, from, next) {
            // 设置下一个路由的 meta
            console.log(from.name+"  "+to.name);
            // to.meta.keepAlive = true;  // 让 A 缓存，即不刷新
            next();
        },
        methods: {
              back(){
              this.$router.back(-1);
             },
             loadAddress(){
                 api.userAddress().then(res => {
                     console.log(res)
                     if (res.Code == "0") {
                         //成功
                         this.addresslist=res.Data;
                         if(res.Data.length<1){
                            this.addresslist=[];
                         }
                     } else {
                         this.$toast(res.Msg);
                         this.addresslist=[];
                     }
                 }, err => {
                     this.$toast("连接服务器失败");
                 })
             },
            getVerifiCode () {

            },
            _addAddress(){
                this.$router.push('/addaddress');
            },
            goEditAddresss(id){
//                this.$router.push('/editaddress');
                this.$router.push({name:'EditAddress',params:{address_id:id}})
            },
            delAddresss(addressId){
                this.alert = true
                this.delId=addressId;
            },
            confirm() {
                this.alert = false
                //删除地址
                api.deletaAddress(this.delId).then(res => {
                    console.log(res)
                    if (res.Code == "0") {
                        //成功
                        this.loadAddress();
                    } else {
                        this.$toast(res.Msg);
                    }
                }, err => {
                    this.$toast("连接服务器失败");
                })



            },
            cancel() {
                this.alert = false
            },
        }
    }
</script>

<style scoped>
    .receivaddress {

        font-size: 13px;
        width: 100%;
        /*height: 100%;*/
        overflow: hidden;
        background-color: #FFFFFF;
        padding-bottom: 150px;
    }

    .receivaddress .receivaddress-head {
        height: 1.333333rem;
        line-height: 1.333333rem;
        width: 100%;
        border-bottom: 1px solid #E2E2E2;/*no*/
        position: fixed;
        top: 0;
        left: 0;
            
         font-size: 15px;
    }

    .receivaddress .receivaddress-head span:nth-child(1) {
        position: absolute;
        display: inline-block;
        padding: 0 .4rem;
        left: 0;
    }

    /*头部结束*/
    .address {
        margin-top: 1.333333rem;
    }

    .receivaddress .address-message {
        padding: .4rem 30px;
        text-align: left;
        border-bottom: 1px solid #999999;/*no*/
    }

    .receivaddress .address-message span:nth-child(2) {
        margin-left: .533333rem;
    }

    /*地址*/
    .receivaddress .address-message p {
        margin-top: .4rem;
    }

    /*编辑和删除*/
    .receivaddress .address-message .edit-del {
        display: block;
        margin-top: 0px;
        float: right;

    }

    .receivaddress .address-message .edit-del span {
        margin-right: .266667rem;
        padding: 10px 0;

        display: inline-block;
    }

    /*基础模块*/
    .receivaddress .addaddress-btn {
        position: fixed;
        bottom: 20px;
        width: 9.066667rem;
        left: 50%;
        margin-left: -4.533333rem;
        background-color: #2CAAF2;
        color: #fff;
        text-align: center;
        line-height: 1.333333rem;
        border-radius: .533333rem;
    }


</style>
