<template>
  <div id="app" class="drag no-select">
    
    <router-view></router-view>
    
  </div>
</template>

<script>
  export default {
    name: 'electron-vue',
    data(){
      return{
      }
    },
    watch:{

    }
  }
</script>


<style>
@import './common.css';
@import './assets/css/iconfont.css';

  /* CSS */
  html,body{
    width: 100%;
    height: 100%;
    font-family: 微软雅黑;
  }
  *{margin: 0;padding: 0;box-sizing: border-box;}

  #app{
    width: 100%;
    height: 100%;
    
  }

</style>
