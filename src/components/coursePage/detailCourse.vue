<template>
    <div class="detailCourse-com">
        <div class="videoBox">
            <!-- <video src="https://nsi-class-video.oss-cn-zhangjiakou.aliyuncs.com/class/test.mp4" class="play" controls ref="play" controlslist="nodownload"></video> -->
            <video src="https://nsi.oss-cn-zhangjiakou.aliyuncs.com/test/yearVideo/xxs.mp4" class="play" :class="{'zindex9':isPlay}" controls ref="play" controlslist="nodownload"></video>
            <!-- <video src="https://nsi-class-video.oss-cn-zhangjiakou.aliyuncs.com/class/test.mp4" class="play" :class="{'zindex9':isPlay}" controls ref="play" controlslist="nodownload"></video> -->
            <div class="cover coverbg" ref="coverbg">
                <div class="cover coverContent">
                    <span class="iconfont icon-bofang" @click="toplay"></span>
                </div>
            </div>
        </div>
        <!-- <h4>{{listId}}</h4> -->
        <div class="link">
            <router-link tag="div" to="/detailCourse/courseInfo" exact>学习资料</router-link>
            <router-link tag="div" to="/detailCourse/chooseCourse">课程选集</router-link>
        </div>
        <div class="courseContent">
            <router-view></router-view>
        </div>
        <p>{{getUrl}}</p>
    </div>
</template>

<script>
import Bus from '@/assets/js/Bus'
export default {
    data(){
        return{
            listId:'',
            isPlay:false,
            getUrl:''
        }
    },
    methods:{
        getCourseInfo(){
            this.listId = this.$route.params.id;
        },
        createPlayer(){
            let videoHeight=(window.innerWidth/16*9)+"px"
            this.$refs.play.style.height=videoHeight
            this.$refs.coverbg.style.height=videoHeight
        },
        toplay(){
            let video=this.$refs.play
            this.isPlay=true
            this.$refs.coverbg.style.display="none"
            video.play()
        },
        getSourse(){
            // console.log(data)
            Bus.$on('getSourse', (msg) => {
                this.getUrl = msg
                // console.log(this.getUrl)
            })
        }
    },
    mounted(){
        this.getCourseInfo()
        this.createPlayer()
        this.getSourse()
    }
}
</script>

<style lang="scss">
    .detailCourse-com{
        .videoBox{
            position: relative;
            .zindex9{
                z-index: 9;
            }  
            .play{
                width: 100%;
                position: relative;
            }
            .cover{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
            }
            .coverbg{
                background-image: url('../../assets/course.jpg');
                background-size: cover;
                background-position: center top;
                z-index: 1;
                &::after{
                    content: "";
                    width:100%;
                    height:100%;
                    position: absolute;
                    left:0;
                    top:0;
                    background: inherit;
                    filter: blur(5px);
                    z-index: 2;
                }
            }
            .coverContent{
                display: flex;
                width: 100%;
                height: 100%;
                justify-content: center;
                align-items: center;
                z-index: 3;
                span{
                    font-size: 60px;
                    color: rgba(247, 247, 247, 1);
                }
            }
        }
        .link{
            display: flex;
            width: 100%;
            justify-content: space-around;
            border-bottom: 7px solid #f7f7f7;
            div{
                width: 50%;
                text-align: center;
                height: 40px;
                line-height: 40px;
                font-weight: 500;
                font-size: 15px;
            }
            .router-link-active{
                color: goldenrod;
                border-bottom: 2px solid goldenrod;
            }
        }
    }
</style>
