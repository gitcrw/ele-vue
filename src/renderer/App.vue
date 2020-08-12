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
.el-checkbox__inner{
      z-index: 0 !important;
    }
.v-modal{
  left: 185px !important;
  top: 52px !important;
}
.el-drawer__wrapper {
  top: 52px !important;
}
.el-radio-button{
				    margin: 8px 8px 0 0;
    border: 1px solid #f1f1f1;
    border-radius: 5px;
    overflow: hidden;
			}
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
