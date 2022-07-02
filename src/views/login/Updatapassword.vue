<template>
<div class="box">
    <!-- box无法居中 添加box2 -->
    <div class="box2">
        <!-- 标题 -->
        <div class="title">安全中心</div>
        <!-- 提示信息 -->
        <Alert class="alert" :alertnum="alertnum" :alert="alert" />
            <!-- 输入号码验证提供发送验证码 -->
        <div class="One" v-show="show">
            <el-input clearable type="text"  id="elinput" class="elinput" v-model="number" maxlength="40" placeholder="手机号/邮箱" size="large"></el-input>
            <Sliderverify class="verify" @verify="verify"></Sliderverify>
            <div class="next" :style="nextbutton" @click="next()">下一步</div>
        </div>
            <!-- 收集验证码和新密码 -->
        <div class="Two" v-show="!show">
            <VerifyCode @verifycodeAler="verifycodeAler" @verifycodeAlernum="verifycodeAlernum" @inputcode="inputcode" :number='number' class="VerifyCode"/>
            <el-input type="text" class="newpasswordinput" placeholder="新密码(1-20位)" minlength="1" maxlength="20" v-model="newpassword" size="large"></el-input>
            <el-button :disabled="updatabuttondisabled" class="updatabutton" @click="updata">修改</el-button>
        </div>
    </div>
    <div class="calLoginhtml" @click="$router.push('/loginbase/login')">返回<span style="color:#ff3c00;">登录</span>页</div>
</div>
</template>
<script setup>
// toRefs defineProps() useSlots()
// useAttrs() defineEmits() defineExpose()
//  console.log(child.value.msg); // Child Components
import {nextTick, onMounted, ref} from 'vue';
// 滑块验证
import Sliderverify from 'components/common/sliderverify';
// 发送验证码
import VerifyCode from 'components/content/VerifyCode';
// 验证账号是否存在
import {checkUserIsHave,updatepassworde} from 'network/login'

// 弹窗
import Alert from 'views/login/login/Alert.vue';
import { Loading } from 'element-plus/es/components/loading/src/service';
var alertnum = ref()
var alert = ref()

// 第一步 第二步 切换显示
var show = ref(true)
// -------------------------------------------one
// 输入的号码
var number = ref()
var Numbertype = ref()
// emits滑块验证
const verify = (b)=>{
    // console.log(b);
    if (b) {nextbutton.value = 'background-color: #ffd100;';}
    else {nextbutton.value = '';}
}
// 下一步按钮的样式
var nextbutton = ref()
// 下一步
const next  = ()=>{
    if (nextbutton.value == 'background-color: #ffd100;') {
        const reEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i; 
        const reIPhone = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/i;
        if (number.value == undefined) {
            alertnum.value = 4;
            alert.value = "请填写手机号或邮箱";
        } else{
             if(reEmail.test(number.value)){
                alertnum.value = 2;
                alert.value = "正在验证账号是否存在...";
                const data = {number:number.value,Numbertype:'E'}
                checkUserIsHave(data).then(res=>{
                    if (res.data.code == 200) {
                    alertnum.value = 1;
                    alert.value = res.data.msg;
                    Numbertype.value = 'E';
                    // 切换
                    show.value = false;
                    } else {
                    alertnum.value = 4;
                    alert.value = res.data.msg; 
                    }
                }).catch(err=>{
                    console.log(err);
                    alertnum.value = 4;
                    alert.value = res.data.msg;
                })
             }else if(reIPhone.test(number.value)){
                alertnum.value = 2;
                alert.value = "正在验证账号是否存在...";  
                const data = {number:number.value,Numbertype:'I'}
                checkUserIsHave(data).then(res=>{
                    if (res.data.code == 200) {
                    alertnum.value = 1;
                    alert.value = res.data.msg;
                    Numbertype.value = 'I';
                    // 切换
                    show.value = false;
                    } else {
                    alertnum.value = 4;
                    alert.value = res.data.msg; 
                    }
                }).catch(err=>{
                    console.log(err);
                    alertnum.value = 4;
                    alert.value = res.data.msg;
                })
             }else{
                alertnum.value = 4;
                alert.value = "请填写格式正确的手机号或邮箱";  
             }
        }
    } else {
        alertnum.value = 4;
        alert.value = "请移动滑块进行验证"; 
    }

}
// ----------------------------------------two

