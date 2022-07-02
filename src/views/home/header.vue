<template>
<div class="box">
    <div class="logo" @click="router.push('/')" :style="logostyle" @mouseover="logomouseover()" @mouseout="logomouseout()">RAWYILY</div>
    <div class="nav" style="background-color=">
        <div class="navtitle" 
        v-for="(item,index) in navtitle" :key="item" 
        @mouseover="navmouseover($event,index)"  
        @mouseout="navmouseout($event,index)" 
        :style='navtitle[index].bcolor'  
        @click="routerpush(item.routerTo)">{{item.name}}</div>
    </div>
    <div class="logindiv">
        <div class="navicon"  @mouseover="iconmouseover1()" @mouseout="iconmouseout1()" :style='iconstyleBC1' @click="searchinput()"><svg :style='iconstyleCO1' class="icon" aria-hidden="true"><use xlink:href="#icon-sousuo"></use></svg></div>
        <div class="navicon"  @mouseover="iconmouseover2($event)" @mouseout="iconmouseout2($event)" :style='iconstyleBC2' @click="routerpush('/administrator')"><svg :style='iconstyleCO2' class="icon" aria-hidden="true"><use xlink:href="#icon-shangchuan"></use></svg></div>
        <div class="login" @mouseover="loginmouseover()" @mouseout="loginmouseout($event)" :style='loginstyle' @click="routerpush('#')">登录 <span v-html="'&nbsp;&nbsp;|&nbsp;&nbsp;'" style="background-color:rgb(50,50,50,0);"></span> 注册</div>
    </div>
</div>
<!-- 二级导航栏 title-->
<div class="homediv" v-show="navtitle[0].show" @mouseover="navdivmouseover(0)" @mouseout="navdivmouseout(0)"  :style="navtitle[0].secondnavstyle">
    <div class="navtitlesecondboxs" v-for="item in navtitlehomes" :key="item.name" @click="routerpush(item.push)"  @mouseover="navtitlescondesmouseover(item)"  @mouseout="navtitlescondesmouseout(item)" :style="item.style">{{item.name}}</div>
</div>
<div class="founddiv" v-show="navtitle[1].show" @mouseover="navdivmouseover(1)" @mouseout="navdivmouseout(1)"  :style="navtitle[1].secondnavstyle">
    <div class="navtitlesecondboxs" v-for="item in navtitlefounds" :key="item.name" @click="routerpush(item.push)"  @mouseover="navtitlescondesmouseover(item)"  @mouseout="navtitlescondesmouseout(item)" :style="item.style">{{item.name}}</div>
</div>
<div class="blogdiv" v-show="navtitle[2].show" @mouseover="navdivmouseover(2)" @mouseout="navdivmouseout(2)"  :style="navtitle[2].secondnavstyle">
    <div class="navtitlesecondboxs" v-for="item in navtitleblogs" :key="item.name" @click="routerpush(item.push)"  @mouseover="navtitlescondesmouseover(item)"  @mouseout="navtitlescondesmouseout(item)" :style="item.style">{{item.name}}</div>
</div>
<div class="helpdiv" v-show="navtitle[3].show" @mouseover="navdivmouseover(3)" @mouseout="navdivmouseout(3)"  :style="navtitle[3].secondnavstyle">
    <div class="navtitlesecondboxs" v-for="item in navtitlehelps" :key="item.name" @click="routerpush(item.push)"  @mouseover="navtitlescondesmouseover(item)"  @mouseout="navtitlescondesmouseout(item)" :style="item.style">{{item.name}}</div>
