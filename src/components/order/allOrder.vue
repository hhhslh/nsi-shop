<template>
    <div class="orderState-com" ref="bg" v-loading='loading'>
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
                    <p class="goodsPress">{{item.product.goodsPress}}</p>
                    <p class="goodsPress goodsPress01"><span>系列：{{item.product.goodsSeries}}</span></p>
                    <p class="goodsPrice">￥{{item.product.goodsPrice}}<span class="num">x{{item.quantity}}</span></p>
                </div>
            </div>
            <div class="total">
                <p class="text-right">共计{{item.quantity}}件商品 合计:￥<span class="totalPrice">{{item.total_price}}</span></p>
            </div>
            <div class="btnBox text-right" v-if="item.statusDesc==='未支付'">
                <a href="javascript:;" class="cancle" @click="cancleOrder(item.orderNo)">取消订单</a>
                <a href="javascript:;" class="toPay" @click="toPay(item)">付款</a>
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
        getOrderList(){
                this.axios({
                method:'get',
                url:'/order/get_order_list.do',
                params:{
                    'wechatId':localStorage.getItem('openId')
                }
            }).then((res)=>{
                this.loading=false
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
        },
        toPay(item){
            let that=this
            // console.log(item)
            this.axios({
                method:'get',
                url:'/Pay/WxPay_public.do',
                params:{
                    openid:localStorage.getItem('openId'),
                    body:item.product.goodsName,
                    // total_fee:item.totalPrice,
                    total_fee:'0.01',
                    out_trade_no:item.orderNo
                }
            }).then((res)=>{
                let payment=res.data.data
                let appId = payment.appId
                let timeStamp = payment.timeStamp
                let nonceStr = payment.nonceStr
                let packageNum = payment.package
                let signType = payment.signType
                let paySign = payment.paySign

                function onBridgeReady(){
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            "appId": appId, //公众号名称，由商户传入     
                            "timeStamp": timeStamp, //时间戳，自1970年以来的秒数     
                            "nonceStr": nonceStr, //随机串     
                            "package": packageNum,
                            "signType": signType, //微信签名方式：     
                            "paySign": paySign //微信签名 
                        },
                        function(res) {
                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                //alert("支付成功")
                                let routeData =that.$router.resolve({name:"orderAll"})
                                window.location.href=routeData.href
                            } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                        }
                    );
                }

                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                    }
                } else {
                    onBridgeReady();
                }
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