// 验证码组件提示信息
const verifycodeAler = (data)=>{
alert.value = data
}
const verifycodeAlernum = (data)=>{
alertnum.value = data
}
var code = ref()
const inputcode = (data)=>{
code.value = data;
// console.log(code.value);
}
// 新密码
var newpassword = ref()
// 禁用修改按钮
var updatabuttondisabled = ref(false)
// 检查
const checkcode = ()=>{
    const revc = /^[0-9][A-Za-z][0-9][A-Za-z][0-9][A-Za-z]/;
    const RET = revc.test(code.value);
 if(code.value == undefined){
        alert.value = "请填写验证码";
        alertnum.value = 4;
        return false;
    }else if(code.value !== undefined && !RET){
        alert.value = "请填写正确的验证码";
        alertnum.value = 4;
        return false;
    }else{
        return true;
    }
}
const checkNewpassword = ()=>{
        if (newpassword.value == undefined) {
        alert.value = "请填写密码";
        alertnum.value = 4;
            return false;
        } else {return true}}
// 修改密码
const updata = ()=>{
    const b = checkNewpassword();
    const a = checkcode();
    if (a && b) {
    updatabuttondisabled.value = true;
        const data = {
            Numbertype:Numbertype.value,
            number:number.value,
            code:code.value,
            newpassword:newpassword.value
        }
        updatepassworde(data).then(res=>{
        alert.value = res.data.msg;
        if (res.data.code == 200) {
        alertnum.value = 1;
            setTimeout(() => {
                show.value = true;
                alert.value = "密码已成功更新";
                number.value = "密码已成功更新";
                updatabuttondisabled.value = false;
            }, 3000);
        } else {
        updatabuttondisabled.value = false;
        alertnum.value = 4;
        }

    }).catch(err=>{
        console.log(err);
        alert.value = "网络错误";
        alertnum.value = 4;
        updatabuttondisabled.value = false;
    })
    }
}
onMounted(() => {

})
</script>
<style lang="scss" scoped>

.box{
    width: 100vw;
    height: 260px;
    margin-top: 250px;
    // background-color: rgb(215,255,255);
    background-image:none;
    .box2{
        width: 800px;
        // height: 260px;
        margin: auto;
        background-color: rgb(215,255,255);
        padding-bottom: 30px;
        .title{
            height: 50px;
            background-color: #ffd100;
            line-height: 50px;
            text-align: center;
            font-size: 20px;
        }
        .alert{
            margin: auto;
        }
        .One{
            width:360px;
            margin: auto;
            .elinput{
                width: 360px;
                margin-top: 30px;
                margin-bottom: 20px;
            }
            .verify{
                width: 360px;
                height: 40px;
                margin-top:0;
            }
            .next{
                width: 360px;
                height: 40px;
                margin-top: 20px;
                background-color: #b6b6b6;
                text-align: center;
                line-height: 40px;
                font-size: 20px;
                border-radius: 5px;
            }
        }
        .Two{
            width:360px;
            margin: auto; 
            .VerifyCode{
                margin-top: 20px;
            }
            .newpasswordinput{
                margin-top: 20px;

            }
            .updatabutton{
                width: 360px;
                height: 40px;
                background-color: #ffd100;
                color: rgb(0, 0, 0);
                font-size: 16px;
                margin-top: 20px;

            }
        }
        

    }
    .calLoginhtml{
        margin-top: 50px;
        text-align:center;
        
    }   
}
::v-deep #elinput::-webkit-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgb(105, 105, 105); 
}
::v-deep #elinput::-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgb(105, 105, 105); 
}
::v-deep #elinput::-ms-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgb(105, 105, 105); 
}
::v-deep input::placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgb(105, 105, 105);
}
</style>