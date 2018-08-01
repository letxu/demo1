<template>

  <div class="me">
    <div class="me-head clearfix">
      <div class="user-message">
        <img @click="setLogo" :src="`http://pcdd.ygwl.info/`+logo" alt="">
        <span>{{username}}<i class="update" @click="updateUserName">编辑</i></span>
        <span>ID{{user_id}}</span>
      </div>
      <div class="user-property">
        <div @click="goClassDescription">等级<br>{{golevel()}}</div>
        <div>金蛋<br>{{gold_ball}}</div>
        <div>金库<br>{{vault}}</div>
      </div>

    </div>
    <div class="exchange-div" v-show="false">
      <span  @click="goTopUp()"><i class="iconfont icon-chongzhi"></i>充值入口</span>
      <span  @click="Exchange()"><i class="iconfont icon-weibiaoti2fuzhi04"></i>我要兑换</span>
    </div>
    <div class="myexchange-div">
      <!--我的兑换goMyExchange()-->
        <div   @click="goTopUp()"><img src="../assets/img/jdcz.png" /><span>金蛋充值</span></div>
        <!--我的消息GoMessage()-->
        <div @click="Exchange()"><img src="../assets/img/sc.png" /><span>兑奖商城</span></div>
    </div>
    <div class="common-div" @click="goPhoneBind()">
      <span>手机绑定</span>
            <i class="iconfont icon-goto"></i>
    </div>
    <div class="common-div" @click="goMyExchange()">
      <span>我的兑换</span>
            <i class="iconfont icon-goto"></i>
    </div>
    <div class="common-div" @click="GoMessage()">
      <span>我的消息</span>
            <i class="iconfont icon-goto"></i>
    </div>
    <div class="common-div" @click="goPassWordEdit()">
      <span>修改密码</span>
         <i class="iconfont icon-goto"></i>
    </div>
    <div class="common-div" @click="goReceivAddress()">
        <span>管理收货地址</span>
         <i class="iconfont icon-goto"></i>
    </div>
    <div class="common-div" @click="goQuestion()">
      <span>常见问题</span>
        <i class="iconfont icon-goto"></i>
    </div>
    <div class="common-div" @click="toyq()">
      <span>邀请二维码</span>
      <i class="iconfont icon-goto"></i>
    </div>
    <div class="common-div" @click="exit()">
      <span>退出帐号</span>
      <i class="iconfont icon-goto"></i>
    </div>
    <v-alert v-show="alert" :alert-msg="alertMsg" @confirm="confirm" @cancel="cancel"></v-alert>
    <!--修改姓名-->
    <div class="model" v-if="model">
      <div class="model-cont">
        <div class="cont">
          请输入姓名<br>
          <input type="text" v-model="name">
        </div>
        <div class="foot">
          <button @click="confirmModel">确认</button>
          <button @click="cancelModel">取消</button>
        </div>
      </div>
    </div>
    <!--修改头像-->
    <div class="logoModel"  v-if="logoModel" @click="hidLogoModel">
        <div class="logoModel-cont">
          <div>
            <form class="file_form" enctype="multipart/form-data">
              <label @click="TakPictures" for="file_inputs" class="upload_btn">拍照上传</label>
              <!--<input id="file_inputs" type="file" name="logo" @change="getFile" capture="camera"  accept="image/*" style="display:none">-->
            </form>
          </div>
          <div>
            <form class="file_form" enctype="multipart/form-data" ref="files">
              <label for="file_input" class="upload_btn">从相册选择</label>
              <input id="file_input" type="file" name="logo" @change="getFile($event)" accept="image/*" style="display:none">
            </form>
          </div>
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Indicator } from 'mint-ui';
  import alert from '@/components/alert'
  import  api from '../fetch/api'
  import axios from 'axios' 
  import qs from 'qs'
  export default {
    components: {

      'v-alert': alert
    },
//    gold_ball "0.00"
//    level "青铜"
//    logo ""
//    user_id 52887878
//    username: "大侠73841552"
//    vault:"0.00"

    data() {
      return {
        username: '',
        user_id: '',
        gold_ball: '',//用户金蛋
        level: '',//用户等级
        logo: '',
        vault: '',//用户金库
        promo_code: '',//用户金库
        alertMsg:"确认退出登录吗？",
        alert:false,
        name:'',//输入名字
        model:false,
        logoModel:false,

         destinationType:{},
      }
    },
    created() {
      //注册
      this.personal()
      //  destinationType=navigator.camera.DestinationType;
    },
    methods: {
      TakPictures(){
          console.log("拍照");
          let _this=this;
          // sourceType: Camera.PictureSourceType.CAMERA, PHOTOLIBRARY 
                //拍照并获取Base64编码的图像（quality : 存储图像的质量，范围是[0,100]）
          navigator.camera.getPicture(this.onPhotoDataSuccess, this.onFail, {
                                           quality: 30,
                                           targetWidth: 200,                                        //照片宽度
                                            targetHeight: 200,                                     
                                            encodingType: Camera.EncodingType.JPEG,     
                                             saveToPhotoAlbum: true,
                                            destinationType: Camera.DestinationType.FILE_URI}
                    );
      },

  //拍照成功
      onPhotoDataSuccess(imageURL) {
                // var smallImage = document.getElementById('smallImage');
                // smallImage.style.display = 'block';
                // smallImage.src = imageURL;
                // //开始上传
                // upload(imageURL);
                //  this.$toast(imageURL);
         
            this. upload(imageURL);
           
      },
  //拍照失败
      onFail(message) {
        this.$toast(message);
 
          //  alert('拍照失败: ' + message);
     },
      toyq(){
         this.$router.push({name:'yq',params:{promo_code:this.promo_code}});

      },
      personal(){
        api.personal().then(res => {
          console.log(res)
          if (res.Code == "0") {
            //成功
            this.username=res.Data.username;
            this.user_id=res.Data.user_id;
            this.gold_ball=res.Data.gold_ball;
            this.level=res.Data.level;
          this.logo=res.Data.logo;
            this.vault=res.Data.vault;
            // this.promo_code=res.Data.promo_code;
           this.promo_code=res.Data.porn;
          }else if(res.Code=="36"){
                this.$toast("登录失效，请您"+res.Msg);
                this.$router.push('/login');
          } else {
              this.$toast(res.Msg);
          }
        }, err => {
          this.$toast("连接服务器失败");
        })
      },
      hidLogoModel(){
        this.logoModel=false
      },
       getFile(e){
        var that = this;
				if (e.target.files[0] == undefined) {
          return false;
        }
				var param = new FormData();
        param.append("logo",e.target.files[0]);
        param.append('token',localStorage.getItem("token"));
        api.setLogo(param).then(res=>{
          this.$toast(res.Msg);
          this.personal()
        },err=>{
        })
      },
 
      updateUserName(){
        this.name=this.username
        this.model=true
      },
      confirmModel(){
        api.setUserName({username :this.name}).then(res=>{
           this.$toast(res.Msg);
           this.model=false;
           this.username=this.name
           this.name=''
        },err=>{

        })

      },
      cancelModel(){
        this.model=false;
        this.name=''
      },
      setLogo(){
        //修改头像
        this.logoModel=true
      },
      goTopUp(){
          this.$router.push('/topup')
      },
      GoMessage() {
                this.$router.push('/message')
       },
       Exchange() {
                // this.$router.push('/Exchange')
                 this.$router.push('/exchangecenter')
      },
        goMyExchange() {
           this.$router.push('/my-exchange')
       },
            
      golevel() {
        //用户等级1青铜2白银3黄金4铂金5钻石6星耀7王者
        switch(this.level+""){
            case "1" :
              return '青铜'
              break;
            case '2' :
               return '白银'
              break;
            case '3' :
                  return '黄金'
              break;
           case '4' :
                  return '铂金'
              break;
           case '5' :
                  return '钻石'
              break;
          case '6' :
               return '星耀'
              break;
          case '7' :
              return '王者'
              break;
            default :
              break;
          }
      },
      goPhoneBind() {
        this.$router.push('/phonebind');
      },
      goPassWordEdit() {
        this.$router.push('/passwordedit');
      },
      goReceivAddress() {
        this.$router.push('/receivaddress');
      },
      goClassDescription(){
        this.$router.push('/class-description');
      },
      //常见问题
      goQuestion() {
        this.$router.push('/cjwt');
      },
      exit() {//退出
        this.alert= true;
      },
      confirm() {
        this.alert= false
        api.userDrop().then(res => {
          console.log(res)
          if (res.Code == "0") {
            this.$toast(res.Msg);
            //保存token
//            localStorage.removeItem("token");
          this.$router.replace('/login'); //用go刷新

            //成功
          } else {
            this.$toast(res.Msg);
          }
        }, err => {
          this.$toast("连接服务器发生错误!");
        })
      },
      cancel() {
        this.alert = false
      },
        //上传文件
      upload(fileURL) {
            let _this=this;
              //  _this.$toast("FileUploadOptions开始" );
              var options = new FileUploadOptions();
              options.fileKey = "logo";
              
              options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
              options.mimeType = "image/jpeg";
              //上传参数  param.append('token',localStorage.getItem("token"));
              var params = {
                 token:localStorage.getItem("token"),
              };
              // params.value1 = "test";
              // params.value2 = "param";
              options.params = params;
              var ft = new FileTransfer();
              //上传地址
              var SERVER = "http://pcdd.ygwl.info/public/index.php/index/user_info/edit_logo"
                Indicator.open("加载中...");
              ft.upload(fileURL, encodeURI(SERVER), this.success, this.fail, options);
            },
             //上传成功
             success (r) {
                Indicator.close();
                  // console.log("上传成功! Code = " + r.responseCode);
                     this.$toast("上传成功!");
                      this.personal();
              },
              //上传失败
             fail (error) {
                Indicator.close();
                  // alert("上传失败! Code = " + error.code);
                 this.$toast("上传失败!" +JSON.stringify(error));
                
              }
    }
  }
