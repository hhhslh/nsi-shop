<template>
    <div class="banner-com">
        <div class="swiper-container indexBannerM" id="indexBannerM">
          <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(bannerInfos,item) in bannerList" :key="item" v-if="item<4">
                  <img :src="bannerInfos.content03" alt="" class="img-responsive" @click="toDetail(bannerInfos.content02)">
              </div>
          </div>
          <div class="swiper-pagination" slot="pagination"></div>
      </div>
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
export default {
    data() {
        return {
            bannerList:[]
        }
    },
    methods:{
        getBannerInfo(){
            this.axios({
                method:"get",
                // url:"/manager/official/list.do",
                url:"https://data.xinxueshuo.cn/nsi-1.0/manager/official/list.do",
                params:{
                        'type':'官网首页banner'
                    }
            }).then((res)=>{
                this.bannerList=res.data.data
                this.$nextTick(()=>{
                    this.swiperInit()
                })
            })
        },
        swiperInit(){
            const self=this
            new Swiper('#indexBannerM', {
                notNextTick: true,
                autoplay: {
                    delay:3000,
                    disableOnInteraction: false,
                },
                loop: true,
                speed:600,
                grabCursor : true,
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
            })
        },
    },
    mounted(){
        this.getBannerInfo()
    }
}
</script>

<style lang="scss">
    .banner-com{
        .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
            bottom: 0;
        }
        .swiper-pagination-bullet{
            width: 15px;
            height: 3px;
            border-radius: 50px;
            opacity: 1;
            background-color: #fff;
        }
        margin-top: 20px;
        border-radius: 4px;
        height: 160px;
        overflow: hidden;
        box-shadow: 0 5px 10px #dde9f1;
        img{
            display: inline-block;
            // max-width: 100%;
            // height: auto;
            width: 100%;
            height: 160px;
        }
        .indexBannerM{
            min-height: 160px;
            border-radius: 4px;
            overflow: hidden;
            background-color: #f5f5f5;
        }
        .swiper-pagination-bullet-active{
            background: orangered !important;
        }
    }
</style>
