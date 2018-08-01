// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'lib-flexible'
import '@/assets/css/main.css'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'


// import Toast from 'mint-ui/lib/Toast';
import {Picker,Popup,Toast, MessageBox, Indicator, Checklist} from 'mint-ui';
import 'mint-ui/lib/style.css';/*no*/
import 'mint-ui/lib/Toast/style.css';/*no*/
import 'mint-ui/lib/Picker/style.css';/*no*/
// import 'mint-ui/lib/Indicator/style.css';
Vue.prototype.$toast = Toast;
Vue.prototype.$indicator = Indicator;
Vue.prototype.$messagebox = MessageBox;
Vue.component(Checklist.name, Checklist);
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.use(VueAwesomeSwiper)
// Vue.component(Loadmore.name, Loadmore);
//    Vue.component(Indicator.name, Indicator);

Vue.config.productionTip = false
Vue.prototype.$http = axios 
/* eslint-disable no-new */
// router.beforeEach((to, from, next) => {
//  const toDepth = to.path.split('/').length
//  const fromDepth = from.path.split('/').length
//  if (toDepth < fromDepth) {
//   console.log('后退。。。')
//   from.meta.keepAlive = false
//   to.meta.keepAlive = true
//  }
//  next()
// })

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
