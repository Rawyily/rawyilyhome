<template>
<div class="box">
    <!-- 选择如何排序 -->
    <div class="ul">
        排序({{listsnum}})：<div @click="sorttime(sorttimearrange)">{{timesort}}</div><div @click="sortscore(sortscorearrange)">{{scoresort}}</div><div @click="sortcollect(sortcollecarrange)">{{collectsort}}</div>
    </div>
    <!-- 展示卡片 -->
    <div class="list" v-for="(item,index) in projectlist" :key="item.id">
        <!-- 图片 -->
        <div class="imgbox"><img @dblclick="windowopen(item.link)" :src="projectlist[index].img" :alt="projectlist[index].link"></div>
        <!-- 标题 -->
        <div class="title">No.{{item.id}} : {{item.name}}</div>
        <!-- 评分 -->
        <div class="score">
            <svg @click="clickscore(index,item.id)" :style="projectlist[index].scorecolor" class="icon" aria-hidden="true">
            <use xlink:href="#icon-decide"></use>
            </svg>
        评分：{{item.score}}</div>
        <!-- 选择评分1-10 -->
        <div v-if="addscoreshow == item.id" class="addscore">
            <div @click="addscoreshownum(item.id,0)" class="addscorenum">0</div>
            <div @click="addscoreshownum(item.id,1)" class="addscorenum">1</div>
            <div @click="addscoreshownum(item.id,2)" class="addscorenum">2</div>
            <div @click="addscoreshownum(item.id,3)" class="addscorenum">3</div>
            <div @click="addscoreshownum(item.id,4)" class="addscorenum">4</div>
            <div @click="addscoreshownum(item.id,5)" class="addscorenum">5</div>
            <div @click="addscoreshownum(item.id,6)" class="addscorenum">6</div>
            <div @click="addscoreshownum(item.id,7)" class="addscorenum">7</div>
            <div @click="addscoreshownum(item.id,8)" class="addscorenum">8</div>
            <div @click="addscoreshownum(item.id,9)" class="addscorenum">9</div>
            <div @click="addscoreshownum(item.id,10)" class="addscorenum">10</div>
        </div>
        <!-- 收藏 -->
        <div class="collect">
            <svg @click="clickcollect(index,item.id)" :style="projectlist[index].collectcolor" class="icon" aria-hidden="true">
            <use xlink:href="#icon-pingfen-xing"></use>
            </svg>
        收藏：{{item.collect}}</div>
        <!-- 描述、介绍 -->
        <div class="text"><span v-html="'<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'"></span>{{item.text}}</div>
        <!-- 链接 -->
        <div class="link">项目链接:{{item.link}}</div>
        <!-- 提交时间 -->
        <div class="time">提交时间：{{item.time}}</div>
        <!--  -->

    </div>
</div>
</template>
<script setup>
// toRefs defineProps() useSlots()
// useAttrs() defineEmits() defineExpose()
//  console.log(child.value.msg); // Child Components
import {onMounted, reactive, ref,forceUpdate} from 'vue';
import {getprojectdata} from 'network/getimg';
var projectlist = ref([
    // 没有数据时占位
    {id:'null'},
    {id:'null'},
    {id:'null'},
    {id:'null'},
    {id:'null'},
]);
const windowopen = (link)=>{
    window.open(link)
}
var listsnum = ref(0);

var timesort = ref('时间(升)');
var scoresort = ref('评分(无)');
var collectsort = ref('收藏(无)');

var sorttimearrange = ref(true);
const sorttime = (arrange)=>{
    scoresort.value = '评分(无)';
    collectsort.value = '收藏(无)';
    if ( arrange == false) {
        //输入降序返回升序
        var cmpare = function(a,b){
            var aid1 = a.id
            var bid1 = b.id
            if (aid1 > bid1) {
                return 1
            } else if(aid1 < bid1){
                return -1
            }else{
                return 0
            }
        }
        projectlist.value.sort(cmpare);
        timesort.value = '时间(升)';
        //标记为升序
        sorttimearrange.value = true;
    } else if(arrange == true){
        var cmpare = function(a,b){
            var aid1 = a.id
            var bid1 = b.id
            if (aid1 > bid1) {
                return -1
            } else if(aid1 < bid1){
                return 1
            }else{
                return 0
            }
        }
        projectlist.value.sort(cmpare);
        sorttimearrange.value = false;
        timesort.value = '时间(降)';
    }else{
        console.log('项目按时间排序出错');
    }
    // console.log(projectlist.value);
}


