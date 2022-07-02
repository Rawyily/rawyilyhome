<template>
<div class="box">
个人网站，难以保证数据安全,请勿输入重要信息！ ©2022Rawyily 
</div>
</template>
<script setup>
// toRefs defineProps() useSlots()
// useAttrs() defineEmits() defineExpose()
//  console.log(child.value.msg); // Child Components
import {onMounted} from 'vue';

onMounted(() => {

})
</script>
<style lang="scss" scoped>
.box{
    height: 100px;
    width: 100%;
    background-color: rgb(255, 251, 0);
    line-height: 100px;
    text-align: center;
    font-weight: bold;
    margin-top: 100px;
}
</style>