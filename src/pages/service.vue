<template>
    <div class="service-com" ref="bg">
        <router-link tag="h4" to="/mine" class="text-center myOrder"><span class="iconfont icon-zuojiantou"></span>客服</router-link>
        <div class="container-fluid">
            <div class="content">
                <p><span class="title">联系人：</span><span class="desc">小新</span></p>
                <p><span class="title">联系电话：</span><span class="desc">15010927730</span></p>
                <p><span class="title">联系地址：</span><span class="desc">北京市朝阳区曙光西里时间国际A座1501</span></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted(){
        this.$refs.bg.style.minHeight=(window.innerHeight-57)+"px";
    }
}
</script>

<style lang="scss">
    .service-com{
        background-color: #f7f7f7;
        .myOrder{
            position: relative;
            font-size: 17px;
            height: 35px;
            line-height: 27px;
            border-bottom: 1px solid #eee;
            background-color: #fff;
            span{
                position: absolute;
                left: 15px;
                color: #666;
            }
        }
        .content{
            background-color: #fff;
            padding: 15px;
            border-radius: 10px;
            margin-top: 10px;
            p{
                width: 100%;
                font-size: 14px;
                color: #656e73;
                display: flex;
                justify-content: center;
                &:last-of-type{
                    margin-bottom: 0;
                }
                span{
                    display: inline-block;
                }
                .title{
                    font-size: 15px;
                    color: #363d40;
                    width: 25%;
                    text-align: right;
                    @media (max-width: 321px) {
                        width: 30%;
                    }
                }
                .desc{
                    width: 75%;
                    @media (max-width: 321px) {
                        width: 70%;
                    }
                }
            }
        }
    }
</style>
