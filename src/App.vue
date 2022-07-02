<template>
  <router-view/>
</template>

<style lang="scss">
input{
          user-select: text !important;
        -moz-user-select: text !important;
        -webkit-user-select: text !important;
        -ms-user-select: text !important;
}
*{
  margin: 0;padding: 0;font-family: "微软雅黑";
  user-select: none;
  a{color: aliceblue;text-decoration: none;margin: 0;padding: 0;border:0;}
  a:link{color: #FFFFFF;text-decoration: none;/* a标签不要下划线 */margin: 0;padding: 0;border:0;}
  a:hover{color: #FFFFFF;margin: 0;padding: 0;border:0;}
  a:visited{color: #FFFFFF;margin: 0;padding: 0;border:0;}
  
  
}
</style>