var sortscorearrange = ref(true);
const sortscore = (arrange)=>{
    timesort.value = '时间(无)';
    collectsort.value = '收藏(无)';
    if ( arrange == false) {
        var cmpare = function(a,b){
            var aid1 = a.score
            var bid1 = b.score
            if (aid1 > bid1) {
                return 1
            } else if(aid1 < bid1){
                return -1
            }else{
                return 0
            }
        }
        projectlist.value.sort(cmpare);
        sortscorearrange.value = true;
        scoresort.value = '评分(升)';
    } else if(arrange == true){
        var cmpare = function(a,b){
            var aid1 = a.score
            var bid1 = b.score
            if (aid1 > bid1) {
                return -1
            } else if(aid1 < bid1){
                return 1
            }else{
                return 0
            }
        }
        projectlist.value.sort(cmpare);
        sortscorearrange.value = false;
        scoresort.value = '评分(降)';

    }else{
        console.log('项目按评分排序出错');
    }
    // console.log(projectlist.value);
}
var sortcollecarrange = ref(true);
const sortcollect = (arrange)=>{
    timesort.value = '时间(无)';
    scoresort.value = '评分(无)';
    if ( arrange == false) {
        var cmpare = function(a,b){
            var aid1 = a.collect
            var bid1 = b.collect
            if (aid1 > bid1) {
                return 1
            } else if(aid1 < bid1){
                return -1
            }else{
                return 0
            }
        }
        projectlist.value.sort(cmpare);
        sortcollecarrange.value = true;
        collectsort.value = '收藏(升)';
    } else if(arrange == true){
        var cmpare = function(a,b){
            var aid1 = a.collect
            var bid1 = b.collect
            if (aid1 > bid1) {
                return -1
            } else if(aid1 < bid1){
                return 1
            }else{
                return 0
            }
        }
        projectlist.value.sort(cmpare);
        sortcollecarrange.value = false;
        collectsort.value = '收藏(降)';
    }else{
        console.log('项目按收藏排序出错');
    }
    // console.log(projectlist.value);
}
const clickscore = (index,id) =>{ 
    if (projectlist.value[index].scorecolor) {
        console.log(id);
        projectlist.value[index].scorecolor = undefined;
    } else {
        console.log(id);
        addscoreshow.value = id;
        projectlist.value[index].scorecolor = 'color:red;';
    }

}
var addscoreshow = ref();
const addscoreshownum = (id,num)=>{
    addscoreshow.value = undefined;
    console.log(num);
}
const clickcollect = (index,id) =>{ 
    if (projectlist.value[index].collectcolor) {
        console.log(id);
        projectlist.value[index].collectcolor = undefined;
    } else {
        console.log(id);
        projectlist.value[index].collectcolor = 'color:red;';
    }

}

onMounted(() => {
    getprojectdata().then(res=>{
        if (res.data.code == 200) {
                            const data = res.data.data;
                projectlist.value = data;
                setTimeout(()=>{
                   for (let i = 0; i < data.length; i++) {
                        var t = new Date(data[i].time);
                        const Y = t.getFullYear() + '-';
                        const M = (t.getMonth()+1 < 10 ? '0'+(t.getMonth()+1) : t.getMonth()+1) + '-';
                        const D = (t.getDate() <10 ? '0'+t.getDate() : t.getDate()) + ' ';
                        const h = (t.getHours() <10 ? '0'+t.getHours() : t.getHours())+ ':';
                        const m = (t.getMinutes() <10 ? '0'+t.getMinutes() : t.getMinutes())+ ':';
                        const s = t.getSeconds() <10 ? '0'+ t.getSeconds() : t.getSeconds(); 
                        projectlist.value[i].time =  (Y+M+D+h+m+s) ;     
                    } 
                },1000);
                listsnum.value = res.data.data.length;
                // console.log(listsnum.value);
        } else {
            
        }console.log(res.data);
            }).catch(err=>{
                console.log(err);
            })
})
</script>
<style lang="scss" scoped>
*{overflow: hidden; user-select:text;}
.box{
    margin: auto;
    width: 1350px;
    background-color: rgb(250, 250, 250);
    .ul{ 
        width: 600px;
        height: 40px;
        border-bottom: 1px solid rgb(255, 190, 190);
        margin: auto;
        text-align: center;
        display: flex;
        line-height: 40px;
        user-select: none;
        div{
            margin: auto;
            font-size: 20px;
            font-weight:bold;
            color: rgb(87, 87, 87);
            user-select: none;

        }
        div:hover{
                color:black;
            }
    }
    .list:hover{
        background-color: rgb(255, 230, 230);
    }
    .list{
        width: 250px;
        height: 540px;
        margin: 10px;
        list-style: none;
        background-color: rgb(255, 236, 236);
        float: left;
        position: relative;
        .imgbox{
            width: 250px;
            height: 250px;
            margin-bottom: 5px;
            background-color: rgb(255, 255, 255);
            img{
                height: 100%;
                width: 100%;
            }
        }
        .title{
            margin: 5px;
            font-weight:600;
        }
        .score{
            margin: 5px;
            width: 250px;
            color: rgb(255, 153, 0);
        }
        .collect{
            margin: 5px;
            width: 250px;
            color: rgb(90, 4, 44);
        }
        .text{
            width: 248px;
            height: 148px;
            background-color: rgb(255, 255, 255);
            border: 1px solid rgb(190, 190, 190);
            font-size: 13px;
        }
        .link{
            margin: 5px; 
            user-select:text;
            font-size:13px;
            width: 250px;
            height: 35px;
            color: rgb(23, 7, 255);
        }
        .time{
            position: absolute;
            bottom: 2px;
            right: 5px;
            font-size: 12px;
        }
        .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        color: rgb(206, 206, 206);
        }
        .addscore{
            width: 250px;
            background-color: #fff;
            position: absolute;
            top: 281px;
            user-select: none;
            padding-left: 4px;
            padding-right: 4px;
        }
        .addscorenum{
            user-select: none;
            float: left;
            height: 21px;
            width: 22px;
            line-height: 21px;
            text-align: center;
            margin: 0;
            padding: 0;
            background-color: rgb(255, 255, 255);
        }
        .addscorenum:hover{
            height: 20px;
            width: 21px;
            border: 1px solid rgb(255, 147, 147);
        }
    }
}
</style>