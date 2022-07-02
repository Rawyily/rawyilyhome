<template>
<div class="box">
    <div class="header">更新轮播图</div>
    <div style="height:20vh"></div>
    <div class="contentbox">
        <div class="button">选择图片</div>
        <div class="imgyaoqou"> 图片名:{{imgyaoqou.name}}；图片格式:{{imgyaoqou.wh}}； 图片大小:{{imgyaoqou.size}}；</div>
        <input class="selectimg"  type="file" ref="getimg" @change="getimgurl()"/>
        <div class="imgbox" :style="slideshowIMGpspng">
            <img :src="imgurl" alt="">
        </div>
        <input type="text" ref="link" placeholder="请输入轮播图双击打开的网址">
        <div class="setbutton" @click="set()">提交</div>
    </div>
</div>
</template>
<script setup>
// toRefs defineProps() useSlots()
// useAttrs() defineEmits() defineExpose()
//  console.log(child.value.msg); // Child Components
import {onMounted,ref} from 'vue';
import {setslideshow} from 'network/setimg';
var getimg = ref();
var imgurl = ref();
var imgyaoqou = ref({
    wh:'要求 1400*380px | .png',
    name:'(第几张轮播图 1-7 ).png,例如 1.png',
    size:"<2M",
    size2:undefined
})
const getimgurl = () =>{
    var imgfile = getimg.value.files[0];
    // console.log(imgfile);
    //显示图片
    var readfile = new FileReader();
    readfile.readAsDataURL(imgfile);
    readfile.onload = ()=>{
        // console.log(readfile);
        // console.log(readfile.result);
        imgurl.value = readfile.result;
        //显示图片格式
        var img = new Image();
        img.src = readfile.result;
        img.onload = ()=>{
            imgyaoqou.value.wh = img.width+'*'+img.height+"px | "+imgfile.type;
        }
    }
    //显示图片信息名字
    imgyaoqou.value.name = imgfile.name;
    //显示图片大小
    const imgsizekb = Math.floor(imgfile.size/1024);
    imgyaoqou.value.size2 = imgsizekb;
    // console.log(imgsizekb);
    if (imgsizekb < 1024) {
        imgyaoqou.value.size = imgsizekb+"KB";
        
    } else {
        imgyaoqou.value.size = Math.floor(imgsizekb/1024*10)/10+"MB";
    }
    //清除提示图
    slideshowIMGpspng.value = 'background-image:none;';
    //防止更新失败
    // setTimeout(()=>{imgyaoqou.value.wh = img.width+'*'+img.height+"px | "+imgfile.type;},100);
    // setTimeout(()=>{imgyaoqou.value.wh = img.width+'*'+img.height+"px | "+imgfile.type;},1000);
    // console.log(img);
}
var link = ref();
var slideshowIMGpspng = ref();
const set = ()=>{
    // console.log(imgurl.value);
    // console.log(imgyaoqou.value.name);
    // console.log(imgyaoqou.value.wh);
    // console.log(imgyaoqou.value.size2);
    //   console.log(link.value.value);

    if (imgurl.value && link.value.value) {
        if (imgyaoqou.value.name == '1.png' | 
        imgyaoqou.value.name == '2.png' | 
        imgyaoqou.value.name == '3.png' | 
        imgyaoqou.value.name == '4.png' | 
        imgyaoqou.value.name == '5.png' | 
        imgyaoqou.value.name == '6.png' | 
        imgyaoqou.value.name == '7.png' ) {
            if (imgyaoqou.value.wh == '1400*380px | image/png') {
                if (imgyaoqou.value.size2 < 2048) {
                    //上传图片
                    const reg = new RegExp('data:image/png;base64,');
                    const imgstring = imgurl.value.replace(reg, '');
                    // console.log(imgstring);
                    const data = {
                        img:imgstring,
                        name:imgyaoqou.value.name,
                        link:link.value.value
                    }
                    // console.log(data.img);
                    setslideshow(data).then(res=>{
                        console.log(res);
                        open(res.data.msg);
                        setTimeout(()=>{
                            imgyaoqou.value.wh='要求 1400*380px | .png',
                            imgyaoqou.value.name='(第几张轮播图 1-7 ).png,例如 1.png',
                            imgyaoqou.value.size="<2M",
                            imgyaoqou.value.size2=undefined ,
                            imgurl.value = undefined,
                            link.value.value = ''
                        },3000)
                    }).catch(err=>{
                        open(err)
                        console.log(err);
                    })
                } else {
                    open('图片大于2M')
                }
            } else {
            open('图片格式不正确')
            }
        } else {
            open('图片命名不正确')
        }
    } else {
        if (imgurl.value) {
           open('请填写轮播图对应链接');
        } else{
            if (link.value.value) {
                open('请选择上传的轮播图图片');
            } else {
               open('请选择图片和填写链接'); 
            }
            
        } 
    }
}
import { ElMessageBox } from 'element-plus';

const open = (b) => {
  ElMessageBox.alert(b, '提示', {
    confirmButtonText: '知道了',
    callback: () => {
    },
  })
}
onMounted(() => {

})
</script>
<style lang="scss" scoped>
*{z-index: 0;}
html{
    width: 90vw;
    // height: 100vh;
    position: absolute;
    top: 0;
    right: 0;
}
.box{
    .header{
        width: 90vw;
        height: 30px;
        text-align: center;
        line-height: 30px;
        color: rgb(22, 0, 41);
        font-weight:bold;
        background-color: rgb(190, 190, 190);
        margin: auto;
    }
    .contentbox{
        width: 1410px;
        height: 500px;
        margin: auto;
        background-color: rgba(255, 255, 255);
        border: 10px solid rgb(95, 30, 0);
        position: relative;
        .button{
            height: 25px;
            width: 70px;
            background-color: #4160e1;
            color: azure;
            line-height: 25px;
            text-align: center;
            font-size: 15px;
            margin: 5px;
        }
        .imgyaoqou{
            height: 25px;
            position: absolute;
            top: 0;
            left: 80px;
            line-height: 25px;
            margin: 5px;

        }
        .selectimg{
            opacity: 0;
            position: absolute;
            top: 0;
        }
        .imgbox{
            height: 1400px;
            height: 380px;
            padding: 4px;
            border: 1px solid rgb(255, 207, 207);
            overflow: hidden;
            background-image: url('../../assets/img/slideshowIMGps.png');
            background-color: rgba(240, 248, 255);
            background-size: 100% 100%;
            // opacity: 1;
        }
        input{
            outline-style: none;
            border-color: coral;
            margin: 5px;
            width: 500px;
        }
        .setbutton{
            width: 100px;
            height: 30px;
            background-color: rgb(0, 0, 0);
            color: aliceblue;
            border-radius: 10px;
            text-align: center;
            line-height: 30px;
            position: relative;
            left: 705px;
            top: 8px;
            margin-left: -50px;
  
        }
        .setbutton:hover{
            background-color: rgb(92, 0, 0);
        }
    }
}




</style>