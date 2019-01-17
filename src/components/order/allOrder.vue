<template>
    <div class="orderState-com" ref="bg">
        <!-- <h4 class="title"><span class="iconfont icon-zuojiantou goBack" @click="goBack()"></span>全部订单</h4> -->
        <div class="orderItem" v-for="(item,index) in orderItem">
            <h5 class="goodsTitle">
                <span class="iconfont icon-dianpu goodsLogo"></span><span class="goodsShop">{{item.product.goodsPress}}</span>
                <span class="goodsState">{{item.statusDesc}}</span>
            </h5>
            <div class="goodsDesc">
                <div class="goodsPic">
                    <img width="100" height="100" :src="item.product.goodsImg" alt="" class="img-responsive" >
                </div>
                <div class="desc">
                    <p class="goodsName">{{item.product.goodsName}}</p>
                    <p class="goodsPrice">￥{{item.product.goodsPrice}}<span class="num">x{{item.quantity}}</span></p>
                </div>
            </div>
            <div class="total">
                <p class="text-right">共计{{item.quantity}}件商品 合计:￥<span class="totalPrice">{{item.total_price}}</span></p>
            </div>
        </div>
        <div class="noOrder" v-if="orderItem.length<=0">
            <p class="text-center noOrderLogo"><span class="iconfont icon-wuxiaodingdan"></span></p>
            <p class="text-center noOrderTxt">您还没有相关订单</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orderItem:[]
        }
    },
    methods:{
        goBack(){
            history.go(-1)
        }
    },
    created(){
        this.axios({
            method:'get',
            url:'/order/get_order_list.do',
            params:{
                'wechatId':'123123'
            }
        }).then((res)=>{
            // console.log(res.data.data)
            this.orderItem=res.data.data
        })
    },
    mounted(){
        this.$refs.bg.style.minHeight=(window.innerHeight-100)+"px"
    }
}
</script>

<style lang="scss">
@import '@/assets/css/orderCommon.scss';
</style>
