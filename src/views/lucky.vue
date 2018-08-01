<template>
    <div> 
        
       <keep-alive> 
          <router-view v-if="$route.meta.keepAlive">
              <!-- 这里是会被缓存的视图组件，比如 Home！ -->
          </router-view>
      </keep-alive>

      <router-view v-if="!$route.meta.keepAlive">
          <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
      </router-view>
        <div class="foot">
            <ul class="foot-tab">
                <router-link to="/lucky/index" replace>
                    <li class="active">
                        <i class="iconfont icon-shouye"></i>
                        <span>首页</span>
                    </li>
                </router-link>
                <router-link to="/lucky/analysis" replace>
                    <li>
                        <i class="iconfont icon-jingyingfenxi"></i>
                        <span>分析</span>
                    </li>
                </router-link>
                <router-link to="/lucky/lucky28" replace>
                    <li>
                        <i class="iconfont icon-xingqiu"></i>
                        <span>幸运28</span>
                    </li>
                </router-link>
                <router-link to="/lucky/me" replace>
                <li>
                    <i class="iconfont icon-profile"></i>
                    <span>我的</span>
                </li>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
            }
        },
        created(){
            
        },
        computed:{
            
        },
        methods:{

        },
        components:{
        
        }
    }
</script>
<style scoped>
.foot{
    width: 100%;
    height: 1.4667rem;
    position: fixed;
    bottom: 0px;
    left: 0;
    border-top:1px solid #C8C8C8 ;
    box-shadow: 0px 0px 2px #C8C8C8;
    background: white;
}
.foot-tab{
    width: 100%;
    height: 1.6rem;
    display: table;
}
.foot-tab  a{
    display: table-cell;
    height: 100%;
}
.foot-tab a.active{
    color: #2CAAF2;
}
.foot-tab li{
    width: 25%;
    height: 1.6rem;
   /*float: left;*/
    /*display: inline-block;*/
    display: table-cell;
    vertical-align: middle;
}
.foot-tab  li  .iconfont{
    display: inline-block;
    width:100%;
    text-align: center;
    /*height: 30px;*/
    /*line-height: 30px;*/
    font-size: 25px;
}

.foot-tab li span{
    display: inline-block;
    width:100%;
    text-align: center;
    height: 0.4rem;
    line-height: 0.4rem;
    margin-top: 0.0667rem;
}

</style>