<!--兑奖中心页面-->
<template>
    <div class="Exchange">
        <div class="Exchange-head clearfix">
            <span class="iconfont icon-back" @click="back"></span>
            <span>最新推荐</span>
        </div>
        <div class="Exchange-zg">
             <!--标题-->
                <div class="list-tab">
                    <div class="tab-item" :class="{'active':selectItem=='recent'}" @click="switchTab('recent')">
                        <span class="tab-link">最新</span>
                    </div>
                    <div class="tab-item" :class="{'active':selectItem=='hot'}" @click="switchTab('hot')">
                        <span class="tab-link">最热</span>
                    </div>
                    <div class="tab-item" :class="{'active':selectItem=='price'}" @click="switchTab('price')">
                        <span class="tab-link">金蛋价格
                            <i class="iconfont icon-zhcc_xiangshangjiantou" :class="{'black':isDescex}"></i>
                            <i class="iconfont icon-xiajiantou" :class="{'black':!isDescex}"></i>
                        </span>
                    </div>
                </div> 
                <!--内容-->
                <recent  :data="dataList"></recent>
         </div>
    </div>
</template>
<script>
    import recent from '@/components/recent'
    import api from '../fetch/api'
    import a from '../assets/img/q.jpg';
    import b from '../assets/img/w.jpg';
    import kk from '../assets/img/kk.png';
    import bb from '../assets/img/bb.png';
    import news from '../assets/img/new.png';
    import game from '../assets/img/game.png';

    export default {
        mounted() {
           goods: []
        },
        data(){
            return {
              pic:game,
              dataList:[],
              selectItem: 'recent',
              isDescex:true
         }
        },
        created(){
            this.getNewexChange()
        },
        computed:{
            
        },
        methods:{
           back(){
         this.$router.back(-1);
        },
            //tab切换
            switchTab(item){
                this.selectItem=item;
                if(item=="recent"){
                    //最新
                    this.getNewexChange()
                }else if(item=="hot"){
                    //最热
                    this.getHotexChange()
                }else if(item=="price"&&this.isDescex){
                    //降序
                    this.getDescexChange()
                    this.isDescex=!this.isDescex
                }else if(item=="price"&&!this.isDescex){
                    //升序
                    this.getAscexChange()
                    this.isDescex=!this.isDescex

                }
            
            },
            getNewexChange(){
                //最新商品
                api.getNewexChange().then(res=>{
                    if(res.Code==0){
                        this.dataList=res.Data
                    }else{
                        this.$toast(res.Msg);
                             this.dataList=[];
                    }
                },err=>{
                    
                })
            },
            getHotexChange(){
                //最热商品
                api.getHotexChange().then(res=>{
                    if(res.Code==0){
                        this.dataList=res.Data
                    }else{
                          this.$toast(res.Msg);
                         this.dataList=[];
                    }
                },err=>{
                    
                })
            },
            getDescexChange(){
                //商品价格降序
                api.getDescexChange().then(res=>{
                    if(res.Code==0){
                        this.dataList=res.Data
                    }else{
                                 this.$toast(res.Msg);
                         this.dataList=[];
                    }
                },err=>{
                    
                })
            },
            getAscexChange(){
                //商品价格升序
                api.getAscexChange().then(res=>{
                    if(res.Code==0){
                        this.dataList=res.Data
                    }else{
                                 this.$toast(res.Msg);
                         this.dataList=[];
                    }
                },err=>{
                    
                })
            },

        },
        components:{
           recent
        }
    }
</script>
<style scoped>
 .Exchange {
    font-size: 15px;
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
}

.Exchange .Exchange-head {
    height: 1.333333rem;
    line-height: 1.333333rem;
    width: 100%;
    background: #fafafa;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    font-weight: 700;
}

.Exchange .Exchange-head span:nth-child(1) {
    position: absolute;
    display: inline-block;
    padding: 0 .4rem;
    left: 0;
}

.Exchange-zg{
    margin-top:1.333333rem;
}
/*list-tab*/
.list-tab{
    display: flex;
    overflow: hidden;
}
.list-tab .tab-item{
    flex: 1;
    text-align: center;
    align-items: center;
    display: flex;
    color: #000;
    flex-direction: column;
}
.list-tab .tab-item .img{
    position:  relative;
    display: inline-block;
    width: .28rem;
    height: .28rem;
    top:-.8rem;
    left: 1.066667rem;
}

.tab-link
{
    height: 1.066667rem;
    line-height: 1.066667rem;
    font-size: 15px;
    position: relative;
}
.tab-link i:nth-of-type(1)
{
   position: absolute;
   right: -16px;
   top: -5px;
}
.tab-link i:nth-of-type(2)
{
   position: absolute;
   right: -16px;
   top: 5px;
}
.Exchange-zg .list-tab .tab-item.active{
  color: #2CAAF2;
}
.black{
    color: #000;
}
</style>