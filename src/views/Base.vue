<template>
<div>	
  <input ref="file" type="file" />	
  <input type="button" value="文件上传" @click="uploadFile()" />
</div>
<img :src="src" alt="">
</template>
<script setup>
// toRefs defineProps() useSlots()
// useAttrs() defineEmits() defineExpose()
//  console.log(child.value.msg); // Child Components
import {onMounted, ref} from 'vue';
import {fs} from 'network/getimg.js'
var file = ref(null)
const uploadFile = ()=>{
  console.log();
  const filedata = file.value.files[0];
  const formData = new FormData();
  formData.append('file',filedata);
  console.log(filedata);
  console.log(formData.get('file'));
}
let src = ref(undefined);
// const getimg = ()=>{
//   setimg().then(res=>{
//     src.value = res.data;
//     alert(res.data);
//     console.log(res.data);
//   }).catch(err=>{
//       alert(err);
//       console.log(err);
//   })
// }
onMounted(() => {
  fs().then(res=>{
    src.value = res.data;
    // alert(res.data);
    // console.log(res.data);
  }).catch(err=>{
      alert(err);
      console.log(err);
  })
})
</script>
<style lang="scss" scoped>

</style>