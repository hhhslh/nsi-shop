<template>
    <div class="searchList-com pt30">
        <div class="container-fluid">
            <!-- search -->
            <!-- searchList -->
            <div class="row bookList" v-for="(book,index) in bookList" @click="toDetail(book.id)">
                <div class="col-xs-4">
                    <div class="picBox">
                        <img :src="book.goodsImg" alt="" class="img-responsive">
                    </div>
                </div>
                <div class="col-xs-8 pl0">
                    <div class="infoBox">
                        <!-- <p class="englishName">{{book.englishName}}</p> -->
                        <p class="name">{{book.goodsName}}</p>
                        <p class="author">{{book.goodsAuthor}}</p>
                        <p class="bookInfo">{{book.goodsDescribe}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bookList:[]
        }
    },
    methods:{
        toDetail(id){
            let routeData =this.$router.resolve({name:"detail",params:{id:id}})
            window.open(routeData.href, '_blank');
        }
    },
    created(){
        const data = new URLSearchParams();
        data.append('type', '新学说书籍');
        data.append('state', '上架');
        this.axios({
            method:'post',
            url:'/goods/goods_list.do',
            data:data
            }).then((res)=>{
            // console.log(res.data.data)
            this.bookList=res.data.data
        })
    }
}
</script>

<style lang="scss">
    .searchList-com{
        .pl0{
            padding-left: 0;
        }
        .pt30{
            padding-top: 30px;
        }
        img{
            display: inline-block !important;
            border-radius: 4px;
            box-shadow: 0 5px 10px #ccc;
        }
        .bookList{
            margin-bottom: 20px;
        }
        .infoBox{
            min-height: 155px;
            max-height: 155px;
            @media (max-width: 376px) {
                min-height: 140px;
                max-height: 140px;
            }
            @media (max-width: 351px) {
                min-height: 111px;
                max-height: 111px;
            }
            p{
                margin-bottom: 3px;
            }
            .englishName{
                font-size: 22px;
                color: #333;
                // font-weight: 600;
                font-family: -webkit-pictograph,-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }
            .name{
                font-size: 19px;
                color: #232323;
                font-weight: 600;
            }
            .author{
                font-size: 14px;
                color: rgb(141, 141, 141);
            }
            .bookInfo{
                padding-right: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                position: absolute;
                bottom: 0;
                left: 0;
                color: rgb(83, 83, 83);
            }
        }
    }
</style>