</div>
<!-- 二级导航栏 图标 -->
<!-- 搜索 -->
<div class="search" v-show="searchdiv">
    <div @click="closesearch()" @mouseover="searchiconcolormouseover(0)" @mouseout="searchiconcolormouseout(0)" :style="searchiconcolor[0].style" class="searchicon"><svg class="sicon" aria-hidden="true"><use xlink:href="#icon-guanbi"></use></svg></div>
    <input ref="input" class="input"  type="text">
    <div  @click="opensearch()" @mouseover="searchiconcolormouseover(1)" @mouseout="searchiconcolormouseout(1)" :style="searchiconcolor[1].style" class="searchicon"><svg class="sicon" aria-hidden="true"><use xlink:href="#icon-sousuo"></use></svg></div>
    <div class="searchhistoryps">搜索历史</div>
    <Searchhistory></Searchhistory>
</div>
<!-- 上传 -->
<div class="addshowinserver" @mouseover="addshowinservermouseover($event)"  @mouseout="addshowinservermouseout($event)" v-show="addshowinserverdivshow" :style="addshowinserverstyle">
    <div class="addshowinserverson" v-for="(item,index) in addshowinserverson" :key="item.name" @click="routerpush(item.push)"  @mouseover="addshowinserversonmouseover(index)"  @mouseout="addshowinserversonmouseout(index)" :style="addshowinserverson[index].style">{{item.name}}</div>
</div>
<!-- 二级导航栏 登录 -->
<div class="loginsecond" v-show="loginsecond" @mouseover="loginsecondmouserover()"  @mouseout="loginsecondmouserout()">
    <div class="tit"><span style="color:rgb(255, 81, 0);magin-left:20px;"><span> </span>登录 | 注册</span>后,可享受：</div>
    <div class="ps"><span class="iconfont">&#xe6b5;</span>网站数据联网保存</div>
    <div class="ps"><span class="iconfont">&#xe606;</span>开放个人中心功能</div>
    <div class="ps"><span class="iconfont">&#xe960;</span>建议使用邮箱注册</div>
    <div class="button" @click="routerpush('/loginbase/login')" @mouseover="loginbuttonmouseover()" @mouseout="loginbuttonmouseout()" :style="loginbuttonbackgroundcolor">登录</div>
