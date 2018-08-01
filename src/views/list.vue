<!--牛人榜单页面-->
<template>
    <div class="list">
        <div class="list-head">
            <i class="iconfont icon-back"></i>
            <span>牛人榜单</span>
        </div>
         <div class="list-zg">
             <!--标题-->
                <div class="list-tab">
                    <div class="tab-item" :class="{'active':selectItem=='today'}" @click="switchTab('today')">
                        <span class="tab-link">今日</span>
                    </div>
                    <div class="tab-item" :class="{'active':selectItem=='lastmoth'}" @click="switchTab('lastmoth')">
                        <span class="tab-link">上月</span>
                    </div>
                    <div class="tab-item" :class="{'active':selectItem=='year'}" @click="switchTab('year')">
                        <span class="tab-link">年度</span>
                    </div>
                </div> 
                <!--内容-->
                <component :is="selectItem"></component>
         </div>
    
    </div>
</template>
<script>
    import today from '@/components/today'
    import lastmoth from '@/components/lastmoth'
    import year from '@/components/year' 

    export default {
        mounted() {
          
        },
        data(){
            return {
                selectItem: 'today',
         }
        },
        created(){
            
        },
        computed:{
            
        },
        methods:{
           //tab切换
           switchTab(item){
            this.selectItem=item;
           }
        },
        // props:{
        //    banners:{
        //     type:Array
        //    },
        //    swiperOption:{

        //    }
        // },
        components:{
           today,
           lastmoth,
           year
        }
    }
</script>
<style scoped>
.list-head
{
    font-size: 40px;
    height: 80px;
    line-height: 80px;
    background: #fff;
    padding: 0 10px;
    display: flex;
}
.list-head i
{
    flex:0 0 50px;
}
.list-head span
{
    flex: 1;
}
/*list-zg*/
.list-zg
{
    padding: 25px
}
/*list-tab*/
.list-tab{
    display: flex;
    overflow: hidden;
    border: 2px solid #2CAAF2;
    border-radius: 5px;
}
.list-tab .tab-item{
    flex: 1;
    text-align: center;
    align-items: center;
    display: flex;
    color: #2CAAF2;
    flex-direction: column;
    border-left: 0.013333rem solid #2CAAF2;
}
.list-tab .tab-item:nth-of-type(1)
{
    border-left: none;
}
.tab-link
{
    height: 80px;
    line-height: 80px;
    font-size: 30px
}
.list-zg .list-tab .tab-item.active{
  background:#2CAAF2;
  color: #fff;
}
</style>