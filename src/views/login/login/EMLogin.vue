<template>
<div class="box">
    <div class="ebox">
        <!-- 邮箱号 -->
        <el-input class="enum" minlength="3" maxlength="20" clearable v-model="emnum" placeholder="邮箱" size="large" />
        <!-- 选择邮箱后缀 -->
        <el-select id="m-2" v-model="emvalue" class="m-2" placeholder="@qq.com" size="large">
            <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value" />
        </el-select>
    </div>
    <!-- 验证滑块 -->
    <div class="smsverify">
        <Sliderverify @verify="verify"></Sliderverify>
    </div>
    <!-- 验证码 -->
    <div class="smsverifycode" v-show="smsverifycode">
        <el-input class="smsverifycodeElinput" size="large" placeholder="验证码" clearable maxlength="6" minlength="6" v-model="EMVC"></el-input>
        <el-button class="smsverifycodeElbutton" size="large" @click="sendVerifyCode">发送验证码</el-button>
    </div>
    <!-- 登录按钮 -->
    <el-button @click="loginbutton()" v-if="smsverifycode == true" class="loign" size="large">登录</el-button>
    <el-button v-else-if="smsverifycode == false" class="loign2" size="large">登录</el-button>
</div>
</template>
<script setup>
import {onMounted,ref} from 'vue';
import {emaillogin, sendusercode} from 'network/login';
// 邮箱 
var emnum = ref()
// 邮箱后缀
var emvalue = ref('@qq.com')
// 邮箱后缀可选择内容
const options = [
    {value: '@126.com'},{value: '@139.com'},{value: '@163.com'},{value: '@163.net'},
    {value: '@263.net'},{value: '@0355.net'},{value: '@3271.net'},
    {value: '@aol.com'},{value: '@ask.com'},
    {value: '@gmail.com'},{value: '@hotmail.com'},{value: '@live.com'},{value: '@msn.com'},
    {value: '@outlook.com'},{value: '@qq.com'},{value: '@yahoo.com'},{value: '@yeah'},{value: '@sina.com'},
    {value: '后缀由我来填写'}, 
]
// 引入滑块验证组件
import Sliderverify from 'components/common/sliderverify.vue';
// 滑块验证成功显示发送验证码功能
var smsverifycode = ref(false)
// 滑块验证传出给我的emits
const verify = (b)=>{
    // console.log(b);
    smsverifycode.value = b;
}
// 给父的提示信息数据
const emits = defineEmits(['alert','alertnum'])
// 一个检查邮箱格式的方法
var EmailNumber = ref()
const checkemail = ()=>{
    const reEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i; 
    if (emnum.value) {
        if (reEmail.test(emnum.value + emvalue.value)) {
        EmailNumber.value = emnum.value + emvalue.value;
            return true;
        } else if(reEmail.test(emnum.value)){
        EmailNumber.value = emnum.value;
            return true;
        }else if(emvalue.value == '@yeah'){
            EmailNumber.value = emnum.value+emvalue.value;
            return true;
        }
        else{
            emits('alert','请填写正确格式的邮箱')
            emits('alertnum',4)
            return false;  
        }
    } else {
        emits('alert','邮箱为空')
        emits('alertnum',4)
        return false
    }
}

