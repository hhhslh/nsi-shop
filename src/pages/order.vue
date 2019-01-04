<template>
    <div class="order-com">
        <h4 class="order-title text-center"><span class="back iconfont icon-zuojiantou" @click="backPrePage()"></span>确认订单</h4>
        <!-- 地址 -->
        <div class="addressBox">
            <div class="addressLogo">
                <span class="iconfont icon-dizhi"></span>
            </div>
            <div class="adddressInfo">
                <p class="person">收货人：张益达<span class="phone">17696028573</span></p>
                <p class="address">收货地址：北京市朝阳区曙光西里时间国际A座1501北京市朝阳区曙光西里时间国际A座1501<span class="moreAddress iconfont icon-iconfonticonfonti2copycopy" @click="manageAddress()"></span></p>
            </div>
        </div>
        <!-- 商品信息 -->
        <div class="shopInfo">
            <p class="title">商品信息</p>
            <div class="goodsInfo">
                <div class="goodsPic">
                    <img src="../assets/searchPage/book.jpg" alt="" class="img-responsive">
                </div>
                <div class="goodsDesc">
                    <p class="goodsName">Vue2.5开发去哪网APP 从零基础入门到实战项目</p>
                    <p class="goodsPrice">￥188<span class="num">x{{num}}</span></p>
                </div>
            </div>
        </div>
        <div class="goodsNum">
            <p>购买数量
                <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字" class="countNum"></el-input-number>
            </p>
        </div>
        <div class="message">
            <p>买家留言：<input class="txt" type="text" placeholder="填写留言"></p>
        </div>
        <!-- 购买btn -->
        <div class="buyBtnBox">
            <div>合计金额：<span class="rmb">￥</span><span class="totalPrice">{{totalPrice}}</span></div>
            <div class="apply">立即支付</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            num:1,
            totalPrice:188
        }
    },
    methods:{
        handleChange(value) {
            console.log(value);
            this.countPrice()
        },
        countPrice(){
            return this.totalPrice=188*this.num
        },
        backPrePage(){
            history.back(-1)
        },
        manageAddress(){
            this.$router.push({path:'/manageAddress'})
        }
    }
}
</script>

<style lang="scss">
    .order-com{
        .order-title{
            height: 50px;
            line-height: 50px;
            color: #333;
            background-color: #f9f9f9;
            margin-top: 0;
            position: relative;
            .back{
                position: absolute;
                left: 15px;
            }
        }
        .addressBox{
            padding: 15px 20px 15px 15px;
            display: flex;
            align-content: center;
            border-bottom: 8px solid #eee;
            .addressLogo{
                display: flex;
                justify-content: center;
                align-content: center;
                padding-top: 25px;
                padding-right: 15px;
                span{
                    display: inline-block;
                    font-size: 25px;
                    color: #666;
                    // font-weight: 600;
                }
            }
            .adddressInfo{
                position: relative;
                padding-right: 15px;
                .person{
                    position: relative;
                    .phone{
                        position: absolute;
                        right: 0;
                        top: 0;
                    }
                }
                .address{
                    position: relative;
                    .moreAddress{
                        position: absolute;
                        right: -20px;
                        top: 50%;
                        transform: translateY(-50%)
                    }
                }
            }
        }
        .shopInfo{
            padding: 15px;
            border-bottom: 1px solid #eee;
            .title{
                color: #555;
            }
            .goodsInfo{
                display: flex;
                justify-content: center;
                padding: 15px;
                background-color: #f3f3f3;
                border-radius: 4px;
                .goodsPic{
                    padding-right: 10px;
                    img{
                        width: 100px;
                        border-radius: 4px;
                    }
                }
                .goodsDesc{
                    .goodsPrice{
                        color: #f93e3e;
                        position: relative;
                        .num{
                            position: absolute;
                            right: 0;
                            color: #666;
                        }
                    }
                }
            }
        }
        .goodsNum{
            padding: 15px;
            color: #555;
            border-bottom: 1px solid #eee;
            position: relative;
            p{
                margin-bottom: 0;
                padding-top: 5px;
                padding-bottom: 5px;
            }
            .countNum{
                position: absolute;
                right: 10px;
                top: 9px
            }
        }
        .message{
            padding: 15px;
            color: #555;
            .txt{
                border: none;
                outline: none;
                width: 74%;
            }
        }
        .buyBtnBox{
            position: fixed;
            bottom: 0;
            width: 100%;
            background-color: #fff;
            z-index: 100;
            height: 55px;
            line-height: 55px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 15px;
            .rmb{
                color: #f93e3e;
                font-size: 16px;
            }
            .totalPrice{
                color: #fb2727;
                font-size: 25px;
            }
            .apply{
                background-color: #fb2727;
                width: 100px;
                text-align: center;
                height: 35px;
                line-height: 35px;
                border-radius: 4px;
                margin: 0 3px;
                color: #fff;
            }
        }
    }
</style>
