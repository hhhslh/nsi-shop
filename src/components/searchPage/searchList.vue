<template>
<div class="searchList-com" ref="list">
    <scroller :on-infinite="infinite" ref="myscroller" class="scroller-com" style="top:70px">
        <div class="container-fluid" style="padding-bottom:15px">
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
    </scroller>
</div>
</template>

<script>
export default {
    data() {
        return {
            noDate:false,
            bookList:[],
            pageNum:1,
            pageSize:8
        }
    },
    methods:{
        toDetail(id){
            let routeData =this.$router.resolve({name:"detail",params:{id:id}})
            window.location.href=routeData.href
        },
        getData(){
            const data = new URLSearchParams();
            data.append('type', '新学说书籍');
            data.append('state', '上架');
            data.append('pageNum', this.pageNum);
            data.append('pageSize', this.pageSize);
            this.axios({
                method:'post',
                url:'/goods/goods_list.do',
                data:data
                }).then((res)=>{
                // console.log(res.data.data)
                let maxSize=res.data.data.list.length
                if(this.pageNum==1){
                    this.bookList=res.data.data.list
                }else{
                    if(maxSize!=0){
                        this.bookList=this.bookList.concat(res.data.data.list)
                    }else{
                        this.noDate=true
                    }
                }
            })
        },
        infinite(done){
            let that=this
            if(this.noDate){
                this.$refs.myscroller.finishInfinite(true);//这个方法是不让它加载了，显示“没有更多数据”，要不然会一直转圈圈
            }else{
                if(this.noDate){
                    done(true)
                }else{
                    setTimeout(() => {
                        that.pageNum++;//下拉一次页数+1
                        that.getData();
                        done();//进行下一次加载操作
                    }, 1500);
                }
            }
        },
    },
    created(){
        this.getData()
    },
    mounted(){
        // this.$refs.list.style.minHeight=(window.innerHeight)+"px"
    }
}
</script>

<style lang="scss">
    .searchList-com{
        // padding-bottom: 45px;
        ._v-content{
          padding-bottom: 45px;
        }
        .pl0{
            padding-left: 0;
        }
        .pt30{
            padding-top: 30px;
        }
        .mt15{
            margin-top: 15px;
        }
        img{
            display: inline-block !important;
            border-radius: 4px;
            box-shadow: 0 5px 10px #ccc;
        }
        .scroller-com{
            padding-bottom: 45px;
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
