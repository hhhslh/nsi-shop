<template>
    <div class="detailPage-com">
        <div class="bookBox" >
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
            <span class="buyBtn price">￥{{book.goodsPrice}}</span>
            <!-- <span class="buyBtn shoppingCart">加入购物车</span> -->
            <span class="buyBtn buy">立即购买</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            book:{}
        }
    },
    methods:{
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
                console.log(this.book)
                // document.title=this.detail.title
                // 微信分享
                // this.wxShareInfo.title=shareInfo.title
                // this.wxShareInfo.imgUrl=shareInfo.coverImage
                // this.wxShareInfo.desc=shareInfo.summary
            })
        },
    },
    created(){
        this.fetchDate()
    }
}
</script>

<style lang="scss">
    .detailPage-com{
        padding-bottom: 55px;
        .bookBox{
           position: relative;
           height: 240px;
           overflow: hidden;
           position: relative;
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
           .bookBgImg{
               width: 100%;
               height: 240px;
               filter: blur(12px);
           }
           .bookInfo{
               position: absolute;
               left: 0;
               top: 0;
               width: 100%;
               height: 100%;
               z-index: 2;
               display: flex;
                height: 100%;
                align-items: center;
                padding-left: 15px;
                padding-right: 15px;
               .bookInfoBox{
                   .bookInfo-img{
                       width: 120px;
                       max-width: 120px;
                       border-radius: 4px;
                       box-shadow: 0 5px 10px #616060;
                   }
               }
               .bookDescBox{
                   margin-left: 15px;
                   color: #FFF;
                   .name{
                        font-size: 22px;
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
            .buyBtn{
                width: 100px;
                text-align: center;
                height: 35px;
                line-height: 35px;
                border-radius: 4px;
                margin: 0 3px;
            }
            .price{
                font-size: 19px;
                color: #fb2727;
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
