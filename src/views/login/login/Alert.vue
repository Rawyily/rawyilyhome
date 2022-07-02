<template>
<div class="alert">
    <el-alert v-if="alertnum == 1" effect="dark" :title="alert" type="success" center :closable="false"  show-icon />
    <el-alert v-else-if="alertnum == 2" effect="dark" :title="alert" type="info" center :closable="false"  show-icon />
    <el-alert v-else-if="alertnum == 3" effect="dark" :title="alert" type="warning" center :closable="false"  show-icon />
    <el-alert v-else-if="alertnum == 4" effect="dark" :title="alert" type="error" center :closable="false"  show-icon />
</div>
</template>
<script setup>
// toRefs defineProps() useSlots()
// useAttrs() defineEmits() defineExpose()
//  console.log(child.value.msg); // Child Components
import {nextTick, onMounted, ref, watchEffect} from 'vue';
var props = defineProps({
    alertnum:Number,
    alert: String
})
onMounted(() => {
 
})
</script>
<style lang="scss" scoped>
.alert{
    width: 360px;
    margin-left: 20px;
    margin-top: 5px;
}
</style>