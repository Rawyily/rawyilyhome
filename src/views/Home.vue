<template>
<div>
<Header></Header>
<Slideshow></Slideshow>
<Recommend></Recommend>
<Content></Content>
<!-- <Canvas></Canvas> -->
<Footer></Footer>
</div>
</template>
<script setup>
// toRefs defineProps() useSlots()
// useAttrs() defineEmits() defineExpose()
//  console.log(child.value.msg); // Child Components
import {onMounted} from 'vue';
import Header from 'views/home/header.vue';
import Slideshow from 'views/home/slideshow.vue';
import Footer from 'views/home/footer.vue';
import Recommend from 'views/home/recommend.vue';
import Content from 'views/home/content.vue';
import Canvas from 'views/Canvas.vue';
import Base from 'views/Base.vue';

onMounted(() => {

})
</script>
<style lang="scss" scoped>

</style>


