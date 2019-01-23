<template>
    <div class="personal-com" ref="bg">
        <!-- 用户头像信息 -->
        <div class="personBg">
            <div class="container-fluid">
                <div class="personBox">
                    <img :src="headimgurl" alt="" class="headImg">
                    <p class="userName">{{nickname}}</p>
                    <div class="vipBox" @click="toVip()">
                        <span class="iconfont icon-VIPhuiyuan vipLogo"></span><span class="text">会员<span class="iconfont icon-iconfonticonfonti2copycopy vipMore"></span></span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 订单 -->
        <div class="container-fluid mt15">
            <div class="myOrderBox">
            <h4 class="myTitle">我的订单<router-link to="/orderState" tag="div" class="moreOrder">查看全部订单<span class="iconfont icon-iconfonticonfonti2copycopy"></span></router-link></h4>
                <div class="orderBox">
                    <router-link to="/orderState/wait" tag="div" class="orderItme">
                        <p class="myOrderLogo orderState text-center"><span class="iconfont icon-qianbao"></span><em class="orderCount" v-if="orderState.NO_PAY>0">{{orderState.NO_PAY}}</em></p>
                        <p class="myOrder text-center">待付款</p>
                    </router-link>
                    <router-link to="/orderState/send" tag="div" class="orderItme">
                        <p class="myOrderLogo orderState text-center"><span class="iconfont icon-fahuo"></span><em class="orderCount" v-if="orderState.PAID>0">{{orderState.PAID}}</em></p>
                        <p class="myOrder text-center">待发货</p>
                    </router-link>
                    <router-link to="/orderState/confirm" tag="div" class="orderItme">
                        <p class="myOrderLogo orderState text-center"><span class="iconfont icon-shouhuo"></span><em class="orderCount" v-if="orderState.SHIPPED>0">{{orderState.SHIPPED}}</em></p>
                        <p class="myOrder text-center">待收货</p>
                    </router-link>
                    <router-link v-if="hasNoAddress" tag="div" to="/createAddress" class="orderItme">
                        <p class="myOrderLogo text-center"><span class="iconfont icon-Group-"></span></p>
                        <p class="myOrder text-center">地址管理</p>
                    </router-link>
                    <router-link v-else tag="div" to="/editAddress" class="orderItme">
                        <p class="myOrderLogo text-center"><span class="iconfont icon-Group-"></span></p>
                        <p class="myOrder text-center">地址管理</p>
                    </router-link>
                </div>
            </div>
        </div>

        <!-- 工具 -->
        <div class="container-fluid mt15">
            <div class="myOrderBox">
            <h4 class="myTitle">我的工具</h4>
                <div class="orderBox">
                    <router-link to="/waitPay" tag="div" class="orderItme">
                        <p class="myOrderLogo text-center"><span class="iconfont icon-youhuiquan"></span></p>
                        <p class="myOrder text-center">礼券</p>
                    </router-link>
                    <router-link to="/waitOrder" tag="div" class="orderItme">
                        <p class="myOrderLogo text-center"><span class="iconfont icon-kefu"></span></p>
                        <p class="myOrder text-center">客服</p>
                    </router-link>
                    <router-link to="/confirmOrder" tag="div" class="orderItme">
                        <p class="myOrderLogo text-center"><span class="iconfont icon-winfo-icon-fankuiwenti"></span></p>
                        <p class="myOrder text-center">反馈</p>
                    </router-link>
                </div>
            </div>
        </div>

        <div class="container-fluid copyrightBox">
            <p class="text-center copyright">- 新学说提供技术支持 -</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            headimgurl:'',
            nickname:'',
            hasNoAddress:true,
            orderState:{}
        }
    },
    methods:{
        toVip(){
            window.open('https://www.xinxueshuo.cn/#/vip','_blank')
        },
        getOrderCount(){
            this.axios({
                method:'get',
                url:'/order/find_order_count.do',
                params:{
                    wechatId:localStorage.getItem('openId')
                }
            }).then((res)=>{
                this.orderState=res.data.data
            })
        }
    },
    created(){
        let storage = window.localStorage
        this.headimgurl=storage.headimgurl
        this.nickname=storage.nickname

        this.axios({
            method:"get",
            url: '/ShopAddress/getList.do',
            params:{
                // wechatId:'123123'
                wechatId:localStorage.getItem('openId')
            }
        }).then((res)=>{
            // 0成功 1失败
            let code=res.data.code
            if(code===0){
                this.hasNoAddress=false
            }else{
                this.hasNoAddress=true
            }
        })
    },
    mounted(){
        this.$refs.bg.style.minHeight=(window.innerHeight-57)+"px";
        this.getOrderCount()
    }
}
</script>

<style lang="scss">
    .personal-com{
        background-color: #f7f7f7;
        .mt15{
            margin-top: 15px;
        }
        .mb20{
            margin-bottom: 20px;
        }
        .redLogo{
            color: #f72f2f;
            .myOrder{
                color: #232323;
            }
        }
        .personBg{
            min-height: 180px;
            // background: linear-gradient(90deg,#215089,#1c4372);
            background: url('../assets/personalBg.png');
            background-size: cover;
            background-position: center center;
            padding-top: 45px;
            .personBox{
                display: flex;
                height: 100%;
                align-items: center;
                position: relative;
                .headImg{
                    display: inline-block;
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    vertical-align: middle;
                    box-shadow: 0 2px 10px #232323;
                    background-color: #eee;
                }
                .userName{
                    margin-left: 10px;
                    color: #fff;
                    font-size: 20px;
                    margin-bottom: 0;
                    // font-weight: 600;
                }
                .vipBox{
                    position: absolute;
                    right: 0;
                    .vipLogo{
                        color: #eee;
                        font-size: 20px;
                        text-shadow: 0 2px 8px #2a538d;
                        margin-right: 5px;
                    }
                    .text{
                        color: #eee;
                        font-weight: 600;
                        position: relative;
                        top: 1px;
                        .vipMore{
                            margin-left: 5px;
                            font-weight: 200;
                            font-size: 13px;
                        }
                    }
                }
            }
        }
        .myOrderBox{
            background-color: #fff;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 2px 10px #eee;
            .myTitle{
                font-weight: 600;
                padding-bottom: 15px;
                margin-top: 0;
                margin-bottom: 5px;
                color: #222;
                font-size: 17px;
                border-bottom: 1px solid #eee;
                position: relative;
                .moreOrder{
                    position: absolute;
                    right: 0;
                    top: 5px;
                    font-weight: normal;
                    color: #999;
                    font-size: 13px;
                    span{
                        font-size: 13px;
                    }
                }
            }
            .orderBox{
                display: flex;
                justify-content: space-around;
                .myOrderLogo{
                    margin-bottom: 3px;
                    transition: all .3s;
                    position: relative;
                    span{
                        font-size: 30px;
                    }
                    .orderCount{
                        font-style: normal;
                        position: absolute;
                        width: 20px;
                        height: 20px;
                        text-align: center;
                        line-height: 1.4;
                        border-radius: 50%;
                        border: 2px solid orangered;
                        color: orangered;
                        right: -5px;
                        top: 0;
                        background-color: #fff;
                        font-size: 12px;
                    }
                }
                .myOrder{
                    margin-bottom: 0;
                }
            }
        }
        .copyrightBox{
            margin-top: 30px;
            .copyright{
                font-size: 12px;
                color: rgb(180, 180, 180);
            }
        }
    }
</style>
