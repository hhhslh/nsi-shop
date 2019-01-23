<template>
    <div class="search-com">
        <div class="scroll-wrap">
            <span class="iconfont icon-sousuo searchLogo"></span>
            <ul class="scroll-content" :style="{ top }">
                <li @click="toResult" v-for="(item,index) in prizeList" class="animated" :class="{'fadeInUp':activeIndex===index,'fadeOutUp':activeIndex===index&&fadeOut}">{{item.goodsName}}</li >
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      prizeList: [],
      activeIndex: 0,
      fadeOut:false
    }
  },
  methods:{
      toResult(){
        let routeData =this.$router.resolve({name:"result"})
        window.location.href=routeData.href
      }
  },
  computed: {
    top() {
      return - this.activeIndex * 40 + 'px';
    }
  },
  created(){
        const data = new URLSearchParams();
        data.append('type', '新学说书籍');
        data.append('state', '上架');
        data.append('pageNum', '1');
        data.append('pageSize', '8');
        this.axios({
            method: 'post',
            url: '/goods/goods_list.do',
            data: data
        }).then((res)=>{
            const msg=res.data.data.list
            // console.log(msg)
            for(let i=0;i<msg.length;i++){
                this.prizeList.push(msg[i])
            }
        })
  },
  mounted() {
    setInterval(_ => {
      if(this.activeIndex < this.prizeList.length-1) {
        this.fadeOut=false
        setTimeout(()=>{
            this.fadeOut=true
        },3000)
        this.activeIndex += 1;
      } else {
        this.fadeOut=false
        setTimeout(()=>{
            this.fadeOut=true
        },3000)
        this.activeIndex = 0;
      }
    }, 4000);
  }
};
</script>

<style lang="scss">
    .search-com{
        margin-top: 15px;
        .scroll-wrap{
            width: 100%;
            height: 40px;
            // box-shadow: 0 2px 10px #e4e4e4;
            overflow: hidden;
            border-radius: 20px;
            background-color: #f5f5f5;
            position: relative;
            color: #888;
            .searchLogo{
                position: absolute;
                font-size: 18px;
                left: 15px;
                top: 8px;
            }
        }
        .scroll-content{
            position: relative;
            padding-left: 30px;
            padding-right: 15px;
            li{
                height: 40px;
                display: flex;
                align-items: center;
                margin-left: 15px;
                color: #888;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
</style>
