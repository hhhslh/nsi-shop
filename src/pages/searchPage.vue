<template>
    <div class="searchList-com">
        <div class="container-fluid">
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
    }
}
</script>

<style lang="scss">
</style>
