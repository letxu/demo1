import axios from 'axios'
import qs from 'qs'
import { Indicator } from 'mint-ui';
// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;multipart/form-data;boundary=----WebKitFormBoundaryeOOd9EoQVo6B4Tgb';
axios.defaults.baseURL = '/api';

// axios.defaults.baseURL = 'static/jsonData';//要用.get请求
//POST传参序列化
axios.interceptors.request.use((config) => {
    console.log("config")
    console.log(config)
    if(config.method  === 'post'){
        if(config.url.indexOf("edit_logo")==-1){//不存在
             config.data = qs.stringify(config.data);
         }
    }
    if(config.url.indexOf("betList")==-1&&config.url.indexOf("queryRes")==-1){//不存在
    //    Indicator.open("加载中...");
    }
    return config;
},(error) =>{
     console.log("request"+error);
    // Indicator.open("加载中...");
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>{
    // if(!res.data.success){
    if(!res.data){    //获得数据
       return Promise.reject(res);
    }
    // Indicator.close();
    return res;
}, (error) => {
   console.log("errresponse"+error);
    // Indicator.close();
    return Promise.reject(error);
});
// export function getRank(id, token) {
// 	var url = '';
// 	if (token === null) {
// 		url = api + `/index/shopDetails?id=${id}`;
// 	} else {
// 		url = api + `/index/shopDetails?id=${id}&identity=${token}`
// 	}
// 	return axios.get(url).then((res) => {
// 		return Promise.resolve(res);
// 	})
// }
export function fetchPost(url, params) {
  //加上必须的数据
  console.log(params)
    params.token=localStorage.getItem("token");
    return new Promise((resolve, reject) => {
        console.log(params)
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
                
            })
            .catch((error) => {
               reject(error)
            })
    })
}

