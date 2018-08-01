<template>

  <div class="editaddress">
    <div class="editaddress-head clearfix">
      <span class="iconfont icon-back" @click="back"></span>
      <span>新增收货地址</span>
      <span @click="addSave()">保存</span>
    </div>
    <div class="common">
      <div class="common-div">
        <input type="text" name="phone" v-model="username" placeholder="姓名" required />
      </div>
      <div class="common-div">
        <input type="tel" name="phone" maxlength="11" v-model="user_phone" placeholder="手机号" required/>
      </div>
      <div class="common-div">
        <input type="tel" name="phone" v-model="postalcode" placeholder="邮政编码" required/>
      </div>
      <div class="common-div">
        <input type="text" name="province_city"  @click="popAlert()" v-model="province_city" placeholder="请选择省市区" required readonly=""/>
      </div>
      <div class="common-div">
        <input type="text" name="small_address" v-model="small_address" placeholder="详细地址、如街道、楼牌号" required/>
      </div>
      <div class="common-div">
        <!--<input type="checkbox" v-model="check" @click="selectCheck()"/><span @click="selectCheck()">设置默认地址</span>-->
        <mt-checklist
                v-model="value"
                :options="['设置默认地址']">
        </mt-checklist>
      </div>

      <mt-popup v-model="popupVisible"
                position="bottom">
        <div class="picker-toolbar">
          <span class="mint-datetime-action mint-datetime-cancel" @click="cancleaddress()">取消</span>
          <span class="mint-datetime-action mint-datetime-confirm" @click="selectaddress()">确定</span>
        </div>
        <mt-picker  :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
      </mt-popup>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import  api from '../fetch/api'
  import myaddress from '../util/pca.json'
  export default {
    components: {},
    data() {
      return {
        username: '',
        user_phone: '',
        postalcode: '',
        province_city: '',
        small_address: '',

        check:false,
        value:[],
        popupVisible:false,
        myAddressSlots: [
          {
            flex: 1,
            defaultIndex: 1,
            values: Object.keys(myaddress),  //省份数组
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot1'
          }, {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot1',
          },
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        myAddressProvince:'省',
        myAddressCity:'市',
        myAddresscounty:'区/县',
      }
    },
    methods: {
       back(){
              this.$router.back(-1);
        },
      cancleaddress(){
        this.popupVisible=false

      },
      selectaddress(){
        this.popupVisible=false
        this.province_city=this.myAddressProvince+this.myAddressCity+this.myAddresscounty;
      },
      popAlert(){
        this.popupVisible=true
      },
      selectCheck() {
        this.check=!this.check
        if(this.check){
          console.log(this.check);
        }else {
          console.log(this.check);
        }
      },
      //保存
      addSave(){

        if(!this.username){
          this.$toast("请输入姓名");
          return;
        }
        if(!this.user_phone){
          this.$toast("请输入手机号");
          return;
        }
        if(!this.postalcode){
          this.$toast("请输入邮政编码");
          return;
        }
        if(!this.province_city){
          this.$toast("请选择省市");
          return;
        }
        if(!this.small_address){
          this.$toast("请输入详细地址");
          return;
        }
        let params={
          recipients:this.username,
          telephone:this.user_phone,
          postalcode:this.postalcode,
          big_address:this.province_city,
          big_address:this.province_city,
          small_address:this.small_address,
          default:this.value.length>0?1:2
        };
        api.addaddress(params).then(res => {
          console.log(res)
          if (res.Code == "0") {
            //成功
              this.$router.go(-1);
          } else {
            this.$toast(res.Msg);
          }
        }, err => {
          this.$toast("连接服务器失败");
        })

      },
      onMyAddressChange(picker, values) {
        if(myaddress[values[0]]){  //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
          picker.setSlotValues(1,Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
          picker.setSlotValues(2,myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
          this.myAddressProvince = values[0];
          this.myAddressCity = values[1];
          this.myAddresscounty = values[2];
        }
      },
    },
    mounted() {
      this.$nextTick(() => { //vue里面全部加载好了再执行的函数  （类似于setTimeout）
        this.myAddressSlots[0].defaultIndex = 0
        // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
        //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
      });

    },
  }
</script>

<style scoped>
  .editaddress {
    font-size: 13px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #FFFFFF;
  }
  .editaddress .editaddress-head{
    height: 1.333333rem;
    line-height: 1.333333rem;
    width: 100%;
    border-bottom: 1px solid #E2E2E2;/*no*/
    position:fixed;
    top: 0;
    left: 0;
   font-size: 15px;

  }
  .editaddress  .editaddress-head span:nth-child(1){
    position: absolute;
     display: inline-block;
     padding: 0 .4rem;
     left:0;
  }
  .editaddress  .editaddress-head span:nth-child(3){
    position: absolute;
    display: inline-block;
    padding: 0 .4rem;
    right:0;
  }
  /*头部结束*/
  /*基础模块*/
  .common{
    margin-top: 1.333333rem;
  }
  .editaddress .common-div{

    height: 1.6rem;
    line-height: 1.6rem;
    border-bottom: 1px solid #E2E2E2;/*no*/
    text-align: left;
    padding: 0 .4rem;
    box-sizing: border-box;
  }
  .editaddress  .common-div input[type='text'],.common-div input[type='tel'] {
    background-color: transparent;
    border: none;
    outline: none;
    width: 6rem;
    height: 100%;
  }

  /*默认地址*/
  .editaddress  .common-div:nth-child(6) {
      text-align: center;
  }
  .editaddress  .common-div:nth-child(6) input[type='checkbox'] {
      margin-right: .133333rem;
  }
  .editaddress  .common-div:nth-child(6) span{
    height: 100%;
    display: inline-block;
  }
 .mint-popup-bottom{
    width: 100%;
    font-size: 16px;
  }
  /*
  .picker-toolbar{ 
    height: 70px;
    line-height: 70px;
    }
  .mint-datetime-action  {
    height: 70px;
    line-height: 70px;
    font-size: 30px;
  }
  */

</style>
<style>
.mint-cell-wrapper,  .mint-cell:last-child  {
    background-image: none;
    }
  /*.picker-slot {
    font-size: 30px;
  }
  .mint-cell .mint-cell-wrapper{
    height: 100px;
    margin-top: 5px;
    font-size: 25px;
  }

  .mint-checkbox-core{
    width: 30px;
    height: 30px;
    border: 1px solid #ccc;  

  }
  .mint-checkbox-core::after{
    width: 10px;
    height: 18px;
    top: 2px;
    left: 8px;
  }*/
</style>