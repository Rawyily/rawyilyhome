<template>
<div class="box">
    <div class="imgbox" @mousemove="stop()" @mouseout="start()">
        <div @click="imglast()" v-show="iconshow" class="iconleft" :style="iconbc"><svg id="icon" class="icon" aria-hidden="true"><use xlink:href="#icon-zuojiantou"></use></svg></div>
        <img v-for="(item,index) in img" :key="index" :src="item.url" :alt="item.alt" :style="imgLeft" width="1400px !important;" height="380px  !important;" @dblclick="windowopen(item.push)">
        <div @click="imgnext()" v-show="iconshow" class="iconright" :style="iconbc"><svg id="icon" class="icon" aria-hidden="true"><use xlink:href="#icon-youjiantou"></use></svg></div>
    </div>
</div>
</template>
<script setup>
// toRefs defineProps() useSlots() 
// useAttrs() defineEmits() defineExpose()
//  console.log(child.value.msg); // Child Components
import {onMounted, reactive, ref} from 'vue';
import {getslideshowimg} from 'network/getimg';
const img = reactive([
                    // {url:require('../../assets/img/slideshow/1.jpg'),alt:undefined,push:undefined},
                    // {url:require('../../assets/img/slideshow/2.jpg'),alt:undefined,push:undefined},
                    // {url:require('../../assets/img/slideshow/3.jpg'),alt:undefined,push:undefined},
                    // {url:require('../../assets/img/slideshow/4.jpg'),alt:undefined,push:undefined},
                    // {url:require('../../assets/img/slideshow/5.jpg'),alt:undefined,push:undefined},
                    // {url:require('../../assets/img/slideshow/6.jpg'),alt:undefined,push:undefined},
                    // {url:require('../../assets/img/slideshow/7.jpg'),alt:undefined,push:undefined},
                    // {url:require('../../assets/img/slideshow/1.jpg'),alt:undefined,push:undefined},
                    {url:require('../../assets/img/slideshow/bimg.png'),alt:undefined,push:undefined},
                    {url:require('../../assets/img/slideshow/bimg.png'),alt:undefined,push:undefined},
                    {url:require('../../assets/img/slideshow/bimg.png'),alt:undefined,push:undefined},
                    {url:require('../../assets/img/slideshow/bimg.png'),alt:undefined,push:undefined},
                    {url:require('../../assets/img/slideshow/bimg.png'),alt:undefined,push:undefined},
                    {url:require('../../assets/img/slideshow/bimg.png'),alt:undefined,push:undefined},
                    {url:require('../../assets/img/slideshow/bimg.png'),alt:undefined,push:undefined},
                    {url:require('../../assets/img/slideshow/bimg.png'),alt:undefined,push:undefined},
])
const windowopen = (push)=>{
    window.open(push)
}
var imgLeft = ref(undefined);
var imgleftpx = 0
const imgnext = ()=>{
    // console.log('imgnext');
    var i = 0 ;
    let s = setInterval(frame,10);
    function frame(){
        if (i <= -1400 ) {
            clearInterval(s);
            // console.log(i);
            // console.log(imgleftpx);
        } else {
            if (imgleftpx == -9800) {
                imgleftpx = 0;
                i -= 56;
                // console.log('i');
                imgleftpx -= 56 ;
                imgLeft.value = "left:"+imgleftpx+"px";
            } else {
                i -= 56;
                // console.log('i');
                imgleftpx -= 56 ;
                imgLeft.value = "left:"+imgleftpx+"px";
            }
           
        }
    }
}


var imgnext3s = setInterval(imgnext,5000);
const imglast = ()=>{
    // console.log('imgnext');
    var i = 0 ; 
    let s = setInterval(frame,10);
    function frame(){
        if (i <= -1400 ) {
            clearInterval(s);
            // console.log(i);
            // console.log(imgleftpx);
        } else {
            if (imgleftpx == 0) {
                imgleftpx = -9800;
                i -= 56;
                // console.log('i');
                imgleftpx += 56 ;
                imgLeft.value = "left:"+imgleftpx+"px";
            } else {
                i -= 56;
                // console.log('i');
                imgleftpx += 56 ;
                imgLeft.value = "left:"+imgleftpx+"px";
            }
           
        }
    }
}
const stop = ()=>{
    clearInterval(imgnext3s);
    iconshow.value = true;
}
const start = ()=>{
    clearInterval(imgnext3s);
    imgnext3s = setInterval(imgnext,5000);
    iconshow.value = false;
}
var iconshow = ref(false);

var iconbc = ref(undefined);
onMounted(() => {
    getslideshowimg().then(res=>{
    console.log(res.data);
    if (res.data.code == 200) {
    img[0].url = res.data.data.img.img1;
    img[1].url = res.data.data.img.img2;
    img[2].url = res.data.data.img.img3;
    img[3].url = res.data.data.img.img4;
    img[4].url = res.data.data.img.img5;
    img[5].url = res.data.data.img.img6;
    img[6].url = res.data.data.img.img7;
    img[7].url = res.data.data.img.img1;

    img[0].push = res.data.data.links[0];
    img[1].push = res.data.data.links[1];
    img[2].push = res.data.data.links[2];
    img[3].push = res.data.data.links[3];
    img[4].push = res.data.data.links[4];
    img[5].push = res.data.data.links[5];
    img[6].push = res.data.data.links[6];
    img[7].push = res.data.data.links[0];
    }  
    // console.log(res.data);
  }).catch(err=>{
      alert('网络错误,链接不到服务器,请检查网络！');
      console.log(err);
  })
})
</script>
<style lang="scss" scoped>
.box{
    width: 100%;
    height: 400px !important;
    background-color: rgba(255, 255, 255, 0);
    .imgbox{
        width: 1400px !important;
        height: 380px;
        margin: auto;
        border-top: 10px solid #fff;
        border-bottom: 10px solid #fff;
        background-color: rgb(255, 231, 231);
        background-image: url('../../assets/img/slideshowBackgroundImage.png');
        display: flex;
        overflow: hidden;
        position: relative;
        img{
            flex: 1;
            width: 1400px !important;
            height: 380px !important;
            position: relative;
            left: 0px;
            z-index:0;
        }
        .iconleft{
            width: 60px;
            height: 60px;
            position: absolute;
            top: 170px;
            left: 30px;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 30px;
            border: 1px solid rgb(164, 255, 164);
            z-index: 1;
        }
        .iconleft:hover{
            border: 1px solid rgb(255, 137, 137);
        } 
        .iconright{
            width: 60px;
            height: 60px;
            position: absolute;
            top: 170px;
            right: 30px;
            background-color: rgb(255, 255, 255, 0.2);
            border: 1px solid rgb(164, 255, 164);
            border-radius: 30px;

        }
        .iconright:hover{
            border: 1px solid rgb(255, 137, 137);
        } 
            #icon{
                width: 60px !important;
                height: 60px !important;
                background-color: rgba(255, 255, 255, 0);
            }     
    }
    
}
</style>