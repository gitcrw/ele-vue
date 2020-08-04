<template>
    <div id="main">
      
        <div class="leftSide">
            <left-side :authority="authority"/>
        </div>
        <div class="rightSide">
            <top-menu></top-menu>
            
              <div class="content no-drag">
                <keep-alive>
                  <router-view :allProject="allProject"></router-view>
                  </keep-alive>
              </div>
            
        </div>
    </div>
</template>
<script>
import qs from 'qs'
import LeftSide from '../components/LeftSide'
import TopMenu from '../components/TopMenu'
export default {
  components: {
    LeftSide,
    TopMenu
  },
  data () {
    return {
      authority: '', // 角色拥有的权限
      allProject: ''
    }
  },
  created () {
    // 角色拥有的权限
    this.$api.GET_ROLEPROMISE().then(res => {
      console.log(res)
      this.authority = res.data
    })
    // 首页-所有项目
    this.$api.GET_ALLPROJECT().then(res => {
      this.allProject = res.data
    })
  }
}
</script>
<style lang="scss" scoped>
    #main{
        width: 100%;
        height: 100%;
    }
    .leftSide{
        width: 14%;
        height: 100%;
        background: rgb(55, 62, 91);
        float: left;
    }
    .rightSide{
        width: 86%;
        height: 100%;
        float: left;
        // background: 
        .content{
            height: 92%;
            background: #fff;
        }
    }
</style>