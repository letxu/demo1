<template>
  <div id="app">
    <!--<router-view/>-->
      <keep-alive> 
          <router-view v-if="$route.meta.keepAlive">
              <!-- 这里是会被缓存的视图组件，比如 Home！ -->
          </router-view>
      </keep-alive>

      <router-view v-if="!$route.meta.keepAlive">
          <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
      </router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/*html,body,#app {height: 100%;}*/
#app {

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
