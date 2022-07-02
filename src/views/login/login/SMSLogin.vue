<template>
        <!-- 短信登录 -->
        <div class="sms">
            <div class="phonenumber">
                <div class="m-s-show">{{smsvalue}}</div>
                <el-select id="m-2" v-model="smsvalue" class="m-2" placeholder="+86" size="large">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-input class="phonenum" minlength="11" maxlength="11" clearable v-model="phonenum" placeholder="手机号" size="large" />
            </div>
            <div class="smsverify">
                <Sliderverify @verify="verify"></Sliderverify>
            </div>
            <div class="smsverifycode" v-show="smsverifycode">
                <el-input v-model="code" class="smsverifycodeElinput" size="large" clearable maxlength="6" minlength="6"></el-input>
                <el-button class="smsverifycodeElbutton" size="large" @click="sendCode()">发送验证码</el-button>
            </div>
            <el-button @click="login()" v-if="smsverifycode == true" class="smslogin" size="large">登录</el-button>
            <el-button v-else-if="smsverifycode == false" class="smslogin2" size="large">登录</el-button>
        </div>
</template>
<script setup>
import {onMounted,ref} from 'vue';
import {sendusercode,iphonelogin} from 'network/login';
// 滑块验证
import Sliderverify from 'components/common/sliderverify.vue';
// 选择区号
var smsvalue = ref('+86')
const options = [
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
// 手机号
var phonenum = ref()
// 验功能显示
var smsverifycode = ref(false)
// 滑块验证 emits
const verify = (b)=>{
    console.log(b);
    smsverifycode.value = b;
}
// emist
const emist = defineEmits(['alert','alertnum'])
// 检查iphone
const checkiphone = ()=>{
    const reIPhone = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/i;
    const test = reIPhone.test(phonenum.value);
    if (phonenum.value == undefined) {
        emist('alert',"请填写手机号");emist('alertnum',4);
        return false;
    } else {
        if (test) {
            return true;
        } else {
        emist('alert',"请填写正确格式的手机号");emist('alertnum',4);
        return false;
        }
    }
}
// 发送验证码
const sendCode = ()=>{
    const a = checkiphone();
    if (a) {
    emist('alert',"正在发送验证码...");emist('alertnum',2);
    sendusercode({number:phonenum.value}).then(res=>{
        emist('alert',res.data.msg)
        if (res.data.code == 200) {emist('alertnum',1);} else {emist('alertnum',4);}
        console.log(res);
        iphone.value = phonenum.value;
    }).catch(err=>{
    console.log(err);emist('alert',"网络错误");emist('alertnum',4);
    })
    }
}
// 获取验证码后设置登录的号码
var iphone = ref()
// 验证吗
var code =  ref()
// 检查验证码格式和存在
const checkcode = ()=>{
    const revc = /^[0-9][A-Za-z][0-9][A-Za-z][0-9][A-Za-z]/;
    const RET = revc.test(code.value);
 if(code.value == undefined){
        emist('alert',"请填写验证码");emist('alertnum',4);
        return false;
    }else{
        if (RET) {
            return true;
        } else {
        emist('alert',"请填写正确的验证码");emist('alertnum',4);
            return false;
        }
    }
}
// 滑块验证
const checkverify = ()=>{
    if (smsverifycode.value) {
        return true
    } else {
        emist('alert',"请滑动滑块验证");emist('alertnum',4);
        return false
    }
}
const login = ()=>{
    const c = checkverify();
    const b = checkcode();
    const a = checkiphone();
    if (a && b && c) {
        if (iphone.value) {
        emist('alert',"登录中...");emist('alertnum',2);  
            const data = {number:iphone.value,code:code.value};
            iphonelogin(data).then(res=>{
                emist('alert',res.data.msg);
                console.log(res);
                if (res.data.code == 200) {
                    emist('alertnum',1);  
                } else {
                    emist('alertnum',4);  
                }
            })
        } else {
        emist('alert',"请重新获取验证码");emist('alertnum',4);  
        }
    }
}
onMounted(() => {

})
</script>
<style lang="scss" scoped>
          .sms{
                width: 360px;
                height: 225px;
                // background-color: rgb(187, 93, 93);
                margin-left: 20px;
                margin-top: 5px;
                margin-bottom: 5px;
                .phonenumber{
                    position: relative;
                    .m-2{
                    width: 100px;
                    height: 40px;
                    border-radius: 0;
                    // opacity: 0;
                    }
                    .m-s-show{
                        width: 65px;
                        height: 36px;
                        background-color: rgb(255, 255, 255);
                        position: absolute;
                        top: 2px;
                        left: 2px;
                        z-index: 1;
                        border-radius: 5px;
                        line-height: 36px;
                        text-align: center;
                    }
                    .phonenum{
                        width: 260px;
                    }
                }
                
                .smsverify{
                    margin-top: 20px;
                    width: 360px;
                    height: 40px;
                    background-color: rgb(164, 255, 247);
                    position: relative;
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
                .smslogin{
                    margin-top: 20px;
                    width: 360px;
                    height: 40px;
                    background-color: #ffd100;
                    border: 0;
                    color: #383838;
                    font-size:1em;
                }
                .smslogin2{
                    margin-top: 20px;
                    width: 360px;
                    height: 40px;
                    background-color: #eeeeee;
                    border: 0;
                    color: #747474;
                    font-size:1em;
                }
                .smslogin:hover{
                    background-color: #ffd000e0;
                    color: #000;
                    
                }
            }
</style>