<template>
    <div class="searchList-com" ref="list">
        <div class="container-fluid searchContainer">
            <search/>
        </div>
        <search-list/>
    </div>
</template>

<script>
import searchList from '@/components/searchPage/searchList';
import search from '@/components/homePage/search'
export default {
    components:{
        searchList,
        search
    },
    mounted(){
      this.$refs.list.style.height=(window.innerHeight-45)+"px";
    }
}
</script>

<style lang="scss">
  .searchList-com{
    .searchContainer{
      background-color: #fff;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
      padding-bottom: 15px;
      width: 100%;
    }
  }
</style>
