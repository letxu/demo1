import Vue from 'vue'
import Router from 'vue-router'
import lucky from '@/views/Lucky'
import index from '@/views/Index'
import Login from '@/views/Login'
import ForgetPwd from '@/views/ForgetPwd'
import Regist from '@/views/Regist'
import HelloWorld from '@/components/HelloWorld'
import analysis from '@/views/Analysis'
import Me from '@/views/Me'
import PhoneBind from '@/views/PhoneBind'
import PassWordEdit from '@/views/PassWordEdit'
import ReceivAddress from '@/views/ReceivAddress'
import EditAddress from '@/views/EditAddress'
import Lucky28 from '@/views/Lucky28'
import MyBet from '@/views/MyBet'
// import AutomaticInjection from '@/views/AutomaticInjection'
import MyPromote from '@/views/MyPromote'
import Gameplay from '@/views/Gameplay'
import Exchange from '@/views/Exchange'
import RegistSucc from '@/views/RegistSucc'
import AddAddress from '@/views/AddAddress'
import FierceList from '@/views/FierceList'
import BetOn from '@/views/BetOn'
import CustomBetList from '@/views/CustomBetList'
import AddBetOn from '@/views/AddBetOn'
import AutomaticBet from '@/views/AutomaticBet'
import Message from '@/views/Message'
import myExchange from '@/views/myExchange'
import TopUp from '@/views/TopUp'
import classDescription from '@/views/classDescription'
import ExchangeEgg from '@/views/ExchangeEgg'
import TopUpHistory from '@/views/TopUpHistory'
import ToPromote from '@/views/ToPromote'
import PhoneBind2 from '@/views/PhoneBind2'
import ExchangeCenter from '@/views/ExchangeCenter'
import yq from '@/views/yq'
import cjwt from '@/views/cjwt'
import cjwtdetail from '@/views/cjwtdetail'
import Success from '@/views/Success'
import ExchangeDetail from '@/views/ExchangeDetail'

Vue.use(Router)
let routes = [{
    path: '*',

    redirect: '/my-promote'


  },
  // {
  //   path: '/',
  //   name: 'HelloWorld',
  //   component: HelloWorld
  // },
  {
    path: '/lucky',
    component: lucky,
    children: [{
        path: '',
        redirect: to => {
          return 'index'
        }
      },
      {
        path: 'index',
        component: index,
        name: "index",
         meta: {
            keepAlive: false // 需要被缓存
         }
      },
      {
        path: 'analysis',
        component: analysis,
        name: "analysis",
        meta: {
            keepAlive: false // 需要被缓存
         }
      },
      {
        path: 'lucky28',
        component: Lucky28,
        name: "lucky28",
         meta: {
            keepAlive: false // 需要被缓存
         }
      },
      {
        path: 'me',
        component: Me,
        name: "Me",
         meta: {
            keepAlive: false // 需要被缓存
         }
      }
    ]
  },
  
  {
    path: '/topromote',
    name: 'ToPromote',
    component: ToPromote
  },
    {
    path: '/yq',
    name: 'yq',
    component: yq
  },
   {
    path: '/exchangecenter',
    name: 'ExchangeCenter',
    component: ExchangeCenter
  },
    {
    path: '/topuphistory',
    name: 'TopUpHistory',
    component: TopUpHistory
  },
   {
    path: '/exchangeegg',
    name: 'ExchangeEgg',
    component: ExchangeEgg
  },
  {
    path: '/exchangedetail',
    name: ' ExchangeDetail',
    component:  ExchangeDetail
   
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registsucc',
    name: 'RegistSucc',
    component: RegistSucc
  },
  {
    path: '/forgetpwd',
    name: 'ForgetPwd',
    component: ForgetPwd
  },
  {
    path: '/regist',
    name: 'Regist',
    component: Regist
  },
  {
    path: '/phonebind',
    name: 'PhoneBind',
    component: PhoneBind,
    meta: {
       keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/phonebind2',
    name: 'PhoneBind2',
    component: PhoneBind2
  },
  {
    path: '/passwordedit',
    name: 'PassWordEdit',
    component: PassWordEdit,
     meta: {
        keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/receivaddress',
    name: 'ReceivAddress',
    component: ReceivAddress,
 
  },
  {
    path: '/addaddress',
    name: 'AddAddress',
    component: AddAddress,
        meta: {
        keepAlive: false // 需要被缓存
    }
  },
  {
    path: '/editaddress',
    name: 'EditAddress',
    component: EditAddress
  },
  {
    path: '/mybet',
    name: 'MyBet',
    component: MyBet
  },
  //冲值
  {
    path: '/topup',
    name: 'TopUp',
    component: TopUp
  },
  //我的推广
  {
    path: '/my-promote',
    component: MyPromote,
    name: "my-promote",
  },
  //兑奖中心
  {
    path: '/Exchange',
    component: Exchange,
    name: "Exchange",
  },
  //玩法攻略
  {
    path: '/Gameplay',
    component: Gameplay,
    name: "Gameplay",
  },
  //牛人榜单
  {
    path: '/fierce-list',
    component: FierceList,
    name: "FierceList",
  },
  //投注界面
  {
    path: '/beton',
    component: BetOn,
    name: "BetOn",
  },
  //自定义投注列表
   {
    path: '/custombetList',
    component: CustomBetList,
    name: "CustomBetList",
  },
   //自定义投注模式界面
  {
    path: '/addbeton',
    component: AddBetOn,
    name: "AddBetOn",
  },
  //自动投注界面
  {
    path:'/automaticbet',
    component: AutomaticBet,
    name: "AutomaticBet",
  },
  //我的兑换
  {
    path:'/my-exchange',
    component: myExchange,
    name: "myExchange",
  },
  //我的兑换
  {
    path:'/class-description',
    component: classDescription,
    name: "classDescription",
  },
 {
    path:'/cjwt',
    component: cjwt,
    name: "cjwt",
  },
   {
    path:'/cjwtdetail',
    component: cjwtdetail,
    name: "cjwtdetail",
  },
  {
    path:'/Success',
    component: Success,
    name: "Success",
  },
  
  
]
export default new Router({
  linkActiveClass: 'active',
  base: __dirname,
  routes: routes
})