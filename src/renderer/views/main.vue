<template>
    <div id="main">

        <div class="leftSide">
            <left-side :authority="authority"/>
        </div>
        <div class="rightSide">
            <top-menu @handleShow = "getType"></top-menu>
            
              <div class="content no-drag">
                <keep-alive>
                  <router-view :allProject="allProject"></router-view>
                  </keep-alive>
              </div>
            
        </div>
				
				<notify-top ref="notify"></notify-top>
				<systemSetting ref="system"></systemSetting>  //菜鸟写的辣鸡弹框
				
        <!-- 遮罩层 -->
        <div class="mb"  v-if="mb"></div>
        <!-- 弹出框 -->
        <transition mode="out-in">
            <component :is="showPopup" ></component>
        </transition>

        
    </div>
</template>
<script>
import qs from 'qs'
import LeftSide from '../components/LeftSide'
import TopMenu from '../components/TopMenu'
import PeopleInfo from '../components/peopleInfo'
import ResvisePwd from '../components/resvisePwd'
import notifyTop from '@/components/notifyTop'
import systemSetting from '@/components/systemSetting'
export default {
  components: {
    LeftSide,
    TopMenu,
    PeopleInfo,
    ResvisePwd,
		systemSetting,
		notifyTop
  },
  data () {
    return {
      authority: '', // 角色拥有的权限
      allProject: '',
      showPopup:'',
      mb:false
    }
  },
  methods:{
    getType(data) {
			console.log(data, 'data')
			data === 1
			? this.$refs.system.show = true
			: this.$refs.notify.show = true
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
  },
  watch:{
    '$store.state.showPopup':function(to,from){
      this.showPopup = to
      console.log(to)
    },
          '$store.state.mb':function(t,f){
        this.mb = t
      }
  }
}
</script>
<style lang="scss" scoped>
  .mb{background-color: #000;width:100%;height:100%;z-index:0;opacity: 0.5;left:0;top:0;position:fixed;}
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
            overflow-y: auto;
        }
    }


    .v-enter,
.v-leave-to {

  transform: translateY(-800px);
}
.v-enter-active,
.v-leave-active {
  z-index: 100;
  transition: all .5s ease;
}
</style>