</script>

<style scoped>
  .me {
    font-size: 13px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #FFFFFF;
    padding-bottom: 1.6rem
  }
  /*头部背景模块*/
  .me  .me-head{
    width: 100%;
    background:#4782E6 ;
    color: white;
    padding-top: .266667rem;
  }
  .me  .me-head img{
    width: 1.333333rem;
    height: 1.333333rem;
    border-radius: 50%;
  }
  .me-head  .user-message{
    width: 8rem;
    margin: .133333rem auto;
    text-align: center;

  }
  .me-head  .user-message span {
    margin-top: .333333rem;
    display: block;
  }
  .me-head  .user-message span i{
    margin-left: 5px;

  }
  .me-head  .user-message span:nth-child(3) {
    margin-top: .333333rem;
    display: inline-block;
    border: 1px solid white;/*no*/
    padding: .133333rem .133333rem;
    border-radius: .333333rem;
  }

  .me-head    .user-property{
    display: flex;
    background: #6097E8;
    margin-top: .266667rem;
    padding: .106667rem 0;
  }
  .me-head    .user-property div{
    flex: 1;
    line-height: 1.5;
    position: relative;
    box-sizing: border-box;
  }
  .me-head    .user-property  div:nth-child(1):after,
  .me-head  .user-property  div:nth-child(2):after{
    position: absolute;
    content:"";
    right: 2px;
    top:.266667rem;
    bottom: .266667rem;
    width:2px ;
    background: white;
    z-index: 100;
  }
  /*充值入口和我要兑换*/
  .me .exchange-div{
    height: 1.333333rem;
    border-bottom: 1px solid #E2E2E2; /*no*/
    display: flex;
  }
  .me .exchange-div span{
    flex: 1;
    display: inline-block;
    line-height: 1.333333rem;
    margin-left: 5px;
  }
  .me .exchange-div .iconfont{
    margin-right: .133333rem;
    font-size: 26px;
    color: #2CAAF2;
  }
  /*我的兑换和我的消息*/
  .me  .myexchange-div{
    display: flex;
    height: 2.4rem;
    border-bottom: 1px solid #E2E2E2;/*no*/
  }
  .me  .myexchange-div div{
    flex: 1;
    padding-top: .266667rem;
  }
  .me  .myexchange-div div img{
   
    width: 1.106667rem;
     height:1.106667rem;
  }
  .me  .myexchange-div div span{
    display: block;
    margin-top: 5px;
  }

  /*基础模块*/
  .me .common-div{
    height: 1.333333rem;
    border-bottom: 1px solid #E2E2E2;/*no*/
    text-align: left;
    padding: 0 .4rem;
    line-height: 1.333333rem;
    box-sizing: border-box;
  }
  .me .common-div i{
    float: right;
  }

