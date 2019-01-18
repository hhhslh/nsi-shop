<template>
    <div class="order-com">
        <h4 class="order-title text-center"><span class="back iconfont icon-zuojiantou" @click="backPrePage()"></span>确认订单</h4>
        <!-- 地址 -->
        <div class="addressBox" :class="{'justCenter':hasNoAddress}">
            <div class="addressLogo" v-show="!hasNoAddress">
                <span class="iconfont icon-dizhi" ></span>
            </div>
            <div class="noAddress" v-if="hasNoAddress">
                <span class="iconfont icon-zanwukoubei"></span>
                <p class="text-center">暂无收货地址<span class="addAddress" @click="editAddress">添加地址</span></p>
            </div>
            <div class="adddressInfo" v-else>
                <p class="person">收货人：{{name}}<span class="phone">{{phoneVal}}</span></p>
                <p class="address">收货地址：{{addressVal}}<span class="moreAddress iconfont icon-iconfonticonfonti2copycopy" @click="manageAddress()"></span></p>
            </div>
        </div>
        <!-- 商品信息 -->
        <div class="shopInfo">
            <p class="title">商品信息</p>
            <div class="goodsInfo">
                <div class="goodsPic">
                    <img src="../assets/searchPage/book.jpg" width="100" height="100" alt="" class="img-responsive">
                </div>
                <div class="goodsDesc">
                    <p class="goodsName">{{goodsName}}</p>
                    <p class="goodsPrice">￥{{goodsPrice}}<span class="num">x{{num}}</span></p>
                </div>
            </div>
        </div>
        <div class="goodsNum">
            <p>购买数量
                <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字" class="countNum"></el-input-number>
            </p>
        </div>
        <div class="message">
            <p>买家留言：<input class="txt" type="text" placeholder="填写留言" ref="buyerMessage"></p>
        </div>
        <!-- 购买btn -->
        <div class="buyBtnBox">
            <div>合计金额：<span class="rmb">￥</span><span class="totalPrice">{{totalPrice}}</span></div>
            <div class="apply" @click="sendShoppingInfo">立即支付</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            num:1,
            totalPrice:188,
            name:'',
            phoneVal:'',
            province:'',
            city:'',
            addressDetail:'',
            addressVal:'',
            hasNoAddress:true,
            goodsName:'',
            goodsPrice:''
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
        },
        editAddress(){
            this.$router.push({path:'/createAddress'})
        },
        sendShoppingInfo(){
            let name=localStorage.getItem("name")
            let goodsId=localStorage.getItem("goodsId")
            let openId=localStorage.getItem('openId')
            let buyerMessage=this.$refs.buyerMessage.value
            let num=this.num
            const data = new URLSearchParams();
            data.append('wechatId', openId);
            data.append('goodsId', goodsId);
            data.append('quantity', num);
            data.append('buyerMessage', buyerMessage);
            this.axios({
                method:'post',
                url:'/order/create.do',
                data:data
            }).then((res)=>{
                console.log(res.data.data)
            })
        }
    },
    created(){
        let storage = window.localStorage
        this.goodsName=localStorage.getItem("goodsName")
        this.goodsPrice=localStorage.getItem("goodsPrice")
        this.axios({
            method:"get",
            url: '/ShopAddress/getList.do',
            params:{
                wechatId:storage.openid
            }
        }).then((res)=>{
            this.hasNoAddress=false
            // 0成功 1失败
            let code=res.data.code
            let receiver=res.data.data
            // console.log(res.data.data)
            if(code===0){
                this.name=receiver.receivename
                this.phoneVal=receiver.receivephone
                this.province=receiver.receivearea01
                this.city=receiver.receivearea02
                this.addressDetail=receiver.receivearea03
                this.addressVal=this.province+' '+this.city+' '+this.addressDetail
                localStorage.setItem("name",this.name)
            }else{
                this.hasNoAddress=true
            }
        })
    },
    mounted(){

    }
}
</script>

<style lang="scss">
    .order-com{
        .justCenter{
            justify-content: center
        }
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
                padding-top: 20px;
                padding-right: 15px;
                span{
                    display: inline-block;
                    font-size: 25px;
                    color: #666;
                    // font-weight: 600;
                }
            }
            .noAddress{
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                span{
                    font-size: 45px;
                }
                p{
                    color: #888;
                    font-size: 14px;
                    margin-top: 15px;
                }
                .addAddress{
                    font-size: 14px;
                    display: inline-block;
                    background-color: orangered;
                    color: #fff;
                    padding: 2px 15px;
                    margin-left: 10px;
                    border-radius: 4px;
                }
            }
            .adddressInfo{
                position: relative;
                padding-right: 15px;
                width: 90%;
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
                align-content: flex-start;
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
                    width: 100%;
                    .goodsPrice{
                        color: #f93e3e;
                        position: relative;
                        .num{
                            position: absolute;
                            right: 0;
                            color: #666;
                        }
                    }
                    .goodsName{
                        word-break: break-all;
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
            height: 58px;
            line-height: 58px;
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
                width: 120px;
                text-align: center;
                height: 40px;
                line-height: 40px;
                border-radius: 4px;
                margin: 0 3px;
                color: #fff;
            }
        }
    }
</style>
