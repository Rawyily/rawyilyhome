<template>
<div class="box">
<div class="imgbox" v-for="(item,index) in imgs" :key="index"><img :src="imgs[index].url" alt="" @click="windowopen(imgs[index].push)"></div>
</div>
<div style="height:10px;"></div>
</template>
<script setup>
// toRefs defineProps() useSlots()
// useAttrs() defineEmits() defineExpose()
//  console.log(child.value.msg); // Child Components
import {onMounted, reactive} from 'vue';
import {getrecommendimg} from 'network/getimg'
var imgs = reactive([
    {url:require('../../assets/img/recommend.png'),alt:undefined,push:undefined},
    {url:require('../../assets/img/recommend.png'),alt:undefined,push:undefined},
    {url:require('../../assets/img/recommend.png'),alt:undefined,push:undefined},
    {url:require('../../assets/img/recommend.png'),alt:undefined,push:undefined},
    {url:require('../../assets/img/recommend.png'),alt:undefined,push:undefined},
])
const windowopen = (link)=>{
    window.open(link)
}
onMounted(() => {
    getrecommendimg().then(res=>{
        console.log(res.data);
        // console.log(res.data.code);
        // console.log(res.data.msg);
        if (res.data.code == 200) {
            imgs[0].url = res.data.data.img.img1;
            imgs[1].url = res.data.data.img.img2;
            imgs[2].url = res.data.data.img.img3;
            imgs[3].url = res.data.data.img.img4;
            imgs[4].url = res.data.data.img.img5;

            imgs[0].push = res.data.data.links[0];
            imgs[1].push = res.data.data.links[1];
            imgs[2].push = res.data.data.links[2];
            imgs[3].push = res.data.data.links[3];
            imgs[4].push = res.data.data.links[4];
        }
            

    }).catch(err=>{
        console.log(err);
    })
})
</script>
<style lang="scss" scoped>
.box{
    width: 1400px;
    height: 218px;
    background-color: rgb(250, 250, 250);
    z-index:1;
    margin: auto;
    overflow: hidden;
    display: flex;
    .imgbox{
        flex: 0.2;
        // width: 260px;
        height: 206px;
        margin: 5px;
        background-color: rgb(255, 255, 255);
        float: left; 
        border-radius: 23px;
        border: 1px solid rgb(255, 255, 255);
        background-image: url('../../assets/img/recommendBackgroundImage.png');
        img{
            width: 100%;
                height: 206px;
        border-radius: 20px;
        }
    }
    .imgbox:hover{
        width: 100%;
              height: 206px;
        border-radius: 22px;
        border: 1px solid rgb(182, 182, 182);
    }
}
</style>