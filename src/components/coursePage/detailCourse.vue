<template>
    <div class="detailCourse-com">
        <video src="https://nsi-class-video.oss-cn-zhangjiakou.aliyuncs.com/class/test.mp4" class="play" controls ref="play" controlslist="nodownload"></video>
        this is detailCourse-com
        <h4>{{listId}}</h4>
        <!-- <div class="container-fluid"> -->
            <!-- <div id='plv_bd849659f48f5bd030879c74b40d01cf_b'></div> -->
        <!-- </div> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            listId:''
        }
    },
    methods:{
        getCourseInfo(){
            this.listId = this.$route.params.id;
        },
        createPlayer(){
            // var player =polyvObject('#plv_bd849659f48f5bd030879c74b40d01cf_b').videoPlayer({
            //     'width':'600',
            //     'height':'338',
            //     'vid' : 'bd849659f48f5bd030879c74b40d01cf_b'  
            // });

            this.$refs.play.style.height=(window.innerWidth/16*9)+"px"
        }
    },
    mounted(){
        this.getCourseInfo()
        this.createPlayer()
    }
}
</script>

<style lang="scss">
    .detailCourse-com{
        .play{
            width: 100%;
        }
    }
</style>
