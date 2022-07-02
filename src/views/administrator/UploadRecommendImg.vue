<template>
<div class="box">
    <div class="header">更新推荐栏</div>
    <div style="height:20vh;"></div>
    <div class="loadbox">
        <div class="bl">
            <div v-if="imgbutton" class="addbutton" :style="addbutton"></div>
            <input v-if="imgbutton" @change="getimgfile()" class="inputfile" type="file" ref="files" @mousemove="inputfilemouse(true)" @mouseout="inputfilemouse(false)">
            <div v-if="!imgbutton" class="imgbox"><img :src="imgsrc" alt="" srcset=""></div>
            <div v-if="!imgbutton" @click="clearimg()" class="guanbiimg">X</div>
        </div>
        <div v-if="imgbutton" class="br">
            <h4 style="text-align: center;margin-top:115px">要求</h4>
            <p style="text-align: center;margin-top:10px">260px*206px的ipg或png图片</p>
        </div>
        <div v-if="!imgbutton" class="br">
            <div class="imgtype" :style="warntype">图片类型：{{img.type}}</div>
            <div :style="warnpx">图片尺寸：{{img.wh}}</div>
        </div>
        <!-- ele单选框 -->
        <div v-if="!imgbutton" class="selectelenum">
        <el-radio-group v-model="radio">
            <el-radio :label="1">推荐 1</el-radio>
            <el-radio :label="2">推荐 2</el-radio>
            <el-radio :label="3">推荐 3</el-radio>
            <el-radio :label="4">推荐 4</el-radio>
            <el-radio :label="5">推荐 5</el-radio>
        </el-radio-group>
        </div>

        <div v-if="!imgbutton" class="linkinput">
        <el-input v-model="link" minlength="1" maxlength="50" placeholder="项目链接" />
        </div>

        <div v-if="!imgbutton" class="loadbutton">
            <el-row class="mb-4">
                <el-button @click="loaddata()" type="primary" round>上传更新</el-button>
            </el-row>
        </div>

    </div>
</div>
</template>
<script setup>
// toRefs defineProps() useSlots()
// useAttrs() defineEmits() defineExpose()
//  console.log(child.value.msg); // Child Components
import {onMounted,ref} from 'vue';
var files = ref(null);
var addbutton = ref(undefined);
const inputfilemouse = (i)=>{
    if (i) {
      addbutton.value = "opacity: 1;"  
    } else {
      addbutton.value = '';  
    }
    
}
var imgsrc = ref();
const getimgfile = ()=>{
    console.log(new Date());
    // 切换
    imgbutton.value = false;
    // 显示图片
    var imgfile = files.value.files[0];
    setfromfile.value = files.value.files[0];
    console.log(imgfile);
    var readfile = new FileReader;
    readfile.readAsDataURL(imgfile);
    readfile.onload = ()=>{
        imgsrc.value = readfile.result;
        //显示图片尺寸
        setTimeout(()=>{
            var imgdata = new Image();
            imgdata.src = imgsrc.value;
            imgdata.onload = ()=>{
                const w = imgdata.width;
                const h = imgdata.height;
                if (w == 260 && h == 206) {
                    img.value.wh = "260*206 (正确)";
                    warnpx.value = "";
                    imgok.value[0] = true;
                } else {
                    img.value.wh = w+'px*'+h+'px (错误)';
                    warnpx.value = "color:red;";
                    imgok.value[0] = false;
                }
            }
        },500);
        //显示图片格式
        if (imgfile.type == "image/png" | imgfile.type == "image/jpg" | imgfile.type == "image/jpeg") {
            img.value.type = imgfile.type + " (正确)";
            warntype.value = "";
            imgok.value[1] = true;
        } else {
            img.value.type = imgfile.type + " (错误)";
            warntype.value = "color:red;";
            imgok.value[1] = false;
        }
    }
}
var warntype = ref();
var warnpx = ref();
var imgbutton = ref(true);
const clearimg = ()=>{
    imgsrc.value = undefined;
    imgbutton.value = true;
    warntype.value = undefined;
    warnpx.value = undefined;
    radio.value = undefined;
    link.value = undefined;
    addbutton.value = "opacity: 1;" 
}
const img = ref({type:undefined,wh:undefined});
var radio = ref();
var link = ref();
var imgok = ref([undefined,undefined]); 
import {setrecommend} from 'network/setimg';
var setfromfile = ref();
const loaddata = ()=>{
    console.log('files.value');
    console.log(setfromfile.value);
    // console.log(imgok.value);
    // console.log(radio.value);
    // console.log(link.value);
    if (imgok.value[0] && imgok.value[0]) {
        if (radio.value) {
            if (link.value) {
                const data = {
                    recommendnum:radio.value,
                    link:link.value
                }
                console.log(data);
                const datastring = JSON.stringify(data);
                const formData = new FormData();
                formData.append('file',setfromfile.value);
                    setrecommend(formData,datastring).then(res=>{
                        openclear(res.data.msg);
                    }).catch(err=>{
                        open(err)
                    })        
            } else {
                open('请填写推荐图对应的链接')
            }
        } else {
        open('请选择要更新的推荐图选项')
            
        }
    } else {
        open('图像格式有误')
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
const openclear = (b) => {
  ElMessageBox.alert(b, '提示', {
    confirmButtonText: '知道了',
    callback: () => {
        clearimg()
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
    .loadbox{
        width: 650px;
        height: 450px;
        background-color: rgb(255, 255, 255);
        margin: auto;
        position: relative;
        
        .bl{
            width: 300px;
            height: 300px;
            padding: 5px;
            position: absolute;
            top: 0;
            left: 0;
            .inputfile{
                position: absolute;
                top: 140px;
                left: 125px;
                // transform:rotate(45deg);
                opacity: 0;
            }
            .addbutton{
                width: 50px;
                height: 50px;
                background-color: rgb(0, 0, 0);
                position: absolute;
                top: 125px;
                left: 125px;
                background-image: url('../../assets/img/iconAdd.jpg');
                border-radius: 25px;
                opacity: 0.7;
            }
            .guanbiimg{
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align:center;
                font-size: 26px;
                color: rgb(255, 0, 0);
                background-color: #fff;
                position: absolute;
                bottom: 241px;
                left: 255px;
            }
            .guanbiimg:hover{
                color: rgb(255, 0, 0);
                background-color: rgba(238, 255, 0, 0.788);
            }
            .imgbox{
                width: 260px;
                height: 206px;
                border: 10px solid rgb(255, 255, 255);
                background-color: #fff;
                position: absolute;
                bottom: 15px;
                left: 15px;
                overflow: hidden;
            }
        }
        .br{
            width: 300px;
            height: 300px;
            padding: 5px;
            position: absolute;
            // background-color: rgb(160, 160, 160);
            top: 0;
            right: 0;
            .imgtype{margin-top:120px}
        }
        .selectelenum{
            text-align: center;
            position: relative;
            top: 310px;
        }
        .linkinput{
            position: relative;
            top: 310px;
            width: 580px;
            margin: auto;
        }
        .loadbutton{
            position: absolute;
            bottom: 5px;
            left: 281px;
        }
    }
}

</style>