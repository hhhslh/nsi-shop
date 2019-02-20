<template>
    <div class="complementInfo-com animated">
        <div class="infoBox">
            <h4 class="title">请补全信息以完成购买<span class="close" @click="hideBox">x</span></h4>
            <!-- <div class="form text-center">
                <input type="text" class="txt" placeholder="姓名">
                <input type="text" class="txt" placeholder="公司">
                <input type="text" class="txt" placeholder="邮箱">
                <a href="javascript:;" class="btn btn-danger apply">提交</a>
            </div> -->
            <el-form class="text-center" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="50px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="公司" prop="campany">
                    <el-input v-model="ruleForm.campany"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <a href="javascript:;" class="btn btn-danger apply" @click="toapply">提交</a>
            </el-form>
        </div>
    </div>
</template>

<script>
import {complementInfo} from '@/api/api'
export default {
    data() {
        return {
            isShow:true,
            ruleForm: {
                name:'',
                campany:'',
                email:''
            },
            rules:{
                name:[
                    {required:true,message:'请输入姓名',tigger:'blur'}
                ],
                campany:[
                    {required:true,message:'请输入公司名称',tigger:'blur'}
                ],
                email:[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]
            }
        }
    },
    methods:{
        hideBox(){
            this.isShow=false
            this.$emit('hideCom',this.isShow)
        },
        toapply(){
           this.$refs['ruleForm'].validate((val)=>{
               if(val){
                   let name=this.ruleForm.name
                   let campany=this.ruleForm.campany
                   let email=this.ruleForm.email
                   let openId=localStorage.getItem('openId')
                   localStorage.setItem('email',email)
                //    console.log(name,campany,email)
                 complementInfo({
                        username:email,
                        userTurename:name,
                        userOrganization:campany,
                        wechatid:openId
                    }).then(res=>{
                        if(res.code===0){
                            this.$message({
                                message: '信息提交成功',
                                type: 'success'
                            });
                        }
                        this.$router.push({name:'courseOrder'})
                    })
               }
           })
        },

    },
    mounted(){
        
    }
}
</script>

<style lang="scss">
    .complementInfo-com{
        position: fixed;
        z-index: 100;
        bottom: 0;
        min-height: 300px;
        background-color: #FFF;
        width: 100%;
        // border-top: 2px solid #e33626;
        box-shadow: 0 -3px 10px rgba(46, 46, 46, 0.3);
        padding:0 20px;
        .title{
            font-size: 15px;
            font-weight: 600;
            color: #232323;
            position: relative;
            margin-bottom: 20px;
        }
        .close{
            position: absolute;
            right: 0;
            top: -10px;
            font-size: 30px;
            color: #525252;
        }
        .txt{
            display: block;
            border: none;
            border-bottom: 1px solid #ccc;
            width: 100%;
            height: 35px;
            line-height: 35px;
            margin: 15px 0;
            font-size: 16px;
            padding-left: 10px;
            outline: none;
        }
        .apply{
            // margin-top: 15px;
            margin: 0 auto;
        }
    }
</style>
