<template>
<div class="box">
    <div class="leftdiv" :style="leftdivW" ref="leftdiv" v-text="leftdivtext"></div>
    <div class="slider" @mousedown="mousedown($event)" :style="sliderX" ref="slider">
        <svg t="1649144048335" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3874" width="48" height="40"><path d="M752 416c-9.824 0-19.456 0.768-28.96 1.92L645.664 176H512a32 32 0 0 0 0 64h86.912l21.248 66.432-328.096 198.432-70.688-112.864H256a32 32 0 0 0 0-64H96a32 32 0 0 0 0 64h49.856l75.584 120.672c-4.448-0.32-8.896-0.672-13.44-0.672C110.944 512 32 590.976 32 688S110.944 864 208 864s176-78.976 176-176a175.456 175.456 0 0 0-57.088-129.376l313.312-189.536 20.8 64.96C573.664 469.984 512 555.872 512 656c0 132.352 107.648 240 240 240s240-107.648 240-240-107.648-240-240-240z m-544 384C146.24 800 96 749.76 96 688S146.24 576 208 576s112 50.24 112 112S269.76 800 208 800z m544 32a176.224 176.224 0 0 1-176-176 176.16 176.16 0 0 1 104.608-160.704l56.736 177.344a31.968 31.968 0 1 0 60.928-19.52l-55.232-172.672c2.976-0.128 5.952-0.448 8.96-0.448 97.024 0 176 78.976 176 176S849.024 832 752 832z" p-id="3875" :fill="fill"></path></svg>
    </div>
    <div class="hint" v-show="hint">请按住滑块,拖动到最右边</div>
</div>
</template>
<script setup>
// toRefs defineProps() useSlots()
// useAttrs() defineEmits() defineExpose()
//  console.log(child.value.msg); // Child Components
import {onMounted,ref,defineEmits} from 'vue';
var leftdiv = ref()
var slider = ref()
var leftdivW = ref()
var sliderX = ref()
var fill = ref('red')
var leftdivtext = ref()
var hint = ref(true)
const emit = defineEmits(['verify'])  
const mousedown = (el)=>{

    hint.value = false;
    const x = el.clientX;
    // console.log(x);
    slider.value.onmousemove = ($event)=>{
        // console.log('onmousemove');
        var xx = $event.clientX - x;
        if (xx<0 | xx > 308) {
            
        } else{
            leftdivW.value = "width:"+xx+"px";
            sliderX.value = "left:"+xx+"px";
            if (leftdiv.value.offsetWidth > 300) {
                leftdivW.value = "width:308px; background-color:#009999;";
                leftdivtext.value = "验证通过";
                sliderX.value = "left:308px;border: 1px solid green";
                fill.value = 'green';
                slider.value.onmousemove = undefined;
                slider.value.onmouseup = undefined;
                slider.value.onmousedown = undefined;
                emit("verify",true);
            }
        }
    }
    slider.value.onmouseup = ($event)=>{
        leftdivW.value = undefined;
        leftdivtext.value = undefined;
        sliderX.value = undefined;
        fill.value = 'red';
        slider.value.onmousemove = undefined;
        slider.value.onmousedown = undefined;
        hint.value = true;
        emit("verify",false);
    }
}
onMounted(() => {

})
</script>
<style lang="scss" scoped>
.box{
    width: 360px;
    height: 40px;
    background-color: rgb(226, 226, 226);
    position: relative;
    display: flex;
    overflow: hidden;
    .leftdiv{
        width: 0x;
        height: 40px;
        background-color: rgb(238, 255, 0);
        text-align: center;
        line-height: 40px;
        color: rgb(0, 0, 0);
    }
    .slider{
        width: 50px;
        height: 38px;
        background-color: rgb(255, 255, 255);
        border: 1px solid rgb(255, 0, 0);
        position: absolute;
        left: 0;
    }
    .hint{
        width: 308px;
        height: 40px;
        position: absolute;
        left: 52px;
        text-align: center;
        line-height: 40px;
        font-size: 15px;
        color: rgb(0, 38, 255);
        background-color: rgb(230, 230, 230);
    }
}
</style>