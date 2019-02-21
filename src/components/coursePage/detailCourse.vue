<template>
    <div class="detailCourse-com" ref="bg">
        <div class="videoBox">
            <!-- <video src="https://nsi-class-video.oss-cn-zhangjiakou.aliyuncs.com/class/test.mp4" class="play" controls ref="play" controlslist="nodownload"></video> -->
            <video :src="getUrl" class="play" :class="{'zindex9':isPlay}" controls ref="play" controlslist="nodownload"></video>
            <!-- <video src="https://nsi-class-video.oss-cn-zhangjiakou.aliyuncs.com/class/test.mp4" class="play" :class="{'zindex9':isPlay}" controls ref="play" controlslist="nodownload"></video> -->
            <div class="cover coverbg" ref="coverbg">
                <div class="cover coverContent">
                    <span class="iconfont icon-bofang" @click="toplay"></span>
                </div>
            </div>
            <!-- back -->
            <div class="back" @click="toBack">
                <span class="iconfont icon-zuojiantou"></span>
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
        <div v-if="notBought" class="toBuy text-center" @click="toBuy">
            <span class="iconfont icon-gouwuche"></span>立即购买
        </div>
        <!-- <complement-info-com v-if="isShow"/> -->
        <complement-info-com v-if="isShow" @hideCom="hideInfoBox" :class="[isShow?'bounceInUp':'bounceOutDown']"/>
        
    </div>
</template>

<script>
import Bus from '@/assets/js/Bus'
import complementInfoCom from '@/components/coursePage/complementInfo'
import {judgeuserInfo,checkCoursePrivilege} from '@/api/api'
export default {
    components:{
        complementInfoCom
    },
    data(){
        return{
            listId:'',
            isPlay:false,
            getUrl:'https://nsi-class-video.oss-cn-zhangjiakou.aliyuncs.com/class/xu01.mp4',
            isShow:false,
            notBought:true
        }
    },
    methods:{
        judgeBought(){
            checkCoursePrivilege({
                'classId':localStorage.getItem('courseId'),
                'usermail':localStorage.getItem('email')
            }).then(res=>{
                // 用户已购买
                if(res.code===0){
                    this.notBought=false
                }else{
                    // 用户未购买
                    this.notBought=true
                    // this.$router.push({name:'courseOrder'})
                }
            })
        },
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
                if(this.notBought===false){
                    this.getUrl = msg
                }
                // console.log(this.getUrl)
            })
        },
        // 用户未购买
        toBuy(){
            // 判断用户信息是否补全
            judgeuserInfo({
                wechatId:localStorage.getItem('openId')
            }).then(res=>{
                // 0成功 1失败
                if(res.code===0){
                    // 信息已经补全
                    this.isShow=false
                    this.$router.push({name:'courseOrder'})
                }else{
                    // 信息未补全
                    this.isShow=true
                }
            })
        },
        hideInfoBox(val){
            this.isShow=val
        },
        toBack(){
            window.location.href="https://www.xinxueshuo.cn/nsi-shop/dist/index.html#/course"
        }
    },
    mounted(){
        this.judgeBought()
        this.getCourseInfo()
        this.createPlayer()
        this.getSourse()
        this.$refs.bg.style.minHeight=(window.innerHeight-57)+"px"
    }
}
</script>

<style lang="scss">
    .detailCourse-com{
        padding-bottom: 20px;
        position: relative;
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
        .toBuy{
            position: fixed;
            width: 100%;
            height: 57px;
            line-height: 57px;
            bottom: 0;
            left: 0;
            z-index: 100;
            background-color: #e33626;
            color: #FFF;
            font-size: 15px;
            font-weight: 500;
            span{
                margin-right: 5px;
                font-size: 25px;
                vertical-align: middle;
                position: relative;
                top: -2px;
            }
        }
        .back{
            position: absolute;
            top: 10px;
            left: 15px;
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            border-radius: 50%;
            z-index: 99;
            background-color: rgba(0, 0, 0, .5);
            // box-shadow: 0 5px 10px rgba(122, 122, 122,.6);
            span{
                color: #fff;
                font-size: 16px;
                position: relative;
                left: -1px;
            }
        }
    }
</style>
