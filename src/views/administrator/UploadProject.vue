<template>
<div class="box">
<div class="header">上传新项目</div>
<div class="getall" ref="getall" v-if="getallshow">
    <h4>1.上传 250px*250px 格式为 jpg/jpeg/png 封面图片一张:</h4>
    <hr>
    <li><input @change="showimg" type="file" ref="files"/></li>
    <div class="imgbox"><img :src="imgurl" alt=""></div>
    <p>图片大小: {{imgdata.size}}</p>
    <p>图片类型: {{imgdata.type}}</p>
    <p>图片格式: {{imgdata.wh}}</p>
    <hr>
    <h4>2.项目链接：</h4><input placeholder="五十字符以内的地址,双击打开" maxlength="50" ref="inputlink" class="input" type="text">
    <h4>3.项目标题：</h4><input placeholder="八个字符以内的标题" maxlength="15" ref="inputtitle" class="input" type="text">
    <h4>3.项目描述：</h4><textarea placeholder="255字符以内的介绍或描述" maxlength="255" ref="textarea" class="textarea"></textarea>
    <div class="load" @click="loadfile()">确认上传</div>
</div>    
</div>
</template>
<script setup>
// toRefs defineProps() useSlots()
// useAttrs() defineEmits() defineExpose()
//  console.log(child.value.msg); // Child Components
import {onMounted, reactive, ref, nextTick} from 'vue';
import {setproject} from 'network/setimg';
var imgurl = ref(undefined);
var files = ref(undefined);
var imgdata = ref({
    name:undefined,
    size:" <2M",
    type:" png/jpg/jpeg",
    wh:' 要求250px*250px'
})
const showimg = ()=>{
    console.log('change,change,change,change,change');
    let file = files.value.files[0];
    console.log(file);
    let sizekb =  Math.floor(file.size/1024);
    if (sizekb < 1024 && sizekb > 0) {
        imgdata.value.size =" "+sizekb+" KB"
    } else {
        imgdata.value.size =" "+Math.floor(sizekb/1024*10)/10+" MB"
    }
    if (file.type == 'image/jpeg' | file.type == 'image/jpg' | file.type == 'image/png') {
        imgdata.value.type = file.type;
    } else {
        imgdata.value.type = "不是正确的图片类型"
    }
    var img = new Image();
    // img.src = imgurl.value;
    img.src = imgurl.value+'?'+Date.parse(new Date());
    imgdata.value.wh = img.width+"px*"+img.height+"px";
    setTimeout(() => {
        if (img.width == 0) {
            var imgs = new Image();
            imgs.src = imgurl.value;
            imgdata.value.wh = imgs.width+"px*"+imgs.height+"px";
        }
    }, 100);
    setTimeout(() => {
        if (img.width == 0) {
            var imgs = new Image();
            imgs.src = imgurl.value;
            imgdata.value.wh = imgs.width+"px*"+imgs.height+"px";
        }
    }, 1000);
    
    let reader = new FileReader();
    reader.readAsDataURL(file);//result属性中将包含一个data: URL格式的Base64字符串以表示所读取文件的内容
    reader.onload = ()=>{
        //该事件在读取操作完成时触发
        imgurl.value = reader.result;
        // console.log(reader.result);
    };
    
}
var inputtitle = ref(undefined);
var inputlink = ref(undefined);
var textarea = ref(undefined)
const loadfile = ()=>{
    const a = imgurl.value
    const b = inputtitle.value.value
    const c = inputlink.value.value
    const d = textarea.value.value
    const e = imgdata.value.wh
    
    if (imgdata.value.type == "不是正确的图片格式") {
        open("不是正确的图片格式不接受上传");
    } else{
        if (a && b && c && d && e == "250px*250px") {
            console.log("信息完整");
            setproject({
                img:a,
                name:b,
                link:c,
                text:d
            }).then(res=>{
                console.log(res);
                opensx(res.data.msg);
                    // imgurl.value = '';
                    // imgdata.value.name = '';
                    // imgdata.value.size = ' <2M';
                    // imgdata.value.type = ' png/jpg/jpeg';
                    // imgdata.value.wh = '要求250px*250px';
                    // files.value.outerHTML = files.value.outerHTML;
                    // inputtitle.value.value = '';
                    // inputlink.value.value = '';
                    // textarea.value.value = '';
                    
                    // files.value = '';

            }).catch(err=>{
                console.log(err);
                open(err);
            })
            
        } else {
            console.log("信息不完整");
            open('请正确写内容')
        }
    }
}
import { ElMessageBox } from 'element-plus';
import router from 'router';
const open = (b) => {
  ElMessageBox.alert(b, '提示', {
    confirmButtonText: '知道了',
    callback: () => {
    },
  })
}
const opensx = (b) => {
  ElMessageBox.alert(b, '提示', {
    confirmButtonText: '关闭',
    callback: () => {
        // window.location.replace("/administrator/uploadmyproject");
        //清空图片及其信息
        imgurl.value = '';
        imgdata.value.name = '';
        imgdata.value.size = ' <2M';
        imgdata.value.type = ' png/jpg/jpeg';
        imgdata.value.wh = '要求250px*250px';
        //v-if切换清除选择文件名和输入框内容
        getallshow.value = false;
        nextTick(()=>{getallshow.value = true;})      
    },
  })
}
var getallshow = ref(true);
onMounted(() => {

})
</script>
<style lang="scss" scoped>
*{z-index: 0;overflow: hidden;}
html{
    width: 90vw;
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0);
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
    .getall{
        width: 500px;
        height: 700px;
        background-color: rgba(255, 255, 255, 0.801);
        float: left;
        position: absolute;
        top: 10vh;
        left: 45vw;
        margin-left: -250px;
        padding: 20px;
        li{
            margin: 5px;
        }
        h4{margin: 5px;}
       
        .imgbox{
            width: 250px;
            height: 250px;
            background-color: rgba(255, 255, 255, 0.8);
            border:1px solid #d400ff9c ;
            margin: auto;
            //img{
                // width: 100%;
                // height: 100%;
               
            //}
        }
        p{
            margin: 5px;
            color: rgb(44, 0, 0);
            padding-left: 150px;
            font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        }
        .input{
            outline-style: none;
           width: 480px;
           height: 20px;
        //    text-align: center;
        }
        .textarea{
            width: 480px;
            height: 100px;
            border-color: #1E90FF;
        }
        .load{
            width: 80px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background-color:#1E90FF;
            color: #fff;
            border-radius: 5px;
            margin: auto;
            position: relative;
            top: 30px;
            
        }
        div.load:hover{
            background-color:#fff175;
            color: black;
            }
    }
    
}

</style>