</div>
</template>
<script setup>
// toRefs defineProps() useSlots()
// useAttrs() defineEmits() defineExpose()
//  console.log(child.value.msg); // Child Components
import {onMounted,ref,reactive,nextTick} from 'vue';
import store  from 'store';
import router from 'router';
import Searchhistory from 'views/home/searchhistory.vue'
// 路由跳转
const routerpush = (i)=>{
    router.push(i);
}
//logo
let logostyle = ref(undefined)
const logomouseover = ()=>{
    var color = '#'+ Math.random().toString(16).substr(-6);
    // console.log(Math.random());
    // console.log(Math.random().toString(16));
    // console.log(Math.random().toString(16).substr(-6));
    // 随机生成一个随机数，转为16进制字符串，截取后6位，就是随机颜色的后6位
    logostyle.value = "color:"+color+";";
}
const logomouseout = ()=>{
    logostyle.value = undefined;
}
//导航
var navtitle = reactive([
    {name:'首页',routerTo:'/',bcolor:'',show:false,addx:90,secondnavstyle:undefined}, 
    {name:'发现',routerTo:'#',bcolor:'',show:false,addx:90,secondnavstyle:undefined},
    {name:'博客',routerTo:'#',bcolor:'',show:false,addx:90,secondnavstyle:undefined},
    {name:'帮助',routerTo:'#',bcolor:'',show:false,addx:90,secondnavstyle:undefined},
])
// 鼠标进入nav
const navmouseover = (event,index)=>{
    // 修改nav背景色为暗
  navtitle[index].bcolor = "background-color:#5c5c5c;color:#ffd000;";
    //设置二级导航栏位置在鼠标正下方
    const x= event.clientX;
    const xx = x-navtitle[index].addx;
    navtitle[index].secondnavstyle = "left:"+xx+"px";
    // console.log('x:'+x);
    //二级导航栏显现
    navtitle[index].show = true;
}
// 鼠标移出nav
const navmouseout = (event,index)=>{
    
  
    //获取 坐标
  const x = event.clientX;
  const y = event.clientY;
//   console.log('x:'+x);
//   console.log('y:'+y);
  //向下不会隐藏二级导航栏
  if (y>=60) {
  } else {
      // 修改nav背景色为无
      navtitle[index].bcolor = "";
      navtitle[index].show = false;
  }   
}
const navdivmouseover = (i)=>{
  navtitle[i].bcolor = "background-color:#5c5c5c;color:#ffd000;";
  navtitle[i].show = true;
}
const navdivmouseout = (i)=>{
    navtitle[i].bcolor = "";
    navtitle[i].show = false;
}
const navtitlehomes = reactive([{name:'网站首页',style:undefined,push:'/'},{name:'我的首页',style:undefined,push:'#'}]);
const navtitlefounds = reactive([{name:'发现新的',style:undefined,push:'#'},{name:'收藏发现',style:undefined,push:'#'}]);
const navtitleblogs = reactive([{name:'博客推荐',style:undefined,push:'#'},{name:'博客收藏',style:undefined,push:'#'}]);
const navtitlehelps = reactive([{name:'网站说明',style:undefined,push:'#'},{name:'联系站长',style:undefined,push:'#'},{name:'版权声明',style:undefined,push:'#'}]);
const navtitlescondesmouseover = (item)=>{
    item.style = "background-color:#ffd000;";
    // console.log(item);
}
const navtitlescondesmouseout = (item)=>{
    item.style = undefined;
    // console.log(item);
}
//图标
var iconstyleBC1 = ref(undefined);
var iconstyleBC2 = ref(undefined);
var iconstyleCO1 = ref(undefined);
var iconstyleCO2 = ref(undefined);
const iconmouseover1 = ()=>{
    console.log(iconstyleBC1.value);
    if (iconstyleBC1.value == "background-color:#ffd000;" && iconstyleCO1.value == "color:#ffd000;") {
    } else {
        iconstyleBC1.value = "background-color:#003399;";
        iconstyleCO1.value = "color:#ffd000;";
    }

}
const iconmouseout1 = ()=>{
    console.log("鼠标移出搜索按钮");
    console.log(iconstyleBC1.value);
    if (iconstyleBC1.value == "background-color:#ffd000;" && iconstyleCO1.value == "color:#ffd000;") {
    } else {
        iconstyleBC1.value = undefined;
        iconstyleCO1.value = undefined;
    }
   
}
const iconmouseover2 = (event)=>{
    iconstyleBC2.value = "background-color:#003399;";
    iconstyleCO2.value = "color:#ffd000;";
    const x = event.clientX;
    addshowinserverstyle.value = "left:"+(x-100)+"px;";
    addshowinserverdivshow.value = true;
    

}
const iconmouseout2 = (event)=>{
    const y = event.clientY;
    if (y>=60) {
    }else{
    addshowinserverdivshow.value = false;
    iconstyleBC2.value = undefined;
    iconstyleCO2.value = undefined;
    }

}
//搜索
let  input= ref(null);//搜索输入框标签el
let searchdiv = ref(false);//搜索子页面
//点击右边的搜索按钮
const searchinput = ()=>{
    // nextTick(()=>{});
    setTimeout(()=>{input.value.focus()},1)
    // console.log(input.value);
    searchdiv.value = true;
    //隐藏搜索按钮
    console.log("隐藏按钮");
    iconstyleBC1.value = "background-color:#ffd000;";
    iconstyleCO1.value = "color:#ffd000;";
}
//点击关闭搜索页面
const closesearch = ()=>{
    ///移除焦点
    setTimeout(()=>{input.value.blur()},1);
    //关闭子页面
    searchdiv.value = false;
    //恢复搜索图标样式
    iconstyleBC1.value = undefined;
    iconstyleCO1.value = undefined;
}
//子页面关闭和搜索图标的样式
let searchiconcolor = reactive([
    {style:undefined},
    {style:undefined}
])
//子页面关闭和搜索图标的样式 高亮黄
const  searchiconcolormouseover = (i)=>{
    searchiconcolor[i].style = "background-color:yellow;";
}
//子页面关闭和搜索图标的样式 恢复
const  searchiconcolormouseout = (i)=>{
    searchiconcolor[i].style = undefined;
}
//点击确认搜索
const opensearch = ()=>{
    iconstyleBC1.value = undefined;
    iconstyleCO1.value = undefined;
    const value = input.value.value;
    console.log(input.value.value);
    sessionStorage.removeItem('opensearch');
    sessionStorage.setItem('opensearch',value);
    // 空字符不操作
    if (value) {
        // console.log("search:"+value);
        if (localStorage.searchhistory) {  
        let searchhistory = localStorage.searchhistory;
        // console.log(searchhistory);
        let searchhistoryArry = JSON.parse(searchhistory);
        // console.log(searchhistoryArry);
            if (searchhistoryArry.length >= 30) {
                searchhistoryArry.pop();
                searchhistoryArry.unshift(value);
                // console.log(searchhistoryArry);
                localStorage.setItem('searchhistory',JSON.stringify(searchhistoryArry));
            } else {
                searchhistoryArry.unshift(value);
                localStorage.setItem('searchhistory',JSON.stringify(searchhistoryArry));
            }
        } else {
            const valuearry = [value];
            const searchhistory = JSON.stringify(valuearry)
            localStorage.setItem('searchhistory',searchhistory);
        }
    } else {
    //   console.log(value);  
    }
}
// 上传 二级导航页面
let addshowinserverdivshow = ref(undefined);
let addshowinserverstyle = ref(undefined);
const addshowinservermouseover = ()=>{
    addshowinserverdivshow.value = true;


}
const addshowinservermouseout = ()=>{
    //bug
    iconstyleBC2.value = undefined;
    iconstyleCO2.value = undefined;
    addshowinserverdivshow.value = false;
    // console.log("上传盒子");

}
//
var addshowinserverson = reactive([
    {name:'工作台',push:'/administrator',style:undefined},
    {name:'后台管理',push:'#',style:undefined},
    {name:'上传新项目',push:'/administrator/uploadmyproject',style:undefined},
    {name:'更新轮播图',push:'/administrator/uploadslideshowimg',style:undefined},
    {name:'更新推荐列表',push:'/administrator/uploadrecommendimg',style:undefined},
])
const addshowinserversonmouseover = (i)=>{
    iconstyleBC2.value = "background-color:#003399;";
    iconstyleCO2.value = "color:#ffd000;";
    addshowinserverson[i].style = "background-color:#ffd000;";
}
const addshowinserversonmouseout = (i)=>{
    addshowinserverson[i].style = undefined;
}
//登录
var loginstyle = ref(undefined);
const loginmouseover = ()=>{
    loginstyle.value = 'background-color:#5c5c5c;color:#ffd000;';
    loginsecond.value = true;
}
const loginmouseout = (event)=>{
    const y = event.clientY;
    if (y >= 60) {
    } else {
    loginsecond.value = false;
    loginstyle.value = '';
    }
}
let loginsecond = ref(false);
const loginsecondmouserover = ()=>{
    loginsecond.value = true;
    loginstyle.value = 'background-color:#5c5c5c;color:#ffd000;';
}
const loginsecondmouserout = ()=>{
    loginsecond.value = false;
    loginstyle.value = '';
}
let loginbuttonbackgroundcolor = ref(undefined);
const loginbuttonmouseover = ()=>{
    loginbuttonbackgroundcolor.value = "background-color:rgb(255, 81, 0);color:#fff;";
}
const loginbuttonmouseout = ()=>{
    loginbuttonbackgroundcolor.value = undefined;
}
onMounted(() => {

})
</script>

