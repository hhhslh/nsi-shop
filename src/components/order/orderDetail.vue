<template>
    <div class="orderDetail-com">
        <h4 class="text-center myOrder"><span class="iconfont icon-zuojiantou" @click="backPrePage()"></span>订单详情</h4>
        <div class="goodsBox">
            <h5 class="shopTitle"><span class="iconfont icon-dianpu"></span>{{itemDesc.product.goodsPress}}</h5>
            <div class="goodsDesc">
                <div class="goodsPic">
                    <img class="img-responsive" width="100" height="100" :src="itemDesc.product.goodsImg" alt="">
                </div>
                <div class="goodsInfo">
                    <p class="goodsName">{{itemDesc.product.goodsName}}</p>
                    <p class="goodsQuantity">数量：{{itemDesc.quantity}} 系列：{{itemDesc.product.goodsLabel}}</p>
                    <p class="goodsPrice">￥{{itemDesc.product.goodsPrice}}</p>
                </div>
            </div>
        </div>
        <div class="orderDesc">
            <p><span>订单编号：</span>{{itemDesc.orderNo}}</p>
            <p><span>下单时间：</span>{{setTime(itemDesc.createTime)}}</p>
            <p><span>支付方式：</span>在线支付</p>
            <p><span>配送方式：</span>普通快递</p>
        </div>
        <div class="orderPrice">
            <p>商品总额<span>￥{{itemDesc.total_price}}</span></p>
            <p>运费<span>+ ￥0.00</span></p>
            <div class="text-right needToPay">需付款：<span>￥{{itemDesc.total_price}}</span></div>
        </div>
        <div class="btnBox text-right">
            <a href="javascript:;" class="cancle">取消订单</a>
            <a href="javascript:;" class="toPay">去支付</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            itemDesc:{}
        }
    },
    methods:{
        fetchDate(){
            let listId = this.$route.params.id;
            this.axios({
                method:"get",
                url: '/order/find_order_item.do',
                params:{
                    // wechatId:'123123',
                    wechatId:localStorage.getItem('openId'),
                    orderNo:listId
                }
            }).then((res)=>{
                this.itemDesc=res.data.data
                console.log(this.itemDesc)
            })
        },
        backPrePage(){
            history.go(-1)
        },
        setTime(str){
            let date = new Date(str),
            Y = date.getFullYear() + '-',
            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
            D = date.getDate() + ' ',
            h = date.getHours() + ':',
            m = date.getMinutes() + ':',
            s = date.getSeconds(); 
            return Y+M+D+h+m+s 
        }
    },
    mounted(){
        this.fetchDate()
    }
}
</script>

<style lang="scss">
    .orderDetail-com{
        .myOrder{
            position: relative;
            font-size: 19px;
            height: 35px;
            line-height: 35px;
            span{
                position: absolute;
                left: 15px;
                color: #666;
            }
        }
        .goodsBox{
            padding: 10px;
            border-top: 8px solid #eee;
            border-bottom: 8px solid #eee;
            .shopTitle{
                margin-top: 0;
                height: 30px;
                line-height: 30px;
                color: #232323;
                position: relative;
                font-weight: 600;
                span{
                    font-size: 18px;
                    display: inline-block;
                    margin-right: 5px;
                    color: #666;
                    position: relative;
                    top: 1px;
                }
            }
            .goodsDesc{
                display: flex;
                align-items: flex-start;
                .goodsPic{
                    flex: 0 0 auto;
                    margin-right: 10px;
                    img{
                        border-radius: 4px;
                    }
                }
                .goodsInfo{
                    width: 100%;
                    word-break: break-all;
                    .goodsName,.goodsPrice{
                        font-weight: 600;
                        font-size: 14px;
                    }
                    .goodsQuantity{
                        font-size: 13px;
                        color: #888;
                    }

                }
            }
        }
        .orderDesc{
            padding: 10px;
            border-bottom: 8px solid #eee;
            p{  
                color: #555;
                line-height:2;
                &:last-of-type{
                    margin-bottom: 0;
                }
                span{
                    font-weight: 600;
                    color: #232323;
                }
            }
        }
        .orderPrice{
            padding: 10px;
            border-bottom: 8px solid #eee;
            p{
                font-weight: 600;
                position: relative;
                span{
                    position: absolute;
                    right: 0;
                }
            }
            .needToPay{
                font-weight: 600;
                span{
                    color: red;
                    font-size: 19px;
                }
            }
        }
        .btnBox{
            position: fixed;
            width: 100%;
            bottom: 0;
            left: 0;
            height: 57px;
            line-height: 57px;
            z-index: 100;
            background-color: #fff;
            padding: 0 10px;
            a{
                margin-left: 15px;
                padding: 7px 20px;
                border-radius: 20px;
            }
            .cancle{
                color: #232323;
                border: 1px solid #ccc;
            }
            .toPay{
                background-color: rgb(255, 38, 0);
                border: 1px solid rgb(255, 38, 0);
                color: #fff;
                box-shadow: 0 3px 10px rgb(252, 116, 93);
            }
        }
    }
</style>
