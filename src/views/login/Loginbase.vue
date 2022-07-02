<template>
<div class="box">
<!-- loginBase
<div @click="routerpush('/loginbase/login')">login</div>
<div @click="routerpush('/loginbase/register')">register</div>
<div @click="routerpush('/loginbase/updatapassword')">updatapassword</div> -->
<div class="logobox"><div @click="routerpush('/')" class="logo">RAWYILY</div><span v-html="html"></span><p>通行证</p></div>
<router-view/>
</div>
</template>
<script setup>
// toRefs defineProps() useSlots()
// useAttrs() defineEmits() defineExpose()
//  console.log(child.value.msg); // Child Components
import {onMounted} from 'vue';
import router from 'router';
const routerpush =(link)=>{
    router.push(link)
}
const html = `
    <p>&nbsp;&nbsp;|&nbsp;&nbsp;</p>
`
onMounted(() => {

})
</script>
<style lang="scss" scoped>
.box{
    width: 100vw;
    height: 100vh;
    background-image: url('../../assets/img/login/login-tn.jpg');
    background-size: 100vw 100vh;
    position: absolute;
    top: 0;
    left: 0;
    .logobox{
        display: flex;
        margin-top: 7vh;
        margin-left: 7vw;
        .logo{
        font-size: 30px;
        font-weight:bold;
        color: rgb(0, 0, 0);
        }
        .logo:hover{
            color: red;
        }
        span{
        line-height: 40px;
        float: left;
        font-size: 40px;
        position: relative;
        top: -4px;
        font-weight: 100;
        }
        span:hover{
            color: rgba(240, 248, 255, 0);
        }
        p{
            font-size: 30px;
            position: relative;
            top: -2px;
        }
        p:hover{
            color: aliceblue;
            font-weight: bold;
        }
    }  
}
    
</style>