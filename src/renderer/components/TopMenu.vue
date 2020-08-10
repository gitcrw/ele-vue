<template>
  <div id="top-menu" >
      <div class="top-nav">
          <nav-path class="no-drag"></nav-path>
      </div>
        
  
    <div class="top-menu no-drag">
      <div class="el-icon-s-tools c-pointer c-active-opacity" style="font-size: 22px;" @click="showTool(1)"></div>
      <div
        class="el-icon-bell c-pointer c-active-opacity"
        style="font-size: 20px;font-weight: bold;"
				@click="showTool(2)"
      ></div>

      <span class="line"></span>
      <!-- @command="actions" -->
      <el-dropdown  @command="actions">
        <el-avatar class="top_bar-avatar c-pointer" :src="avatar">
          <i slot="default" class="el-icon-user-solid" style="font-size: 19px;"></i>
        </el-avatar>
        <el-dropdown-menu slot="dropdown" class="no-drag">
          <el-dropdown-item command="1">
            <i class="el-icon-user" style="font-size: 16px;padding-right: 10px" />个人资料
          </el-dropdown-item>
          <el-dropdown-item command="2">
            <i class="el-icon-unlock" style="font-size: 16px;padding-right: 10px" />修改密码
          </el-dropdown-item>
          <el-dropdown-item command="3">
            <i class="el-icon-switch-button" style="font-size: 16px;padding-right: 10px" />注销登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div @click="$electron.ipcRenderer.send('mini')" style="font-size: 22px;" class="el-icon-minus c-pointer c-active-opacity"></div>
      <div
        style="font-size: 19px;"
        class="iconfont c-pointer c-active-opacity"
        :class="isInFullScreen? 'icon-window-restore-s-o' : 'icon-xingzhuang-juxing'"
        @click="FullScreen()"
      ></div>
      <div @click="$electron.ipcRenderer.send('close')" style="font-size: 22px;" class="el-icon-close icon-close c-pointer c-active-opacity"></div>
    </div>
    

  </div>
</template>
<script>
import { ipcRenderer } from 'electron'
import navPath from './NavPath'
export default {
  components: {navPath},
  data () {
    return {
      avatar: '',
      isInFullScreen: false ,// 是否是全屏状态
    }
  },
  created(){
    // this.avatar = this.$global.lcStorage('get',{name:'userInfo'}).user.avatar
  },

  watch:{
    '$store.state.avatar':function(t,f){
      this.avatar = t
    }
  },
  methods: {
    FullScreen () {
      let msg = this.isInFullScreen ? 'unmaximize' : 'maximize'
      this.$electron.ipcRenderer.send(msg)
      this.isInFullScreen = !this.isInFullScreen
    },
    actions(e){
      this.$store.commit('mb',true)
      if(e==1){
        this.$store.commit('showPopup','peopleInfo')
        
      }else if(e==2){
        this.$store.commit('showPopup','resvisePwd')
      }else if(e==3){

      }
      
    },
		//菜鸟 控制首页两个辣鸡弹框显示隐藏
		showTool (type) {
		 console.log(type, 'type')
		 this.$emit('handleShow', type)
		}
    // $electron.ipcRenderer.send('close')
    // $electron.ipcRenderer.send('mini')
  }
}
</script>
<style lang="scss" scoped>
#top-menu {
  height: 52px;
  position: relative;
  border-bottom: 1px solid #F1F1F1; 
}
.top-nav{
    height: 100%;
    display: flex;
    align-items: center;
}
.top-menu {
  position: absolute;
  top: 50%;
  right: 20px;
  display: flex;
  align-items: center;
  transform: translateY(-50%);
  div {

  }
  .el-icon-s-tools,
  .el-icon-bell {
    margin-right: 18px;
  }

  .line {
      
    background-color:#F1F1F1; 
    width: 1px;
    height: 34px;
  }

  .top_bar-avatar {
    margin: 0 23px;
  }

  .el-icon-minus,
  .icon-xingzhuang-juxing,
  .icon-window-restore-s-o {
    margin-right: 16px;
  }

  .el-icon-minus,
  .icon-xingzhuang-juxing,
  .icon-window-restore-s-o,
  .el-icon-s-tools,
  .el-icon-bell,
  .el-icon-close {
    transition: color 0.4s;
  }

  .el-icon-minus,
  .icon-xingzhuang-juxing,
  .icon-window-restore-s-o,
  .el-icon-close {
    color: #918686;

    &:hover {
      color: #101010;;
    }
  }

  .el-icon-s-tools,
  .el-icon-bell {
    color: #bbb8b8;

    &:hover {
      color: #918686;
    }
  }
}
</style>