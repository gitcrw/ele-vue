<template>
  <div>
    <!--  -->
    <div class="ct" v-if="id==1">
      <div class="left">全部项目({{allProject.length}})</div>
      <div class="right">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{viewStyle=='card'?'卡片视图':'列表视图'}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="card">卡片视图</el-dropdown-item>
            <el-dropdown-item command="list">列表视图</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!--  -->
        <el-dropdown style="margin-left:20px" >
          <span class="el-dropdown-link">
            项目名称
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>项目名称排列</el-dropdown-item>
            <el-dropdown-item>创建时间排列</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
         <el-button type="danger" size="small" style="margin-left:20px">创建项目</el-button>
      </div>
    </div>
    <!--  -->
    <div class="ct" v-if="id==2">
      <div class="left">全部项目(4)</div>
      <div class="right">{{viewStyle=='card'?'卡片视图':'列表视图'}}</div>
    </div>
    <!--  -->
    <div class="ct" v-if="id==3">
      <div class="left">全部项目(4)</div>
      <div class="right">卡片视图</div>
    </div>
    <!--  -->
    <div class="ct" v-if="id==4">
      <div class="left">
        <span @click="goto(1)">全部用户(2)</span>
        <span @click="goto(2)">角色权限</span>
      </div>
      <div class="right">
        <span>全部</span>
        <span>创建用户</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["allProject"],
  data() {
    return {
      id: 1,
      viewStyle:'card'
    };
  },
  methods: {
    goto(index) {
      this.$emit("xx", index);
    },
    handleCommand(command){
      this.$store.commit('viewStyle',command)
    }
  },
  created() {
    let id = this.$route.meta.id;
    this.id = id;
    console.log(id);
  },
  watch:{
    '$store.state.viewStyle':function(to,from){
        this.viewStyle = to
    }
  }


};
</script>
<style lang="scss" scoped>
.ct {
  margin: 10px 24px 30px 20px;
  font-size: 14px;
  overflow: hidden;
  .left {
    float: left;
  }
  .right {
    float: right;
  }
}
</style>