.model{
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  background: rgba(0,0,0,.1)
}
.model-cont{
  width: 70%;
  height: 4rem;
  margin: 0 auto;
  background: #fff;
  border-radius: 5px;
}
.model-cont .cont{
  height: 2rem;
  margin: 0 auto;
  background: #fff;
  margin-top:.5rem;
  text-align: center
}
.cont input{
  border: 1px solid #c1c1c1;
  height: .6rem;
  margin-top:.3rem;
}
.model-cont .foot{
  height: 1rem;
  line-height: 1rem;
  padding: 0 10%;
}
.model-cont .foot button{
  width:2rem;
  height: .8rem;
  border:transparent;
}
.model-cont .foot button:nth-of-type(1){
  background: #2CAAF2;
  border-radius:5px;
  color: #fff;
  float: left;
}
.model-cont .foot button:nth-of-type(2){
  border:1px #c1c1c1 solid;
  border-radius:5px;
  color: #c1c1c1;
  float: right;
  background: #fff
}
.logoModel{
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  background: rgba(0,0,0,.1)
}
.logoModel-cont{
  width: 60%;
  height: 3rem;
  margin: 0 auto;
  background: #fff;
  border-radius: 5px;
  text-align: center;
}
.logoModel-cont div{
  height: 1.5rem;
  line-height: 1.5rem;
}
.logoModel-cont div:nth-of-type(1){
  border-bottom: 1px solid #c1c1c1;
}
</style>
