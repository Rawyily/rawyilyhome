<template>
<div v-for="(item,index) in searchhistoryArry" :key="item.index" @click="push('#',item)" :style="color[index]" @mousemove="onmuseover(index)" @mouseout="onmuseout(index)">{{item}}</div>
</template>
<script setup>
// toRefs defineProps() useSlots()
// useAttrs() defineEmits() defineExpose()
//  console.log(child.value.msg); // Child Components
import {onMounted, reactive,ref} from 'vue';
import router from 'router';
const searchhistory = localStorage.searchhistory;
// console.log(searchhistory);
var searchhistoryArry = ref();
const searchdata = ()=>{
if (searchhistory) {
    searchhistoryArry.value = JSON.parse(searchhistory);
}
}
searchdata();
const push = (i,item)=>{
    sessionStorage.removeItem('opensearch');
    sessionStorage.setItem('opensearch',item);
    router.push(i);
    console.log(item)
}
var color = reactive([undefined])
const onmuseover = (index)=>{
    color[index] = "background-color: rgb(233, 214, 214);";
    console.log(color[index]);
}
const onmuseout = (index)=>{
    color[index] = "";
    console.log(color[index]);
}
onMounted(() => {

})
</script>
<style lang="scss" scoped>
html{
    width: 600px;
    user-select:text;
}
div{
    float: left;
    width: 190px;
    margin: 5px;
    text-align: center;
    background-color: rgb(233, 233, 233);
}
</style>