<template>
  <div class="custom-betlist">
    <div class="custom-betlist-head clearfix">
      <span class="iconfont icon-back" 	  @click="back"></span>
          <span>自定义投注模式</span>
          <span @click="goDel()">{{!isdel?'删除':'完成'}}</span>
    </div>
    <!--内容-->
    <div v-if="data.length==0" style="color:#999999;paddingTop:4.333333rem">
      还未定义投注模式
    </div>
    <ul v-else v-for="(item,index) in data">
      <li class="clearfix" @click="toUpdateAward(item.id)"><span>{{item.title}}</span>
         <i v-if="!isdel" class="iconfont icon-goto" ></i>
         <i v-if="isdel" @click.stop="delItem(index)" class="iconfont icon-del"></i>
      </li>
    </ul>
    <div class="bottom-div"><button @click="_goAdd()">新增投注模式</button></div>
    <div class="model" v-if="model">
      <div class="model-cont">
        <div class="cont">确认要删除投注模式{{selectTitle}}？</div>
        <div class="foot">
          <button @click="confirmDel">确认</button>
          <button @click="cancelDel">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import api from '../fetch/api'
export default {
  components: {},
  data() {
    return {
      data:[],
      isdel:false,
      selectId:-1,
      model:false,
      selectTitle:-1,
    }
  },
  created(){
    this.awardCustomList({page_no:1});
  },
  methods: {
     back(){
         this.$router.back(-1);
    },
    delItem(index){
      //删除
      this.selectId=this.data[index].id;
      this.selectTitle=this.data[index].title;
      this.model=true
    },
    cancelDel(){
      //取消删除
      this.selectId=-1;
      this.model=false;
      this.selectTitle=-1;
    },
    confirmDel(){
      //确认删除
      let _this= this;
      api.awardDlCustom({id:_this.selectId}).then((res)=>{
        this.$toast(res.Msg);
        _this.selectId=-1;
        _this.model=false;
        _this.selectTitle=-1;
        this.awardCustomList({page_no:1});
      },(err)=>{

      })
    },
    toUpdateAward(id){
      let url=`/addbeton?id=${id}`
      this.$router.push({path:url})
    },
    goDel(){
      this.isdel=!this.isdel;
    },
    getVerifiCode() {
   
    },
    awardCustomList(par){
      //获取自定义投注列表
      api.awardCustomList(par).then((res)=>{
        this.data = res.Data
      })
    },
    // 
    _goAdd() {
        this.$router.push('/addbeton');
    }
  }
}
</script>

<style scoped>
.custom-betlist {
  font-size: 16px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #FFFFFF;
  padding-top: 1.333333rem;
}

.custom-betlist .custom-betlist-head {
  height: 1.333333rem;
  line-height: 1.333333rem;
  width: 100%;
  border-bottom: 1px solid #E2E2E2;
  position: fixed;
  top: 0;
  left: 0;
}
.custom-betlist .custom-betlist-head span:nth-child(1) {
  position: absolute;
  display: inline-block;
  padding: 0 .4rem;
  left: 0;
}
.custom-betlist .custom-betlist-head span:nth-child(3) {
  position: absolute;
  display: inline-block;
  padding: 0 .4rem;
  right: 0;
}
/*头部结束*/
/*基础模块*/
.custom-betlist ul{
  width: 100%;
}
.custom-betlist ul li{
    width: 100%;
    height: 1.2rem;
    line-height:1.2rem;
    border-bottom: 1px solid #F3F3F3;
    margin-left:.4rem;
    text-align: left;
 
}
.custom-betlist ul li i{
  float:right;
   padding-right:.633333rem;
}
 .iconfont {
    font-size: 20px
}
/*底部*/
.bottom-div{
  width: 100%;
  height: 1.866667rem;
  line-height:  1.866667rem;
  background: white;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
}
.bottom-div button{
  width: 80%;
  height: 70%;
  background: #36BCF1;
  border: 0;
  color: white;
  border-radius: .133333rem;
       outline:none;
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
  line-height: 2rem;
  margin: 0 auto;
  background: #fff;
  margin-top:.5rem;
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
</style>