//发送验证码
const sendVerifyCode = ()=>{
   const a = checkemail();
   if (a) {
        emits('alert',"正在发送验证码...")
        emits('alertnum',2)
       sendusercode({number:EmailNumber.value}).then(res=>{
            emits('alert',res.data.msg)
           if (res.data.code == 200) {
                emits('alertnum',1);
                email.value = EmailNumber.value;
           } else {
                emits('alertnum',4)  
           }
           console.log(res);
       }).catch(err=>{
           console.log(err);
            emits('alert',"网络错误")
            emits('alertnum',4)  
       })
   }
}
// 检查是否通过验证
const checkVerfiy = ()=>{
    if (smsverifycode.value) {
        return true;
    } else {
        return false;
    }
}
// 检查验证码是否格式正确
var EMVC = ref()
const checkEMVC = ()=>{
    const revc = /^[0-9][A-Za-z][0-9][A-Za-z][0-9][A-Za-z]/;
    const RET = revc.test(EMVC.value);
 if(EMVC.value == undefined){
        emits('alert',"验证码不能为空");emits('alertnum',4) ;
        return false;
    }else if(RET){
        return true;
    }else{
        emits('alert',"验证码格式错误");emits('alertnum',4) ;
        return false;
    } 
}
// 获取验证码后保存邮箱号
var email = ref();
const loginbutton = ()=>{
    
    const c = checkEMVC();
    const b = checkVerfiy();
    const a = checkemail();
    if (a && b && c) {
    emits('alert',"登录中...");emits('alertnum',2) ;
    const data = {
        email:email.value,
        code:EMVC.value
    }
    emaillogin(data).then(res=>{
    emits('alert',res.data.msg);
        if (res.data.code == 200) {
            emits('alertnum',1) ;
            console.log(res.data.data);
        } else {
            emits('alertnum',4) ;
        }
    }).catch(err=>{
    emits('alert',"网络错误");emits('alertnum',4) ;
        console.log(err);
    })
    }else if(email.value == undefined){
    emits('alert',"请重新获取验证码");emits('alertnum',2) ;
    }
//     console.log(emnum.value);
//   const reEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i; 
//     if (emvalue.value == '后缀由我来填写') {
//         if (reEmail.test(emnum.value)) {
//             emits('alert','登录成功')
//             emits('alertnum',1)
//             email = emnum.value;

//             emits('alert',email+' '+EMVC.value)

//         } else {
//             emits('alert','登录成功')
//             emits('alertnum',3)
//         }
//     } else if(emnum.value == undefined | emnum.value == 'undefined'){
//             emits('alert','登陆失败')
//             emits('alertnum',3)
//     }else {   
//         const EM = emnum.value+emvalue.value;
//         if (reEmail.test(EM)) {
//             emits('alert','登录成功')
//             emits('alertnum',1)
//             email= EM;

//             emits('alert',email+' '+EMVC.value)
//         }else{
//             emits('alert','请填写正确格式的资料')
//             emits('alertnum',3)
//         }
//     }
}
onMounted(() => {

})
</script>
<style lang="scss" scoped>
          .box{
                width: 360px;
                // background-color: rgb(187, 93, 93);
                margin-left: 20px;
                margin-top: 5px;
                margin-bottom: 5px;
                .ebox{
                    position: relative;
                    .enum{
                        width: 212px;
                    }
                    .m-2{
                        width: 148px;
                        height: 40px;
                        border-radius: 0;
                    }
                }
                
                .smsverify{
                    margin-top: 20px;
                    width: 360px;
                    height: 40px;
                    background-color: rgb(164, 255, 247);
                    position: relative;
                    margin-left: -20px;
                }
                .smsverifycode{
                    width: 360px;
                    height: 40px;
                    margin-top: 20px;
                    position: relative;
                    .smsverifycodeElinput{
                        width: 110px;
                        margin-right: 10px;
                    }
                    .smsverifycodeElbutton{
                        width: 100px;
                        margin: 0;
                        padding: 0;
                        position: absolute;
                        top: 0;
                        background-color: #ffd100;
                        color: #444444;
                        border: 0;
                    }
                    .smsverifycodeElbutton:hover{
                        background-color: #ffd000e0;
                        color: #000;
                    }
                }
                .loign{
                    margin-top: 20px;
                    width: 360px;
                    height: 40px;
                    background-color: #ffd100;
                    border: 0;
                    color: #292828;
                    font-size:1em;
                }
                .loign2{
                    margin-top: 20px;
                    width: 360px;
                    height: 40px;
                    background-color: #eeeeee;
                    border: 0;
                    color: #646363;
                    font-size:1em;
                }
                .loign:hover{
                    background-color: #ffd000e0;
                    color: #000;
                    
                }
            }
</style>