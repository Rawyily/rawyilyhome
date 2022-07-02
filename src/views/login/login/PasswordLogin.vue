<template>
<div class="box">
<el-input clearable v-model="IorE" placeholder="手机号/邮箱" size="large" class="IorE"></el-input>
<el-input clearable v-model="pw" minlength="1"  maxlength="20" placeholder="密码(1-20位)" size="large" class="pw"></el-input>
<el-button class="bt" @click="login">登录</el-button>
</div>
</template>
<script setup>
// toRefs defineProps() useSlots()
// useAttrs() defineEmits() defineExpose()
//  console.log(child.value.msg); // Child Components
import {onMounted, ref} from 'vue';
import {pwlogin} from 'network/login';
const emits = defineEmits('alert','alertnum')
var IorE = ref()
var pw = ref()
const login = ()=>{
    console.log(IorE.value);
    const reEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i; 
    const reIPhone = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/i
    if (IorE.value == undefined) {
        emits('alert',"请填写手机号或邮箱")
        emits('alertnum',4)
    } else if(pw.value == undefined){
        emits('alert',"请填写密码")
        emits('alertnum',4)
    } else{
        if(reIPhone.test(IorE.value)){
            emits('alert',"手机号登录中...")
            emits('alertnum',2)
            const iphonedata = {
                iphone:IorE.value,
                password:pw.value,
                type:"iphone"
            }
            pwlogin(iphonedata).then(res=>{
                emits('alert',res.data.msg)
                if (res.data.code == 200) {
                emits('alertnum',1)
                } else {
                emits('alertnum',4)
                }
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        }else if(reEmail.test(IorE.value)){
            emits('alert',"邮箱登录中...")
            emits('alertnum',2)
            const emaildata = {
                email:IorE.value,
                password:pw.value,
                type:"email"
            }
            pwlogin(emaildata).then(res=>{
                emits('alert',res.data.msg)
                if (res.data.code == 200) {
                emits('alertnum',1)
                } else {
                emits('alertnum',4)
                }
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        }else{
            emits('alert',IorE.value+"不是正确的手机号或邮箱号")
            emits('alertnum',4)
        }
    } 
}
onMounted(() => {

})
</script>
<style lang="scss" scoped>
.box{
    width: 360px;
    height: 200px;
    margin-left: 20px;
    margin-top: 5px;
    margin-bottom: 5px;
    .IorE{
        width: 360px;
        margin-top: 20px;
    }
    .pw{
        width: 360px;
        margin-top: 20px;
    }
    .bt{
        width: 360px;
        height: 40px;
        margin-top: 20px;
        line-height: 40px;
        text-align: center;
        background-color: #ffd100;
        font-size: 1em;
        color: #000000;
    }
    .bt:hover{
        background-color: #ffbb00;
    }
}
</style>