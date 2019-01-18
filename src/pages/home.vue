<template>
    <div class="home-com">
        <div class="container-fluid">
            <!-- banner -->
            <home-banner/>
            <!-- scrollNews -->
            <div class="scrollBox">
                <div class="text"><span>心</span>选<br/>资讯</div>
                <scroll-news class="scrollNews"/>
            </div>
            <!-- list -->
            <div class="bookList">
                <div class="bookListContent">
                    <h4 class="title">最受欢迎</h4>
                    <div class="bookContent">
                        <div class="row">
                            <div class="col-xs-4" v-for="(item,index) in bookList" v-if="index<3" @click="toDetail(item.id)">
                                <img :src="item.goodsImg" alt="" class="img-responsive bookImg">
                                <h4 class="bookName">{{item.goodsName}}</h4>
                                <p class="bookAuthor">{{item.goodsAuthor}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bookListContent">
                    <h4 class="title">限时特价</h4>
                    <div class="bookContent">
                        <div class="row">
                            <div class="col-xs-4" v-for="(item,index) in bookList" v-if="index>=3&&index<6" @click="toDetail(item.id)">
                                <img :src="item.goodsImg" alt="" class="img-responsive bookImg">
                                <h4 class="bookName">{{item.goodsName}}</h4>
                                <p class="bookAuthor">{{item.goodsAuthor}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bookListContent">
                    <h4 class="title">主编推荐</h4>
                    <div class="bookContentRow" v-for="(item,index) in bookList" v-if="index>=3&&index<6" @click="toDetail(item.id)">
                        <div class="row">
                            <div class="col-xs-4">
                                <img :src="item.goodsImg" alt="" class="img-responsive bookImg">
                            </div>
                            <div class="col-xs-8 pl0 pr160">
                                <h4 class="bookName">{{item.goodsName}}</h4>
                                <p class="bookAuthor">{{item.goodsAuthor}}</p>
                                <p class="bookPress">{{item.goodsPress}}</p>
                                <p class="bookDesc">{{item.goodsDescribe}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import homeBanner from '@/components/homePage/banner';
import scrollNews from '@/components/homePage/scrollNews'
export default {
    data() {
        return {
            bookList:[]
        }
    },
    components:{
        homeBanner,
        scrollNews
    },
    methods:{
        toDetail(id){
            let routeData =this.$router.resolve({name:"detail",params:{id:id}})
            window.location.href=routeData.href
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
        const data = new URLSearchParams();
        data.append('type', '新学说书籍');
        data.append('state', '上架');
        data.append('pageNum', '1');
        data.append('pageSize', '8');
        this.axios({
            method:'post',
            url:'/goods/goods_list.do',
            data:data
            }).then((res)=>{
            // console.log(res.data.data.list)
            this.bookList=res.data.data.list
        })

        // 存取code
        let args = this.getQueryStringArgs(),
            code = decodeURIComponent(args['code']),
            storage = window.localStorage
        storage['wxCode'] = code
    
        if(storage.wxCode!='undefined'){
            if(storage.openId){}else{
                const sendData=new URLSearchParams()
                sendData.append('code',code)
                this.axios({
                    method:"post",
                    url:'/wxPay/get_wx_info.do',
                    data:sendData
                }).then((res)=>{
                    storage['openid']=res.data.data.openid
                    storage['headimgurl']=res.data.data.headimgurl
                    storage['nickname']=res.data.data.nickname
                })
            }
        }else{
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx37e5ddff7dc5282e&redirect_uri=https%3a%2f%2fdata.xinxueshuo.cn%2fnsi-shop%2fdist%2findex.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
        }
    }
}
</script>

<style lang="scss">
    .home-com{
        .pl0{
            padding-left: 0;
            
        }
        .pr160{
            position: relative;
            min-height: 155px;
            @media (max-width: 376px) {
                min-height: 140px;
            }
            @media (max-width: 321px) {
                min-height: 110px;
            }
        }
        .bookList{
            margin-top: 40px;
            .bookListContent{
                margin-bottom: 40px;
            }
            .title{
                font-size: 20px;
                color: #222;
                margin-bottom: 30px;
                letter-spacing: 1px;
                font-weight: 600;
                position: relative;
                padding-left: 10px;
                &::before{
                    display: block;
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 1px;
                    width: 2px;
                    height: 20px;
                    background-color: #3368a9;
                    border-radius: 70px;
                }
            }
            .bookImg{
                border-radius: 4px;
                box-shadow: 0 5px 10px #ccc;
                margin-bottom: 5px;
            }
            .bookName{
                font-weight: 600;
                font-size: 17px;
                color: #333;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                min-height: 17px;
                max-height: 17px;
                margin: 6px 0;
            }
            .bookAuthor{
                font-size: 14px;
                color: #777;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                min-height: 20px;
                max-height: 20px;
            }
            .bookPress{
                font-size: 14px;
                color: #205590;
            }
            .bookContentRow{
                margin-bottom: 20px;
                .bookName{
                    margin-top: 0;
                }
                .bookDesc{
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    margin-bottom: 0;
                    // min-height: 38px;
                    // max-height: 38px;
                }
            }
        }

        // scrollNews
        .scrollBox{
            margin-top: 25px;
            display: flex;
            align-items: center;
            // box-shadow: 0 2px 10px #e4e4e4;
            box-shadow: 0 2px 10px #dde9f1;
            border-radius: 4px;
            padding: 5px 10px 5px 20px;
            .text{
                font-size: 19px;
                font-weight: 700;
                letter-spacing: 2px;
                position: relative;
                span{
                    color: rgb(247, 75, 75);
                }
                &::after{
                    display: block;
                    content:"";
                    width: 1px;
                    height: 50px;
                    background-color: #eee;
                    left: 53px;
                    top: 0;
                    position: absolute;
                }
            }
            .scrollNews{
                width: 79%;
                margin-left: 10px;
            }
        }
    }
</style>