export function fetchGet(url, paramObj) {
    //加上必须的数据 localStorage.setItem("token", JSON.stringify(result));
    return new Promise((resolve, reject) => {
         paramObj.token=localStorage.getItem("token");
         let param={params:paramObj}
           axios.get(url, param)
            .then(response => {
               
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}
export default {
    /**
     *验证吗
     */
    sendTemplateSMS(phone) {
         let param ={
                telephone:phone
         };
        return fetchPost('/register/send_template', param)
    },
    /**
     * 用户登录
     */
    Login(params) {
      //  return fetch('/login.json', params)
       return fetchPost('/login/login', params)
    },
    /**
     *轮播图
     */
    user_list() {
      //  return fetch('/login.json', params)
       return fetchPost('/index/user_list', {})
    },
     /**
     *4个商品
     */
     my_change() {
      //  return fetch('/login.json', params)
       return fetchPost('/index/my_change', {})
    },


  
    /**
     * 用户注册
     */
    Regist(params) {
        return fetchPost('/register/register', params)
    },
    /**
     * 忘记密码
     */
    forget_pwd(params) {
        return fetchPost('/user_info/forget_pwd', params)
    },
     /**
     *修改密码
     */
    edit_pwd(params) {
        return fetchPost('/user_info/edit_pwd', params)
    },
     /**
     *验证原来手机
     */
    hit_phone(telephone, identifying) {
        let params={
            identifying:identifying,
            telephone:telephone
        };
        return fetchPost('/user_info/hit_phone', params)
    },
     /**
     *修改新手机
     */
    edit_phone(telephone, identifying) {
         let params={
            identifying:identifying,
            telephone:telephone
        };
        return fetchPost('/user_info/edit_phone', params)
    },
    /**
     * 个人中心的接口
     */
    personal() {
        return fetchPost('/user_info/personal', {})
    },
    /**
    * 管理收货地址
    */
    userAddress() {
        return fetchPost('/user_info/address', {})
    },
    /**
     * 根据id查询地址接口
     */
    idaddress(address_id) {
        return fetchPost('/user_info/idaddress', {address_id:address_id})
    },
    /**
     * 删除收货地址
     */
    deletaAddress(address_id) {
        return fetchPost('/user_info/deleteaddress', {address_id:address_id})
    },
    /**
     * 新增收货地址
     */
    addaddress(params) {
        return fetchPost('/user_info/addaddress', params)
    },
    /**
     * 编辑收货地址
     */
    editaddress(params) {
        return fetchPost('/user_info/editaddress', params)
    },
    /**
     * 退出登录
     */
    userDrop() {
        return fetchPost('/user_info/drop', {})
    },
   /**
     * 兑换商品
     */
    exchange(goods_idParam) {
        return fetchPost('/index/exchange', {goods_id:goods_idParam})
    },

   /**
     * 我的推广
     */
    myGeneralize() {
        return fetchPost('/index/myGeneralize', {})
    },
 
     /**
     * 签到
     */
    everySign() {
        return fetchPost('/index/everysign', {})
    },
      /**
     *查询开奖
     */
     queryRes( numStr) {
          let params ={
           num:numStr
         };
        return fetchPost('/award/queryRes', params)
    },
     /**
     * 动态
     */
    dynamic() {
        return fetchPost('/index/newstatic', {})
    },
    gene_list() {
        return fetchPost('index/gene_list', {})
    },
     /**
     * banner
     */
    getBanner() {
        return fetchPost('/index/piclist', {})
    },
    getNewexChange() {
        //最新商品
        return fetchPost('/index/newexchange', {})
    },
    getHotexChange() {
        //最热商品
        return fetchPost('/index/hotexchange', {})
    },
    getDescexChange() {
        //商品价格降序
        return fetchPost('/index/descexchange', {})
    },
    getAscexChange() {
        //商品价格升序
        return fetchPost('/index/ascexchange', {})
    },
    betInterval() {
        //开奖间隔
        return fetchPost('/award/betInterval', {})
    },
    awardList() {
        //统计模式
        return fetchPost('/Award/awardList', {})
    },
    awardTrend(params) {
        //走势图
        return fetchPost('/award/trend', params)
    },
    awardBetList() {
        //开奖列表
        return fetchPost('/Award/betList', {})
    },
    awardListList(params) {
        //牛人榜单
        return fetchPost('/Award/listList', params)
    },
    awardBetOn(params) {
        //确认投注
        return fetchPost('/award/betOn', params)
    },
    awardOdds(params) {
        //获取赔率
        return fetchPost('/award/odds', params)
    },
    awardCustomList(params) {
        //获取投注列表
        return fetchPost('/Award/customList', params)
    },
    awardDlCustom(params) {
        //获取投注列表
        return fetchPost('/award/delCustom', params)
    },
    awardCustom(params) {
        //新增投注模式
        return fetchPost('/award/custom', params)
    },
    awardGetCustom(params) {
        //获取单个投注模式
        return fetchPost('/award/getCustom', params)
    },
    awardGetWater() {
        //获取金库和金蛋
        return fetchPost('/award/getWater', {})
    },
   exchange_egg(paramgold_ball) {
        //金库换金蛋
        return fetchPost('/index/exchange_egg', {gold_ball:paramgold_ball})
    },
    
    awardDitto() {
        //获取上期
        return fetchPost('/award/ditto', {})
    },
    awardMotion() {
        //自动投注信息
        return fetchPost('/award/motion', {})
    },
     startMotion(params) {
     //开始自动投注信息
        return fetchPost('/award/startMotion', params)
    },
    offMotion() {
    //停止自动投注
        return fetchPost('/award/offMotion', {})
    },
    myBet(params) {
    //停止自动投注
        return fetchPost('/award/myBetMsg', params)
    },
    awardGetBetNum(params) {
    //获取期号对应的投注
        return fetchPost('/award/getBetNum', params)
    },
    awardMyDh(params) {
    //我的商品
        return fetchPost('/user_info/record', params)
    },
    setUserName(params){
    //修改用户
        return fetchPost('/user_info/edit_name', params)
    },
    recharge(params){
    //充值
        return fetchPost('/user_info/recharge', params)
    },
    recharge_record(){
    //充值记录
        return fetchPost('/user_info/recharge_record', {})
    },
     recharge_num(){
    //充值金额
        return fetchPost('/user_info/recharge_num', {})
    },
    setLogo(params){
    //修改头像
        return fetchPost('/user_info/edit_logo', params)
    },
    qa(){
    //修改头像
        return fetchPost('/user_info/qa', {})
    }
    
}
