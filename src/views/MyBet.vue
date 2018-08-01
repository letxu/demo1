<!--幸运28页面-->
<template>
<div class="mybet">
    <!--头部-->
    <div class="mybet-head clearfix clear">
       <span class="iconfont icon-back"  @click="back"></span>
        我的投注
    </div>

    <div class="mybet-cont">
        <!--我的盈亏页面-->
        <div class="shares">
            <div class="shares-title">
                <i></i>
                <span>我的盈亏</span>
            </div>
            <div class="min-line"></div>
            <div class="shares-cont">
                <div class="shares-cont-item">
                    <div>
                        <span class="title">今日</span>
                        <span>{{ myBetData.res.now_day_money!=0 ? myBetData.res.now_day_money : "--" }}</span>
                    </div>
                    <div>
                        <span class="title">本周</span>
                        <span>{{ myBetData.res.this_week_money!=0 ? myBetData.res.this_week_money : "--" }}</span>
                    </div>
                    <div>
                        <span class="title">本月</span>
                        <span>{{ myBetData.res.this_month_money!=0 ? myBetData.res.this_month_money : "--" }}</span>
                    </div>
                    <div>
                        <span class="title">今年</span>
                        <span>{{ myBetData.res.this_year_money!=0 ? myBetData.res.this_year_money : "--" }}</span>
                    </div>
                </div>
                <div class="shares-cont-item">
                    <div>
                        <span class="title">昨日</span>
                        <span>{{ myBetData.res.last_day_money!=0 ? myBetData.res.last_day_money : "--" }}</span>
                    </div>
                    <div>
                        <span class="title">上周</span>
                        <span>{{ myBetData.res.last_week_mmoney!=0 ? myBetData.res.last_week_mmoney : "--" }}</span>
                    </div>
                    <div>
                        <span class="title">上月</span>
                        <span>{{ myBetData.res.last_month_money!=0 ? myBetData.res.last_month_money : "--" }}</span>
                    </div>
                    <div>
                        <span class="title">去年</span>
                        <span>{{ myBetData.res.last_year_money!=0 ? myBetData.res.last_year_money : "--" }}</span>
                    </div>
                </div>
            </div>
            <div class="max-line"></div>
        </div>
        <!--投注记录-->
        <div class="note-record">
            <div class="note-record-title">
                <i></i>
                <span>投注记录</span>
                <ul class="date">
                    <li :class="{'active': typeValue == 0}" @click="type(0)">按期</li>
                    <li :class="{'active': typeValue == 1}" @click="type(1)">按日</li>
                </ul>
            </div>

            <div class="note-record-cont" v-show="typeValue == 0">
                <ul class="title title-bg">
                    <li>期号</li>
                    <li>开奖时间</li>
                    <li>中奖号码</li>
                    <li>盈亏</li>
                </ul>

                <div class="content">
                    <ul class="title " v-for="(item, index) in myBetData.list">
                        <li>{{ item.q_id ? item.q_id : '' }}</li>
                        <li>{{ item.time ? item.time : '' }}</li>
                        <li><span class="num">{{ item.bet_num }}</span></li>
                        <li>{{ item.loss ? item.loss : '' }}</li>
                    </ul>
                </div>
            </div>

            <div class="note-record-cont" v-show="typeValue == 1">
                <ul class="title title-bg">
                    <li class="item">开奖时间</li>
                    <li class="item">盈亏</li>
                </ul>

                <div class="content">
                    <ul class="title " v-for="(item, index) in myBetDateData.list">
                        <li class="item">{{ item.times ? item.times : '' }}</li>
                        <li class="item">{{ item.loss ? item.loss : '' }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import api from '../fetch/api'
export default {
    data() {
        return {
            typeValue: 0,
            myBetData: {
                list: [],
                res: {}
            },
            myBetDateData: {
                list: [],
                res: {}
            },

        }
    },
    created() {
        this.myBet();
    },
    methods: {
        back(){
                 this.$router.back(-1);
            },
        myBet() {
            api.myBet({type:1}).then((res) => {
                this.myBetData = res.Data;
            }, (err) => {

            })
        },
        myDateBet() {
            api.myBet({type:2}).then((res) => {
                this.myBetDateData = res.Data;
            }, (err) => {

            })
        },
        type(val) {
            this.typeValue = val;
            if((this.typeValue==1)&&(this.myBetDateData.list.length==0)){
                this.myDateBet()
            }
        }
    }
}
</script>
<style scoped>
.min-line {
    background: #eaeaea;
    height: .066667rem;
}

.max-line {
    background: #eaeaea;
    height: .2rem;
}

.mybet {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.mybet .mybet-head {
    width: 100%;
    height: 1.333333rem;
    text-align: center;
    color: #000;
    font-size: 15px;
    line-height: 1.333333rem;
    background: #fafafa;
    position: fixed;
    left: 0;
    top: 0;
}
.mybet .mybet-head span:nth-child(1) {
        position: absolute;
        display: inline-block;
        padding: 0 .4rem;
        left: 0;
    }

.mybet {
    margin-top: 1.333333rem;
}

.shares-title {
    height: 1rem;
    width: 100%;
    font-size: 30px;
}

.shares-title i {
    display: inline-block;
    width: .08rem;
    height: .5rem;
    background: #3f96e0;
    float: left;
    margin: .25rem .08rem 0 .8rem
}

.shares-title span {
    display: inline-block;
    /* width: 1.6rem;
    height: .8rem;
    line-height: .8rem; */
    text-align: left;
    float: left;
    font-size: 14px;
    height: .5rem;
    line-height: .5rem;
    margin-top: .25rem;
}

.shares-cont-item {
    display: flex;
    height: 1.6rem;
}

.shares-cont-item>div {
    flex: 1;
    flex-direction: column;
}

.shares-cont-item>div>span {
    display: inline-block;
    width: 100%;
    height: .8rem;
    line-height: .8rem;
}

.shares-cont-item>div>.title {
    color: #d7d7d7
}

.note-record-title {
    height: 1.2rem;
    width: 100%;
    font-size: 15px;
}

.note-record-title i {
    display: inline-block;
    width: .08rem;
    height: .5rem;
    background: #3f96e0;
    float: left;
    margin: .35rem .08rem 0 .8rem;
}

.note-record-title span {
    display: inline-block;
    /* width: 1.6rem;
    height: .8rem;
    line-height: .8rem; */
    text-align: left;
    float: left;
    font-size: 14px;
    height: .5rem;
    line-height: .5rem;
    margin-top: .35rem;
}

.note-record-title ul.date {
    float: right;
    margin-right: .8rem;
    font-size: 15px;
    /* width: 2.666667rem; */
    height: .6rem;
    line-height: .6rem;
    border: 1px solid #3f96e0;
    /* border-radius: .266667rem; */
    /* background: #3f96e0; */
    color: #000;
    overflow: hidden;
    margin-top: .25rem;
  
      font-size: 11px;
}

.note-record-title ul.date li {
    /* width: 100px; */
    float: left;
    height: 100%;
    padding: 0 .2rem;
}

.note-record-title ul.date li.active {
    background: #3f96e0;
    color: #fff;
}

.note-record-cont .title {
    width: 100%;
    height: 1rem;
}

.note-record-cont .title-bg {
    background: #e8e8e8;
}

.note-record-cont .title .item {
    width: 50%;
}

.note-record-cont .content {
    position: absolute;
    top: 8rem;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    overflow-y: auto;
}
.note-record-cont .content .num {
    display: inline-block;
    width: 0.5333rem;
    height: 0.5333rem;
    border-radius: 50%;
    text-align: center;
    line-height: 0.5333rem;
    background: #e46c6c;
    color: #fff;
}
.note-record-cont .title li {
    width: 25%;
    height: 1rem;
    line-height: 1rem;
    float: left;
}
</style>
