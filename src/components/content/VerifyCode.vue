<template>
<div class="verifycode">
    <el-input class="verifycodeElinput" placeholder="请获取验证码" clearable minlength="6" maxlength="6" size="large" v-model="code"></el-input>
    <el-button class="verifycodeElbutton" size="large" @click="sendVerifycode">发送验证码</el-button>
</div>
</template>
<script setup>
// toRefs defineProps() useSlots()
// useAttrs() defineEmits() defineExpose()
//  console.log(child.value.msg); // Child Components
import {onMounted,ref,watch, watchEffect} from 'vue';
import {sendusercode} from 'network/login';
var code = ref()
// 传入号码
const props = defineProps({
    number:Number,
})
// 传出数据
const emits = defineEmits(['verifycodeAler','verifycodeAlernum','inputcode'])
// 发送验证码
const sendVerifycode = ()=>{
    const reEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;
    const reIPhone = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/i;
    // 判断号码类型 邮箱 手机号 返回弹窗数据 和验证码input数据
    if (reEmail.test(props.number)) {
        // console.log('邮箱');
        emits('verifycodeAler','验证码发送中...')
        emits('verifycodeAlernum',2)
        sendusercode({number:props.number}).then(res=>{
            emits('verifycodeAler',res.data.msg)
            if (res.data.code == 200) {
                emits('verifycodeAlernum',1)
            } else {
                 emits('verifycodeAlernum',4)           
            }
        }).catch(err=>{
        emits('verifycodeAler','网络错误')
        emits('verifycodeAlernum',4)
            console.log(err);
        })
    } else if(reIPhone.test(props.number)){
        // console.log('手机号'); 
        emits('verifycodeAler','验证码发送中...')
        emits('verifycodeAlernum',2)
        sendusercode({number:props.number}).then(res=>{
            emits('verifycodeAler',res.data.msg)
            if (res.data.code == 200) {
                emits('verifycodeAlernum',1)
            } else {
                 emits('verifycodeAlernum',4)           
            }
        }).catch(err=>{
        emits('verifycodeAler','网络错误')
        emits('verifycodeAlernum',4)
            console.log(err);
        })

    }else{
        console.log('不是邮箱或手机号');  
        emits('verifycodeAler','输入信息不是邮箱或手机号')
        emits('verifycodeAlernum',4)
    }
    
}
watch(code,(newValue,oldValue)=>{
    // console.log(newValue+" => "+oldValue);
    emits('inputcode',newValue)
})

onMounted(() => {

})
</script>
<style lang="scss" scoped>
.verifycode{
    width: 360px;
    height: 40px;
    position: relative;
    .verifycodeElinput{
        width: 180px;
    }
    .verifycodeElbutton{
        width: 180px;
        background-color: #ffd100;
        color: rgb(0, 0, 0);
        font-size: 18px;
        position: absolute;
        top: 0;
    }
}
</style>