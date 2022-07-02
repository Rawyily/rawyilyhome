<template>
<div class="box">
<div class="nav">
    <div class="back">
        <div class="gohome" @click="$router.push('/')">首页</div>
        <div class="update"><img @click="$router.push('/administrator')" src="../../assets/icon/administrator/sx3.png" alt=""></div>
    </div>
    <div class="navtitle" v-for="(item,index) in nav"  :key="item.index" :style="item.style" @mousemove="navtitlemouseover(index)" @mouseout="navtitlemouseout(index)" @click="navpush(item.push,index)">{{item.name}}</div>
</div>
<div class="clideanhtml"><router-view/></div>
</div>
</template>
<script setup>
// toRefs defineProps() useSlots()
// useAttrs() defineEmits() defineExpose()
//  console.log(child.value.msg); // Child Components
import {onMounted, reactive, nextTick, KeepAlive} from 'vue';
import router from 'router';
import UploadProject from 'views/administrator/UploadProject.vue';
const navpush = (p,i)=>{
    console.log(p);
    for (let s = 0; s < 3; s++) {
        if (s == i) {
            nav[i].style = "background-color: #ffd770;";
        } else {
            nav[s].style = undefined; 
        }
    }
    router.push(p);
    };
const nav = reactive([
    {name:"上传新项目",style:undefined,push:"/administrator/uploadmyproject"},
    {name:"更新推荐栏",style:undefined,push:"/administrator/uploadrecommendimg"},
    {name:"更新轮播图",style:undefined,push:"/administrator/uploadslideshowimg"},
]);
const navtitlemouseover = (i)=>{
    if (nav[i].style == "background-color: #ffd770;") {
    } else {
        nav[i].style = "background-color: #fffff0;";
    }
    
}
const navtitlemouseout = (i)=>{
    if (nav[i].style == "background-color: #ffd770;") {
    } else {
        nav[i].style = undefined;
    }
}
onMounted(() => {

})
</script>
<style lang="scss" scoped>

*{z-index:10;overflow: hidden;}
// html{}
.box{
    .nav{
        width: 9vw;
        height: 100vh;
        margin-right: 1vw;
        position: fixed;
        .back{
            display: flex;
            border-bottom: 20px solid #fff;
            width: 9vw;
            height: 50px;
            line-height: 40px;
            position: relative;
            background-color: #fff;
            .gohome{
                width: 4vw;
                height: 40px;
                line-height: 40px;
                text-align: center;
                color: aliceblue;
                background-color: #8b008b;
                border-radius: 10px;
                position: absolute;
                top: 10px;
                left:5px;
            }
            .update{
                width: 4vw;
                height: 38px;
                line-height: 38px;
                text-align: center;
                border-radius: 10px;
                position: absolute;
                border:1px solid rgb(13, 56, 0);
                position: absolute;
                top: 10px;
                right:5px;
                img{
                    position: relative;
                    width: 38px;
                    height: 38px;
                }

                
            }
        }
        
        .navtitle{
            clear: both;
            height: 44px;
            width: 9vw;
            line-height: 44px;
            text-align: center;
            font-weight:bold;
            color: rgb(0, 0, 0);
            background-color: #e0ffff;
            border-top: 1px solid rgb(216, 215, 215);
        }
    }
    .clideanhtml{
        width: 90vw;
        height: 100%;
        position: absolute;
        top: 0;
        left: 10vw;
        background-color: #fffaf000;
        background-image: url('../../assets/img/uploadprojectBCIMG.jpg');
        background-size: 100% 100%;
    }
}
</style>