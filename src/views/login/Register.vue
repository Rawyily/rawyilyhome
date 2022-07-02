<template>
<!-- 盒子 -->
<div class="box">
    <!-- 返回登录页 -->
    <div class="pushlogin">已有帐号， 马上<span @click="$router.push('/loginbase/login')">登录</span></div>
    <!-- 标题 -->
    <div class="title">注册通行证</div>
    <!-- 收集注册手机号 -->
    <div v-if="phoneOrEmailR == 'phone'" class="smsR">
        <!-- 选择手机区号 -->
        <el-select v-model="smsvalue" class="selPN" placeholder="+86" size="large">
        <el-option v-for="item in phongnumbers" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <!-- 手机号输入框 -->
        <el-input class="phonenumber" minlength="11" maxlength="11" clearable v-model="phonenumber" placeholder="手机号注册" size="large" />
        <!-- 点击图标切换邮箱注册 -->
        <div @click="setPhoneOrEmailR(true)" class="icon">
            <svg t="1649326805950" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3911" width="30" height="30"><path d="M512 537.6l512-156.444444V312.888889c0-62.577778-51.2-113.777778-113.777778-113.777778H113.777778c-62.577778 0-113.777778 51.2-113.777778 113.777778v68.266667l512 156.444444z" fill="#4B9AFC" p-id="3912"></path><path d="M537.6 620.088889l-5.688889 14.222222-19.911111-5.688889-22.755556 5.688889-5.688888-14.222222-483.555556-147.911111V824.888889c0 62.577778 51.2 113.777778 113.777778 113.777778h796.444444c62.577778 0 113.777778-51.2 113.777778-113.777778V472.177778l-486.4 147.911111z" fill="#4B9AFC" p-id="3913"></path></svg>
        </div>
    </div>
    <!-- 收集注册邮箱号 -->
    <div v-else-if="phoneOrEmailR == 'email'" class="emailR">
        <!-- 选择邮箱后缀 -->
        <el-select v-model="emvalue" class="selEmail" placeholder="@qq.com" size="large">
            <el-option v-for="item in emails" :key="item.value" :label="item.value" :value="item.value" />
        </el-select>
        <!-- 邮箱号 -->
        <el-input class="emailnumber" maxlength="32" clearable v-model="emnum" placeholder="邮箱注册" size="large" />
        <!-- 点击手机图标切换至手机号注册 -->
        <div @click="setPhoneOrEmailR(false)" class="icon">
            <svg t="1649326666336" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2247" width="40" height="40"><path d="M752.64 102.4C788.48 102.4 819.2 133.12 819.2 174.08v627.2c0 38.4-30.72 71.68-66.56 71.68H296.96C261.12 870.4 230.4 839.68 230.4 798.72V174.08C230.4 133.12 261.12 102.4 296.96 102.4h455.68z m-51.2 504.32c20.48 0 38.4-17.92 38.4-38.4V222.72c0-20.48-17.92-38.4-38.4-38.4H348.16c-20.48 0-38.4 17.92-38.4 38.4v348.16c0 20.48 17.92 38.4 38.4 38.4h353.28z" fill="#2589FF" p-id="2248"></path><path d="M524.8 819.2c-35.84 0-64-28.16-64-64s28.16-64 64-64 64 28.16 64 64-28.16 64-64 64z" fill="#C5DDFB" p-id="2249"></path><path d="M460.8 256h128c15.36 0 25.6 10.24 25.6 25.6s-10.24 25.6-25.6 25.6h-128c-15.36 0-25.6-10.24-25.6-25.6s10.24-25.6 25.6-25.6z" fill="#A3CCFF" p-id="2250"></path></svg>
        </div>
    </div>
    <!-- 滑动验证模块 验证成功返回true false-->
    <Sliderverify class="verify" @verify="verify"></Sliderverify>
    <!-- 验证码输入框及发送按钮 滑块验证吃才显示 -->
    <div class="verifycode" v-show="verifycodeshow">
         <el-input class="verifycodeElinput" size="large" clearable v-model="VerifyCode" minlength="6" maxlength="6"></el-input>
        <el-button class="verifycodeElbutton" size="large" @click="sendVerifyCode">发送验证码</el-button>
    </div>
    <!-- 信息弹窗 等级1-4 内容 -->
    <Alert class="alertwran" :alertnum="alertnum" :alert="alert" />
    <!-- 是否确认协议 图标red不是已确认-->
    <div class="readdeal">
        <svg @click="readdeal" t="1649330977316" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3653" width="15" height="15"><path d="M511.999994 0C229.205543 0 0.020822 229.226376 0.020822 512.020827c0 282.752797 229.184721 511.979173 511.979173 511.979173s511.979173-229.226376 511.979173-511.979173C1023.979167 229.226376 794.794446 0 511.999994 0zM815.371918 318.95082l-346.651263 461.201969c-10.830249 14.370907-27.32555 23.409999-45.27877 24.742952-1.582882 0.124964-3.12411 0.166619-4.665338 0.166619-16.328682 0-32.074198-6.373185-43.779197-17.911565l-192.903389-189.44604c-24.617988-24.20144-24.992881-63.731847-0.791441-88.349835 24.20144-24.659643 63.731847-24.951226 88.349835-0.833096l142.042875 139.501932 303.788472-404.2182c20.744091-27.575479 59.899605-33.115568 87.516739-12.413131C830.534266 252.219827 836.116009 291.375341 815.371918 318.95082z" p-id="3654" :fill="readdealicon"></path></svg>
        我已阅读<span>通行证注册说明</span>和接受<span>通行证注册协议</span>、<span>隐私政策</span>
    </div>
    <!-- 提示请确认阅读协议 -->
    <div class="readdealed" v-if="readdealicon == 'black'">请勾选！</div>
    <!-- 注册按钮 滑块验证提供与否 灰色 黄色 -->
    <el-button v-if="verifycodeshow == true" class="smslogin" size="large" @click="registerButton()">注册</el-button>
    <el-button v-else-if="verifycodeshow == false" class="smslogin2" size="large">注册</el-button>
    <!-- 第三方注册 -->
    <div class="wxR">使用社交帐号注册
        <!-- 微信注册 -->
        <div>
            <svg t="1649348403048" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5091" width="32" height="32"><path d="M693.12 347.264c11.776 0 23.36 0.896 35.008 2.176-31.36-146.048-187.456-254.528-365.696-254.528C163.2 94.912 0 230.656 0 403.136c0 99.52 54.272 181.248 145.024 244.736L108.8 756.864l126.72-63.488c45.312 8.896 81.664 18.112 126.912 18.112 11.392 0 22.656-0.512 33.792-1.344-7.04-24.256-11.2-49.6-11.2-76.032C385.088 475.776 521.024 347.264 693.12 347.264zM498.304 249.024c27.392 0 45.376 17.984 45.376 45.248 0 27.136-17.984 45.312-45.376 45.312-27.072 0-54.336-18.176-54.336-45.312C443.968 266.944 471.168 249.024 498.304 249.024zM244.672 339.584c-27.2 0-54.592-18.176-54.592-45.312 0-27.264 27.392-45.248 54.592-45.248S289.92 266.944 289.92 294.272C289.92 321.408 271.872 339.584 244.672 339.584zM1024 629.76c0-144.896-145.024-262.976-307.904-262.976-172.48 0-308.224 118.144-308.224 262.976 0 145.28 135.808 262.976 308.224 262.976 36.096 0 72.512-9.024 108.736-18.112l99.392 54.528-27.264-90.624C969.728 783.872 1024 711.488 1024 629.76zM616.128 584.384c-17.984 0-36.224-17.92-36.224-36.224 0-18.048 18.24-36.224 36.224-36.224 27.52 0 45.376 18.176 45.376 36.224C661.504 566.464 643.648 584.384 616.128 584.384zM815.488 584.384c-17.856 0-36.032-17.92-36.032-36.224 0-18.048 18.112-36.224 36.032-36.224 27.264 0 45.376 18.176 45.376 36.224C860.864 566.464 842.752 584.384 815.488 584.384z" p-id="5092" fill="#1afa29"></path></svg>
        </div>
        <!-- QQ注册 -->
        <div>
            <svg t="1649348031357" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3409" width="32" height="32"><path d="M849.621 619.904a1364.352 1364.352 0 0 0-28.8-80.47l-38.826-95.829c0-1.109 0.512-19.968 0.512-29.696 0-163.882-78.208-328.576-270.507-328.576S241.493 250.027 241.493 413.867c0 9.77 0.47 28.629 0.512 29.738l-38.826 95.83a1398.485 1398.485 0 0 0-28.8 80.469c-36.694 116.779-24.79 165.12-15.744 166.187 19.413 2.304 75.562-87.894 75.562-87.894 0 52.224 27.179 120.406 86.016 169.643-21.973 6.699-48.938 17.024-66.304 29.653-15.573 11.392-13.61 23.04-10.794 27.734 12.33 20.522 211.413 13.098 268.928 6.698 57.472 6.4 256.597 13.824 268.885-6.741 2.816-4.693 4.779-16.299-10.795-27.69-17.365-12.63-44.33-22.955-66.346-29.697 58.837-49.194 86.016-117.376 86.016-169.642 0 0 56.149 90.24 75.562 87.893 9.046-1.067 20.907-49.365-15.786-166.144" fill="#1296db" p-id="3410"></path></svg>
        </div>
    </div>
    <!-- 警告 -->
    <div class="warning">
        <!-- 警告图标 -->
        <svg t="1649349431299" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6004" width="32" height="32"><path d="M1001.661867 796.544c48.896 84.906667 7.68 157.013333-87.552 157.013333H110.781867c-97.834667 0-139.050667-69.504-90.112-157.013333l401.664-666.88c48.896-87.552 128.725333-87.552 177.664 0l401.664 666.88zM479.165867 296.533333v341.333334a32 32 0 1 0 64 0v-341.333334a32 32 0 1 0-64 0z m0 469.333334v42.666666a32 32 0 1 0 64 0v-42.666666a32 32 0 1 0-64 0z" fill="#FAAD14" p-id="6005"></path></svg>
        警告：请慎重决定是否注册，因能力有限无法有效地对用户注册时输入的敏感信息的安全进行保护！
    </div>
    <!-- 版权声明 -->
    <div class="footer">Copyright © 2019-2022 RAWYILY 中文 English</div>