<style lang="scss" scoped>
@import url(../../assets/icon/header/iconfont.css);
*{background-color:#ffd000;z-index: 1;}
html{height: 60px !important;}
.box{
    width: 100%;
    height: 60px;
    background-color:#ffd000;
    display: flex;
    .logo{
        width: 200px;
        line-height: 60px;
        text-align: center;
        font-size: 28px;
        font-weight: bold;
        color: rgb(255, 0, 0);
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .nav{
        width: 320px;
        height: 60px;
        margin: auto;
        display: flex;
        .navtitle{
            width: 50px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            padding-left:15px;
            padding-right: 15px;
            font-size: 20px;
            font-family: serif;
            font-weight:bold;
        }
    }
    .logindiv{
        width: 320px;
        height: 60px;
        display: flex;
        .login{
            width: 150px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            // background-color: #fff;
        }
        .navicon{
            width: 60px;
            height: 60px;
            // background-color: rgb(255, 219, 219);
            line-height: 60px;
            text-align: center;
            .icon {
                    width:50%;
                    height:50%;
                    vertical-align: -0.15em;
                    fill: currentColor;
                    overflow: hidden;
                    color: rgb(0, 0, 0);
                    position: relative;
                    top: 8px;
                    background-color: rgba(255, 255, 255, 0);
            }
        } 
    }
}
.homediv{
    width: 180px;
    height: 100px;
    background-color: rgb(255, 194, 194);
    position: absolute;
    top: 60px;
}
.founddiv{
    width: 180px;
    height: 100px;
    background-color: rgb(255, 194, 194);
    position: absolute;
    top: 60px;
}
.blogdiv{
    width: 180px;
    height: 100px;
    background-color: rgb(255, 194, 194);
    position: absolute;
    top: 60px;
}
.helpdiv{
    width: 180px;
    height: 150px;
    background-color: rgb(255, 194, 194);
    position: absolute;
    top: 60px;
}
.navtitlesecondboxs{
    width: 180px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #fff;
}
.addshowinserver{
    width: 200px;
    // height: 180px;
    // background-color: rgb(0, 255, 128);
    position: absolute;
    top: 60px;
    box-shadow:5px 5px 2px #2d003f;
    .addshowinserverson{
        width: 200px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        background-color: rgb(250, 250, 250);
    }
}
.loginsecond{
    width: 200px;
    height: 230px;
    background-color: rgb(250, 250, 250);
    position: absolute;
    top: 60px;
    right: 50px;
    font-style: 15px;
    color: rgb(94, 94, 94);
    box-shadow:5px 5px 2px #2d003f;
    span{
        background-color: rgb(255, 255, 255);
        margin-right: 10px;
    }
    .tit{
        width: 200px;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid rgb(87, 87, 87);
        background-color: rgb(255, 255, 255);

    }
    .ps{
        width: 200px;
        height: 30px;
        line-height: 50px;
        text-align: center;
        background-color: rgb(255, 255, 255);
        font-size: 13px;

    }
    .button{
        width: 120px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        background-color: #ffd000;
        border-radius: 20px;
        color: rgb(0, 0, 0);
        margin: auto;
        position: relative;
        top: 30px;
    }
}
.search{
    width: 600px;
    height: 400px;
    background-color: rgb(255, 255, 255);
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -300px;
    .searchicon{
        width: 60px;
        height: 60px;
        float: left;
        .sicon{
            width: 40px;
            height: 40px;
            position: relative;
            top: 10px;
            left: 10px;
            background-color: rgba(255, 255, 255, 0);
        }
    }
    .input{
        width: 478px;
        height: 58px;
        line-height: 58px;
        text-align: center;
        font-size: 18px;
        background-color: #fff;
        outline-style: none ;
        border: 1px solid #ff8800;
        padding: 0;
        margin: 0;
        float: left;
        user-select: text !important;
        -moz-user-select: text !important;
        -webkit-user-select: text !important;
        -ms-user-select: text !important;
    }
    .searchhistoryps{
        width: 600px;
        margin-top: 5px;
        margin-bottom: 5px;
        text-align: center;
        background-color: #fff;
    }
}
</style>