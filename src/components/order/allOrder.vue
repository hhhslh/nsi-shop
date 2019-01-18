<template>
    <div class="orderState-com" ref="bg">
        <!-- <h4 class="title"><span class="iconfont icon-zuojiantou goBack" @click="goBack()"></span>全部订单</h4> -->
        <div class="orderItem" v-for="(item,index) in orderItem">
            <h5 class="goodsTitle">
                <span class="iconfont icon-dianpu goodsLogo"></span><span class="goodsShop">{{item.product.goodsPress}}</span>
                <span class="goodsState">{{item.statusDesc}}</span>
            </h5>
            <div class="goodsDesc" @click="toDetail(item.orderNo)">
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
            <div class="btnBox text-right" v-if="item.statusDesc==='未支付'">
                <a href="javascript:;" class="cancle" @click="cancleOrder(item.orderNo)">取消订单</a>
                <a href="javascript:;" class="toPay">付款</a>
            </div>
        </div>
        <div class="noOrder" v-if="orderCode=='1'">
            <p class="text-center noOrderLogo"><span class="iconfont icon-wuxiaodingdan"></span></p>
            <p class="text-center noOrderTxt">您还没有相关订单</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orderCode:'',
            orderItem:[]
        }
    },
    methods:{
        getOrderList(){
                this.axios({
                method:'get',
                url:'/order/get_order_list.do',
                params:{
                    'wechatId':localStorage.getItem('openId')
                }
            }).then((res)=>{
                this.orderCode=res.data.code
                this.orderItem=res.data.data
            })
        },
        goBack(){
            history.go(-1)
        },
        toDetail(orderNum){
            let routeData =this.$router.resolve({name:"orderDetail",params:{id:orderNum}})
            window.location.href=routeData.href
        },
        cancleOrder(ordernum){
            this.axios({
                method:'get',
                url:'/order/cancel_me.do',
                params:{
                    // wechatId:'123123',
                    wechatId:localStorage.getItem('openId'),
                    orderNo:ordernum
                }
            }).then((res)=>{
                this.$message({
                    message: '订单取消成功',
                    type: 'info'
                });
                this.getOrderList()
            })
        }
    },
    created(){
        this.getOrderList()
    },
    mounted(){
        this.$refs.bg.style.minHeight=(window.innerHeight-100)+"px"
    }
}
</script>

<style lang="scss">
@import '@/assets/css/orderCommon.scss';
</style>