</div>
</template>
<script setup>
// toRefs defineProps() useSlots()
// useAttrs() defineEmits() defineExpose()
//  console.log(child.value.msg); // Child Components
import {onMounted,ref} from 'vue';
// 引入滑动验证组件
import Sliderverify  from 'components/common/sliderverify';
// 引入弹窗组件
import Alert from 'views/login/login/Alert.vue';
// 引入 axios 登录loign 注册接口api
import {register,sendverifycode} from 'network/login.js';

//收集手机号------------------------------------------------------------------------
//ele选择区号数据
var smsvalue = ref('+86')
const phongnumbers = [
  {value: '+86',label: '中国(+86)',},{value: '+852',label: '中国香港(+852)',},
  {value: '+853',label: '中国澳门(+853)',},{value: '+886',label: '中国台湾(+886)',},
  {value: '+1',label: '美国(+1)',},{value: '+81',label: '日本(+81)',},
  {value: '+82',label: '韩国(+82)',},{value: '+60',label: '马来西亚(+60)',},
  {value: '+65',label: '新加坡(+65)',},{value: '+84',label: '越南(+84)',},
  {value: '+61',label: '澳大利亚(+61)',},{value: '+1',label: '加拿大(+1)',},
  {value: '+44',label: '英国(+44)',},{value: '+33',label: '法国(+33)',},
  {value: '+7',label: '俄罗斯(+7)',},{value: '+49',label: '德国(+49)',},
  {value: '+66',label: '泰国(+66)',},{value: '+91',label: '印度(+91)',},
  {value: '+63',label: '菲律宾(+63)',},{value: '+55',label: '巴西(+55)',},
  {value: '+62',label: '印度尼西亚(+62)',},{value: '+39',label: '意大利(+39)',},
  {value: '+90',label: '土耳其(+90)',},{value: '+64',label: '新西兰(+64)',},
  {value: '+20',label: '埃及(+20)',}
]
//绑定手机号码输入框
var phonenumber = ref();
// 邮箱------------------------------------------------------------------------------
//ele选择邮箱后缀数据
var emvalue = ref('@qq.com')
const emails = [
    {value: '@126.com'},{value: '@139.com'},{value: '@163.com'},{value: '@163.net'},
    {value: '@263.net'},{value: '@0355.net'},{value: '@3271.net'},
    {value: '@aol.com'},{value: '@ask.com'},
    {value: '@gmail.com'},{value: '@hotmail.com'},{value: '@live.com'},{value: '@msn.com'},
    {value: '@outlook.com'},{value: '@qq.com'},{value: '@yahoo.com'},{value: '@yeah'},{value: '@sina.com'},
    {value: '自己填写后缀'}, 
]
//邮箱号码
var emnum = ref()
//点击邮箱和手机图标切换注册方式为手机号或者邮箱-----------------------------------------
//默认邮箱注册
var phoneOrEmailR = ref('email')
//点击切换注册方式
const setPhoneOrEmailR = (b)=>{
    if (b) {
        phoneOrEmailR.value = 'email'
    } else {
        phoneOrEmailR.value = 'phone'
    }
    
}
//滑动验证 emits 验证提供显示验证码功能-------------------------------------------------
var verifycodeshow = ref(false)
const verify = (b)=>{
    verifycodeshow.value = b;
}
//是否已经确认读取注册协议 red为是--------------------------------------------------
var readdealicon = ref('black')
//点击切换确认图标颜色
const readdeal = ()=>{
    if (readdealicon.value == 'red') {
        readdealicon.value = 'black';
    } else {
        readdealicon.value = 'red';
    }
}
//Alert组件的提示信息内容-----------------------------------------------------------------
//颜色 1-4 成功-错误
var alertnum = ref()
//alert内容
var alert = ref()
//验证码及发送验证码------------------------------------------------------------------
//验证码内容8位数字字母
var VerifyCode = ref()
//发送验证码给用户
const sendVerifyCode = ()=>{
    // 正则表达式
    const reEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i; 
    const reIPhone = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/i
    if (phoneOrEmailR.value == 'phone') {
        // 手机号获取验证码
        if (phonenumber.value) {
            if (reIPhone.test( phonenumber.value)) {
                alert.value = "验证码正在发送...";
                alertnum.value = 2;
                //发送验证码
                const data = {
                    IPhoneNumber:phonenumber.value
                }
                sendverifycode(data).then(res=>{
                    if (res.data.code == 200) {
                        // alert.value = "已发送验证码到\""+phonenumber.value+"\"";
                        // alertnum.value = 2;
                    //-------------------------------
                    //替代短信验证码
                    alert.value = "您的验证码是："+res.data.msg;
                    alertnum.value = 1; 
                    //-------------------------------
                        RegisterIphone.value = phonenumber.value;    
                    } else {
                        alert.value = res.data.msg;
                        alertnum.value = 4; 
                    }


                }).catch(err=>{
                    console.log(err);
                    alert.value = "网络错误";
                    alertnum.value = 4;
                })
            } else{
                alert.value = "\""+phonenumber.value+"\"不是正确的手机号格式";
                alertnum.value = 4;
            }
        } else {
            alert.value = "手机号还是空的";
            alertnum.value = 3;
        }
    } else if(phoneOrEmailR.value == 'email'){
        if (emnum.value) {
            if (reEmail.test((emnum.value+emvalue.value))) {
                alert.value = "验证码正在发送...";
                alertnum.value = 2;
                const data = {
                   EmailNumber:emnum.value+emvalue.value
                }
                sendverifycode(data).then(res=>{
                    if (res.data.code == 200) {
                        alert.value = "已发送验证码到\""+(emnum.value+emvalue.value)+"\"";
                        alertnum.value = 1;
                        // console.log(res);
                        RegisterEmail.value = emnum.value+emvalue.value;    
                    } else {
                        alert.value = res.data.msg;
                        alertnum.value = 4;
                        // console.log(res); 
                    }
                }).catch(err=>{
                    console.log(err);
                    alert.value = "网络错误";
                    alertnum.value = 4;
                })
            } else if (reEmail.test(emnum.value)) {
                alert.value = "验证码正在发送...";
                alertnum.value = 2;
                const data = {
                   EmailNumber:emnum.value
                }
                sendverifycode(data).then(res=>{
                    if (res.data.code == 200) {
                        alert.value = "已发送验证码到\""+emnum.value+"\"";
                        alertnum.value = 1;
                        // console.log(res);
                        RegisterEmail.value = emnum.value;    
                    } else {
                        alert.value = res.data.msg;
                        alertnum.value = 4;
                        // console.log(res); 
                    }
                }).catch(err=>{
                    console.log(err);
                    alert.value = "网络错误";
                    alertnum.value = 4;
                })
            } else if(emvalue.value == '自己填写后缀'){
                alert.value = "\""+(emnum.value)+"\"不是正确的邮箱格式";
                alertnum.value = 4;
            } else{
                alert.value = "\""+(emnum.value+emvalue.value)+"\"不是正确的邮箱格式";
                alertnum.value = 4;
            }
        } else {
            alert.value = "邮箱还是空的";
            alertnum.value = 3;
        }
    } else {
        alert.value = "请填写手机号或邮箱号";
        alertnum.value = 3;
    } 
}
var RegisterIphone = ref()
var RegisterEmail = ref()
const checkNumber = ()=>{
    const reEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i; 
    const reIPhone = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/i;
    const REE1 = reEmail.test(emnum.value)
    const REE2 = reEmail.test(emnum.value+emvalue.value)
    if (phoneOrEmailR.value == 'email') {

        if (emnum.value == undefined | emnum.value == '') {
            alert.value = "请填写邮箱";
            alertnum.value = 4;
            return false;       
        } else if(REE1 | REE2){
            return true;
        } else{
            alert.value = "请填写格式正确的邮箱";
            alertnum.value = 4;
        }
    }else if(phoneOrEmailR.value == 'phone'){
        if (phonenumber.value == undefined | phonenumber.value == '') {
            alert.value = "请填写手机号";
            alertnum.value = 4;
            return false;
        } else if(reIPhone.test(phonenumber.value)){
            return true;
        }else{
            alert.value = "请填写格式正确的手机号";
            alertnum.value = 4;
            return false;
        }
    }
}
const checkdeal = ()=>{
    if(readdealicon.value == 'black'){
            alert.value = "请阅读通行证说明";
            alertnum.value = 4;
            return false;
    }else{
        return true;
    }
}
const checkcode = ()=>{
    const revc = /^[0-9][A-Za-z][0-9][A-Za-z][0-9][A-Za-z]/;
    const RET = revc.test(VerifyCode.value);
 if(VerifyCode.value == undefined){
        alert.value = "请填写验证码";
        alertnum.value = 4;
        return false;
    }else if(VerifyCode.value !== undefined && !RET){
        alert.value = "请填写正确的验证码";
        alertnum.value = 4;
        return false;
    }else{
        return true;
    }
}
const registerButton = ()=>{
    const c = checkdeal(); 
    const b = checkcode();
    const a = checkNumber();
    if (a && b && c ) {
        alert.value = "注册中...";
        alertnum.value = 2;
        // 手机号注册
        if(RegisterIphone.value && phoneOrEmailR.value == 'phone'){
            const data = {
                IPhoneNumber:RegisterIphone.value,
                code:VerifyCode.value,
            }
            console.log(data);
            register(data).then(res=>{
                console.log(res.data);
                if (res.data.code == 200) {
                    alert.value = "注册成功";
                    alertnum.value = 1;
                // 弹窗
                open("注册成功,初始用户名(验证码)："+VerifyCode.value+" ,初始密码(验证码)："+VerifyCode.value+" ,确认跳转登录页！")
                } else {
                    alert.value = res.data.msg;
                    alertnum.value = 4;
                }
            }).catch(err=>{
                console.log(err);
            })
    }else if(RegisterEmail.value && phoneOrEmailR.value == 'email'){
        const data = {
            EmailNumber:RegisterEmail.value,
            code:VerifyCode.value,
        }
        register(data).then(res=>{
            console.log(res.data);
            if (res.data.code == 200) {
                alert.value = "注册成功";
                alertnum.value = 1;
                // 弹窗
                open("注册成功,初始用户名："+VerifyCode.value+"(验证码) ,初始密码："+VerifyCode.value+"(验证码) ,确认跳转登录页！")
            } else {
                alert.value = res.data.msg;
                alertnum.value = 4;
            }
        }).catch(err=>{
            console.log(err);
        })
    }else{
        alert.value = "请重新获取验证码";
        alertnum.value = 4;
    }
    }
}
// 弹窗
import { ElMessageBox } from 'element-plus';
import router from 'router';
const open = (b) => {
  ElMessageBox.alert(b, '提示', {
    confirmButtonText: '确认',
    callback: () => {
        router.push('/loginbase/login')
    },
  })
}
onMounted(() => {

})
</script>
<style lang="scss" scoped>
// 盒子
.box{
    position: relative;
    top: 50px;
    width: 800px;
    height: 550px;
    margin: auto;
    background-color:rgba(215, 255, 255);
    background-image:none;
    // 返回登录页
    .pushlogin{
        color: rgb(58, 23, 65);
        position: absolute;
        top: -40px;
        right: 0;
        margin: 10px;
        span{
            color: rgb(255, 81, 0);
        }
    }
    // 注册通行证
    .title{
        width: 800px;
        height: 70px;
        background-color: #ffd100;
        line-height: 70px;
        text-align: center;
        font-size: 25px;
        margin-bottom: 30px;
    }
    // 手机号注册选择器和输入框
    .smsR{
        width: 500px;
        height: 40px;
        // background-color: #fff;
        margin: auto;
        display: flex;
        // 区号选择器
        .selPN{
            width:160px;
        }
        // 手机号input
        .phonenumber{
            width: 300px;
        }
        // 切换的图标
        .icon{
            width: 40px;
            height: 40px;
            padding-left: 5px;
            svg{
                width: 42px;
                height: 30px;
                margin-top: 3px;
            }
            svg:hover{
                path{fill: #ffd100;}
            }
        }
    }
    // 邮箱注册
    .emailR{
        width: 500px;
        height: 40px;
        // background-color: #fff;
        margin: auto;
        display: flex;
        .selEmail{
            width: 160px;
        }
        .emailnumber{
            width: 300px;
        }
        .icon{
            width: 40px;
            height: 40px;
            padding-left: 5px;
            svg{
                width: 40px;
                height: 40px;
            }
            svg:hover{
                path{fill: #ffd100;}
            }
        }
    }
    // 滑块验证
    .verify{
        width: 360px;
        margin: auto;
        height: 40px;
        position: relative;
        top: 20px;
        background-color: rgb(255, 0, 0);
    }
    // 验证码
    .verifycode{
        margin: auto;
        width: 270px;
        position: relative;
        top: 40px;
        // 验证码输入
        .verifycodeElinput{
            width: 150px;
            position: absolute;
            top: 0;
        }
        // 验证码按钮
        .verifycodeElbutton{
            width: 100px;
            position: absolute;
            left: 170px;
            top: 0;
            background-color: #ffd100;
            color: #000;
        }

    }
    // 信息弹窗
    .alertwran{
        margin: auto;
        position: relative;
        top: 110px;
    }
    // 是否已经阅读协议
    .readdeal{
        font-size: 13px;
        text-align: center;
        position: relative;
        top: 140px;
        svg{
            position: relative;
            top: 2px;
        }
        span{
            color: #ff5100;
        }
    }
    // 请勾选协议
    .readdealed{
        font-size: 13px;
        text-align: center;
        position: relative;
        top: 140px;
        color:rgb(255, 0, 0);
    }
    // 登录按钮黄色
    .smslogin{
        margin-left: 220px;
        width: 360px;
        position: relative;
        top: 160px;
        background-color: #ffd100;
        color: #000000;
    }
    // 登录按钮灰色
    .smslogin2{
        margin-left: 220px;
        width: 360px;
        position: relative;
        top: 160px;
        background-color: rgb(94, 94, 94);
        color: #ffd100;
    }
    // 第三方登录
    .wxR{
        display: flex;
        margin: auto;
        text-align: center;
        line-height: 40px;
        font-size: 15px;
        // background-color: #fff;
        width: 250px;
        height: 40px;
        position: relative;
        top: 200px;
        // 图标 微信
        div:nth-child(1){
            width: 32px;
            height: 32px;
            margin-left: 16px;
            position: relative;
            top: 4px;
            background-color: rgb(215, 255, 255);
            border-radius: 5px;
            svg{
                width: 30px;
                height: 30px;
                path{
                    fill: #8d8d8d;
                }

            }
        }
        div:nth-child(1):hover{
            background-color: #00CC66;
            svg{
                path{
                    fill: #fff;
                }
            }
        }
        // 图标 QQ
        div:nth-child(2){
            width: 32px;
            height: 32px;
            border-radius: 16px;
            margin-left: 16px;
            position: relative;
            top: 4px;
            background-color: rgb(215, 255, 255);
            svg{
                position: relative;
                top: -2px;
                path{
                    fill: rgb(146, 146, 146);
                }
            }
        }
        div:nth-child(2):hover{
            background-color: rgb(215, 255, 255);
            svg{
                path{
                    fill: rgb(0, 119, 255);
                }
            }
        }
    }
    // 警告
    .warning{
        // background-color: #fff;
        width: 680px;
        height: 32px;
        margin: auto;
        text-align: center;
        line-height: 32px;
        position: absolute;
        bottom: 0;
        left: 85px;
        font-size: 15px;
        color: #852600;
        svg{
            position: absolute;
            left: -40px;
        }
    }
    // 页脚 版权声明
    .footer{
        width: 400px;
        text-align: center;
        position: absolute;
        bottom: -50px;
        left:200px;
        font-size: 13px;
        color: #fff;
    }

}
</style>