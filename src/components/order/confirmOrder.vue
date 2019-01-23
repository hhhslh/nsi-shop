<template>
    <div class="orderState-com" ref="bg" v-loading='loading'>
        <!-- <h4 class="title"><span class="iconfont icon-zuojiantou goBack" @click="goBack()"></span>全部订单</h4> -->
        <div class="orderItem" v-for="(item,index) in orderItem" v-if="item.statusDesc==='已发货'">
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
                    <p class="goodsPress">{{item.product.goodsPress}}<span>系列：{{item.product.goodsSeries}}</span></p>
                    <p class="goodsPrice">￥{{item.product.goodsPrice}}<span class="num">x{{item.quantity}}</span></p>
                </div>
            </div>
            <div class="total">
                <p class="text-right">共计{{item.quantity}}件商品 合计:￥<span class="totalPrice">{{item.total_price}}</span></p>
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
            orderCode:'1',
            orderItem:[],
            loading:true
        }
    },
    methods:{
        goBack(){
            history.go(-1)
        },
        toDetail(orderNum){
            let routeData =this.$router.resolve({name:"orderDetail",params:{id:orderNum}})
            window.location.href=routeData.href
        },
    },
    created(){
        this.axios({
            method:'get',
            url:'/order/get_order_list.do',
            params:{
                // 'wechatId':'123123'
                'wechatId':localStorage.getItem('openId')
            }
        }).then((res)=>{
            this.loading=false
            this.orderCode=res.data.code
            this.orderItem=res.data.data
            if(this.orderCode!=1){
                let orderList=res.data.data
                let waitPayList=[]
                for(let i=0;i<orderList.length;i++){
                    if(orderList[i].status===4){
                        waitPayList.push(orderList[i])
                    }
                }
                if(waitPayList.length==0){
                    this.orderCode='1'
                }else{
                    this.orderCode=''
                }
            }
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
