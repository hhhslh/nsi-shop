<template>
    <div class="layout-com" id="app">
        <!-- <keep-alive> -->
            <router-view/>
        <!-- </keep-alive> -->
        <div class="navBar">
            <ul class="barList">
                <router-link to="/" tag="li" exact>
                    <p class="iconBox text-center"><span class="iconfont icon-home"></span></p>
                    <p class="iconName text-center">首页</p>
                </router-link>
                <router-link to="/list" tag="li">
                    <p class="iconBox text-center"><span class="iconfont icon-liebiao1"></span></p>
                    <p class="iconName text-center">书库</p>
                </router-link>
                <router-link to="/course" tag="li">
                    <p class="iconBox text-center"><span class="iconfont icon-shipinbofangyingpian"></span></p>
                    <p class="iconName text-center">课堂</p>
                </router-link>
                <router-link to="/mine" tag="li">
                    <p class="iconBox text-center"><span class="iconfont icon-gerenzhongxin1"></span></p>
                    <p class="iconName text-center">我的</p>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:'app',
    mounted(){
    //   document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    //       WeixinJSBridge.call('hideToolbar');
    //     });
    }
}
</script>

<style lang="scss">
    .layout-com{
        position: relative;
        padding-bottom: 45px;
        .navBar{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: #fff;
            box-shadow: 0 -1px 10px #d8d8d8;
            z-index: 99;
            padding-top: 2px;
            .barList{
                display: flex;
                align-content: center;
                justify-content: space-around;
                list-style: none;
                padding-left: 0;
                li{
                    // padding: 10px 0 0 0;
                    height: 45px;
                    .iconBox{
                        margin-bottom: 0;
                    }
                    span{
                        font-size: 25px;
                        color: rgb(163, 162, 162);
                        font-weight: 600;
                    }
                    .iconName{
                        position: relative;
                        top: -3px;
                        font-size: 13px;
                        color: rgb(163, 162, 162);
                    }
                }
                .router-link-active{
                    span,.iconName{
                        transition: all .3s;
                        color: #333 !important;
                    }
                }
            }
        }
    }
</style>
