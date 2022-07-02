<template>
    <div>微信二维码扫一扫登录</div>
    <!-- 账号登录icon -->
    <div>
        <svg id="svgiocn" @click="click()" t="1649321650885" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1371" width="64" height="64"><path d="M840.3456 147.712H193.28c-50.7904 0-92.16 41.3184-92.16 92.16v427.7248c0 50.7904 41.3696 92.16 92.16 92.16h292.3008c0 10.496 0.1536 23.7568 0.4096 40.704H378.0608c-16.9472 0-30.72 13.7728-30.72 30.72s13.7728 30.72 30.72 30.72h277.4528c16.9472 0 30.72-13.7728 30.72-30.72s-13.7728-30.72-30.72-30.72h-108.032c-0.2048-14.848-0.3072-29.184-0.3072-40.704h293.1712c50.7904 0 92.16-41.3696 92.16-92.16V239.872c0-50.7904-41.3696-92.16-92.16-92.16z m-647.0656 61.44h647.0656c16.9472 0 30.72 13.7728 30.72 30.72v356.2496H162.56V239.872c0-16.9472 13.7728-30.72 30.72-30.72z m647.0656 489.1648H193.28c-16.9472 0-30.72-13.7728-30.72-30.72v-9.984h708.5056v9.984c0 16.9472-13.7728 30.72-30.72 30.72z" fill="#FF6C39" p-id="1372"></path></svg>
    </div>
    <!-- 分割线 -->
    <div></div>
    <!-- QRcode -->
    <div>
        <img src="../../../assets/img/login/ofC5x5WbX01WY7PB_nfJ7AsH0nNc(3).jpg" alt="" srcset="">
    </div>
    <!-- 使用微信扫一扫登录"RAWYILY" -->
    <div>使用微信扫一扫登录"RAWYILY"</div>
    <!-- 路由跳转 -->
    <div>
        <div @click  ="QRcodeToPwloign">密码登录</div>
        <div>|</div>
        <div @click="push('/loginbase/register')">注册账号</div>
    </div>
</template>
<script setup>
// toRefs defineProps() useSlots()
// useAttrs() defineEmits() defineExpose()
//  console.log(child.value.msg); // Child Components
import {onMounted,defineEmits} from 'vue';
import router from 'router';
const emit = defineEmits('loginboxSMSorQRclick','QRcodeToPwloign')
const click = () =>{
    emit('loginboxSMSorQRclick')
}
const QRcodeToPwloign = ()=>{
     emit('QRcodeToPwloign')
}
const push = (link)=>{
    router.push(link)
}
onMounted(() => {

})
</script>
<style lang="scss" scoped>
            div:nth-child(1){
                position: absolute;
                left: 20px;
                top: 30px;
            }
            div:nth-child(2){
                width: 50px;
                height: 50px;
                position: absolute;
                top: 0;
                right: 20px;
                opacity: 0.75;
            }
            div:nth-child(2):hover{
                opacity: 1;
            }
            div:nth-child(3){
                width: 360px;
                height: 1px;
                background-color: rgb(168, 155, 155);
                position: absolute;
                left: 20px;
                top: 80px;
            }
             div:nth-child(4){
                width: 250px;
                height: 250px;
                background-color: rgb(255, 255, 255);
                position: absolute;
                top: 100px;
                left: 75px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            div:nth-child(5){
                width: 250px;
                height: 50px;
                position: absolute;
                top: 350px;
                left: 75px;
                line-height: 50px;
                text-align: center;
                font-size: 15px;
            }
            div:nth-child(6){
                width: 220px;
                height: 40px;
                position: absolute;
                bottom: 50px;
                left: 90px;
                div{
                    height:40px;
                    line-height: 40px;
                    text-align: center;
                    color: #404040;
                }
                div:hover{
                    color: #000;
                }
                div:nth-child(1){
                    height: 40px;
                    width: 100px;
                    position: absolute;
                    top: 0;
                    left: 0;
                    
                }
                div:nth-child(2){
                    width: 20px;
                    position: absolute;
                    top: 0;
                    left: 100px;
                    font-size: 20px;
                    opacity: 1;
                }
                div:nth-child(2):hover{
                    color: #404040;
                }
                div:nth-child(3){
                    width: 100px;
                    position: absolute;
                    top: 0;
                    left: 120px;
                    background-color: rgba(255, 255, 255, 0);
                    
                }
            }
</style>