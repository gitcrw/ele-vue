<template>
    <div class="no-drag">
        <div class="logo">
          <img src="../assets/logo.svg" alt="">
          <span>好万家图库</span>
        </div>
        <div class="menu-box">
          <div class="menu-item"  :key="item.name" v-for="item in routesList" @click="goto(item.name)">
            <img :src="item.meta.menuIcon" alt="">
            <span>{{item.meta.title}}</span>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ['authority'],
  data () {
    return {
      children: '',
      routesList: []
    }
  },
  methods: {
    goto (name) {
      if (this.$route.name != name) { this.$router.push({name}) }
    }
  },
  created () {
    // 获取main下的所有子路由
    let children = []
    let routesList = this.$router.options.routes
    let mainList = routesList.filter((item) => {
      return item.name == 'main'
    })
    this.children = mainList[0].children
  },
  watch: {
    authority (to, from) {
      // 如果返回的权限列表和子路由的code相同，则渲染
      console.log(to)
      this.children.forEach(ele => {
        to.forEach(item => {
          if (ele.meta.code == item) {
            this.routesList.push(ele)
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .logo{
    height: 120px;
    border-bottom: 1px solid #fff;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      margin-bottom: 15px;
    }
  }
  .menu-box{
    margin-top: 20px;
    color: #fff;
    // line-height: 50px;
    img{
      display: block;
      margin-right: 12px;
      margin-left: 10px;
    }
    .menu-item{
      
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
  }
</style>