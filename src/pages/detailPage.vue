<template>
    <div class="detailPage-com">
        <div class="bookBox" >
            <div class="backBox" @click="backPrePage">
                <span class="iconfont icon-zuojiantou"></span>
            </div>
            <div class="bookBg">
                <img :src="book.goodsImg" alt="" class="bookBgImg">
            </div>
            <div class="bookInfo">
                <div class="bookInfoBox">
                    <img :src="book.goodsImg" alt="" class="img-responsive bookInfo-img">
                </div>
                <div class="bookDescBox">
                    <p class="name">{{book.goodsName}}</p>
                    <p class="author">{{book.goodsAuthor}}</p>
                    <p class="visit">{{book.goodsVisitcount}}人阅读</p>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row descriptionBox">
                <div class="col-xs-12">
                    <div class="descBox">
                        <h3 class="title">描述</h3>
                        <p class="descInfo">{{book.goodsDescribe}}</p>
                        <p class="labelBox">
                            <span class="labelDesc">{{book.goodsLabel}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="content" v-html="book.goodsInfo"></div>
        <div class="buyBox">
            <span class="buyBtn price">售价：<span>￥{{book.goodsPrice}}</span><em class="free">免运费</em></span>
            <!-- <span class="buyBtn shoppingCart">加入购物车</span> -->
            <router-link to="/order" tag="span" class="buyBtn buy" @click.native="saveGoodsInfo">立即购买</router-link>
        </div>
        <service-detail></service-detail>
    </div>
</template>

<script>
import serviceDetail from '../pages/serviceDetail'
import wxShareInit from '@/assets/js/weChatShare.js';
export default {
    components:{
        serviceDetail
    },
    data() {
        return {
            book:{},
            wxShareInfo:{
                title:"",
                imgUrl:"",
                href:'',
                desc:""
            },
            listId:'',
            // isShare:false
        }
    },
    methods:{
        backPrePage(){
            if(history.length>0){
                if(localStorage.getItem('isShare')){
                    location.href="http://www.xinxueshuo.cn/nsi-shop/dist/index.html"
                }else{
                    history.go(-1)
                }
            }else{
                location.href="http://www.xinxueshuo.cn/nsi-shop/dist/index.html"
            }
        },
        fetchDate(){
            this.listId = this.$route.params.id;
            this.axios({
                method:"get",
                url: '/goods/goods_detail.do',
                params:{
                    Id:this.listId
                }
            }).then((res)=>{
                this.book=res.data.data
                // console.log(this.book)
                // document.title=this.detail.title
                // 微信分享
                this.wxShareInfo.title="心选书籍 | "+this.book.goodsName
                this.wxShareInfo.imgUrl=this.book.goodsImg
                this.wxShareInfo.href='https://www.xinxueshuo.cn/nsi-shop/dist/index.html#/detailPage/'+this.listId
                this.wxShareInfo.desc=this.book.goodsDescribe
            })
        },
        saveGoodsInfo(){
            localStorage.setItem("goodsId",this.book.id)
            localStorage.setItem("goodsName",this.book.goodsName)
            localStorage.setItem("goodsPrice",this.book.goodsPrice)
            localStorage.setItem("goodsPic",this.book.goodsImg)
        },
        getQueryStringArgs() {
            var qs = location.search.length > 0 ? location.search.substring(1) : '',
                args = {},
                items = qs.length ? qs.split('&') : [],
                item = null,
                name = null,
                value = null,
                i = 0,
                len = items.length;
            for (i = 0; i < len; i++) {
                    item = items[i].split('=');
                    name = decodeURIComponent(item[0]);
                    value = decodeURIComponent(item[1]);
                    name = item[0];
                    value = item[1];

                if (name.length) {
                    args[name] = value;
                }
            }
            return args;
        }
    },
    created(){
        this.fetchDate()
        setTimeout(wxShareInit.wxReady(this.wxShareInfo),500)
    }
}
</script>

<style lang="scss">
    .detailPage-com{
        .bookBox{
           position: relative;
           height: 260px;
           overflow: hidden;
            &::after{
                content: "";
                width:100%;
                height:100%;
                position: absolute;
                left:0;
                top:0;
                background-color: rgba(95, 95, 95, 0.2);
                z-index: 1;
            }
           .backBox{
               position: absolute;
               margin: 15px;
               border-radius: 50%;
               color: #fff;
               width: 30px;
               height: 30px;
               text-align: center;
               line-height: 30px;
               background-color: rgba(0, 0, 0, .5);
               z-index: 99;
               span{
                   position: relative;
                   left: -1px;
               }
           }
           .bookBg{
               position: relative;
               top: -70%;
           }
           .bookBgImg{
               width: 100%;
            //    height: 240px;
               filter: blur(20px);
           }
           .bookInfo{
               position: absolute;
               left: 0;
               top: 0;
               width: 100%;
               height: 100%;
               z-index: 2;
               display: flex;
               align-items: center;
               padding-left: 15px;
               padding-right: 15px;
               padding-top: 30px;
               .bookInfoBox{
                   .bookInfo-img{
                       width: 120px;
                       max-width: 120px;
                       border-radius: 4px;
                    //    box-shadow: 0 5px 10px #616060;
                       box-shadow: 0 4px 15px #232323;
                   }
               }
               .bookDescBox{
                   margin-left: 15px;
                   color: #FFF;
                   .name{
                        font-size: 20px;
                        font-weight: 600;
                   }
                   .author{
                       font-size: 16px;
                       color: #efefef;
                   }
                   .visit{
                       color: #efefef;
                       margin-top: 30px;
                   }
               }
           }
        }
        .descriptionBox{
            border-bottom: 10px solid #f7f5f5;
            padding-bottom: 15px;
            .descBox{
                .title{
                    font-size: 18px;
                    color: #616060;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #eee;
                    letter-spacing: 1px;
                }
                .descInfo{
                    font-size: 15px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                }
                .labelBox{
                    margin-top: 30px;
                    .labelDesc{
                        display: inline-block;
                        padding: 4px 15px;
                        background-color: #eee;
                        border-radius: 20px;
                        color: #666;
                    }
                }
            }
        }
        .content{
            img{
                display: inline-block;
                max-width: 100%;
                height: auto;
            }
        }
        .buyBox{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: #FFF;
            padding: 8px 15px;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            z-index: 100;
            .buyBtn{
                width: 120px;
                text-align: center;
                height: 40px;
                line-height: 40px;
                border-radius: 4px;
                margin: 0 3px;
            }
            .price{
                font-size: 19px;
                color: #fb2727;
                // font-weight: 600;
                width: 160px;
                span{
                    font-weight: 600;
                    font-size: 22px;
                }
                .free{
                    font-style: normal;
                    font-size: 14px;
                    color: #9c9a9a;
                    position: relative;
                    left: 10px;
                    top: -1px;
                }
            }
            .shoppingCart{
                background-color: #ffaaaa;
                color: #fb2727;
            }
            .buy{
                background-color: #fb2727;
                color: #fff;
            }
        }
    }
</style>
